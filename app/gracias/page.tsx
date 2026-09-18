import type { Metadata } from "next";
import { Gracias } from "@/components/site/gracias";
import { Saturno } from "@/components/site/saturno";

/* Destino del calificador. Noindex: solo tiene sentido después de
   completarlo, y no debe competir en Google con la página principal. */
export const metadata: Metadata = {
  title: "Gracias — Tu Contenido",
  description:
    "Tu pedido está armado en WhatsApp. Qué pasa ahora y cuándo ves tu web.",
  robots: { index: false, follow: true },
  openGraph: {
    images: [{ url: "/og/web.png", width: 1200, height: 630, alt: "Tu Contenido: tu web lista en 7 días, desde $500.000." }],
  },
};

export default function PaginaGracias() {
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

      <div className="flex flex-1 items-center justify-center py-10">
        <Gracias />
      </div>
    </main>
  );
}
