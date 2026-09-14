import type { Metadata } from "next";
import { Nav, Footer, WaFab } from "@/components/site/chrome";
import { Hero } from "@/components/site/hero";
import { Diff } from "@/components/site/diff";
import { Incluye, Semana, Trabajos, Precio, Preguntas, Cierre } from "@/components/site/sections";
import { SITE_URL, FAQ_SCHEMA } from "@/lib/site";

/* La landing del servicio de webs vive en /web: la raíz del dominio
   es la página de la agencia. Por eso el canonical apunta acá y no a
   "/" — si apuntara a la raíz, Google leería esta página como un
   duplicado de la agencia y dejaría de mostrarla. */
export const metadata: Metadata = {
  title: "Tu web en 7 días — Tu Contenido",
  description:
    "Tu web en 7 días por $500.000, a medida y con los textos escritos. Llave en mano: te enseñamos a administrarla, sin cuota de mantenimiento.",
  alternates: { canonical: "/web/" },
  openGraph: {
    title: "Tu web en 7 días — $500.000",
    description:
      "A medida, andando en el celular y con los textos escritos. Te la entregamos llave en mano y te enseñamos a manejarla, sin cuota de mantenimiento.",
    url: "/web/",
    images: [{ url: "/og/web.png", width: 1200, height: 630, alt: "Tu Contenido: tu web lista en 7 días por $500.000." }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Tu Contenido",
  description:
    "Diseño y desarrollo de sitios web para negocios en Argentina. Entrega en 7 días.",
  url: `${SITE_URL}/web/`,
  areaServed: { "@type": "Country", name: "Argentina" },
  priceRange: "$500.000",
  makesOffer: {
    "@type": "Offer",
    name: "Sitio web profesional",
    priceCurrency: "ARS",
    price: "500000",
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

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <Diff />
      <Incluye />
      <Semana />
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
