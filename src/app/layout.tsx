import Footer from '@/components/Footer';
import type { Metadata } from "next";
import "./globals.css";
import "./layout.css";
import Navigation from '@/components/Navigation';
import PopupProvider from '@/context/PopUpContext';

import Providers from '@/components/Providers';
import { aspekta } from '@/styles/fonts';

export const metadata: Metadata = {
  title: "Websora App",
  description: "A modern web application with Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={aspekta.variable}>
      <body className="layout-body">
        <Providers>
            <PopupProvider>
            <Navigation />
            <main className="layout-main">
              {children}
            </main>

            <Footer />
            </PopupProvider>
        </Providers>
      </body>
    </html>
  );
}
