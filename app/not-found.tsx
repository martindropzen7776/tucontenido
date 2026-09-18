import type { Metadata } from "next";
import { Saturno } from "@/components/site/saturno";

export const metadata: Metadata = {
  title: "Página no encontrada — Tu Contenido",
  description:
    "La dirección que buscaste no existe o cambió de lugar. Desde acá podés volver al inicio o ver los precios.",
  robots: { index: false, follow: true },
};

/* La 404 no es un callejón: lleva al inicio o directo a los precios. Como
   el sitio se exporta estático, esto sale como out/404.html, que es
   lo que sirven Cloudflare Pages y Netlify ante una URL que no existe. */
export default function NoEncontrada() {
  return (
    <main className="relative isolate flex min-h-svh flex-col overflow-hidden px-5 py-6 sm:px-8 sm:py-8">
      <Saturno className="-z-10 opacity-45
                          left-1/2 top-1/2 h-[min(84vw,420px)] w-[min(84vw,420px)]
                          -translate-x-1/2 -translate-y-1/2
                          lg:h-[620px] lg:w-[620px]" />

      <header>
        <a href="/" className="disp text-[17px] tracking-[-0.03em]">
          tucontenido<i className="not-italic text-ink-soft">.</i>
        </a>
      </header>

      <div className="flex flex-1 items-center py-12">
        <div className="flex max-w-[38rem] flex-col gap-6">
          <p className="mono !text-[11px] text-ink-soft">Error 404</p>
          <h1 className="disp text-[clamp(38px,8vw,72px)] leading-[0.98] tracking-[-0.03em] text-balance">
            Esta página no existe
          </h1>
          <p className="text-[16.5px] leading-relaxed text-ink-soft">
            Puede que el enlace esté mal escrito o que la página haya cambiado de
            lugar. Lo que seguramente buscabas está acá:
          </p>
          <div className="flex flex-wrap gap-3.5 pt-2">
            <a href="/" className="btn">
              Ir al inicio
            </a>
            <a href="/#precio" className="btn btn-line">
              Ver los precios
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
