import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/* /entrega es una herramienta interna: las hojas llevan nombre y
   dominio del cliente en la URL, así que no se rastrea. /empezar y
   /gracias sí se dejan rastrear: tienen noindex, y para que Google
   lo vea tiene que poder entrar. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/entrega/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
