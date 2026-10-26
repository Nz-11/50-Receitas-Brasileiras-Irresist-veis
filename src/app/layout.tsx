import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { siteConfig } from "@/config/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:7000"),
  title: `${siteConfig.productName} · E-book de culinária brasileira`,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.productName,
    description: siteConfig.description,
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/images/receitas/pao-de-queijo.jpg", width: 1800, height: 1200 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0806",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Pular para o conteúdo
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        <div className="film-grain" aria-hidden />
      </body>
    </html>
  );
}
