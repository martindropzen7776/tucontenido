"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Aparece } from "./aparece";
import { TiltCard } from "@/components/motion/tilt-card";
import { TRABAJOS } from "@/lib/site";
import { WaLink, Arrow } from "./wa-link";

/* ══════════ QUÉ INCLUYE ══════════
   Un alcance cerrado es una lista, no seis tarjetas. Va en filas
   con una regla fina entre medio: se lee de arriba a abajo y se
   compara de un vistazo, que es para lo que existe. */

const INCLUYE: [string, string][] = [
  ["Diseño a medida", "Nada de plantillas recicladas. Colores, tipografía y estructura pensados para tu rubro, para que no se parezca a la web del de al lado."],
  ["Hasta seis secciones", "Inicio, servicios, sobre el negocio, trabajos, preguntas y contacto. Alcanza para el noventa por ciento de los negocios."],
  ["Anda en el celular", "Siete de cada diez clientes te miran desde el teléfono. Se diseña primero para esa pantalla y después para la computadora."],
  ["Textos incluidos", "Escribimos nosotros lo que dice la web. No tenés que sentarte a redactar ni mandarnos un documento con todo listo."],
  ["Lista para Google", "Títulos, descripciones, datos estructurados y velocidad de carga configurados desde el día uno."],
  ["WhatsApp integrado", "Botón flotante y enlaces con el mensaje ya escrito. El cliente toca y te llega al teléfono."],
];

export function Incluye() {
  return (
    <section id="incluye" className="sec pad-x">
      <Aparece>
        <h2 className="disp h2 max-w-[16ch]">Todo lo que hace que un negocio se vea serio</h2>
        <p className="lede mt-7">
          Alcance cerrado y publicado. Sabés qué recibís antes de pagar y nosotros
          sabemos qué construir.
        </p>
      </Aparece>

      <div className="mt-[clamp(48px,6vw,80px)] max-w-[62rem]">
        {INCLUYE.map(([t, d], i) => (
          <Aparece key={t} delay={i * 0.03}>
            <article className="grid grid-cols-[2.2rem_1fr] items-start gap-x-4 gap-y-1.5 border-t border-[var(--rule)] py-6 sm:grid-cols-[3rem_15rem_1fr] sm:gap-x-8 sm:py-7">
              <span className="mono !text-[11px] pt-1 text-ink-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="disp text-[19px] leading-tight tracking-[-0.015em] sm:text-[21px]">
                {t}
              </h3>
              <p className="col-start-2 text-[15px] leading-relaxed text-ink-soft sm:col-start-3">
                {d}
              </p>
            </article>
          </Aparece>
        ))}
      </div>
    </section>
  );
}

/* ══════════ LOS 7 DÍAS ══════════ */

const DIAS: [string, string, string][] = [
  ["Día 0", "Nos contás el negocio", "Te mandamos un formulario corto por WhatsApp. Logo, fotos si tenés y cuatro preguntas sobre a quién le vendés. Diez minutos, no más."],
  ["Días 1 a 3", "Ves el primer boceto", "La web entera diseñada y navegable, con los textos escritos. No una imagen: entrás desde el celular y la recorrés como la va a ver tu cliente."],
  ["Días 4 a 5", "Ajustamos lo que haga falta", "Dos rondas de cambios incluidas. Nos decís todo junto por WhatsApp y lo aplicamos: colores, textos, fotos, el orden de las secciones."],
  ["Días 6 a 7", "Queda online y es tuya", "Conectamos el dominio y te transferimos el proyecto a tu cuenta. Desde ese momento sos el dueño y podés seguir con quien quieras."],
];

export function Semana() {
  return (
    <section id="dias" className="sec pad-x on-c">
      <div className="grid items-start gap-[clamp(36px,6vw,90px)] lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-[120px]">
          <h2 className="disp h2">Siete días exactos</h2>
          <p className="lede mt-6">
            El reloj arranca cuando mandás el material, no cuando pagás. Así el
            plazo depende de los dos y se cumple siempre.
          </p>
        </div>

        <div className="relative pl-9">
          <div className="absolute bottom-2 left-[7px] top-3 w-px bg-bone/25" />
          {DIAS.map(([tag, tit, txt], i) => (
            <Aparece key={tit} delay={i * 0.04}>
              <article className="relative pb-[clamp(36px,4.5vw,56px)] last:pb-0">
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

/* ══════════ TRABAJOS ══════════
   Grilla asimétrica: el primero ocupa el doble. Además de romper
   la fila de tres, te obliga a poner adelante tu mejor trabajo. */

export function Trabajos() {
  return (
    <section id="trabajos" className="sec pad-x bg-bone-2">
      <Aparece>
        <h2 className="disp h2 max-w-[14ch]">Webs que ya están andando</h2>
        <p className="lede mt-7">
          Tocá cualquiera para abrirla. Son sitios reales, en producción, hechos
          con este mismo proceso.
        </p>
      </Aparece>

      <div className="mt-[clamp(40px,5vw,64px)] grid gap-3 min-[720px]:grid-cols-2">
        {TRABAJOS.map((t, i) => {
          const grande = i === 0;
          const cuerpo = (
            <div
              className={`flex h-full flex-col justify-between gap-8 border border-ink/25 p-6 transition-colors sm:p-8 ${
                t.listo ? "bg-bone hover:border-ink/60" : "border-dashed opacity-45"
              } ${grande ? "min-h-[15rem] sm:min-h-[19rem]" : "min-h-[11rem] sm:min-h-[13rem]"}`}
            >
              <span className="mono !text-[11px] text-ink-soft">{t.rubro}</span>
              <span>
                <span
                  className={`disp block leading-none tracking-[-0.025em] ${
                    grande ? "text-[clamp(30px,4.4vw,52px)]" : "text-[clamp(21px,2.4vw,28px)]"
                  }`}
                >
                  {t.nombre}
                </span>
                <span className="mt-3 flex items-center gap-2.5 text-[13px] text-ink-soft">
                  Abrir sitio
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <path d="M3 10 10 3M4.5 3H10v5.5" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </span>
              </span>
            </div>
          );

          return (
            <Aparece key={t.nombre} delay={i * 0.03} className={grande ? "min-[720px]:col-span-2" : ""}>
              {t.listo ? (
                <a href={t.url} target="_blank" rel="noopener" className="block h-full">
                  <TiltCard max={8}>{cuerpo}</TiltCard>
                </a>
              ) : (
                <div className="h-full">{cuerpo}</div>
              )}
            </Aparece>
          );
        })}
      </div>
    </section>
  );
}

/* ══════════ PRECIO ══════════ */

const ENTRA = [
  "Diseño a medida, sin plantillas",
  "Hasta seis secciones",
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
  "Más de seis secciones",
  "Blog con carga de notas",
  "Sesión de fotos del negocio",
  "Campañas de publicidad",
];

export function Precio() {
  return (
    <section id="precio" className="sec pad-x">
      <Aparece>
        <h2 className="disp h2 max-w-[15ch]">Un precio, publicado, sin vueltas</h2>
      </Aparece>

      <Aparece delay={0.05}>
        <div className="mt-[clamp(40px,5vw,64px)] grid border border-ink/25 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="p-[clamp(26px,3.6vw,52px)]">
            <div className="flex items-start gap-3">
              <span className="mono !text-[15px] !tracking-[0.1em] pt-3 text-ink-soft">USD</span>
              <span className="disp text-[clamp(60px,11vw,124px)] leading-[0.82] tracking-[-0.04em]">
                500
              </span>
            </div>
            <div className="mt-4 text-[15px] text-ink-soft">
              Pago único, sin cuota de mantenimiento
            </div>

            <ul className="mt-8">
              {ENTRA.map((x) => (
                <li
                  key={x}
                  className="flex gap-3.5 border-t border-[var(--rule)] py-3 text-[15px] leading-snug"
                >
                  <span className="mono !text-[13px] !tracking-normal shrink-0 text-ink">+</span>
                  {x}
                </li>
              ))}
            </ul>

            <p className="mt-8 border-l border-ink pl-5 text-sm leading-relaxed text-ink-soft">
              Aparte del pago único, el alojamiento cuesta{" "}
              <b className="font-semibold text-ink">USD 10 por mes</b> y lo pagás vos
              directo a la plataforma, con tu tarjeta. No pasa por nosotros: es lo que
              hace que la web sea realmente tuya y que no te podamos dejar sin nada.
            </p>

            <div className="mt-8">
              <WaLink msg="Hola! Quiero mi web por USD 500. ¿Cómo arrancamos?" className="btn">
                Quiero mi web
                <Arrow />
              </WaLink>
            </div>
          </div>

          <div className="border-t border-ink/25 bg-bone-2 p-[clamp(26px,3.6vw,52px)] lg:border-l lg:border-t-0">
            <div className="text-[15px] font-semibold">Esto no entra</div>
            <ul className="mt-6">
              {NO_ENTRA.map((x) => (
                <li
                  key={x}
                  className="flex gap-3.5 border-t border-[var(--rule)] py-3 text-[15px] leading-snug text-ink-soft"
                >
                  <span className="mono !text-[13px] !tracking-normal shrink-0">−</span>
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-8 border-l border-ink/40 pl-5 text-sm leading-relaxed text-ink-soft">
              Nada de esto es imposible, pero no entra en los USD 500. Si lo necesitás,{" "}
              <b className="font-semibold text-ink">decilo antes de arrancar</b> y te
              pasamos un presupuesto aparte. Preferimos eso a que te enteres a mitad
              de camino.
            </p>
          </div>
        </div>
      </Aparece>
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
    <div className="border-t border-[var(--rule)]">
      <button
        type="button"
        onClick={() => setAbierta((v) => !v)}
        aria-expanded={abierta}
        className="disp flex w-full items-center justify-between gap-6 py-6 text-left text-[clamp(17px,2vw,21px)] leading-snug tracking-[-0.015em] transition-opacity hover:opacity-60 max-[620px]:min-h-[56px]"
      >
        <span>{q}</span>
        <motion.span
          animate={{ rotate: abierta ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 text-ink-soft"
          aria-hidden="true"
        >
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>
      {/* Se anima pero nunca se desmonta: si se desmontara, Google no
          vería la respuesta y perderíamos el contenido de cola larga. */}
      <motion.div
        initial={false}
        animate={{ height: abierta ? "auto" : 0, opacity: abierta ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="max-w-[64ch] pb-7 pr-8 text-[15.5px] leading-relaxed text-ink-soft [&_b]:font-semibold [&_b]:text-ink">
          {a}
        </div>
      </motion.div>
    </div>
  );
}

export function Preguntas() {
  return (
    <section id="preguntas" className="sec pad-x">
      <Aparece>
        <h2 className="disp h2 max-w-[13ch]">Lo que siempre nos preguntan</h2>
      </Aparece>
      <div className="mt-[clamp(36px,4vw,56px)] max-w-[54rem]">
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
    <section id="contacto" className="pad-x on-c py-[clamp(88px,13vw,168px)]">
      <Aparece>
        <div className="max-w-[24ch]">
          <h2 className="disp h2">¿Arrancamos hoy mismo?</h2>
        </div>
        <p className="lede mt-7">
          Escribinos por WhatsApp y te decimos en el momento si tu negocio entra en
          los USD 500 o necesita algo distinto. Sin llamadas, sin reuniones, sin vueltas.
        </p>
        <div className="mt-9">
          <WaLink msg="Hola! Quiero mi web en 7 días. Mi negocio es:" className="btn">
            Escribinos por WhatsApp
            <Arrow />
          </WaLink>
        </div>
        <p className="mt-6 text-sm text-[#5f5f68]">
          Lunes a sábado, normalmente en menos de una hora.
        </p>
      </Aparece>
    </section>
  );
}
