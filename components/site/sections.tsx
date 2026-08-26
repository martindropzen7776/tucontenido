"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { TRABAJOS } from "@/lib/site";
import { WaLink, Arrow } from "./wa-link";

/* ══════════ QUÉ INCLUYE ══════════ */

const INCLUYE = [
  ["Diseño a medida", "Nada de plantillas recicladas. Colores, tipografía y estructura pensados para tu rubro, para que no se parezca a la web del de al lado."],
  ["Hasta 6 secciones", "Inicio, servicios, sobre el negocio, trabajos, preguntas y contacto. Alcanza para el noventa por ciento de los negocios."],
  ["Anda en el celular", "Siete de cada diez clientes te miran desde el teléfono. Se diseña primero para esa pantalla, después para la computadora."],
  ["Textos incluidos", "Escribimos nosotros lo que dice la web. No tenés que sentarte a redactar ni mandarnos un documento con todo listo."],
  ["Lista para Google", "Títulos, descripciones, datos estructurados y velocidad de carga configurados desde el día uno. La base para que te encuentren."],
  ["WhatsApp integrado", "Botón flotante y enlaces con el mensaje ya escrito. El cliente toca y te llega al teléfono, sin formularios que nadie completa."],
];

export function Incluye() {
  return (
    <section id="incluye" className="sec pad-x">
      <Cabezal
        eyebrow="Qué incluye"
        titulo={<>Todo lo que necesita<br />un negocio para vender</>}
        bajada="Alcance cerrado y publicado. Sabés qué recibís antes de pagar y nosotros sabemos qué construir. Sin sorpresas para ninguno de los dos."
      />
      <div className="grid border-l-2 border-t-2 border-ink min-[620px]:grid-cols-2 lg:grid-cols-3">
        {INCLUYE.map(([t, d], i) => (
          <ScrollReveal key={t} delay={i * 0.04}>
            <article className="group h-full border-b-2 border-r-2 border-ink bg-bone p-[clamp(26px,3vw,40px)] transition-colors duration-[350ms] hover:bg-acid">
              <div className="mono !text-[11px] text-cobalt group-hover:text-ink">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="disp h3 mb-3 mt-[22px]">{t}</h3>
              <p className="text-[15px] leading-relaxed text-ink-soft group-hover:text-ink">{d}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ══════════ LOS 7 DÍAS ══════════ */

const DIAS = [
  ["Día 0", "Nos contás el negocio", "Te mandamos un formulario corto por WhatsApp. Logo, fotos si tenés y cuatro preguntas sobre a quién le vendés. Diez minutos, no más."],
  ["Días 1 a 3", "Ves el primer boceto", "La web entera diseñada y navegable, con los textos escritos. No una imagen: entrás desde el celular y la recorrés como la va a ver tu cliente."],
  ["Días 4 a 5", "Ajustamos lo que haga falta", "Dos rondas de cambios incluidas. Nos decís todo junto por WhatsApp y lo aplicamos: colores, textos, fotos, el orden de las secciones."],
  ["Días 6 a 7", "Queda online y es tuya", "Conectamos el dominio y te transferimos el proyecto a tu cuenta. Desde ese momento sos el dueño y podés seguir con quien quieras."],
];

export function Semana() {
  return (
    <section id="dias" className="sec pad-x on-c">
      <div className="grid items-start gap-[clamp(32px,6vw,90px)] lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-[120px]">
          <div className="eyebrow mono">Cómo funciona</div>
          <h2 className="disp h2">
            Siete días
            <br />
            exactos
          </h2>
          <p className="lede mt-[22px]">
            El reloj arranca cuando mandás el material, no cuando pagás. Así el
            plazo depende de los dos y se cumple siempre.
          </p>
        </div>

        <div className="relative pl-[38px]">
          <div className="absolute bottom-2 left-[9px] top-2 w-0.5 bg-[var(--rule-on-c)]" />
          {DIAS.map(([tag, tit, txt], i) => (
            <ScrollReveal key={tit} delay={i * 0.05}>
              <article className="relative pb-[clamp(34px,4.5vw,54px)] last:pb-0">
                <span className="absolute -left-[34px] top-[7px] h-5 w-5 rounded-full border-2 border-acid bg-acid" />
                <div className="mono !text-[11px] text-acid">{tag}</div>
                <h3 className="disp h3 my-2.5">{tit}</h3>
                <p className="max-w-[52ch] text-[15.5px] leading-relaxed text-bone/76">{txt}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════ TRABAJOS ══════════ */

export function Trabajos() {
  return (
    <section id="trabajos" className="sec pad-x bg-bone-2">
      <Cabezal
        eyebrow="Trabajos"
        titulo={<>Webs que ya<br />están andando</>}
        bajada="Tocá cualquiera para abrirla. Son sitios reales, en producción, hechos con este mismo proceso."
      />
      <div className="grid gap-[clamp(14px,1.6vw,22px)] min-[620px]:grid-cols-2 lg:grid-cols-3">
        {TRABAJOS.map((t, i) => {
          const cuerpo = (
            <div
              className={`flex h-full min-h-[clamp(190px,20vw,250px)] flex-col justify-between gap-5 border-2 border-ink p-[clamp(22px,2.4vw,30px)] ${
                t.listo ? "bg-bone" : "border-dashed bg-bone/60 opacity-60"
              }`}
            >
              <span className="mono !text-[11px] text-cobalt">{t.rubro}</span>
              <span className="disp text-[clamp(22px,2.5vw,30px)] leading-none tracking-[-0.025em]">
                {t.nombre}
              </span>
              <span className="flex items-center gap-2.5 text-[13px] font-semibold text-ink-soft">
                Abrir sitio
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M3 10 10 3M4.5 3H10v5.5" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </span>
            </div>
          );

          return (
            <ScrollReveal key={t.nombre} delay={i * 0.04}>
              {t.listo ? (
                <a href={t.url} target="_blank" rel="noopener" className="block h-full">
                  <TiltCard max={10}>{cuerpo}</TiltCard>
                </a>
              ) : (
                <div className="h-full">{cuerpo}</div>
              )}
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}

/* ══════════ PRECIO ══════════ */

const ENTRA = [
  "Diseño a medida, sin plantillas",
  "Hasta 6 secciones",
  "Adaptada a celular y computadora",
  "Textos de venta escritos por nosotros",
  "Configuración base para Google",
  "WhatsApp y formulario de contacto",
  "Dos rondas de ajustes",
  "Dominio conectado y sitio transferido a tu cuenta",
];

const NO_ENTRA = [
  "Tienda online con carrito y pagos",
  "Sistema de turnos o reservas",
  "Más de 6 secciones",
  "Blog con carga de notas",
  "Sesión de fotos del negocio",
  "Campañas de publicidad",
];

export function Precio() {
  return (
    <section id="precio" className="sec pad-x">
      <ScrollReveal>
        <div className="eyebrow mono">Precio</div>
        <h2 className="disp h2">
          Un precio, publicado,
          <br />
          sin vueltas
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.06}>
        <div className="mt-[clamp(40px,5vw,64px)] grid border-2 border-ink lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]">
          <div className="bg-bone p-[clamp(24px,3.6vw,52px)]">
            <div className="flex items-start gap-2.5">
              <span className="mono !text-[15px] !tracking-[0.1em] pt-3 text-cobalt">USD</span>
              <span className="disp text-[clamp(56px,11vw,124px)] leading-[0.82] tracking-[-0.04em]">
                500
              </span>
            </div>
            <div className="mono !text-[11px] mb-7 mt-3.5 text-cobalt">
              Pago único · sin cuota de mantenimiento
            </div>

            <ul>
              {ENTRA.map((x) => (
                <li
                  key={x}
                  className="flex gap-3 border-b border-[var(--rule)] py-3 text-[15px] leading-snug last:border-b-0"
                >
                  <span className="mono !text-[13px] !tracking-normal shrink-0 text-cobalt">+</span>
                  {x}
                </li>
              ))}
            </ul>

            <div className="mt-7 border-l-[3px] border-cobalt bg-bone-2 p-[20px_22px] text-sm leading-relaxed text-ink-soft">
              Aparte del pago único, el alojamiento cuesta{" "}
              <b className="font-semibold text-ink">USD 10 por mes</b> y lo pagás vos
              directo a la plataforma, con tu tarjeta. No pasa por nosotros: es lo que
              hace que la web sea realmente tuya y que no te podamos dejar sin nada.
            </div>

            <div className="mt-7">
              <WaLink msg="Hola! Quiero mi web por USD 500. ¿Cómo arrancamos?" className="btn">
                Quiero mi web
                <Arrow />
              </WaLink>
            </div>
          </div>

          <div className="border-t-2 border-ink bg-ink p-[clamp(24px,3.6vw,52px)] text-bone lg:border-l-2 lg:border-t-0">
            <div className="mono !text-[11px] mb-6 text-bone/45">Esto no entra</div>
            <ul>
              {NO_ENTRA.map((x) => (
                <li
                  key={x}
                  className="flex gap-3 border-b border-bone/16 py-3 text-[15px] leading-snug text-bone/70 last:border-b-0"
                >
                  <span className="mono !text-[13px] !tracking-normal shrink-0 text-bone/40">−</span>
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-7 border-l-[3px] border-bone/35 bg-bone/7 p-[20px_22px] text-sm leading-relaxed text-bone/72">
              Nada de esto es imposible, pero no entra en los USD 500. Si lo necesitás,{" "}
              <b className="font-semibold text-bone">decilo antes de arrancar</b> y te
              pasamos un presupuesto aparte. Preferimos eso a que te enteres a mitad
              de camino.
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ══════════ PREGUNTAS ══════════ */

const QA: [string, React.ReactNode][] = [
  ["¿Por qué hay 10 dólares por mes si dicen que no hay mantenimiento?",
   <>Son dos cosas distintas. Los <b>USD 10 mensuales</b> son el alojamiento y los pagás vos directo a la plataforma donde vive tu web. Nosotros no te cobramos <b>nada</b> por mes. Es a propósito: si el alojamiento estuviera a nuestro nombre, el día que quisieras irte tendrías que pedirnos permiso. Necesitás una tarjeta habilitada para pagos en dólares.</>],
  ["¿La web es realmente mía?",
   <>Sí, y no es una forma de decir. Al terminar te transferimos el proyecto a <b>tu cuenta</b> y el dominio se compra directamente a tu nombre. Podés editarla, cambiar de diseñador o darla de baja sin hablar con nosotros.</>],
  ["¿En serio no hay ninguna llamada?",
   <>Ninguna, salvo que vos la quieras. Todo se resuelve por WhatsApp: te decimos el precio en el momento, mandás el material cuando puedas y el primer boceto te llega por el mismo chat. <b>No es un requisito para empezar.</b></>],
  ["¿Y si después necesito cambiar algo?",
   <>Los cambios chicos te los hacemos <b>sin costo</b>: textos, fotos, precios, horarios, datos de contacto. Secciones nuevas o rediseños son presupuesto aparte, y te lo decimos antes de tocar nada.</>],
  ["¿Cómo pago los USD 500?",
   <>Mercado Pago, transferencia bancaria o USDT. Se abona <b>50% para arrancar y 50% contra entrega</b>, así ninguno de los dos queda expuesto.</>],
  ["¿De verdad son 7 días?",
   <>Sí, pero el reloj arranca cuando nos mandás el material, no cuando pagás. Con el material completo, el <b>primer boceto lo ves en 72 horas</b>.</>],
];

function Pregunta({ q, a }: { q: string; a: React.ReactNode }) {
  const [abierta, setAbierta] = useState(false);
  return (
    <div className="border-b border-[var(--rule)]">
      <button
        type="button"
        onClick={() => setAbierta((v) => !v)}
        aria-expanded={abierta}
        className="disp flex w-full items-center justify-between gap-6 py-[26px] text-left text-[clamp(18px,2.1vw,23px)] leading-snug tracking-[-0.018em] transition-colors hover:text-cobalt max-[620px]:min-h-[56px]"
        style={{ fontStretch: "90%", fontWeight: 700 }}
      >
        <span>{q}</span>
        <motion.span
          animate={{ rotate: abierta ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 text-cobalt"
        >
          <svg viewBox="0 0 16 16" width="17" height="17" fill="none">
            <path d="M4 6.5L8 10.5L12 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </button>
      {/* La respuesta se anima pero NUNCA se desmonta: si se desmontara,
          Google no la vería y perderíamos el contenido de cola larga. */}
      <motion.div
        initial={false}
        animate={{
          height: abierta ? "auto" : 0,
          opacity: abierta ? 1 : 0,
          filter: abierta ? "blur(0px)" : "blur(2px)",
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="max-w-[66ch] pb-7 pr-10 text-base leading-relaxed text-ink-soft [&_b]:font-semibold [&_b]:text-ink">
          {a}
        </div>
      </motion.div>
    </div>
  );
}

export function Preguntas() {
  return (
    <section id="preguntas" className="sec pad-x bg-bone-2">
      <ScrollReveal>
        <div className="eyebrow mono">Preguntas</div>
        <h2 className="disp h2">
          Lo que siempre
          <br />
          nos preguntan
        </h2>
      </ScrollReveal>
      <div className="mt-[clamp(36px,4vw,56px)] max-w-[880px] border-t-2 border-ink">
        {QA.map(([q, a]) => (
          <Pregunta key={q} q={q} a={a} />
        ))}
      </div>
    </section>
  );
}

/* ══════════ CIERRE ══════════ */

export function Cierre() {
  return (
    <section id="contacto" className="pad-x on-c py-[clamp(84px,12vw,160px)] text-center">
      <ScrollReveal>
        <h2 className="disp h2 mb-6">¿Arrancamos hoy mismo?</h2>
        <p className="lede mx-auto mb-9">
          Escribinos por WhatsApp y te decimos en el momento si tu negocio entra en
          los USD 500 o necesita algo distinto. Sin llamadas, sin reuniones, sin vueltas.
        </p>
        <WaLink msg="Hola! Quiero mi web en 7 días. Mi negocio es:" className="btn btn-acid">
          Escribinos por WhatsApp
          <Arrow />
        </WaLink>
        <p className="mono !text-[11px] mt-6 text-bone/50">
          Lunes a sábado · normalmente en menos de una hora
        </p>
      </ScrollReveal>
    </section>
  );
}

/* ══════════ compartido ══════════ */

function Cabezal({
  eyebrow,
  titulo,
  bajada,
}: {
  eyebrow: string;
  titulo: React.ReactNode;
  bajada: string;
}) {
  return (
    <div className="mb-[clamp(44px,6vw,76px)] grid items-end gap-[clamp(24px,5vw,72px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)]">
      <ScrollReveal>
        <div className="eyebrow mono">{eyebrow}</div>
        <h2 className="disp h2">{titulo}</h2>
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <p className="lede">{bajada}</p>
      </ScrollReveal>
    </div>
  );
}
