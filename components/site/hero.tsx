"use client";

import { NumberTicker } from "@/components/motion/number-ticker";
import { Magnetic } from "@/components/motion/magnetic";
import { WaLink, Arrow } from "./wa-link";
import { Saturno } from "./saturno";

/* Los datos van en filas con una regla fina entre medio, como un
   remito. En columnas serían tres tarjetas, que es exactamente el
   bloque que delata una página generada. */
function Dato({
  valor,
  sufijo,
  etiqueta,
  detalle,
}: {
  valor: number;
  sufijo?: string;
  etiqueta: string;
  detalle: string;
}) {
  return (
    <div className="flex items-baseline gap-5 border-t border-[var(--rule)] py-4 first:border-t-0 sm:gap-7">
      <div className="disp w-[4.2rem] shrink-0 text-[clamp(28px,4vw,40px)] leading-none tracking-[-0.03em] sm:w-[5.5rem]">
        <NumberTicker value={valor} startOnView />
        {sufijo && <span className="text-[0.5em] text-ink-soft">{sufijo}</span>}
      </div>
      <div className="min-w-0">
        <div className="text-[15px] font-semibold leading-tight">{etiqueta}</div>
        <div className="text-[13.5px] leading-snug text-ink-soft">{detalle}</div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <header
      className="relative isolate overflow-hidden pad-x flex flex-col gap-[clamp(36px,7vw,56px)]
                 pb-[clamp(64px,9vw,96px)] pt-[calc(68px+clamp(44px,8vw,92px))]
                 lg:grid lg:min-h-svh lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]
                 lg:items-center lg:gap-[clamp(40px,6vw,88px)] lg:pb-0"
    >
      {/* Un cuadrado del tamaño de los anillos, no una capa a pantalla
          completa: en móvil eso bajaba a 3 cuadros por segundo. */}
      <Saturno className="-z-10 opacity-70
                          -right-[26%] top-[3%] h-[min(86vw,380px)] w-[min(86vw,380px)]
                          lg:right-[2%] lg:top-1/2 lg:h-[min(46vw,620px)] lg:w-[min(46vw,620px)]
                          lg:-translate-y-1/2 lg:opacity-90" />

      <div className="order-1 flex flex-col">
        {/* Sin rótulo arriba. El titular no necesita que le avisen
            que es el titular, y ninguna palabra va resaltada: la
            frase entera es la promesa. */}
        <h1 className="disp h1 max-w-[13ch]">Tu web lista en 7 días</h1>

        <p className="lede mt-[clamp(26px,3.4vw,38px)]">
          Nos escribís por WhatsApp, mandás el logo y listo. Sin llamada de venta,
          sin reuniones para coordinar reuniones, sin briefs de cuarenta preguntas.{" "}
          <b className="font-semibold text-ink">En 72 horas ya estás viendo tu web.</b>
        </p>

        <div className="mt-[clamp(32px,4.4vw,46px)] flex flex-wrap gap-3.5">
          <Magnetic strength={0.28}>
            <WaLink msg="Hola! Quiero mi web en 7 días. ¿Cómo arrancamos?" className="btn">
              Pedir mi web
              <Arrow />
            </WaLink>
          </Magnetic>
          <a href="#trabajos" className="btn btn-line">
            Ver trabajos
          </a>
        </div>

        <div className="mt-[clamp(38px,5.5vw,60px)] max-w-[30rem]">
          <Dato valor={7} etiqueta="Días de entrega" detalle="Desde que mandás el material" />
          <Dato valor={72} sufijo="h" etiqueta="Primer boceto" detalle="La web entera, navegable" />
          <Dato valor={100} sufijo="%" etiqueta="A tu nombre" detalle="Se transfiere a tu cuenta" />
        </div>
      </div>

      <aside className="order-2 self-stretch lg:self-center">
        <Ticket />
      </aside>
    </header>
  );
}

function Fila({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-dashed border-[var(--rule-on-c)] py-[11px] text-sm last:border-b-0">
      <span className="font-medium">{k}</span>
      <span className="text-right text-bone/55">{v}</span>
    </div>
  );
}

function Ticket() {
  return (
    <div className="relative border border-ink bg-ink p-[clamp(24px,3vw,38px)] text-bone">
      <div className="mb-5 flex items-baseline justify-between border-b border-dashed border-[var(--rule-on-c)] pb-4">
        <span className="mono text-bone/45">Presupuesto</span>
        <span className="mono text-bone/45">Nº 001</span>
      </div>
      <Fila k="Diseño a medida" v="Incluido" />
      <Fila k="Hasta 6 secciones" v="Incluido" />
      <Fila k="Textos de venta" v="Incluido" />
      <Fila k="WhatsApp y Google" v="Incluido" />
      <Fila k="Dos rondas de ajustes" v="Incluido" />
      <Fila k="Cuota de mantenimiento" v="$0" />
      <div className="mt-5 flex items-baseline justify-between border-t border-bone pt-[18px]">
        <span className="mono">Total</span>
        <span className="disp text-[clamp(32px,4vw,46px)] leading-none tracking-[-0.03em]">
          USD 500
        </span>
      </div>
    </div>
  );
}
