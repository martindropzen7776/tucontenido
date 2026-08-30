import type { NextConfig } from "next";

/* Exportación estática: el build produce una carpeta de HTML, CSS y JS
   sin servidor detrás. Eso la vuelve portátil — sube igual a Cloudflare
   Pages, Netlify, GitHub Pages o un hosting argentino cualquiera.

   El sitio ya no usaba nada del servidor: cero rutas de API, cero
   server actions, cero rutas dinámicas, cero middleware. Así que esto
   no resigna nada. */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
