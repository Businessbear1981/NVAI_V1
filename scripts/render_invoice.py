import sys, re, os, shutil, zipfile
sys.stdout.reconfigure(encoding='utf-8')
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from pathlib import Path

md = Path(r"C:\Users\sgill\OneDrive\Desktop\NVAI-Invoice-AEC-INV-2026-0601.md").read_text(encoding='utf-8')
pdf_path = r"C:\Users\sgill\OneDrive\Desktop\NVAI-Invoice-AEC-INV-2026-0601.pdf"
doc = SimpleDocTemplate(pdf_path, pagesize=letter, topMargin=0.5*inch, bottomMargin=0.5*inch, leftMargin=0.5*inch, rightMargin=0.5*inch, title="Ardan Edge Capital - Invoice AEC-INV-2026-0601")
ss = getSampleStyleSheet()
ss.add(ParagraphStyle(name='AEC_Letterhead', fontSize=22, leading=26, spaceAfter=2, alignment=TA_CENTER, textColor=colors.HexColor("#0a1426"), fontName='Helvetica-Bold'))
ss.add(ParagraphStyle(name='AEC_InvoiceLabel', fontSize=11, leading=14, spaceAfter=14, alignment=TA_CENTER, textColor=colors.HexColor("#5a6a82"), fontName='Helvetica'))
ss.add(ParagraphStyle(name='AEC_SectionH', fontSize=13, leading=16, spaceBefore=12, spaceAfter=8, textColor=colors.HexColor("#0a1426"), fontName='Helvetica-Bold'))
ss.add(ParagraphStyle(name='AEC_SubH', fontSize=10, leading=13, spaceBefore=8, spaceAfter=4, textColor=colors.HexColor("#5a3a1a"), fontName='Helvetica-Bold'))
ss.add(ParagraphStyle(name='AEC_Body', fontSize=8.5, leading=11, spaceAfter=3, alignment=TA_LEFT, fontName='Helvetica'))
ss.add(ParagraphStyle(name='AEC_BulletBody', fontSize=8.5, leading=11, spaceAfter=2, alignment=TA_LEFT, fontName='Helvetica', leftIndent=12, firstLineIndent=-10))
ss.add(ParagraphStyle(name='AEC_TableCell', fontSize=7.5, leading=9.5, alignment=TA_LEFT, fontName='Helvetica'))
ss.add(ParagraphStyle(name='AEC_Footer', fontSize=8, leading=11, alignment=TA_CENTER, fontName='Helvetica-Oblique', textColor=colors.HexColor("#666")))

elements = []
table_rows = []
in_table = False

def flush_table():
    global table_rows, in_table
    if table_rows:
        nc = max(len(r) for r in table_rows)
        if nc == 2: cw = [5.6*inch, 1.7*inch]
        elif nc == 3: cw = [0.9*inch, 0.4*inch, 6.0*inch]
        elif nc == 4: cw = [1.0*inch, 1.8*inch, 0.7*inch, 3.7*inch]
        elif nc == 5: cw = [0.9*inch, 1.3*inch, 0.6*inch, 3.7*inch, 0.8*inch]
        else: cw = None
        wrapped = []
        for row in table_rows:
            wrapped_row = []
            for cell in row:
                clean = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', cell)
                clean = re.sub(r'`([^`]+)`', r'\1', clean)
                clean = clean.replace('<', '&lt;').replace('>', '&gt;').replace('&lt;b&gt;', '<b>').replace('&lt;/b&gt;', '</b>')
                try:
                    wrapped_row.append(Paragraph(clean, ss['AEC_TableCell']))
                except Exception:
                    wrapped_row.append(Paragraph(re.sub(r'<[^>]+>', '', cell), ss['AEC_TableCell']))
            wrapped.append(wrapped_row)
        tbl = Table(wrapped, colWidths=cw, hAlign='LEFT', repeatRows=1)
        tbl.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0a1426")),
            ('TEXTCOLOR', (0,0), (-1,0), colors.white),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('FONTSIZE', (0,0), (-1,-1), 7.5),
            ('BOTTOMPADDING', (0,0), (-1,0), 6),
            ('TOPPADDING', (0,0), (-1,0), 6),
            ('BACKGROUND', (0,1), (-1,-1), colors.HexColor("#fafbfd")),
            ('GRID', (0,0), (-1,-1), 0.4, colors.HexColor("#cfd6e1")),
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('LEFTPADDING', (0,0), (-1,-1), 4),
            ('RIGHTPADDING', (0,0), (-1,-1), 4),
            ('ALIGN', (-1,0), (-1,-1), 'RIGHT'),
        ]))
        elements.append(tbl)
        elements.append(Spacer(1, 0.08*inch))
    table_rows = []
    in_table = False

def render_para(text, style):
    BOLD_PH, CODE_PH = "\x01", "\x02"
    bold_chunks, code_chunks = [], []
    work = re.sub(r'\*\*(.+?)\*\*', lambda m: (bold_chunks.append(m.group(1)), BOLD_PH + str(len(bold_chunks)-1) + BOLD_PH)[1], text)
    work = re.sub(r'`([^`]+)`', lambda m: (code_chunks.append(m.group(1).replace('<', '&lt;').replace('>', '&gt;')), CODE_PH + str(len(code_chunks)-1) + CODE_PH)[1], work)
    work = work.replace('<', '&lt;').replace('>', '&gt;')
    work = re.sub(BOLD_PH + r'(\d+)' + BOLD_PH, lambda m: f'<b>{bold_chunks[int(m.group(1))]}</b>', work)
    work = re.sub(CODE_PH + r'(\d+)' + CODE_PH, lambda m: f'<font face="Courier" size="8">{code_chunks[int(m.group(1))]}</font>', work)
    try:
        return Paragraph(work, style)
    except Exception:
        return Paragraph(re.sub(r'<[^>]+>', '', text), style)

saw_h1 = False
for line in md.split('\n'):
    line = line.rstrip()
    if line.startswith('|') and '---' not in line:
        table_rows.append([c.strip() for c in line.strip('|').split('|')])
        in_table = True
        continue
    elif '|---' in line or '|--:' in line or '|:--' in line:
        continue
    elif in_table and (line == '' or not line.startswith('|')):
        flush_table()
    if line.startswith('# '):
        elements.append(Paragraph(line[2:], ss['AEC_Letterhead']))
        saw_h1 = True
    elif line.startswith('**Invoice**') and saw_h1:
        elements.append(Paragraph('INVOICE', ss['AEC_InvoiceLabel']))
        saw_h1 = False
    elif line.startswith('## '):
        elements.append(Paragraph(line[3:], ss['AEC_SectionH']))
    elif line.startswith('### '):
        elements.append(Paragraph(line[4:], ss['AEC_SubH']))
    elif line.startswith('---'):
        elements.append(Spacer(1, 0.06*inch))
    elif line.startswith('- ') or line.startswith('* '):
        elements.append(render_para('• ' + line[2:].lstrip(), ss['AEC_BulletBody']))
    elif re.match(r'^\s+- ', line):
        elements.append(render_para('&nbsp;&nbsp;◦ ' + line.lstrip()[2:], ss['AEC_BulletBody']))
    elif line.startswith('*') and line.endswith('*') and not line.startswith('**'):
        elements.append(Paragraph(line.strip('*'), ss['AEC_Footer']))
    elif line.strip():
        elements.append(render_para(line, ss['AEC_Body']))
    else:
        elements.append(Spacer(1, 0.03*inch))

flush_table()
doc.build(elements)

for dest in [r"C:\Users\sgill\Desktop\NVAI-Invoice-Package-2026-06-01\NVAI-Invoice-AEC-INV-2026-0601.pdf",
             r"C:\Users\sgill\Desktop\NVAI-Invoice-Package-2026-06-01\NVAI-Invoice-AEC-INV-2026-0601.md",
             r"C:\Users\sgill\OneDrive\Desktop\NVAI-Invoice-Package-2026-06-01\NVAI-Invoice-AEC-INV-2026-0601.pdf",
             r"C:\Users\sgill\OneDrive\Desktop\NVAI-Invoice-Package-2026-06-01\NVAI-Invoice-AEC-INV-2026-0601.md"]:
    src = pdf_path if dest.endswith('.pdf') else r"C:\Users\sgill\OneDrive\Desktop\NVAI-Invoice-AEC-INV-2026-0601.md"
    shutil.copy(src, dest)

zip_path = r"C:\Users\sgill\Desktop\NVAI-Invoice-Package-2026-06-01.zip"
folder = r"C:\Users\sgill\Desktop\NVAI-Invoice-Package-2026-06-01"
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(folder):
        for file in files:
            full = os.path.join(root, file)
            arc = os.path.relpath(full, os.path.dirname(folder))
            zf.write(full, arc)
shutil.copy(zip_path, r"C:\Users\sgill\OneDrive\Desktop\NVAI-Invoice-Package-2026-06-01.zip")
print(f"PDF: {os.path.getsize(pdf_path)/1024:.1f} KB")
print(f"ZIP: {os.path.getsize(zip_path)/1024:.1f} KB")
