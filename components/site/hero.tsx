"use client";

import { motion, useReducedMotion } from "motion/react";
import { Saturno } from "./saturno";
import { TextReveal } from "@/components/motion/text-reveal";
import { NumberTicker } from "@/components/motion/number-ticker";
import { Magnetic } from "@/components/motion/magnetic";
import { WaLink, Arrow } from "./wa-link";

function Fact({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="pt-5 pr-4 max-[620px]:border-b max-[620px]:border-[var(--rule)] max-[620px]:pb-4">
      <div className="disp text-[clamp(30px,4.4vw,50px)] leading-none tracking-[-0.03em]">
        <NumberTicker value={value} startOnView />
        {suffix && <sup className="text-[0.42em] align-super text-cobalt">{suffix}</sup>}
      </div>
      <div className="mono mt-[7px] !text-[11px] tracking-[0.14em] text-ink-soft">{label}</div>
    </div>
  );
}

export function Hero() {
  const menos = useReducedMotion();

  return (
    <header
      className="relative isolate overflow-hidden pad-x flex flex-col gap-[clamp(28px,6vw,44px)] pb-[clamp(56px,8vw,80px)]
                 pt-[calc(68px+clamp(40px,7vw,80px))]
                 lg:grid lg:min-h-svh lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]
                 lg:items-center lg:gap-[clamp(32px,5vw,72px)] lg:pb-0
                 border-b border-[var(--rule)]"
    >
      {/* El fondo va detrás de todo el hero, en su propia capa. */}
      <Saturno className="-z-10 opacity-90" />

      <div className="order-1 flex flex-col">
        <div className="eyebrow mono">Sin llamadas · sin reuniones · sin vueltas</div>

        <h1 className="disp h1">
          <TextReveal text="Tu web" split="word" as="span" />
          <TextReveal text="lista" split="word" as="span" delay={0.08} className="ghost" />
          <span className="block">
            <TextReveal text="en" split="word" as="span" delay={0.16} className="!inline-block" />{" "}
            {/* El subrayado ácido se dibuja recién al final de la secuencia:
                es el remate, no un adorno que entra con todo lo demás. */}
            <span className="relative inline-block">
              <TextReveal text="7 días" split="word" as="span" delay={0.2} className="!inline-block" />
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-[-2px] bottom-[0.07em] -z-10 block h-[0.17em] origin-left bg-ink"
                initial={menos ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.52, delay: 0.85, ease: [0.65, 0, 0.35, 1] }}
              />
            </span>
          </span>
        </h1>

        <p className="lede mt-[clamp(24px,3vw,34px)]">
          Nos escribís por WhatsApp, mandás el logo y listo. Sin llamada de venta,
          sin reuniones para coordinar reuniones, sin briefs de cuarenta preguntas.{" "}
          <b className="font-semibold text-ink">En 72 horas ya estás viendo tu web.</b>
        </p>

        <div className="mt-[clamp(30px,4vw,44px)] flex flex-wrap gap-3.5">
          <Magnetic strength={0.28}>
            <WaLink msg="Hola! Quiero mi web en 7 días. ¿Cómo arrancamos?" className="btn btn-acid">
              Pedir mi web
              <Arrow />
            </WaLink>
          </Magnetic>
          <a href="#trabajos" className="btn btn-line">
            Ver trabajos
          </a>
        </div>

        <div className="mt-[clamp(40px,6vw,64px)] grid grid-cols-1 border-t-2 border-ink min-[620px]:grid-cols-3">
          <Fact value={7} label="Días de entrega" />
          <Fact value={72} suffix="h" label="Primer boceto" />
          <Fact value={100} suffix="%" label="A tu nombre" />
        </div>
      </div>

      <aside className="order-2 self-stretch lg:self-center">
        <Ticket />
      </aside>
    </header>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-dashed border-[var(--rule-on-c)] py-[11px] text-sm last:border-b-0">
      <b className="font-semibold">{k}</b>
      <span className="text-right text-bone/60">{v}</span>
    </div>
  );
}

function Ticket() {
  return (
    <div className="relative border-2 border-ink bg-ink p-[clamp(26px,3vw,38px)] text-bone shadow-[6px_6px_0_rgba(244,244,241,0.22)] sm:shadow-[12px_12px_0_rgba(244,244,241,0.18)]">
      <div className="mb-5 flex items-baseline justify-between border-b border-dashed border-[var(--rule-on-c)] pb-4">
        <span className="mono text-bone/55">Presupuesto</span>
        <span className="mono text-bone/55">Nº 001</span>
      </div>
      <Row k="Diseño a medida" v="Incluido" />
      <Row k="Hasta 6 secciones" v="Incluido" />
      <Row k="Textos de venta" v="Incluido" />
      <Row k="WhatsApp y Google" v="Incluido" />
      <Row k="Dos rondas de ajustes" v="Incluido" />
      <Row k="Cuota de mantenimiento" v="$0" />
      <div className="mt-5 flex items-baseline justify-between border-t-2 border-bone pt-[18px]">
        <span className="mono">Total</span>
        <span className="disp text-[clamp(34px,4vw,48px)] leading-none tracking-[-0.03em] text-bone">
          USD 500
        </span>
      </div>
    </div>
  );
}
