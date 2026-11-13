"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Aparece } from "./aparece";

/* El estado de la campaña de siempre: cicla para siempre y nunca
   dice cuánto vendiste. */
const LETANIA = [
  "En fase de aprendizaje",
  "Optimizando",
  "Esperando más datos",
  "Probando un público nuevo",
  "Subiendo el presupuesto",
  "Reporte de alcance enviado",
];

const PASOS_ELLOS = [
  "Te reportan alcance, impresiones y me gusta",
  "La cuenta publicitaria queda a nombre de la agencia",
  "Contrato mínimo de seis meses",
  "Promocionan publicaciones y lo llaman estrategia",
  "Nadie te dice cuánto te costó cada venta",
  "Si cortás, perdés el historial y los públicos",
];

/* Tres compromisos, no tres pasos: es lo que nos separa de la
   agencia de siempre. */
const PASOS_NOSOTROS = [
  "La cuenta, el píxel y las audiencias quedan a tu nombre",
  "Cada mes sabés cuánto te costó cada consulta o venta",
  "Mes a mes, sin contrato de permanencia",
];

/* El texto más largo reserva el ancho para que la caja no salte. */
const LETANIA_LARGA = LETANIA.reduce((a, b) => (b.length > a.length ? b : a));

/* El estado de la campaña de la competencia cicla para siempre y nunca
   llega a "vendiste". Ese es el argumento de la sección, no la copy. */
function Letania() {
  const [i, setI] = useState(0);
  const [antes, setAntes] = useState<number | null>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      setI((v) => {
        setAntes(v);
        return (v + 1) % LETANIA.length;
      });
    }, 1900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative mt-auto border border-dashed border-ink/20 p-[16px] sm:p-[18px_20px]">
      <div className="mono !text-[11px] !tracking-[0.14em] text-ink/35">Estado de tu campaña</div>
      <div className="relative mt-3 h-6">
        {/* Reserva el ancho del texto más largo para que la caja no salte. */}
        <span className="invisible block whitespace-nowrap text-[15px]">
          {LETANIA_LARGA}
        </span>
        {/* El que se va sube y se apaga; el que llega sube desde abajo
            (animaciones letania-sale / letania-entra en globals.css). */}
        {antes !== null && (
          <span key={`s${antes}-${i}`} aria-hidden="true" className="letania-sale absolute inset-x-0 top-0 block whitespace-nowrap text-[15px] text-ink/40">
            {LETANIA[antes]}
          </span>
        )}
        <span key={i} className={`${antes !== null ? "letania-entra " : ""}absolute inset-x-0 top-0 block whitespace-nowrap text-[15px] text-ink/40`}>
          {LETANIA[i]}
        </span>
      </div>
    </div>
  );
}

/* El tilde se dibuja al entrar en pantalla: el trazo sale de la
   longitud real del path, no de un número puesto a mano. */
function Tilde() {
  const ref = useRef<HTMLDivElement>(null);
  /* sinJs -> espera -> visto: sin JS (o con "reducir movimiento") el
     tilde queda dibujado; solo se esconde cuando el JS ya corrió. */
  const [fase, setFase] = useState<"sinJs" | "espera" | "visto">("sinJs");

  useLayoutEffect(() => {
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) setFase("espera");
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setFase((f) => (f === "espera" ? "visto" : f));
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-auto flex items-center gap-4 border-2 border-bone bg-bone p-4 text-ink sm:p-[18px_20px]">
      <svg
        viewBox="0 0 48 48"
        width="40"
        height="40"
        fill="none"
        className={`tilde shrink-0 overflow-visible ${fase === "espera" ? "tilde--espera" : ""}`}
        aria-hidden="true"
      >
        <path
          d="M13 24.5 L20.5 32 L35 16"
          pathLength={1}
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        <strong className="disp block text-[17px] leading-tight tracking-[-0.02em] sm:text-[19px]">
          Cada peso, con su resultado
        </strong>
        <span className="text-[13px] text-ink/60">Un reporte por mes, en una página</span>
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
            Otros te reportan
            <br />
            me gusta
          </h2>
        </Aparece>
        <Aparece delay={0.05}>
          <p className="lede">
            Alcance, impresiones y seguidores quedan lindos en un reporte, pero
            no pagan el alquiler. Nosotros medimos lo que importa: cuánto te
            cuesta cada cliente.
          </p>
        </Aparece>
      </div>

      <Aparece delay={0.08}>
        <div className="grid border-2 border-ink/25 min-[900px]:grid-cols-2">
          <div className="flex flex-col vidrio p-5 sm:p-[clamp(28px,3.4vw,48px)]">
            <div className="mono !text-[11px] text-ink-soft">En otros lados</div>
            <div className="disp mb-6 mt-2.5 text-[clamp(26px,3.4vw,40px)] leading-none tracking-[-0.03em]">
              Mucho reporte, poca venta
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

          <div className="flex flex-col border-t-2 border-ink vidrio-claro p-5 text-bone min-[900px]:border-l-2 min-[900px]:border-t-0 sm:p-[clamp(28px,3.4vw,48px)]">
            <div className="mono !text-[11px] text-bone/55">Acá</div>
            <div className="disp mb-6 mt-2.5 text-[clamp(26px,3.4vw,40px)] leading-none tracking-[-0.03em]">
              Tres cosas que no se negocian
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
