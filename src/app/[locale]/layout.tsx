import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CurrencyProvider } from '@/contexts/currency-context';
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ["arabic"],
  variable: "--font-ibm-plex-arabic"
});

export const metadata: Metadata = {
  title: "Dyar - ديار",
  description: "Property rental platform",
};

const locales = ['en', 'ar'];

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  const fontClass = locale === 'ar' ? 'font-ibm-plex-arabic' : 'font-inter';

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className={`${inter.variable} ${ibmPlexArabic.variable} ${fontClass} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <CurrencyProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </CurrencyProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
