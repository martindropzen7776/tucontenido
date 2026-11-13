"use client";

import { Magnetic } from "@/components/motion/magnetic";
import { WaLink, Arrow } from "./wa-link";
import { Saturno } from "./saturno";

/* El mensaje con el que arrancan los botones de la agencia. */
export const MSG_AGENCIA = "Hola! Quiero un diagnóstico de mis campañas en Meta y Google.";

function Fila({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-dashed border-[var(--rule-on-c)] py-[11px] text-sm last:border-b-0">
      <span className="font-medium">{k}</span>
      <span className="shrink-0 text-right text-bone/55">{v}</span>
    </div>
  );
}

/* El remito del hero dice qué te llevás por escribir: el diagnóstico.
   Es la puerta de entrada, así que va arriba, donde la web tenía el
   precio. Sin cifras de resultados ni testimonios: si hay números o
   clientes reales, van con nombre y con permiso; inventados no. */
function Diagnostico() {
  return (
    <div className="relative border border-ink vidrio-claro p-[clamp(24px,3vw,38px)] text-bone">
      <div className="mb-5 flex items-baseline justify-between border-b border-dashed border-[var(--rule-on-c)] pb-4">
        <span className="mono text-bone/45">Diagnóstico</span>
        <span className="mono text-bone/45">Meta · Google</span>
      </div>
      <Fila k="Llamada para conocer tu negocio" v="Incluida" />
      <Fila k="Revisión de tus cuentas publicitarias" v="Incluida" />
      <Fila k="Qué funciona y qué no" v="Incluido" />
      <Fila k="Mirada a tu competencia" v="Incluida" />
      <Fila k="Cuánto invertir y dónde" v="Incluido" />
      <Fila k="Compromiso de contratar" v="Ninguno" />
      <div className="mt-5 flex items-baseline justify-between border-t border-bone pt-[18px]">
        <span className="mono">Costo</span>
        <span className="disp text-[clamp(32px,4vw,46px)] leading-none tracking-[-0.03em]">$0</span>
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
        {/* Sin rótulo arriba y sin palabras resaltadas: la frase entera
            es la promesa. */}
        <h1 className="disp h1 max-w-[13ch]">Publicidad que se mide en ventas</h1>

        <p className="lede mt-[clamp(26px,3.4vw,38px)]">
          Armamos y manejamos tus campañas en <b className="font-semibold text-ink">Meta</b>{" "}
          (Facebook, Instagram y WhatsApp) y en <b className="font-semibold text-ink">Google</b>{" "}
          (Búsqueda, YouTube y Maps). Y las medimos contra lo que vendiste, no contra
          los me gusta.
        </p>

        <div className="mt-[clamp(32px,4.4vw,46px)] flex flex-wrap gap-3.5">
          <Magnetic strength={0.28}>
            <WaLink msg={MSG_AGENCIA} className="btn">
              Pedir un diagnóstico
              <Arrow />
            </WaLink>
          </Magnetic>
          <a href="#servicios" className="btn btn-line">
            Ver servicios
          </a>
        </div>
      </div>

      <aside className="order-2 self-stretch lg:self-center">
        <Diagnostico />
      </aside>
    </header>
  );
}
