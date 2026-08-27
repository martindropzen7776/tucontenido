import type { Metadata } from "next";
import { Califica } from "@/components/site/califica";
import { Saturno } from "@/components/site/saturno";

/* Página de tráfico pago y DM. No compite con la home en Google:
   el contenido es corto por diseño, así que se marca noindex para
   no diluir la página que sí tiene que rankear. */
export const metadata: Metadata = {
  title: "Tu web en 7 días — Tu Contenido",
  description:
    "Tres preguntas y te decimos si tu consultorio entra en los USD 500. Sin llamadas ni reuniones.",
  robots: { index: false, follow: true },
};

export default function Empezar() {
  return (
    <main className="relative isolate flex min-h-svh flex-col overflow-hidden px-5 py-6 sm:px-8 sm:py-8">
      <Saturno className="-z-10 opacity-55" />

      {/* Cabecera mínima: quién sos y qué vendés, en una línea. */}
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <a href="/" className="disp text-[17px] tracking-[-0.03em]">
          tucontenido<i className="not-italic text-ink-soft">.</i>
        </a>
        <p className="mono !text-[11px] text-ink-soft">
          Web en 7 días · USD 500 · a tu nombre
        </p>
      </header>

      {/* El calificador ocupa el centro de la pantalla. */}
      <div className="flex flex-1 items-center justify-center py-8">
        <Califica />
      </div>

      <footer className="mono !text-[11px] flex flex-wrap justify-between gap-x-6 gap-y-1 text-ink-soft/70">
        <span>Odontología · Buenos Aires</span>
        <span>Sin llamadas · sin reuniones</span>
      </footer>
    </main>
  );
}
