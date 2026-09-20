import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Montserrat } from "next/font/google";
import { getLocale } from "next-intl/server";
import { GsapProvider } from "@/components/motion/GsapProvider";
import { site } from "@/config/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  applicationName: site.name,
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/media/mobile/hero-texture-mobile.webp"
          media="(max-width: 767px)"
        />
        <link
          rel="preload"
          as="image"
          href="/media/desktop/hero-texture-desktop.webp"
          media="(min-width: 768px)"
        />
      </head>
      <body className="min-h-full">
        <GsapProvider>{children}</GsapProvider>
      </body>
    </html>
  );
}
