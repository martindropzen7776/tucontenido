import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, Instrument_Sans, Space_Mono } from "next/font/google";
import { PIXEL_ID, SITE_URL, FAQ_SCHEMA } from "@/lib/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Tu web en 7 días — Tu Contenido",
  description:
    "Diseñamos tu web en 7 días por USD 500. A medida, andando en el celular y con los textos escritos. Queda a tu nombre: sin cuota de mantenimiento y sin depender de nadie.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Tu Contenido",
    title: "Tu web en 7 días — USD 500",
    description:
      "A medida, andando en el celular y con los textos escritos. Queda a tu nombre, sin cuota de mantenimiento.",
    url: SITE_URL,
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%231F35D4'/%3E%3Crect x='7' y='14' width='18' height='4' fill='%23D8F24B'/%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  themeColor: "#1F35D4",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Tu Contenido",
  description:
    "Diseño y desarrollo de sitios web para negocios en Argentina. Entrega en 7 días.",
  url: SITE_URL,
  areaServed: { "@type": "Country", name: "Argentina" },
  priceRange: "USD 500",
  makesOffer: {
    "@type": "Offer",
    name: "Sitio web profesional",
    priceCurrency: "USD",
    price: "500",
    availability: "https://schema.org/InStock",
    itemOffered: {
      "@type": "Service",
      name: "Diseño web a medida",
      serviceType: "Diseño y desarrollo web",
    },
  },
};

/* FAQPage: es lo que habilita el bloque desplegable en los resultados
   de Google y captura búsquedas de cola larga tipo "cuánto sale una web". */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_SCHEMA.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-AR"
      className={`${bricolage.variable} ${instrument.variable} ${spaceMono.variable}`}
    >
      <body>
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* Meta Pixel — carga después de que la página es interactiva,
            así no compite con el LCP. Reemplazar PIXEL_ID en lib/site.ts */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </body>
    </html>
  );
}
