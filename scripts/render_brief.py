import sys, re, os, shutil, zipfile
sys.stdout.reconfigure(encoding='utf-8')
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from pathlib import Path

md = Path(r"C:\Users\sgill\OneDrive\Desktop\NVAI-Design-Brief-for-Richard-Approval.md").read_text(encoding='utf-8')
pdf_path = r"C:\Users\sgill\OneDrive\Desktop\NVAI-Design-Brief-for-Richard-Approval.pdf"
doc = SimpleDocTemplate(pdf_path, pagesize=letter, topMargin=0.55*inch, bottomMargin=0.55*inch, leftMargin=0.65*inch, rightMargin=0.65*inch, title="NVAI v2 Design Brief")
ss = getSampleStyleSheet()
ss.add(ParagraphStyle(name='B_Letterhead', fontSize=22, leading=26, spaceAfter=2, alignment=TA_CENTER, textColor=colors.HexColor("#0a1426"), fontName='Helvetica-Bold'))
ss.add(ParagraphStyle(name='B_Sub', fontSize=11, leading=14, spaceAfter=14, alignment=TA_CENTER, textColor=colors.HexColor("#5a6a82"), fontName='Helvetica'))
ss.add(ParagraphStyle(name='B_H2', fontSize=14, leading=17, spaceBefore=14, spaceAfter=8, textColor=colors.HexColor("#0a1426"), fontName='Helvetica-Bold'))
ss.add(ParagraphStyle(name='B_H3', fontSize=11, leading=14, spaceBefore=8, spaceAfter=4, textColor=colors.HexColor("#5a3a1a"), fontName='Helvetica-Bold'))
ss.add(ParagraphStyle(name='B_Body', fontSize=9.5, leading=13, spaceAfter=4, alignment=TA_LEFT, fontName='Helvetica'))
ss.add(ParagraphStyle(name='B_Bullet', fontSize=9.5, leading=13, spaceAfter=2, alignment=TA_LEFT, fontName='Helvetica', leftIndent=14, firstLineIndent=-12))
ss.add(ParagraphStyle(name='B_Quote', fontSize=10, leading=14, leftIndent=18, rightIndent=18, spaceAfter=8, fontName='Helvetica-Oblique', textColor=colors.HexColor("#1a2a4a")))
ss.add(ParagraphStyle(name='B_Cell', fontSize=8, leading=10.5, alignment=TA_LEFT, fontName='Helvetica'))
ss.add(ParagraphStyle(name='B_Footer', fontSize=8, leading=11, alignment=TA_CENTER, fontName='Helvetica-Oblique', textColor=colors.HexColor("#666")))

elements = []
table_rows = []
in_table = False

def flush_table():
    global table_rows, in_table
    if table_rows:
        nc = max(len(r) for r in table_rows)
        if nc == 2:
            cw = [3.5*inch, 3.7*inch]
        elif nc == 3:
            cw = [2.0*inch, 2.2*inch, 3.0*inch]
        else:
            cw = None
        wrapped = []
        for row in table_rows:
            wrapped_row = []
            for cell in row:
                clean = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', cell)
                clean = re.sub(r'`([^`]+)`', r'\1', clean)
                # Escape only the < > not part of our <b>
                parts = re.split(r'(<b>|</b>)', clean)
                rebuilt = []
                for p in parts:
                    if p in ('<b>', '</b>'):
                        rebuilt.append(p)
                    else:
                        rebuilt.append(p.replace('<', '&lt;').replace('>', '&gt;'))
                clean = ''.join(rebuilt)
                try:
                    wrapped_row.append(Paragraph(clean, ss['B_Cell']))
                except Exception:
                    wrapped_row.append(Paragraph(re.sub(r'<[^>]+>', '', cell), ss['B_Cell']))
            wrapped.append(wrapped_row)
        tbl = Table(wrapped, colWidths=cw, hAlign='LEFT', repeatRows=1)
        tbl.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0a1426")),
            ('TEXTCOLOR', (0,0), (-1,0), colors.white),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('FONTSIZE', (0,0), (-1,-1), 8),
            ('BOTTOMPADDING', (0,0), (-1,0), 6),
            ('TOPPADDING', (0,0), (-1,0), 6),
            ('BACKGROUND', (0,1), (-1,-1), colors.HexColor("#fafbfd")),
            ('GRID', (0,0), (-1,-1), 0.4, colors.HexColor("#cfd6e1")),
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('LEFTPADDING', (0,0), (-1,-1), 5),
            ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ]))
        elements.append(tbl)
        elements.append(Spacer(1, 0.1*inch))
    table_rows = []
    in_table = False

def render_para(text, style):
    BOLD_PH, CODE_PH = "\x01", "\x02"
    bold_chunks, code_chunks = [], []
    work = re.sub(r'\*\*(.+?)\*\*', lambda m: (bold_chunks.append(m.group(1)), BOLD_PH + str(len(bold_chunks)-1) + BOLD_PH)[1], text)
    work = re.sub(r'`([^`]+)`', lambda m: (code_chunks.append(m.group(1).replace('<', '&lt;').replace('>', '&gt;')), CODE_PH + str(len(code_chunks)-1) + CODE_PH)[1], work)
    work = work.replace('<', '&lt;').replace('>', '&gt;')
    work = re.sub(BOLD_PH + r'(\d+)' + BOLD_PH, lambda m: f'<b>{bold_chunks[int(m.group(1))]}</b>', work)
    work = re.sub(CODE_PH + r'(\d+)' + CODE_PH, lambda m: f'<font face="Courier" size="9">{code_chunks[int(m.group(1))]}</font>', work)
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
        elements.append(Paragraph(line[2:], ss['B_Letterhead']))
        saw_h1 = True
    elif line.startswith('**Design Brief') and saw_h1:
        elements.append(Paragraph(line.strip('*'), ss['B_Sub']))
        saw_h1 = False
    elif line.startswith('## '):
        elements.append(Paragraph(line[3:], ss['B_H2']))
    elif line.startswith('### '):
        elements.append(Paragraph(line[4:], ss['B_H3']))
    elif line.startswith('---'):
        elements.append(Spacer(1, 0.06*inch))
    elif line.startswith('> '):
        elements.append(render_para(line[2:], ss['B_Quote']))
    elif line.startswith('- ') or line.startswith('* '):
        elements.append(render_para('• ' + line[2:].lstrip(), ss['B_Bullet']))
    elif re.match(r'^[0-9]+\. ', line):
        elements.append(render_para(line, ss['B_Bullet']))
    elif line.startswith('*') and line.endswith('*') and not line.startswith('**') and len(line) > 4:
        elements.append(Paragraph(line.strip('*'), ss['B_Footer']))
    elif line.strip():
        elements.append(render_para(line, ss['B_Body']))
    else:
        elements.append(Spacer(1, 0.04*inch))

flush_table()
doc.build(elements)

for dest_folder in [r"C:\Users\sgill\Desktop\NVAI-Invoice-Package-2026-06-01",
                    r"C:\Users\sgill\OneDrive\Desktop\NVAI-Invoice-Package-2026-06-01"]:
    shutil.copy(pdf_path, os.path.join(dest_folder, "NVAI-Design-Brief-for-Richard-Approval.pdf"))
    shutil.copy(r"C:\Users\sgill\OneDrive\Desktop\NVAI-Design-Brief-for-Richard-Approval.md",
                os.path.join(dest_folder, "NVAI-Design-Brief-for-Richard-Approval.md"))

zip_path = r"C:\Users\sgill\Desktop\NVAI-Invoice-Package-2026-06-01.zip"
folder = r"C:\Users\sgill\Desktop\NVAI-Invoice-Package-2026-06-01"
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(folder):
        for file in files:
            full = os.path.join(root, file)
            arc = os.path.relpath(full, os.path.dirname(folder))
            zf.write(full, arc)
shutil.copy(zip_path, r"C:\Users\sgill\OneDrive\Desktop\NVAI-Invoice-Package-2026-06-01.zip")
print(f"Design brief PDF: {os.path.getsize(pdf_path)/1024:.1f} KB")
print(f"Package ZIP: {os.path.getsize(zip_path)/1024:.1f} KB")
print(f"\nPackage now contains:")
for f in sorted(os.listdir(folder)):
    full = os.path.join(folder, f)
    print(f"  - {f} ({os.path.getsize(full)/1024:.1f} KB)")
