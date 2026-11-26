import type { Metadata } from 'next';
import { DM_Sans, Inter, JetBrains_Mono } from 'next/font/google';

import '@/app/globals.css';
import { BASE_PATH } from '@/lib/base-path';

// Only the weights actually rendered are requested; each extra weight is a
// separate woff2 download. Measured against the variable-font alternative
// (no `weight`), which turned out larger for these three families.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'], // body, font-medium, 600 labels, .h2
});
// DM Sans is only ever the fallback behind Arial Black on the hero h1.
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['900'],
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'], // .mono, and the 500 on .btn
});

const DESCRIPTION =
  "self-hosted anti-bot solvers that keep working after the vendor's next update.";
const TITLE = 'xhr.dev — self-hosted anti-bot solvers';

export const metadata: Metadata = {
  alternates: {
    // GSC was flagging pages as "Duplicate without user-selected canonical" --
    // this pins every crawlable URL variant (query strings, alternate hosts
    // that reach the app before the middleware redirect fires, etc.) back to
    // the one canonical URL.
    canonical: '/',
  },
  description: DESCRIPTION,
  icons: {
    // apple-touch-icon must be a PNG; iOS ignores .ico
    apple: [{ sizes: '180x180', url: '/assets/apple-touch-icon.png' }],
    icon: [
      { sizes: '32x32 48x48', url: '/favicon.ico' },
      { sizes: '32x32', type: 'image/png', url: '/assets/icon-32.png' },
    ],
  },
  metadataBase: new URL('https://xhrdev.com'),
  openGraph: {
    description: DESCRIPTION,
    // a checked-in png rather than an `opengraph-image` route: the export
    // would emit it extensionless, which github pages serves as a download.
    images: [
      {
        alt: TITLE,
        height: 630,
        url: '/assets/og.png',
        width: 1200,
      },
    ],
    siteName: 'xhr.dev',
    title: TITLE,
    type: 'website',
    url: '/',
  },
  robots: {
    follow: true,
    // pr previews live on the production host, so keep them out of the index
    index: !BASE_PATH,
  },
  title: TITLE,
  twitter: {
    card: 'summary_large_image',
    description: DESCRIPTION,
    images: ['/assets/og.png'],
    title: TITLE,
  },
};

const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  description: DESCRIPTION,
  email: 'hello@xhrdev.com',
  name: 'xhr.dev',
  url: 'https://xhrdev.com',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      >
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
          type="application/ld+json"
        />
        {children}
        {/* ion-icon scripts
        <Script
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
          type="module"
        />
        <Script
          noModule
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
        />
        */}
      </body>
    </html>
  );
}
