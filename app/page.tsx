import type { Metadata } from "next";
import { Nav, Footer, WaFab } from "@/components/site/chrome";
import { Hero } from "@/components/site/hero";
import { Diff } from "@/components/site/diff";
import { Servicios, Plataformas, Metodo, Precio, Preguntas, Cierre } from "@/components/site/sections";
import { SITE_URL, FAQ_SCHEMA } from "@/lib/site";

/* La raíz del dominio es la agencia de publicidad en Meta y Google.
   Historia: hasta el 17/09/2026 la raíz era una agencia (solo Meta) y
   la landing de webs vivía en /web; después la web pasó a la raíz y la
   agencia se sacó. Desde el 13/11/2026 es al revés: vuelve la agencia,
   ahora con Meta y Google, y la landing de webs se saca entera (queda
   en el historial de git). /web sigue redirigiendo acá con un 301
   (netlify.toml) para no romper links viejos. */
export const metadata: Metadata = {
  title: "Publicidad en Meta y Google — Tu Contenido",
  description:
    "Agencia de publicidad paga: campañas en Facebook, Instagram y Google Ads medidas contra lo que vendés. Diagnóstico sin cargo y cuentas a tu nombre.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Publicidad en Meta y Google que se mide en ventas",
    description:
      "Campañas en Facebook, Instagram y Google Ads, con las cuentas a tu nombre y sin permanencia. Diagnóstico sin cargo.",
    url: "/",
    images: [{ url: "/og/agencia.png", width: 1200, height: 630, alt: "Tu Contenido: publicidad en Meta y Google que se mide en ventas." }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Tu Contenido",
  description:
    "Agencia de publicidad paga en Meta (Facebook, Instagram, WhatsApp) y Google Ads para negocios en Argentina.",
  url: `${SITE_URL}/`,
  areaServed: { "@type": "Country", name: "Argentina" },
  knowsAbout: ["Meta Ads", "Facebook Ads", "Instagram Ads", "Google Ads", "Publicidad digital"],
  makesOffer: [
    {
      "@type": "Offer",
      name: "Diagnóstico de campañas",
      price: "0",
      priceCurrency: "ARS",
      itemOffered: { "@type": "Service", name: "Diagnóstico de publicidad paga", serviceType: "Auditoría de campañas publicitarias" },
    },
    {
      "@type": "Offer",
      name: "Gestión de campañas en Meta y Google",
      itemOffered: { "@type": "Service", name: "Gestión de publicidad en Meta y Google Ads", serviceType: "Publicidad digital" },
    },
  ],
};

/* FAQPage: es lo que habilita el bloque desplegable en los resultados
   de Google y captura búsquedas de cola larga tipo "cuánto invertir
   en publicidad". */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_SCHEMA.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      {/* Qué hacemos, dónde, en qué nos diferenciamos, cómo, y recién
          ahí cómo se cobra. */}
      <Servicios />
      <Plataformas />
      <Diff />
      <Metodo />
      <Precio />
      <Preguntas />
      <Cierre />
      <Footer />
      <WaFab />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
