import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/react-query-provider";
import { ThemeProvider } from "@/lib/theme-provider";
import RefreshToken from "@/features/auth/components/refresh-token";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const notoSans = Noto_Sans({variable:'--font-sans'});

export const metadata: Metadata = {
  title: "ESHOP — Multivendor Marketplace",
  description:
    "Discover millions of products from verified sellers across 50+ categories. Fast delivery, secure checkout, and hassle-free returns.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", notoSans.variable)}>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <QueryProvider>
            <RefreshToken>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
              </div>
              <Toaster position="top-right" richColors />
            </RefreshToken>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
