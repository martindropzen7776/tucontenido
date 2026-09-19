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
          completa: en móvil eso bajaba a 3 cuadros por segundo.
          En computadora ocupa la columna derecha, que queda libre: el
          precio no va arriba porque hay dos webs y se comparan en la
          sección de precios. */}
      <Saturno className="-z-10 opacity-80
                          -right-[16%] top-[28px] h-[min(90vw,400px)] w-[min(90vw,400px)]
                          lg:right-[2%] lg:top-1/2 lg:h-[min(46vw,620px)] lg:w-[min(46vw,620px)]
                          lg:-translate-y-1/2 lg:opacity-100" />

      <div className="order-1 flex flex-col">
        {/* Sin rótulo arriba. El titular no necesita que le avisen
            que es el titular, y ninguna palabra va resaltada: la
            frase entera es la promesa. */}
        <h1 className="disp h1 max-w-[13ch]">Tu web lista en 7 días</h1>

        <p className="lede mt-[clamp(26px,3.4vw,38px)]">
          Nos escribís por WhatsApp y hacemos una llamada corta para conocernos,
          así sabés con quién vas a trabajar antes de pagar. Sin briefs de cuarenta
          preguntas ni reuniones para coordinar reuniones.{" "}
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
            Ver ejemplos
          </a>
        </div>

        <a
          href="#reservas"
          className="mt-5 self-start text-[15px] text-ink-soft underline underline-offset-4 transition-colors hover:text-ink"
        >
          ¿Trabajás con turnos? Mirá la web con reservas
        </a>

        <div className="mt-[clamp(38px,5.5vw,60px)] max-w-[30rem]">
          <Dato valor={7} etiqueta="Días de entrega" detalle="Desde que mandás el material" />
          <Dato valor={72} sufijo="h" etiqueta="Primer boceto" detalle="La web entera, navegable" />
          <Dato valor={100} sufijo="%" etiqueta="A tu nombre" detalle="Se transfiere a tu cuenta" />
        </div>
      </div>
    </header>
  );
}
