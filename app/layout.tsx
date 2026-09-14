import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Space_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { BannerCookies, Pixel } from "@/components/site/cookies";
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

/* La raíz del dominio es la página de la agencia (public/index.html),
   que no pasa por Next. Este layout envuelve solo las rutas del
   servicio de webs, así que acá no va nada que sea de una página en
   particular: ni canonical, ni schema. Eso vive en cada page.tsx. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Tu Contenido",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Tu Contenido",
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%231F35D4'/%3E%3Crect x='7' y='14' width='18' height='4' fill='%23D8F24B'/%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  themeColor: "#1F35D4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-AR"
      className={`${bricolage.variable} ${instrument.variable} ${spaceMono.variable}`}
    >
      <body>
        {children}

        {/* El píxel vive detrás del consentimiento: si no lo aceptan,
            el script no se descarga. Ver components/site/cookies.tsx */}
        <Pixel />
        <BannerCookies />
      </body>
    </html>
  );
}
