import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import WingLayout from '@/components/layout/WingLayout';
import { getPainting, PAINTINGS } from '@/lib/paintings';

export function generateStaticParams() {
  return PAINTINGS.map((p) => ({ slug: p.slug }));
}

export const dynamic = 'force-dynamic'; // cookies() forces dynamic anyway, declared for clarity

type Role = 'buyer' | 'lender' | 'broker-dealer';
const VALID_ROLES: Role[] = ['buyer', 'lender', 'broker-dealer'];

export default async function ProvenancePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const painting = getPainting(slug);
  if (!painting) return notFound();

  const cookieStore = await cookies();
  const signed = cookieStore.get('nvai_ddnda_signed')?.value === '1';
  const roleCookie = cookieStore.get('nvai_ddnda_role')?.value;
  const role: Role | null =
    roleCookie && VALID_ROLES.includes(roleCookie as Role) ? (roleCookie as Role) : null;

  if (!signed || !role) {
    redirect(`/access?return=/provenance/${slug}`);
  }

  const prov = painting.provenance;
  const hasTier1 =
    !!prov &&
    ((prov.namedOwnerChain && prov.namedOwnerChain.length > 0) ||
      (prov.authPdfs && prov.authPdfs.length > 0) ||
      (prov.conditionPhotos && prov.conditionPhotos.length > 0));

  return (
    <WingLayout
      back={{ href: `/piece/${painting.slug}`, label: 'Return to the painting' }}
      eyebrow={`${painting.artist} · Provenance Dossier`}
      title={painting.title}
      subtitle={`${painting.year} · ${role.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())} Tier`}
      caption="Confidential. Held under signed DDNDA."
      backdrop="radial-gradient(ellipse at 50% 30%, rgba(232,200,122,0.12) 0%, transparent 55%), linear-gradient(180deg, #0a0807 0%, #14100a 50%, #0a0605 100%)"
    >
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Tier 0 — public facing context (carried into the gated view for orientation) */}
        <section className="marble rounded-lg p-8 space-y-4">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">Painting</p>
          <p className="font-body text-ivory/85 leading-relaxed">
            <span className="font-didot text-xl text-ivory">{painting.artist}</span> ·{' '}
            <span className="italic">{painting.title}</span> · {painting.year} · {painting.medium} ·{' '}
            {painting.dimensions}
          </p>
          {painting.signed && (
            <p className="font-body text-sm italic text-ivory/70">{painting.signed}</p>
          )}
          <p className="font-body text-sm text-ivory/70">
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
              Viewing Location ·{' '}
            </span>
            {painting.viewingLocation}
          </p>
        </section>

        {/* Tier 1 — released to all signers */}
        {hasTier1 ? (
          <section className="marble rounded-lg p-10 space-y-8">
            <header className="text-center">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
                Tier 1 — Released on DDNDA
              </p>
              <div className="mx-auto mt-4 h-px w-16 bg-gold/40" />
            </header>

            {prov?.namedOwnerChain && prov.namedOwnerChain.length > 0 && (
              <div className="space-y-3">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                  Named Owner-of-Record Chain
                </p>
                <ol className="space-y-3 font-body text-sm text-ivory/85 leading-relaxed">
                  {prov.namedOwnerChain.map((owner, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-mono text-[0.55rem] tracking-wider text-gold/60 pt-1">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{owner}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {prov?.authPdfs && prov.authPdfs.length > 0 && (
              <div className="space-y-3">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                  Authentication Documents
                </p>
                <ul className="space-y-2">
                  {prov.authPdfs.map((doc) => (
                    <li key={doc.url}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm text-gold/85 hover:text-gold"
                      >
                        {doc.label} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {prov?.conditionPhotos && prov.conditionPhotos.length > 0 && (
              <div className="space-y-4">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                  Condition &amp; Verso Evidence
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {prov.conditionPhotos.map((photo) => (
                    <figure key={photo.url} className="space-y-2">
                      <div className="overflow-hidden rounded-sm ring-1 ring-gold/20">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photo.url} alt={photo.label} className="w-full" />
                      </div>
                      <figcaption className="font-body text-xs italic text-ivory/65 text-center">
                        {photo.label}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </section>
        ) : (
          <section className="marble rounded-lg p-8 text-center">
            <p className="font-body italic text-ivory/70">
              Tier 1 provenance for this work is in preparation. Bernard or the curator can speak to
              its current status directly — contact{' '}
              <a href="mailto:concierge@napavalleyartinstitut.com" className="text-gold/80 hover:text-gold">
                concierge@napavalleyartinstitut.com
              </a>
              .
            </p>
          </section>
        )}

        {/* Tier 2 — role-specific */}
        <section className="marble rounded-lg p-10 space-y-6">
          <header className="text-center">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              Tier 2 —{' '}
              {role === 'buyer' ? 'Buyer' : role === 'lender' ? 'Lender' : 'Broker-Dealer'} Release
            </p>
            <div className="mx-auto mt-4 h-px w-16 bg-gold/40" />
          </header>

          {role === 'buyer' && (
            <div className="space-y-4 font-body text-ivory/85">
              {prov?.askingPrice ? (
                <div>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                    Current Asking Price
                  </p>
                  <p className="mt-2 font-didot text-2xl text-ivory">{prov.askingPrice}</p>
                </div>
              ) : (
                <p className="italic text-ivory/65">
                  Asking price released directly by the curator after a brief introductory call.
                  Use{' '}
                  <Link
                    href={`/inquire?action=offer&piece=${painting.slug}`}
                    className="text-gold/80 hover:text-gold"
                  >
                    Make an offer
                  </Link>{' '}
                  or write to concierge.
                </p>
              )}
            </div>
          )}

          {role === 'lender' && (
            <div className="space-y-6 font-body text-ivory/85">
              {prov?.appraisals && prov.appraisals.length > 0 && (
                <div>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                    Formal Appraisals
                  </p>
                  <ul className="mt-3 space-y-3 text-sm">
                    {prov.appraisals.map((a) => (
                      <li key={a.url}>
                        <a
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold/85 hover:text-gold"
                        >
                          {a.label} {a.value ? `· ${a.value}` : ''} {a.year ? `(${a.year})` : ''} →
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {prov?.ownerOfRecord && (
                <div>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                    Current Owner of Record
                  </p>
                  <p className="mt-2 text-sm">{prov.ownerOfRecord}</p>
                </div>
              )}
              {prov?.insuranceStatus && (
                <div>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                    Insurance &amp; Lien Status
                  </p>
                  <p className="mt-2 text-sm">{prov.insuranceStatus}</p>
                </div>
              )}
              {!prov?.appraisals && !prov?.ownerOfRecord && !prov?.insuranceStatus && (
                <p className="italic text-ivory/65">
                  Appraisals, owner-of-record, and insurance status released directly by the curator
                  on an underwriting call. Write to concierge to schedule.
                </p>
              )}
            </div>
          )}

          {role === 'broker-dealer' && (
            <div className="space-y-6 font-body text-ivory/85">
              {prov?.commissionStructure && (
                <div>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                    Commission Structure
                  </p>
                  <p className="mt-2 text-sm">{prov.commissionStructure}</p>
                </div>
              )}
              {prov?.floor && (
                <div>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                    Pricing Floor / Negotiation Latitude
                  </p>
                  <p className="mt-2 text-sm">{prov.floor}</p>
                </div>
              )}
              {prov?.ownerOfRecord && (
                <div>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                    Counter-Party (Owner of Record)
                  </p>
                  <p className="mt-2 text-sm">{prov.ownerOfRecord}</p>
                </div>
              )}
              {!prov?.commissionStructure && !prov?.floor && !prov?.ownerOfRecord && (
                <p className="italic text-ivory/65">
                  Commission terms, pricing floor, and counter-party identity released on a
                  representation call with the curator. Write to concierge to schedule.
                </p>
              )}
            </div>
          )}
        </section>

        {/* Footer reminder */}
        <p className="text-center font-body text-xs italic text-ivory/55">
          All material above is confidential under your signed {role.replace('-', ' ')} DDNDA.
          Distribution outside your organization is a breach. ·{' '}
          <Link href={`/piece/${painting.slug}`} className="text-gold/70 hover:text-gold">
            Return to the painting
          </Link>
        </p>
      </div>
    </WingLayout>
  );
}
