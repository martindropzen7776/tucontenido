import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Space_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { BannerCookies, Pixel } from "@/components/site/cookies";
import { Fondo } from "@/components/site/fondo";
import "./globals.css";

/* Las fuentes se auto-hospedan: sin request a Google, sin salto de layout. */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});
const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
  display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

/* Este layout envuelve todas las páginas, así que acá no va nada que
   sea de una página en particular: ni canonical, ni schema. Eso vive
   en cada page.tsx. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Tu Contenido",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Tu Contenido",
    images: [{ url: "/og/web.png", width: 1200, height: 630, alt: "Tu Contenido: tu web lista en 7 días, desde $500.000." }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-AR"
      className={`${bricolage.variable} ${instrument.variable} ${spaceMono.variable}`}
    >
      <body>
        <Fondo />
        {children}

        {/* El píxel vive detrás del consentimiento: si no lo aceptan,
            el script no se descarga. Ver components/site/cookies.tsx */}
        <Pixel />
        <BannerCookies />
      </body>
    </html>
  );
}
