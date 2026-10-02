import type { Metadata } from "next";
import { Nav, Footer, WaFab } from "@/components/site/chrome";
import { Hero } from "@/components/site/hero";
import { Diff } from "@/components/site/diff";
import { Incluye, Semana, Trabajos, Precio, Preguntas, Cierre } from "@/components/site/sections";
import { SITE_URL, FAQ_SCHEMA } from "@/lib/site";

/* La raíz del dominio es la landing de webs. Hasta el 17/09/2026 vivía
   en /web y la raíz era una agencia de publicidad, que se sacó; /web
   redirige acá con un 301 (netlify.toml) para no romper los links de
   anuncios y posts viejos. Desde el 01/10/2026 vende una sola web, la
   de $500.000: el plan con reservas se sacó (queda en el historial). */
export const metadata: Metadata = {
  title: "Tu web en 7 días — Tu Contenido",
  description:
    "Tu web en 7 días por $500.000, a medida, con los textos escritos y a tu nombre. Pago único, sin cuota mensual.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tu web en 7 días — $500.000",
    description:
      "A medida, andando en el celular, con los textos escritos y a tu nombre. Pago único, sin cuota mensual.",
    url: "/",
    images: [{ url: "/og/web.png", width: 1200, height: 630, alt: "Tu Contenido: tu web lista en 7 días por $500.000." }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Tu Contenido",
  description:
    "Diseño y desarrollo de sitios web para negocios en Argentina. Entrega en 7 días.",
  url: `${SITE_URL}/`,
  areaServed: { "@type": "Country", name: "Argentina" },
  priceRange: "$500.000",
  makesOffer: {
    "@type": "Offer",
    name: "Sitio web profesional",
    priceCurrency: "ARS",
    price: "500000",
    availability: "https://schema.org/InStock",
    itemOffered: { "@type": "Service", name: "Diseño web a medida", serviceType: "Diseño y desarrollo web" },
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

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      {/* Cómo trabajamos (la diferencia y los 7 días), qué trae la
          web, ejemplos, y recién ahí el precio. */}
      <Diff />
      <Semana />
      <Incluye />
      <Trabajos />
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
