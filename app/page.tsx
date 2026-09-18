import type { Metadata } from "next";
import { Nav, Footer, WaFab } from "@/components/site/chrome";
import { Hero } from "@/components/site/hero";
import { Diff } from "@/components/site/diff";
import { Incluye, Semana, Reservas, Trabajos, Precio, Preguntas, Cierre } from "@/components/site/sections";
import { SITE_URL, FAQ_SCHEMA } from "@/lib/site";

/* La raíz del dominio es la landing de webs. Hasta el 17/09/2026 vivía
   en /web y la raíz era una agencia de publicidad, que se sacó; /web
   redirige acá con un 301 (netlify.toml) para no romper los links de
   anuncios y posts viejos. */
export const metadata: Metadata = {
  title: "Tu web en 7 días — Tu Contenido",
  description:
    "Tu web en 7 días por $500.000, a medida y con los textos escritos. Con sistema de reservas, $700.000: tus clientes sacan turno solos.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tu web en 7 días — desde $500.000",
    description:
      "A medida, andando en el celular y con los textos escritos. Si trabajás con turnos, con sistema de reservas adentro.",
    url: "/",
    images: [{ url: "/og/web.png", width: 1200, height: 630, alt: "Tu Contenido: tu web lista en 7 días, desde $500.000." }],
  },
};

const oferta = (nombre: string, precio: string, servicio: string) => ({
  "@type": "Offer",
  name: nombre,
  priceCurrency: "ARS",
  price: precio,
  availability: "https://schema.org/InStock",
  itemOffered: { "@type": "Service", name: servicio, serviceType: "Diseño y desarrollo web" },
});

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Tu Contenido",
  description:
    "Diseño y desarrollo de sitios web para negocios en Argentina, con sistema de reservas opcional. Entrega en 7 días.",
  url: `${SITE_URL}/`,
  areaServed: { "@type": "Country", name: "Argentina" },
  priceRange: "$500.000 - $700.000",
  makesOffer: [
    oferta("Sitio web profesional", "500000", "Diseño web a medida"),
    oferta("Sitio web con sistema de reservas", "700000", "Diseño web a medida con reservas online"),
  ],
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
      <Reservas />
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
