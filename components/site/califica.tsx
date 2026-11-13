"use client";

import { useEffect, useRef, useState } from "react";
import { wa } from "@/lib/site";
import { leerRubro, type Rubro } from "@/lib/rubros";
import { guardarLead } from "@/lib/lead";

/* ═══════════════════════════════════════════════════════════
   Calificador.

   Una pantalla, sin scroll, una pregunta por vez. Cada respuesta
   devuelve una frase corta que reencuadra: eso es lo persuasivo,
   no el botón.

   Al final arma el mensaje de WhatsApp con las respuestas ya
   adentro, así la conversación no arranca de cero: cuando el
   lead escribe, ya sabés dónde anuncia hoy, quién se lo maneja,
   qué busca, si tiene presupuesto para anuncios y si quiere la
   llamada de diagnóstico.

   Desde el 13/11/2026 califica para la agencia (Meta y Google).
   La versión para la web de $500.000 está en el historial de git.
   ═══════════════════════════════════════════════════════════ */

type Opcion = {
  id: string;
  texto: string;
  /* La devolución que aparece debajo después de elegir. */
  eco: string;
  /* Si es false, el prospecto no entra en el servicio. */
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
      /* Dónde está hoy. Ninguna respuesta lo deja afuera: el que nunca
         anunció es tan cliente como el que ya invierte. */
      clave: "donde",
      pregunta: "¿Hoy hacés publicidad paga?",
      opciones: [
        {
          id: "meta",
          texto: "Sí, en Facebook e Instagram",
          eco: `Bien. Falta ver si Google te puede traer a los ${r.cliente} que ya te están buscando.`,
        },
        {
          id: "google",
          texto: "Sí, en Google",
          eco: "Bien. Falta ver si Meta te puede traer a los que todavía no saben que te necesitan.",
        },
        {
          id: "ambas",
          texto: "Sí, en las dos",
          eco: "Entonces lo primero es ver cuánto te cuesta cada cliente en cada una. Ahí suele estar la plata perdida.",
        },
        {
          id: "nunca",
          texto: "No, nunca hice",
          eco: "Mejor: arrancás con la medición bien hecha desde el primer día, que es lo que casi nadie tiene.",
        },
      ],
    },
    {
      /* Quién lo maneja. Sale de acá cómo arranca la conversación. */
      clave: "quien",
      pregunta: "¿Quién maneja los anuncios?",
      opciones: [
        {
          id: "yo",
          texto: "Yo, con el botón de promocionar",
          eco: "Promocionar sirve para que te vean. Para que te compren hace falta una campaña armada con ese objetivo.",
        },
        {
          id: "agencia",
          texto: "Una agencia o un freelancer",
          eco: "Entonces la pregunta es si te dicen cuánto te cuesta cada venta. Si no, eso es lo primero que miramos.",
        },
        {
          id: "nadie",
          texto: "Nadie, por ahora",
          eco: "Entonces partimos de cero, sin vicios que desarmar.",
        },
      ],
    },
    {
      /* El objetivo. Define plataforma, campaña y qué se mide. */
      clave: "objetivo",
      pregunta: "¿Qué querés conseguir con la publicidad?",
      opciones: [
        {
          id: "ventas",
          texto: "Ventas en mi tienda online",
          eco: "Se mide en ventas y en lo que vuelve por cada peso invertido. Nada de alcance.",
        },
        {
          id: "consultas",
          texto: "Consultas por WhatsApp",
          eco: `Se puede llevar a los ${r.cliente} directo a tu WhatsApp, sin pasar por ninguna página.`,
        },
        {
          id: "local",
          texto: `Más ${r.cliente} en mi ${r.local}`,
          eco: `Ahí Google Maps y los anuncios por zona trabajan juntos: te ven los que están cerca.`,
        },
        {
          id: "marca",
          texto: "Que me conozcan",
          eco: "Vale, pero lo vamos a medir igual: cuántos de los que te conocieron terminaron escribiendo.",
        },
      ],
    },
    {
      /* La pregunta que más reencuadra: casi nadie lo sabe. */
      clave: "costo",
      pregunta: "¿Sabés cuánto te cuesta hoy conseguir un cliente?",
      opciones: [
        {
          id: "si",
          texto: "Sí, lo tengo medido",
          eco: "Sos de los pocos. Con ese número se puede decidir cuánto escalar sin perder plata.",
        },
        {
          id: "masomenos",
          texto: "Más o menos",
          eco: "Con un más o menos no se puede decidir cuánto invertir. El diagnóstico te da el número.",
        },
        {
          id: "no",
          texto: "No, ni idea",
          eco: "Es lo más común, y es lo primero que vas a saber cuando trabajemos juntos.",
        },
      ],
    },
    {
      /* El filtro. La inversión en anuncios la paga el cliente directo
         a Meta y Google; sin eso, la gestión no tiene sobre qué
         trabajar. Quien dice que no sale acá: hacerle contestar el
         resto es hacerle perder el tiempo, y meterlo como lead ensucia
         las campañas. */
      clave: "presupuesto",
      pregunta: "¿Tenés un presupuesto mensual para invertir en anuncios?",
      ayuda: "Se le paga directo a Meta y a Google, con tu tarjeta. Nuestros honorarios van aparte.",
      opciones: [
        {
          id: "si",
          texto: "Sí, ya lo tengo definido",
          eco: "Entonces hablamos el mismo idioma. En el diagnóstico vemos cómo repartirlo.",
        },
        {
          id: "definir",
          texto: "Sí, pero no sé cuánto conviene",
          eco: "Es lo más lógico. Te decimos cuánto con números de tu rubro, antes de que gastes un peso.",
        },
        {
          id: "no",
          texto: "No, por ahora no",
          eco: "Entonces frenamos acá.",
          sirve: false,
        },
      ],
    },
    {
      /* La llamada se ofrece, no se exige. Lo que elija viaja en el
         mensaje, así el closer sabe si llamar o seguir por escrito. */
      clave: "llamada",
      pregunta: "¿Hacemos el diagnóstico en una llamada?",
      ayuda: "Son 20 minutos, sin cargo. No es una llamada de venta: te llevás qué está fallando y cuánto conviene invertir.",
      opciones: [
        {
          id: "si",
          texto: "Sí, prefiero hablar",
          eco: "Buenísimo. Te escribimos para coordinar un horario que te quede cómodo.",
        },
        {
          id: "whatsapp",
          texto: "No, sigamos por WhatsApp",
          eco: "Perfecto. Te mandamos el diagnóstico por escrito y seguimos por ahí.",
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

  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, Opcion>>({});
  const PASOS = armarPasos(rubro);
  const TOTAL = PASOS.length;
  const [nombre, setNombre] = useState("");
  /* El nombre es obligatorio: sin él, el closer arranca la conversación
     sin saber a quién le habla. El error aparece recién al intentar
     enviar, no mientras escribe. */
  const [errorNombre, setErrorNombre] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const campoNombre = useRef<HTMLInputElement>(null);
  /* La opcion recien tocada. Se muestra marcada con su eco debajo
     durante un momento y despues avanza sola: asi la reaccion queda
     pegada a la respuesta y no debajo de la pregunta siguiente. */
  const [elegida, setElegida] = useState<Opcion | null>(null);
  /* Si contesta algo que lo deja fuera del servicio, la encuesta
     termina ahi. Hacerle contestar tres preguntas mas a alguien que
     ya sabemos que no entra es hacerle perder el tiempo a los dos.
     Guarda la clave de la pregunta que lo sacó: cada motivo tiene
     su propia pantalla de salida. */
  const [salida, setSalida] = useState<string | null>(null);
  const reloj = useRef<number | null>(null);

  const actual = PASOS[paso];
  const terminado = paso >= TOTAL;
  useEffect(() => () => { if (reloj.current) window.clearTimeout(reloj.current); }, []);

  function avanzar(op: Opcion) {
    if (reloj.current) window.clearTimeout(reloj.current);
    reloj.current = null;
    setRespuestas((r) => ({ ...r, [actual.clave]: op }));
    setElegida(null);
    if (op.sirve === false) {
      setSalida(actual.clave);
      const w = window as unknown as { fbq?: (...a: unknown[]) => void };
      /* Evento propio: estos NO tienen que entrar en la optimizacion
         de las campañas, o Meta va a buscar mas gente como esta. */
      if (typeof w.fbq === "function") {
        w.fbq("trackCustom", "NoCalifica", { motivo: op.id, rubro: rubroClave });
      }
      return;
    }
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

  function reiniciar() {
    if (reloj.current) window.clearTimeout(reloj.current);
    setSalida(null);
    setElegida(null);
    setRespuestas({});
    setPaso(0);
  }

  const quiereLlamada = respuestas.llamada?.id === "si";

  function mensajeFinal() {
    const NL = String.fromCharCode(10);
    const datos = [
      `· Publicidad hoy: ${respuestas.donde?.texto ?? "-"}`,
      `· La maneja: ${respuestas.quien?.texto ?? "-"}`,
      `· Objetivo: ${respuestas.objetivo?.texto ?? "-"}`,
      `· Costo por cliente: ${respuestas.costo?.texto ?? "-"}`,
      `· Presupuesto para anuncios: ${respuestas.presupuesto?.texto ?? "-"}`,
      `· Llamada: ${respuestas.llamada?.texto ?? "-"}`,
    ];
    if (rubroClave !== "general") datos.push(`· Rubro: ${rubroClave}`);

    return [
      nombre.trim() ? `Hola! Soy ${nombre.trim()}.` : "Hola!",
      `Quiero un diagnóstico de mis campañas en Meta y Google${
        quiereLlamada ? " en una llamada" : ""
      }. Te paso lo que respondí:`,
      "",
      ...datos,
    ].join(NL);
  }

  /* El link abre WhatsApp en otra pestaña (o la app, en el celular).
     Esta pestaña, mientras tanto, pasa a /gracias: cuando el
     prospecto vuelve, encuentra qué sigue y un link por si WhatsApp
     no se abrió. Si el nombre falta, no se abre nada. */
  function alEnviar(e: React.MouseEvent<HTMLAnchorElement>) {
    if (nombre.trim().length < 2) {
      e.preventDefault();
      setErrorNombre(true);
      campoNombre.current?.focus();
      return;
    }
    if (enviando) {
      e.preventDefault();
      return;
    }
    setEnviando(true);
    const w = window as unknown as { fbq?: (...a: unknown[]) => void };
    if (typeof w.fbq === "function") {
      w.fbq("track", "Lead", { rubro: rubroClave });
    }
    guardarLead({ link: wa(mensajeFinal()), nombre: nombre.trim(), llamada: quiereLlamada });
    window.setTimeout(() => {
      location.href = "/gracias/";
    }, 700);
  }

  /* El que no califica y escribe igual NO es un Lead: si lo fuera,
     Meta buscaría más gente como él. Va con un evento propio. */
  function alEnviarSalida() {
    const w = window as unknown as { fbq?: (...a: unknown[]) => void };
    if (typeof w.fbq === "function") {
      w.fbq("trackCustom", "ContactoNoCalifica", { motivo: salida, rubro: rubroClave });
    }
  }

  return (
    <div className="flex w-full max-w-[38rem] flex-col gap-7">
      {/* Avance: rayas, no puntitos. Dice cuánto falta de un vistazo. */}
      <div className={`flex items-center gap-2.5 ${salida ? "invisible" : ""}`}>
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
      {salida ? (
        <div className="flex flex-col gap-6">
          <h1 className="disp text-[clamp(28px,6vw,46px)] leading-[1.04] tracking-[-0.028em] text-balance">
            Por ahora no somos para vos
          </h1>

          {/* Una sola salida: sin presupuesto para anuncios, la gestión
              no tiene sobre qué trabajar. */}
          <div className="flex flex-col gap-4 text-[15.5px] leading-relaxed text-ink-soft">
            <p>
              Nuestro trabajo es hacer rendir lo que invertís en Meta y Google.
              Sin inversión en anuncios, pagarnos a nosotros sería gastar por
              gastar, y no te lo vamos a vender.
            </p>
            <p className="text-ink">
              Cuando tengas un presupuesto, escribinos y te decimos con cuánto
              conviene arrancar en tu rubro. Y si tenés una duda hoy, preguntá
              igual: te contestamos.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-1">
            <a
              href={wa("Hola! Hice el cuestionario. Todavía no tengo presupuesto para anuncios, pero tengo una duda:")}
              target="_blank"
              rel="noopener"
              onClick={alEnviarSalida}
              className="btn min-h-[58px] justify-center text-[16px]"
            >
              Escribirles igual
              <svg className="arw" width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden="true">
                <path d="M1 6h12M9 1.5 13.5 6 9 10.5" stroke="currentColor" strokeWidth="2" />
              </svg>
            </a>
            <button
              type="button"
              onClick={reiniciar}
              className="mono self-start !text-[11px] text-ink-soft underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Me equivoqué, volver a empezar
            </button>
          </div>
        </div>
      ) : !terminado ? (
        <div key={actual.clave} className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h1 className="disp text-[clamp(28px,6vw,46px)] leading-[1.04] tracking-[-0.028em] text-balance">
                {actual.pregunta}
              </h1>
              {actual.ayuda && (
                <p className="text-[15px] leading-snug text-ink-soft">{actual.ayuda}</p>
              )}
            </div>

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
              Listo. ¿Cómo te llamás?
            </h1>

            <p className="text-[15.5px] leading-relaxed text-ink-soft">
              {quiereLlamada
                ? "Te escribimos por WhatsApp para coordinar la llamada de diagnóstico en un horario que te quede cómodo."
                : "Te escribimos por WhatsApp y hacemos el diagnóstico por escrito."}
            </p>

            <div className="flex flex-col gap-2">
              <label htmlFor="nombre" className="sr-only">Tu nombre</label>
              <input
                id="nombre"
                ref={campoNombre}
                type="text"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                  if (errorNombre && e.target.value.trim().length >= 2) setErrorNombre(false);
                }}
                placeholder="Tu nombre"
                autoComplete="name"
                required
                aria-invalid={errorNombre}
                aria-describedby={errorNombre ? "error-nombre" : undefined}
                className={`min-h-[60px] w-full border bg-transparent px-5 text-[17px] outline-none transition-colors placeholder:text-ink-soft/60 ${
                  errorNombre ? "border-[#ff7a6b] focus:border-[#ff7a6b]" : "border-ink/30 focus:border-ink"
                }`}
              />
              {errorNombre && (
                <p id="error-nombre" role="alert" className="text-[14px] leading-snug text-[#ff7a6b]">
                  Escribí tu nombre para que sepamos cómo llamarte.
                </p>
              )}
            </div>

            <a
              href={wa(mensajeFinal())}
              target="_blank"
              rel="noopener"
              onClick={alEnviar}
              aria-busy={enviando}
              className={`btn min-h-[60px] justify-center text-[16px] ${enviando ? "pointer-events-none opacity-80" : ""}`}
            >
              {enviando ? (
                <>
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                    aria-hidden="true"
                  />
                  Abriendo WhatsApp…
                </>
              ) : (
                <>
                  Pedir el diagnóstico por WhatsApp
                  <svg className="arw" width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden="true">
                    <path d="M1 6h12M9 1.5 13.5 6 9 10.5" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </>
              )}
            </a>
        </div>
      )}

      {/* El eco de la última respuesta: acá está la persuasión. */}
      {paso > 0 && !terminado && !salida && (
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
