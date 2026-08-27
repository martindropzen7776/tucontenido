"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Aparece } from "./aparece";

const LETANIA = [
  "Brief de 40 preguntas",
  "Llamada de 45 minutos",
  "Reunión de seguimiento",
  "Presupuesto en 5 días",
  "Contrato y 50% de seña",
  "Entrega en 6 semanas",
];

const PASOS_ELLOS = [
  "Completás un brief de cuarenta preguntas",
  "Agendás una llamada de descubrimiento",
  "Esperás el presupuesto cinco días hábiles",
  "Otra reunión para revisar el presupuesto",
  "Firmás contrato y adelantás la seña",
  "Recién ahí empiezan a diseñar",
];

const PASOS_NOSOTROS = [
  "Nos escribís por WhatsApp y te decimos el precio en el momento",
  "Mandás el logo y las fotos que tengas",
];

/* El estado del proyecto de la competencia cicla para siempre y nunca
   llega a "entregado". Ese es el argumento de la sección, no la copy. */
function Letania() {
  const [i, setI] = useState(0);
  const menos = useReducedMotion();

  useEffect(() => {
    if (menos) return;
    const t = setInterval(() => setI((v) => (v + 1) % LETANIA.length), 1900);
    return () => clearInterval(t);
  }, [menos]);

  return (
    <div className="relative mt-auto border border-dashed border-ink/20 p-[16px] sm:p-[18px_20px]">
      <div className="mono !text-[11px] !tracking-[0.14em] text-ink/35">Estado del proyecto</div>
      <div className="relative mt-3 h-6">
        {/* Reserva el ancho del texto más largo para que la caja no salte. */}
        <span className="invisible block whitespace-nowrap text-[15px]">
          Contrato y 50% de seña
        </span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={i}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 block whitespace-nowrap text-[15px] text-ink/40"
          >
            {LETANIA[i]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* El tilde se dibuja al entrar en pantalla: el trazo sale de la
   longitud real del path, no de un número puesto a mano. */
function Tilde() {
  const ref = useRef<HTMLDivElement>(null);
  const visto = useInView(ref, { once: true, amount: 0.6 });
  const menos = useReducedMotion();

  return (
    <div ref={ref} className="mt-auto flex items-center gap-4 border-2 border-bone bg-bone p-4 text-ink sm:p-[18px_20px]">
      <motion.svg
        viewBox="0 0 48 48"
        width="40"
        height="40"
        fill="none"
        className="shrink-0 overflow-visible"
        initial={menos ? false : { opacity: 0, rotate: 80, y: 40 }}
        animate={visto || menos ? { opacity: 1, rotate: 0, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.34, 1.35, 0.64, 1] }}
        aria-hidden="true"
      >
        <motion.path
          d="M13 24.5 L20.5 32 L35 16"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={menos ? false : { pathLength: 0 }}
          animate={visto || menos ? { pathLength: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.svg>
      <span>
        <strong className="disp block text-[17px] leading-tight tracking-[-0.02em] sm:text-[19px]">
          En 72 horas ves tu web
        </strong>
        <span className="text-[13px] text-ink/60">Entera, navegable, desde tu celular</span>
      </span>
    </div>
  );
}

export function Diff() {
  return (
    <section id="diferencia" className="sec pad-x">
      <div className="mb-[clamp(44px,6vw,76px)] grid items-end gap-[clamp(24px,5vw,72px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)]">
        <Aparece>
          <h2 className="disp h2">
            Otros todavía te están
            <br />
            pidiendo cosas
          </h2>
        </Aparece>
        <Aparece delay={0.05}>
          <p className="lede">
            No somos más rápidos porque trabajemos apurados. Somos más rápidos
            porque sacamos del medio todo lo que no hace falta.
          </p>
        </Aparece>
      </div>

      <Aparece delay={0.08}>
        <div className="grid border-2 border-ink/25 min-[900px]:grid-cols-2">
          <div className="flex flex-col bg-bone-2 p-5 sm:p-[clamp(28px,3.4vw,48px)]">
            <div className="mono !text-[11px] text-ink-soft">En otros lados</div>
            <div className="disp mb-6 mt-2.5 text-[clamp(26px,3.4vw,40px)] leading-none tracking-[-0.03em]">
              Seis pasos antes de ver un solo diseño
            </div>
            <ul className="mb-6 flex flex-col">
              {PASOS_ELLOS.map((p, n) => (
                <li
                  key={p}
                  className="flex items-baseline gap-3.5 border-b border-dashed border-ink/14 py-3 text-[14.5px] leading-snug text-ink-soft last:border-b-0 sm:text-[15px]"
                >
                  <span className="mono !text-[11px] !tracking-normal shrink-0 opacity-55">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <Letania />
          </div>

          <div className="flex flex-col border-t-2 border-ink bg-ink p-5 text-bone min-[900px]:border-l-2 min-[900px]:border-t-0 sm:p-[clamp(28px,3.4vw,48px)]">
            <div className="mono !text-[11px] text-bone/55">Acá</div>
            <div className="disp mb-6 mt-2.5 text-[clamp(26px,3.4vw,40px)] leading-none tracking-[-0.03em]">
              Dos mensajes y a diseñar
            </div>
            <ul className="mb-6 flex flex-col">
              {PASOS_NOSOTROS.map((p, n) => (
                <li
                  key={p}
                  className="flex items-baseline gap-3.5 border-b border-dashed border-bone/22 py-3 text-[14.5px] leading-snug last:border-b-0 sm:text-[15px]"
                >
                  <span className="mono !text-[11px] !tracking-normal shrink-0 opacity-55">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <Tilde />
          </div>
        </div>
      </Aparece>
    </section>
  );
}
