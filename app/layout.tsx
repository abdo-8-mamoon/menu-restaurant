import type { Metadata, Viewport } from 'next';
import { Cairo } from 'next/font/google';
import { AppProviders } from '@/lib/contexts';
import './globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'المائدة الذهبية | Digital Menu & Bill',
  description: 'Restaurant & cafe digital menu and bill payment system',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FDFBF7',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // lang/dir are set on the client by LanguageProvider (default: ar / rtl)
    <html lang="ar" dir="rtl" className={cairo.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-bg dark:bg-bg-dark font-sans antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
