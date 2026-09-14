"use client";

import { Magnetic } from "@/components/motion/magnetic";
import { EMAIL } from "@/lib/site";
import { Aparece } from "./aparece";
import { Saturno } from "./saturno";
import { WaLink, Arrow } from "./wa-link";

/* ═══════════════════════════════════════════════════════════
   La página de la agencia (la raíz del dominio).

   Mismo sistema que /web: monocromo, Saturno de fondo, filas
   con regla fina en vez de tarjetas, y un remito en el hero.

   Lo que se sacó de la versión anterior, a propósito: la cinta
   de servicios que se repetía sin fin, el rótulo arriba de cada
   sección, las palabras sueltas resaltadas en el titular, las
   grillas de tarjetas con emoji, y las cifras y testimonios de
   plantilla. Si hay números o clientes reales, van con nombre y
   con permiso; inventados no.
   ═══════════════════════════════════════════════════════════ */

export const MSG_AGENCIA = "Hola! Quiero un diagnóstico de mis campañas.";

/* ══════════ HERO ══════════ */

function Fila({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-dashed border-[var(--rule-on-c)] py-[11px] text-sm last:border-b-0">
      <span className="font-medium">{k}</span>
      <span className="text-right text-bone/55">{v}</span>
    </div>
  );
}

/* El remito del hero dice qué te llevás por escribir: el diagnóstico.
   Es la puerta de entrada, así que va donde en /web va el precio. */
function Diagnostico() {
  return (
    <div className="relative border border-ink vidrio-claro p-[clamp(24px,3vw,38px)] text-bone">
      <div className="mb-5 flex items-baseline justify-between border-b border-dashed border-[var(--rule-on-c)] pb-4">
        <span className="mono text-bone/45">Diagnóstico</span>
        <span className="mono text-bone/45">Nº 001</span>
      </div>
      <Fila k="Llamada para conocer tu negocio" v="Incluida" />
      <Fila k="Revisión de tu cuenta publicitaria" v="Incluida" />
      <Fila k="Qué funciona y qué no" v="Incluido" />
      <Fila k="Mirada a tu competencia" v="Incluida" />
      <Fila k="Compromiso de contratar" v="Ninguno" />
      <div className="mt-5 flex items-baseline justify-between border-t border-bone pt-[18px]">
        <span className="mono">Costo</span>
        <span className="disp text-[clamp(32px,4vw,46px)] leading-none tracking-[-0.03em]">
          $0
        </span>
      </div>
    </div>
  );
}

export function HeroAgencia() {
  return (
    <header
      className="relative isolate overflow-hidden pad-x flex flex-col gap-[clamp(36px,7vw,56px)]
                 pb-[clamp(64px,9vw,96px)] pt-[calc(68px+clamp(44px,8vw,92px))]
                 lg:grid lg:min-h-svh lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]
                 lg:items-center lg:gap-[clamp(40px,6vw,88px)] lg:pb-0"
    >
      <Saturno className="-z-10 opacity-70
                          -right-[26%] top-[3%] h-[min(86vw,380px)] w-[min(86vw,380px)]
                          lg:right-[2%] lg:top-1/2 lg:h-[min(46vw,620px)] lg:w-[min(46vw,620px)]
                          lg:-translate-y-1/2 lg:opacity-90" />

      <div className="order-1 flex flex-col">
        <h1 className="disp h1 max-w-[13ch]">Publicidad que se mide en ventas</h1>

        <p className="lede mt-[clamp(26px,3.4vw,38px)]">
          Armamos y manejamos tus campañas de Facebook e Instagram: la estrategia,
          los anuncios y la página a la que llegan. Y las medimos contra lo que
          vendiste, no contra los me gusta.
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

/* ══════════ SERVICIOS ══════════
   Una lista, no seis tarjetas. Sin numerar: los servicios no son
   una secuencia, y un 01/06 arriba de cada uno no dice nada. */

const SERVICIOS: { t: string; d: string; web?: boolean }[] = [
  {
    t: "Campañas en Meta",
    d: "Facebook e Instagram. Estructura, públicos y presupuesto, y ajustes constantes con lo que muestran los datos de la cuenta.",
  },
  {
    t: "Estrategia de publicidad paga",
    d: "Antes de invertir: qué objetivo, cuánto presupuesto, a quién le hablamos y por dónde llega la venta. Un plan que se puede medir.",
  },
  {
    t: "Anuncios y textos",
    d: "Imágenes, videos y textos pensados para cada plataforma y cada momento de la compra. Se prueban varias versiones y se queda la que vende.",
  },
  {
    t: "Marca personal",
    d: "Campañas para profesionales que venden su nombre: que te conozcan en tu mercado y que eso se convierta en consultas.",
  },
  {
    t: "Medición y reportes",
    d: "Los números que sirven para decidir: cuánto cuesta cada venta, cuánto vuelve de lo invertido y qué anuncio trajo qué. Nada de métricas para la foto.",
  },
  {
    t: "Webs que venden",
    d: "Landings pensadas para convertir el tráfico pago en consultas. Si tu negocio necesita su web, tenemos un servicio aparte: $500.000, lista en 7 días.",
    web: true,
  },
];

export function Servicios() {
  return (
    <section id="servicios" className="sec pad-x">
      <Aparece>
        <h2 className="disp h2 max-w-[16ch]">Todo lo que pasa entre el anuncio y la venta</h2>
        <p className="lede mt-7">
          Una sola agencia para la campaña, el anuncio, la página y la medición.
          Cuando algo no vende, no hay a quién pasarle la culpa.
        </p>
      </Aparece>

      <div className="mt-[clamp(48px,6vw,80px)] max-w-[62rem]">
        {SERVICIOS.map((s, i) => (
          <Aparece key={s.t} delay={i * 0.03}>
            <article className="grid gap-y-2 border-t border-[var(--rule)] py-6 sm:grid-cols-[17rem_1fr] sm:gap-x-8 sm:py-7">
              <h3 className="disp text-[19px] leading-tight tracking-[-0.015em] sm:text-[21px]">
                {s.t}
              </h3>
              <div>
                <p className="text-[15px] leading-relaxed text-ink-soft">{s.d}</p>
                {s.web && (
                  <a
                    href="/web/"
                    className="mt-4 inline-flex items-center gap-2.5 border-b border-ink pb-1 text-[15px] font-semibold transition-opacity hover:opacity-70"
                  >
                    Ver el servicio de webs
                    <Arrow />
                  </a>
                )}
              </div>
            </article>
          </Aparece>
        ))}
      </div>
    </section>
  );
}

/* ══════════ CÓMO TRABAJAMOS ══════════
   Acá sí hay orden: cada etapa arranca cuando la anterior dio
   números. Por eso es una línea de tiempo y lleva etapa. */

const ETAPAS: [string, string, string][] = [
  ["Etapa 1", "Diagnóstico", "Miramos tu negocio, tu competencia y tu cuenta publicitaria. Qué está roto, qué funciona y dónde está la oportunidad más rápida."],
  ["Etapa 2", "Estrategia", "Armamos el plan completo: objetivos, reparto del presupuesto, públicos, canales y el camino que hace el cliente hasta comprar."],
  ["Etapa 3", "Lanzamiento y optimización", "Salen las campañas y se ajustan con los datos reales: cada anuncio, cada público y cada puja se corrige contra lo que está pasando."],
  ["Etapa 4", "Escala", "Cuando el modelo está probado, subimos la inversión con criterio: más alcance y más ventas sobre algo que ya demostró que funciona."],
];

export function Metodo() {
  return (
    <section id="como" className="sec pad-x on-c">
      <div className="grid items-start gap-[clamp(36px,6vw,90px)] lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-[120px]">
          <h2 className="disp h2">Cuatro etapas, en orden</h2>
          <p className="lede mt-6">
            No se escala lo que todavía no funciona. Cada etapa arranca cuando la
            anterior dio números.
          </p>
        </div>

        <div className="relative pl-9">
          <div className="absolute bottom-2 left-[7px] top-3 w-px bg-bone/25" />
          {ETAPAS.map(([tag, tit, txt], i) => (
            /* El aire va en el envoltorio de Aparece, no en el article:
               cada article es el único hijo de su envoltorio, así que un
               last:pb-0 ahí adentro le sacaba el espacio a todos. */
            <Aparece key={tit} delay={i * 0.04} className="pb-[clamp(36px,4.5vw,56px)] last:pb-0">
              <article className="relative">
                <span className="absolute -left-9 top-[9px] h-[15px] w-[15px] rounded-full bg-bone" />
                <div className="mono !text-[11px] text-bone/50">{tag}</div>
                <h3 className="disp mb-2.5 mt-2 text-[clamp(21px,2.6vw,28px)] leading-tight tracking-[-0.018em]">
                  {tit}
                </h3>
                <p className="max-w-[52ch] text-[15.5px] leading-relaxed text-[#5f5f68]">{txt}</p>
              </article>
            </Aparece>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════ CONTACTO ══════════ */

export function ContactoAgencia() {
  return (
    <section id="contacto" className="sec pad-x">
      <Aparece>
        <h2 className="disp h2 max-w-[14ch]">¿Hablamos de tus campañas?</h2>
        <p className="lede mt-7">
          Contanos qué vendés y cuánto invertís hoy en publicidad. Coordinamos una
          llamada de diagnóstico, sin cargo y sin compromiso.
        </p>
        <div className="mt-9 flex flex-wrap gap-3.5">
          <WaLink msg={`${MSG_AGENCIA} Mi negocio es:`} className="btn">
            Escribinos por WhatsApp
            <Arrow />
          </WaLink>
          <a href={`mailto:${EMAIL}`} className="btn btn-line">
            {EMAIL}
          </a>
        </div>
      </Aparece>
    </section>
  );
}
