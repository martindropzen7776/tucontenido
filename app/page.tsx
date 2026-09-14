import type { Metadata } from "next";
import { Nav, Footer, WaFab } from "@/components/site/chrome";
import {
  HeroAgencia,
  Servicios,
  Metodo,
  ContactoAgencia,
  MSG_AGENCIA,
} from "@/components/site/agencia";
import { SITE_URL } from "@/lib/site";

/* La raíz del dominio: la agencia general. El servicio de webs vive
   en /web y tiene su propia metadata y su propio schema. */
export const metadata: Metadata = {
  title: "Agencia de publicidad en Meta — Tu Contenido",
  description:
    "Campañas de Facebook e Instagram, anuncios, landings y medición en un solo lugar, medidos contra lo que vendés. Pedí un diagnóstico sin cargo.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Publicidad que se mide en ventas — Tu Contenido",
    description:
      "Campañas de Facebook e Instagram, anuncios, landings y medición en un solo lugar. Diagnóstico sin cargo.",
    url: "/",
  },
};

const ENLACES = [
  { href: "#servicios", label: "Servicios" },
  { href: "#como", label: "Cómo trabajamos" },
  { href: "/web/", label: "Webs para negocios" },
  { href: "#contacto", label: "Contacto" },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Tu Contenido",
  description:
    "Agencia de publicidad paga: campañas en Meta, anuncios, landings y medición para negocios en Argentina.",
  url: `${SITE_URL}/`,
  areaServed: { "@type": "Country", name: "Argentina" },
};

export default function Page() {
  return (
    <>
      <Nav enlaces={ENLACES} msg={MSG_AGENCIA} sufijo=".ads" />
      <HeroAgencia />
      <Servicios />
      <Metodo />
      <ContactoAgencia />
      <Footer
        sufijo=".ads"
        bio="Agencia de publicidad paga: campañas en Meta, anuncios, landings y medición, en un solo lugar."
        titulo="Servicios"
        enlaces={[
          { href: "#servicios", label: "Campañas en Meta" },
          { href: "#como", label: "Cómo trabajamos" },
          { href: "/web/", label: "Webs para negocios" },
        ]}
        msg={MSG_AGENCIA}
        firma=""
      />
      <WaFab msg={MSG_AGENCIA} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
