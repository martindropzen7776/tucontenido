import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { PAGINAS_LEGALES } from "@/lib/legal";

export const dynamic = "force-static";

/* Solo lo que tiene que aparecer en Google. Quedan afuera /empezar
   y /gracias (noindex, son para tráfico pago) y /entrega (interna).
   Las URL llevan barra final porque el sitio exporta con
   trailingSlash: así coinciden con los canonical. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (ruta: string) => `${SITE_URL}${ruta.endsWith("/") ? ruta : `${ruta}/`}`;
  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    ...PAGINAS_LEGALES.map((p) => ({
      url: url(p.href),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
