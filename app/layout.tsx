import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const DESCRIPTION =
  'Backend Developer specializing in ASP.NET Core and Clean Architecture to build scalable, high-performance systems.';

export const metadata: Metadata = {
  title: 'Ramy Khairy | Backend Developer',
  description: DESCRIPTION,
  keywords: [
    'Ramy Khairy',
    'Backend Developer',
    'ASP.NET Core',
    'C#',
    '.NET',
    'Clean Architecture',
    'NestJS',
    'PostgreSQL',
    'Alexandria Egypt',
  ],
  authors: [{ name: 'Ramy Khairy' }],
  creator: 'Ramy Khairy',
  openGraph: {
    type: 'website',
    title: 'Ramy Khairy | Backend Developer',
    description: DESCRIPTION,
    siteName: 'Ramy Khairy Portfolio',
    locale: 'en_US',
    images: [
      {
        url: '/images/logo-wide.png',
        width: 1920,
        height: 1080,
        alt: 'Ramy Khairy – Backend Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ramy Khairy | Backend Developer',
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-flash: applies saved theme class before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('rk-theme');document.documentElement.classList.add(t==='light'?'light':'dark')}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/images/logo.png" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
