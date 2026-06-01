import type { Metadata } from 'next';
import './globals.css';
import BernardConcierge from '@/components/bernard/BernardConcierge';

export const metadata: Metadata = {
  metadataBase: new URL('https://napavalleyartinstitut.com'),
  title: {
    default: 'Napa Valley Art Institut',
    template: '%s · Napa Valley Art Institut',
  },
  description:
    'An ultra-luxury cinematic immersive digital gallery on the grounds of Villa Monticello. ' +
    'Twenty-eight master works from private collections. Available to qualified buyers.',
  openGraph: {
    title: 'Napa Valley Art Institut',
    description: 'An ultra-luxury cinematic immersive digital gallery.',
    url: 'https://napavalleyartinstitut.com',
    siteName: 'Napa Valley Art Institut',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Napa Valley Art Institut',
    description: 'An ultra-luxury cinematic immersive digital gallery.',
  },
  robots: {
    index: false, // private platform — search engines should not index until DDNDA flow is final
    follow: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-midnight text-ivory">
        {children}
        <BernardConcierge />
      </body>
    </html>
  );
}
