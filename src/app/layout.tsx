import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/lib/react-query-provider';
import RefreshToken from '@/features/auth/components/refresh-token';
import { Header } from '@/components/layout/header';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ESHOP — Multivendor Marketplace',
  description:
    'Discover millions of products from verified sellers across 50+ categories. Fast delivery, secure checkout, and hassle-free returns.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <RefreshToken>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
            </div>
            <Toaster position="top-right" richColors />
          </RefreshToken>
        </QueryProvider>
      </body>
    </html>
  );
}
