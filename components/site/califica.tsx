"use client";

import { useState } from "react";
import { wa } from "@/lib/site";

/* ═══════════════════════════════════════════════════════════
   Calificador.

   Una pantalla, sin scroll, una pregunta por vez. Cada respuesta
   devuelve una frase corta que reencuadra: eso es lo persuasivo,
   no el botón.

   Al final arma el mensaje de WhatsApp con las respuestas ya
   adentro, así la conversación no arranca de cero: cuando el
   lead escribe, ya sabés si tiene web, para cuándo la quiere y
   cuántos consultorios maneja.
   ═══════════════════════════════════════════════════════════ */

type Opcion = {
  id: string;
  texto: string;
  /* La devolución que aparece debajo después de elegir. */
  eco: string;
  /* Si es false, el prospecto no entra en el servicio de USD 500. */
  sirve?: boolean;
};

type Paso = {
  clave: string;
  pregunta: string;
  ayuda?: string;
  opciones: Opcion[];
};

const PASOS: Paso[] = [
  {
    clave: "web",
    pregunta: "¿Tu consultorio ya tiene página web?",
    opciones: [
      {
        id: "no",
        texto: "No, todavía no",
        eco: "Cuando alguien busca un odontólogo en su zona y no aparecés, el turno se lo lleva otro consultorio.",
      },
      {
        id: "vieja",
        texto: "Sí, pero está vieja",
        eco: "Una web desactualizada trabaja en contra: el paciente asume que el consultorio está igual.",
      },
      {
        id: "anda",
        texto: "Sí, y funciona bien",
        eco: "Entonces no somos lo que necesitás. Igual te la miramos gratis y te decimos qué le falta.",
        sirve: false,
      },
    ],
  },
  {
    clave: "turnos",
    pregunta: "¿Cómo sacan turno tus pacientes hoy?",
    opciones: [
      {
        id: "llaman",
        texto: "Me llaman por teléfono",
        eco: "Cada llamada perdida es un turno perdido. Con la web te escriben cuando pueden, no cuando atendés.",
      },
      {
        id: "insta",
        texto: "Por Instagram o WhatsApp",
        eco: "Ya te escriben. La web es lo que hace que te encuentren los que todavía no te siguen.",
      },
      {
        id: "mostrador",
        texto: "Vienen al consultorio",
        eco: "Estás dependiendo del que ya pasa por la puerta. La web te trae al que te busca en Google.",
      },
    ],
  },
  {
    clave: "cuando",
    pregunta: "¿Para cuándo la necesitás online?",
    opciones: [
      {
        id: "ya",
        texto: "Cuanto antes",
        eco: "Si mandás el material hoy, el primer boceto lo ves en 72 horas.",
      },
      {
        id: "mes",
        texto: "Este mes",
        eco: "Entra cómodo. El plazo son siete días desde que mandás logo y fotos.",
      },
      {
        id: "viendo",
        texto: "Estoy averiguando",
        eco: "Sin problema. Te pasamos el precio y los tiempos, y decidís cuando quieras.",
      },
    ],
  },
];

const TOTAL = PASOS.length;

export function Califica() {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, Opcion>>({});
  const [nombre, setNombre] = useState("");

  const actual = PASOS[paso];
  const terminado = paso >= TOTAL;
  const elegidas = PASOS.map((p) => respuestas[p.clave]).filter(Boolean);
  const califica = elegidas.every((o) => o.sirve !== false);
  const ultimoEco = elegidas.length ? elegidas[elegidas.length - 1].eco : null;

  function responder(op: Opcion) {
    setRespuestas((r) => ({ ...r, [actual.clave]: op }));
    setPaso((p) => p + 1);
    const w = window as unknown as { fbq?: (...a: unknown[]) => void };
    if (typeof w.fbq === "function") {
      w.fbq("trackCustom", "PasoCalificador", { paso: paso + 1, respuesta: op.id });
    }
  }

  function volver() {
    setPaso((p) => Math.max(0, p - 1));
  }

  function mensajeFinal() {
    const l = [
      nombre.trim() ? `Hola! Soy ${nombre.trim()}.` : "Hola!",
      califica
        ? "Quiero mi web en 7 días. Te paso lo que respondí:"
        : "Quiero que miren mi web actual. Te paso lo que respondí:",
      "",
      `· Web: ${respuestas.web?.texto ?? "-"}`,
      `· Turnos: ${respuestas.turnos?.texto ?? "-"}`,
      `· Plazo: ${respuestas.cuando?.texto ?? "-"}`,
    ];
    return l.join("\n");
  }

  function alEnviar() {
    const w = window as unknown as { fbq?: (...a: unknown[]) => void };
    if (typeof w.fbq === "function") {
      w.fbq("track", "Lead", { califica, nombre: !!nombre.trim() });
    }
  }

  return (
    <div className="flex w-full max-w-[38rem] flex-col gap-7">
      {/* Avance: rayas, no puntitos. Dice cuánto falta de un vistazo. */}
      <div className="flex items-center gap-2.5">
        {PASOS.map((p, i) => (
          <span
            key={p.clave}
            className={`h-[3px] flex-1 transition-colors duration-300 ${
              i < paso ? "bg-ink" : i === paso ? "bg-ink/45" : "bg-ink/15"
            }`}
          />
        ))}
        <span className="mono ml-2 !text-[11px] tabular-nums text-ink-soft">
          {Math.min(paso + 1, TOTAL)}/{TOTAL}
        </span>
      </div>

      {/* Sin AnimatePresence ni mode="wait": la pregunta se cambia al
          instante. Si dependiera de que termine una animación de salida,
          un frame perdido dejaría al lead en una pantalla muerta. Y en un
          calificador el cambio instantáneo además se siente más rápido. */}
      {!terminado ? (
        <div key={actual.clave} className="flex flex-col gap-6">
            <h1 className="disp text-[clamp(28px,6vw,46px)] leading-[1.04] tracking-[-0.028em] text-balance">
              {actual.pregunta}
            </h1>

            <div className="flex flex-col gap-2.5">
              {actual.opciones.map((op) => (
                <button
                  key={op.id}
                  type="button"
                  onClick={() => responder(op)}
                  className="group flex min-h-[60px] w-full items-center justify-between gap-4 border border-ink/30 px-5 py-4 text-left text-[16px] font-medium transition-colors hover:border-ink hover:bg-ink hover:text-bone sm:text-[17px]"
                >
                  {op.texto}
                  <svg
                    width="16" height="13" viewBox="0 0 16 13" fill="none"
                    className="shrink-0 -translate-x-1 opacity-40 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <path d="M1 6.5h13M9.5 1.5 14.5 6.5l-5 5" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </button>
              ))}
            </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
            <h1 className="disp text-[clamp(28px,6vw,46px)] leading-[1.04] tracking-[-0.028em] text-balance">
              {califica ? "Listo. ¿Cómo te llamás?" : "Te la miramos igual"}
            </h1>

            <p className="text-[15.5px] leading-relaxed text-ink-soft">
              {califica
                ? "Te escribimos por WhatsApp con el precio cerrado y los tiempos. Sin llamadas ni reuniones."
                : "Te decimos qué le falta a tu web actual, gratis y sin vueltas. Si después querés una nueva, hablamos."}
            </p>

            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              autoComplete="name"
              className="min-h-[60px] w-full border border-ink/30 bg-transparent px-5 text-[17px] outline-none transition-colors placeholder:text-ink-soft/60 focus:border-ink"
            />

            <a
              href={wa(mensajeFinal())}
              target="_blank"
              rel="noopener"
              onClick={alEnviar}
              className="btn min-h-[60px] justify-center text-[16px]"
            >
              {califica ? "Pedir mi web por WhatsApp" : "Que me la revisen"}
              <svg className="arw" width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden="true">
                <path d="M1 6h12M9 1.5 13.5 6 9 10.5" stroke="currentColor" strokeWidth="2" />
              </svg>
            </a>
        </div>
      )}

      {/* El eco de la última respuesta: acá está la persuasión. */}
      {/* El eco es contenido complementario y se renderiza visible:
          nada acá puede depender de que corra una animación. */}
      <div className="min-h-[3.2rem]">
        {ultimoEco && !terminado && (
          <p
            key={ultimoEco}
            className="border-l border-ink/30 pl-4 text-[14.5px] leading-snug text-ink-soft"
          >
            {ultimoEco}
          </p>
        )}
      </div>

      {paso > 0 && !terminado && (
        <button
          type="button"
          onClick={volver}
          className="mono self-start !text-[11px] text-ink-soft underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          Volver
        </button>
      )}
    </div>
  );
}
