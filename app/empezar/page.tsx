import type { Metadata } from "next";
import { Califica } from "@/components/site/califica";
import { Saturno } from "@/components/site/saturno";

/* Página de tráfico pago y DM. No compite con la home en Google:
   el contenido es corto por diseño, así que se marca noindex para
   no diluir la página que sí tiene que rankear. */
export const metadata: Metadata = {
  title: "Pedí tu web — Tu Contenido",
  description:
    "Unas preguntas rápidas y te decimos si tu negocio entra en los $500.000. Después, una llamada corta para conocernos.",
  robots: { index: false, follow: true },
  openGraph: {
    images: [{ url: "/og/web.png", width: 1200, height: 630, alt: "Tu Contenido: tu web lista en 7 días por $500.000." }],
  },
};

export default function Empezar() {
  return (
    <main className="relative isolate flex min-h-svh flex-col overflow-hidden px-5 py-6 sm:px-8 sm:py-8">
      <Saturno className="-z-10 opacity-45
                          left-1/2 top-1/2 h-[min(84vw,420px)] w-[min(84vw,420px)]
                          -translate-x-1/2 -translate-y-1/2
                          lg:h-[620px] lg:w-[620px]" />

      {/* Cabecera mínima: solo la marca. */}
      <header>
        <a href="/web/" className="disp text-[17px] tracking-[-0.03em]">
          tucontenido<i className="not-italic text-ink-soft">.</i>
        </a>
      </header>

      {/* El calificador ocupa el centro de la pantalla. */}
      <div className="flex flex-1 items-center justify-center py-8">
        <Califica />
      </div>
    </main>
  );
}
