"use client";

import { useEffect, useRef, useState } from "react";
import { wa } from "@/lib/site";
import { leerRubro, type Rubro } from "@/lib/rubros";

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

function armarPasos(r: Rubro): Paso[] {
  return [
    {
      /* Abre con una escena, no con un trámite. "¿Tenés web?" es un
         campo de formulario; esto es algo que el dueño ya se preguntó. */
      clave: "google",
      pregunta: "¿Qué pasa hoy si alguien te busca en Google?",
      opciones: [
        {
          id: "nada",
          texto: "No aparezco",
          eco: "Es el problema más caro que tenés y el más barato de arreglar.",
        },
        {
          id: "insta",
          texto: "Aparece mi Instagram",
          eco: "Instagram te muestra. Una web te explica: qué hacés, cuánto sale y cómo contactarte.",
        },
        {
          id: "vieja",
          texto: "Aparece mi web, pero está vieja",
          eco: `Y se nota. El que la abre asume que el ${r.local} está igual de desactualizado.`,
        },
        {
          id: "bien",
          texto: "Aparece mi web y está bien",
          eco: "Entonces no somos lo que necesitás. Si querés te la miramos igual, gratis.",
          sirve: false,
        },
      ],
    },
    {
      /* El momento de la cuenta. No se la hacemos nosotros: elige él
         el número y el eco solo lo termina de decir en voz alta. */
      clave: "cuantos",
      pregunta: `¿Cuántos ${r.cliente} nuevos por mes harían que valga la pena?`,
      opciones: [
        {
          id: "pocos",
          texto: "Con dos o tres ya está",
          eco: "Dos clientes nuevos y la web ya se pagó. De ahí en adelante sigue trabajando sin costo.",
        },
        {
          id: "medio",
          texto: "Unos cinco",
          eco: "Cinco por mes son sesenta al año. La web se paga una sola vez.",
        },
        {
          id: "muchos",
          texto: "Diez o más",
          eco: "Para ese volumen la web deja de ser un gasto y pasa a ser infraestructura.",
        },
      ],
    },
    {
      /* La fricción del proceso de siempre, contada por él. */
      clave: "presupuesto",
      pregunta: "¿Alguna vez pediste presupuesto para una web?",
      opciones: [
        {
          id: "llamada",
          texto: "Sí, y me hicieron agendar una llamada",
          eco: "Y en la llamada tampoco te dijeron el precio. Acá ya lo sabés: USD 500.",
        },
        {
          id: "fantasma",
          texto: "Sí, pero nunca me contestaron",
          eco: "Nos lo dicen seguido. Es la parte del rubro que peor funciona.",
        },
        {
          id: "primera",
          texto: "No, es la primera vez",
          eco: "Mejor. Te ahorrás la parte fea: acá el precio está publicado y no hay reunión.",
        },
      ],
    },
    {
      /* Cierre operativo: qué pasa a partir de ahora. */
      clave: "cuando",
      pregunta: "¿Para cuándo la necesitás online?",
      opciones: [
        {
          id: "ya",
          texto: "Cuanto antes",
          eco: "Mandás logo y fotos hoy, y el jueves estás mirando tu web en el celular.",
        },
        {
          id: "mes",
          texto: "Este mes",
          eco: "Entra cómodo. Son siete días desde que mandás el material, no desde que pagás.",
        },
        {
          id: "viendo",
          texto: "Estoy averiguando",
          eco: "Está bien. Te dejamos el precio y los tiempos por escrito y lo pensás.",
        },
      ],
    },
  ];
}

export function Califica() {
  /* El rubro sale de la URL (?r=odontologia) y se lee despues de
     montar: asi el HTML prerenderizado trae la version generica y
     Google nunca ve una variante a medias. */
  const [{ clave: rubroClave, rubro }, setRubro] = useState(() => leerRubro(null));
  useEffect(() => {
    setRubro(leerRubro(new URLSearchParams(location.search).get("r")));
  }, []);

  const PASOS = armarPasos(rubro);
  const TOTAL = PASOS.length;

  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, Opcion>>({});
  const [nombre, setNombre] = useState("");
  /* La opcion recien tocada. Se muestra marcada con su eco debajo
     durante un momento y despues avanza sola: asi la reaccion queda
     pegada a la respuesta y no debajo de la pregunta siguiente. */
  const [elegida, setElegida] = useState<Opcion | null>(null);
  const reloj = useRef<number | null>(null);

  const actual = PASOS[paso];
  const terminado = paso >= TOTAL;
  const elegidas = PASOS.map((p) => respuestas[p.clave]).filter(Boolean);
  const califica = elegidas.every((o) => o.sirve !== false);
  useEffect(() => () => { if (reloj.current) window.clearTimeout(reloj.current); }, []);

  function avanzar(op: Opcion) {
    if (reloj.current) window.clearTimeout(reloj.current);
    reloj.current = null;
    setRespuestas((r) => ({ ...r, [actual.clave]: op }));
    setElegida(null);
    setPaso((p) => p + 1);
  }

  function responder(op: Opcion) {
    if (elegida) return avanzar(elegida);
    setElegida(op);
    /* setTimeout, no requestAnimationFrame: si el navegador deja de
       componer cuadros esto igual se dispara y nadie queda trabado. */
    reloj.current = window.setTimeout(() => avanzar(op), 1250);
    const w = window as unknown as { fbq?: (...a: unknown[]) => void };
    if (typeof w.fbq === "function") {
      w.fbq("trackCustom", "PasoCalificador", {
        paso: paso + 1,
        respuesta: op.id,
        rubro: rubroClave,
      });
    }
  }

  function volver() {
    if (reloj.current) window.clearTimeout(reloj.current);
    setElegida(null);
    setPaso((p) => Math.max(0, p - 1));
  }

  function mensajeFinal() {
    const NL = String.fromCharCode(10);
    const datos = [
      `· En Google: ${respuestas.google?.texto ?? "-"}`,
      `· Le alcanzaría con: ${respuestas.cuantos?.texto ?? "-"}`,
      `· Presupuestó antes: ${respuestas.presupuesto?.texto ?? "-"}`,
      `· Plazo: ${respuestas.cuando?.texto ?? "-"}`,
    ];
    if (rubroClave !== "general") datos.push(`· Rubro: ${rubroClave}`);

    return [
      nombre.trim() ? `Hola! Soy ${nombre.trim()}.` : "Hola!",
      califica
        ? "Quiero mi web en 7 días. Te paso lo que respondí:"
        : "Quiero que miren mi web actual. Te paso lo que respondí:",
      "",
      ...datos,
    ].join(NL);
  }

  function alEnviar() {
    const w = window as unknown as { fbq?: (...a: unknown[]) => void };
    if (typeof w.fbq === "function") {
      w.fbq("track", "Lead", { califica, rubro: rubroClave, nombre: !!nombre.trim() });
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
              {actual.opciones.map((op) => {
                const esta = elegida?.id === op.id;
                const otra = !!elegida && !esta;
                return (
                <button
                  key={op.id}
                  type="button"
                  onClick={() => responder(op)}
                  aria-pressed={esta}
                  /* Sin transicion cuando ya hay una elegida: marcar cual
                     tocaste es informacion de estado y tiene que verse al
                     instante, no cuando termine una animacion. El hover si
                     transiciona, porque eso si es adorno. */
                  className={`group flex min-h-[58px] w-full items-center justify-between gap-4 border px-5 py-3.5 text-left text-[16px] font-medium sm:text-[17px] ${
                    esta
                      ? "border-ink bg-ink text-bone"
                      : otra
                        ? "border-ink/12 text-ink/30"
                        : "border-ink/30 transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-bone"
                  }`}
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
                );
              })}
            </div>

            {/* El eco, pegado a la respuesta que lo provoco. El alto
                esta reservado siempre para que nada salte. */}
            <div className="min-h-[3.8rem]">
              {elegida && (
                <div className="border-l-2 border-ink pl-4">
                  <p className="text-[15px] leading-snug">{elegida.eco}</p>
                  {/* La pausa avanza sola, pero el navegador puede demorar
                      el timer (pestaña en segundo plano, ahorro de batería).
                      Este boton hace que la espera sea explicita y da salida
                      inmediata si tarda. */}
                  <button
                    type="button"
                    onClick={() => avanzar(elegida)}
                    className="mono mt-2 !text-[11px] text-ink-soft underline underline-offset-4 transition-opacity hover:opacity-70"
                  >
                    Seguir
                  </button>
                </div>
              )}
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
