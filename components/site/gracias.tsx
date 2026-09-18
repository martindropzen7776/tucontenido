"use client";

import { useEffect, useState } from "react";
import { wa } from "@/lib/site";
import { leerLead, type Lead } from "@/lib/lead";
import { Arrow } from "./wa-link";

/* ═══════════════════════════════════════════════════════════
   Gracias.

   Lo más importante que dice esta página es lo que el
   prospecto suele no saber: abrir WhatsApp no manda el mensaje.
   Si no toca "enviar", no nos llega nada. Por eso va primero,
   y por eso hay un botón para volver a abrirlo.

   Los datos vienen del calificador por sessionStorage. Si no
   hay (entró directo, o el navegador no guarda), muestra la
   versión genérica, que funciona igual.
   ═══════════════════════════════════════════════════════════ */

export function Gracias() {
  const [lead, setLead] = useState<Lead | null>(null);
  useEffect(() => setLead(leerLead()), []);

  const pasos: [string, string][] = [
    ["Mandá el mensaje", "Se abrió WhatsApp con tus respuestas ya escritas. Si todavía no tocaste enviar, hacelo: sin ese mensaje no nos llega nada."],
    ["Te respondemos", "De lunes a sábado, normalmente en menos de una hora."],
    lead?.llamada
      ? ["Nos conocemos", "Coordinamos la llamada de 15 minutos en un horario que te quede cómodo."]
      : ["Te pasamos todo por escrito", "El precio cerrado, los tiempos y lo que necesitamos de vos para arrancar."],
    ["Ves tu web", "Mandás el logo y las fotos, y en 72 horas la estás recorriendo en tu celular."],
  ];

  return (
    <div className="flex w-full max-w-[40rem] flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="disp text-[clamp(34px,7vw,60px)] leading-[1] tracking-[-0.03em] text-balance">
          {lead?.nombre ? `Listo, ${lead.nombre}.` : "Listo."} Falta un paso
        </h1>
        <p className="text-[16.5px] leading-relaxed text-ink-soft">
          Tu pedido ya está armado en WhatsApp. Esto es lo que pasa ahora:
        </p>
      </div>

      {/* Es una secuencia de verdad, por eso va numerada. */}
      <ol className="flex flex-col">
        {pasos.map(([t, d], i) => (
          <li
            key={t}
            className="grid grid-cols-[2.2rem_1fr] gap-x-4 border-t border-[var(--rule)] py-5 sm:grid-cols-[3rem_1fr]"
          >
            <span className="mono !text-[11px] pt-1 text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2 className="disp text-[19px] leading-tight tracking-[-0.015em] sm:text-[21px]">{t}</h2>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{d}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={lead?.link || wa("Hola! Quiero mi web en 7 días.")}
          target="_blank"
          rel="noopener"
          className="btn min-h-[56px] justify-center text-[15px]"
        >
          ¿No se abrió WhatsApp? Abrilo acá
          <Arrow />
        </a>
        <a href="/" className="btn btn-line min-h-[56px] justify-center text-[15px]">
          Volver a la página
        </a>
      </div>
    </div>
  );
}
