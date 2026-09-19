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
  ["La manejás vos", "Te la entregamos llave en mano y te enseñamos a administrarla: cambiar textos, fotos, precios y horarios sin depender de nadie. Enseñarte no se cobra."],
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
  ["Día 0", "Nos conocemos", "Una llamada corta para que nos cuentes el negocio y sepas con quién trabajás. Si preferís, lo hacemos por WhatsApp. Nos mandás el logo, fotos si tenés, y listo."],
  ["Días 1 a 3", "Ves el primer boceto", "La web entera diseñada y navegable, con los textos escritos. No una imagen: entrás desde el celular y la recorrés como la va a ver tu cliente."],
  ["Días 4 a 5", "Ajustamos lo que haga falta", "Dos rondas de cambios incluidas. Nos decís todo junto por WhatsApp y lo aplicamos: colores, textos, fotos, el orden de las secciones."],
  ["Días 6 a 7", "Queda online y es tuya", "Conectamos el dominio, te transferimos el proyecto a tu cuenta y te enseñamos a manejarla. Desde ese momento sos el dueño y podés seguir con quien quieras."],
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

/* ══════════ RESERVAS ══════════
   El segundo plan: la misma web con un sistema de turnos adentro.
   Lo que dice cada fila es lo que el sistema hace de verdad (reservas,
   agenda, ficha de clientes, recordatorios): si se suma o se saca algo,
   cambiarlo también en el plan de PRECIO y en los términos. */

const RESERVAS: [string, string][] = [
  ["Reservas online", "El cliente elige el servicio, el día y el horario desde tu web. No te tiene que escribir ni esperar a que contestes."],
  ["Una sola agenda", "Todos los turnos caen en el mismo lugar, así no se pisan ni se pierden en el chat."],
  ["La ficha de cada cliente", "Sus datos y su historial juntos: quién es, cuándo vino y qué le hiciste."],
  ["Recordatorios automáticos", "Antes del turno, el cliente recibe un aviso. Menos gente que se olvida."],
];

export function Reservas() {
  return (
    <section id="reservas" className="sec pad-x">
      <div className="grid items-start gap-[clamp(36px,6vw,90px)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
        <Aparece className="lg:sticky lg:top-[120px]">
          <h2 className="disp h2 max-w-[15ch]">Si trabajás con turnos, que la web también los dé</h2>
          <p className="lede mt-7">
            La misma web, con un sistema de reservas adentro. Tus clientes sacan
            turno solos, a cualquier hora, y vos tenés todo en un lugar.
          </p>
          <p className="mt-6 text-[15px] text-ink-soft">
            <b className="font-semibold text-ink">$700.000</b>, lista en 7 días.
          </p>
          <div className="mt-8">
            <WaLink msg="Hola! Quiero la web con reservas. Mi negocio es:" className="btn">
              Quiero la web con reservas
              <Arrow />
            </WaLink>
          </div>
        </Aparece>

        <div>
          {RESERVAS.map(([t, d], i) => (
            <Aparece key={t} delay={i * 0.03}>
              <article className="border-t border-[var(--rule)] py-6 sm:py-7">
                <h3 className="disp text-[19px] leading-tight tracking-[-0.015em] sm:text-[21px]">{t}</h3>
                <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-ink-soft">{d}</p>
              </article>
            </Aparece>
          ))}
          <Aparece>
            <p className="border-t border-[var(--rule)] pt-6 text-[15px] leading-relaxed text-ink-soft">
              Para consultorios, peluquerías, estudios, talleres y cualquier negocio
              que viva de la agenda.
            </p>
          </Aparece>
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
    <section id="trabajos" className="sec pad-x velo">
      <Aparece>
        <h2 className="disp h2 max-w-[16ch]">Así puede quedar la tuya</h2>
        <p className="lede mt-7">
          Seis sitios de muestra, uno por rubro, hechos con el mismo proceso y
          el mismo nivel que te entregamos. Los negocios son inventados; todo lo
          demás funciona. Abrí cualquiera y recorrelo entero.
        </p>
      </Aparece>

      <div className="mt-[clamp(40px,5vw,64px)] grid gap-x-4 gap-y-10 min-[720px]:grid-cols-2">
        {TRABAJOS.map((t, i) => (
          <Aparece key={t.nombre} delay={(i % 2) * 0.05}>
            <a href={t.url} target="_blank" rel="noopener" className="group block">
              <TiltCard max={5}>
                <div className="overflow-hidden border border-ink/25 bg-ink/5 transition-colors group-hover:border-ink/60">
                  <img
                    src={t.img}
                    alt={`Inicio del sitio de muestra de ${t.nombre}, ${t.rubro.toLowerCase()}`}
                    width={960}
                    height={600}
                    loading="lazy"
                    className="block aspect-[8/5] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              </TiltCard>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <span className="disp text-[clamp(22px,2.4vw,30px)] leading-none tracking-[-0.025em]">{t.nombre}</span>
                <span className="flex shrink-0 items-center gap-2 text-[13px] text-ink-soft transition-colors group-hover:text-ink">
                  Abrir sitio
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <path d="M3 10 10 3M4.5 3H10v5.5" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </span>
              </div>
              <p className="mt-2 text-[15px] text-ink-soft">
                {t.rubro}
              </p>
            </a>
          </Aparece>
        ))}
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
  "Capacitación para que la administres vos",
];

/* Lo que suma el plan con reservas sobre la web. Mismo contenido que
   RESERVAS, dicho en corto. */
const ENTRA_RESERVAS = [
  "Todo lo de la web",
  "Sistema de reservas online",
  "Agenda de turnos en un solo lugar",
  "Ficha de cada cliente, con su historial",
  "Recordatorios automáticos antes del turno",
];

const NO_ENTRA = [
  "Tienda online con carrito y pagos",
  "Más de seis secciones",
  "Blog con carga de notas",
  "Sesión de fotos del negocio",
];

type Plan = {
  nombre: string;
  precio: string;
  bajada: string;
  entra: string[];
  boton: string;
  msg: string;
};

const PLANES: Plan[] = [
  {
    nombre: "Web",
    precio: "500.000",
    bajada: "Pago único, llave en mano, sin cuota de mantenimiento",
    entra: ENTRA,
    boton: "Quiero mi web",
    msg: "Hola! Quiero mi web por $500.000. ¿Cómo arrancamos?",
  },
  {
    nombre: "Web con reservas",
    precio: "700.000",
    bajada: "Pago único. Mantenimiento opcional: $50.000 por mes",
    entra: ENTRA_RESERVAS,
    boton: "Quiero la web con reservas",
    msg: "Hola! Quiero la web con reservas por $700.000. ¿Cómo arrancamos?",
  },
];

function TarjetaPlan({ p, destacado }: { p: Plan; destacado?: boolean }) {
  return (
    <div
      className={`flex h-full flex-col border p-[clamp(26px,3.6vw,52px)] vidrio ${
        destacado ? "border-ink/70" : "border-ink/25"
      }`}
    >
      <div className="disp text-[clamp(20px,2.2vw,24px)] tracking-[-0.015em]">{p.nombre}</div>
      <div className="mt-6 flex items-start gap-3">
        <span className="disp pt-1 text-[clamp(24px,3.4vw,42px)] leading-none text-ink-soft">$</span>
        <span className="disp text-[clamp(48px,7vw,92px)] leading-[0.82] tracking-[-0.04em]">{p.precio}</span>
      </div>
      <div className="mt-4 text-[15px] text-ink-soft">{p.bajada}</div>

      <ul className="mt-8 flex-1">
        {p.entra.map((x) => (
          <li key={x} className="flex gap-3.5 border-t border-[var(--rule)] py-3 text-[15px] leading-snug">
            <span className="mono !text-[13px] !tracking-normal shrink-0 text-ink">+</span>
            {x}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <WaLink msg={p.msg} className={destacado ? "btn" : "btn btn-line"}>
          {p.boton}
          <Arrow />
        </WaLink>
      </div>
    </div>
  );
}

export function Precio() {
  return (
    <section id="precio" className="sec pad-x">
      <Aparece>
        <h2 className="disp h2 max-w-[15ch]">Dos precios, publicados, sin vueltas</h2>
        <p className="lede mt-7">
          Si trabajás con turnos, te conviene la web con reservas. Si no, alcanza
          con la web. Si no sabés, lo vemos juntos antes de arrancar.
        </p>
      </Aparece>

      <div className="mt-[clamp(40px,5vw,64px)] grid gap-3 lg:grid-cols-2">
        {PLANES.map((p, i) => (
          <Aparece key={p.nombre} delay={0.05 + i * 0.04} className="h-full">
            <TarjetaPlan p={p} destacado={i === 1} />
          </Aparece>
        ))}
      </div>

      <Aparece delay={0.05}>
        <div className="mt-3 grid border border-ink/25 bg-bone/30 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="p-[clamp(26px,3.6vw,52px)]">
            <div className="text-[15px] font-semibold">Aparte, en los dos planes</div>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              El alojamiento de la web cuesta{" "}
              <b className="font-semibold text-ink">USD 10 por mes</b> y lo pagás vos
              directo a la plataforma, con tu tarjeta. No pasa por nosotros: es lo que
              hace que la web sea realmente tuya y que no te podamos dejar sin nada.
            </p>
          </div>
          <div className="border-t border-ink/25 p-[clamp(26px,3.6vw,52px)] lg:border-l lg:border-t-0">
            <div className="text-[15px] font-semibold">Esto no entra</div>
            <ul className="mt-4">
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
            <p className="mt-6 text-sm leading-relaxed text-ink-soft">
              Nada de esto es imposible, pero no entra en ninguno de los dos planes. Si
              lo necesitás, <b className="font-semibold text-ink">decilo antes de arrancar</b>{" "}
              y te pasamos un presupuesto aparte.
            </p>
          </div>
        </div>
      </Aparece>
    </section>
  );
}

/* ══════════ PREGUNTAS ══════════ */

const QA: [string, React.ReactNode][] = [
  ["¿Cuál me conviene, la web o la web con reservas?",
   <>Si tu negocio trabaja con turnos, como un consultorio, una peluquería o un taller, la de reservas te ahorra contestar mensajes para darlos. Si no, <b>alcanza con la web</b>. Si tenés dudas, lo vemos en la llamada y te decimos cuál, aunque sea la más barata.</>],
  ["¿Por qué hay 10 dólares por mes si dicen que no hay mantenimiento?",
   <>Son dos cosas distintas. Los <b>USD 10 mensuales</b> son el alojamiento y los pagás vos directo a la plataforma donde vive tu web. En la web sola no te cobramos <b>nada</b> por mes. Es a propósito: si el alojamiento estuviera a nuestro nombre, el día que quisieras irte tendrías que pedirnos permiso. Necesitás una tarjeta habilitada para pagos en dólares.</>],
  ["¿El mantenimiento de la web con reservas es obligatorio?",
   <>No. Es <b>opcional</b> y cuesta <b>$50.000 por mes</b>. Lo contratás si querés que nos ocupemos nosotros del sistema.</>],
  ["¿La web es realmente mía?",
   <>Sí, y no es una forma de decir. Al terminar te transferimos el proyecto a <b>tu cuenta</b> y el dominio se compra directamente a tu nombre. Podés editarla, cambiar de diseñador o darla de baja sin hablar con nosotros.</>],
  ["¿Hay que hacer una llamada?",
   <>Te la ofrecemos y te la recomendamos: son <b>15 minutos para conocernos</b>, que nos cuentes tu negocio y que sepas con quién vas a trabajar antes de pagar. No es una llamada de venta, porque el precio ya lo sabés. Si preferís, hacemos todo por WhatsApp.</>],
  ["¿Y si después necesito cambiar algo?",
   <>Lo cambiás vos, y te enseñamos cómo <b>sin costo</b>. Al entregarte la web te mostramos paso a paso cómo cambiar textos, fotos, precios, horarios y datos de contacto, y cómo mantenerla al día. Si más adelante te trabás, nos preguntás. Secciones nuevas o rediseños son presupuesto aparte, y te lo decimos antes de tocar nada.</>],
  ["¿Y si no me llevo bien con la computadora?",
   <>No hace falta saber de diseño ni de programación. Te enseñamos <b>sobre tu propia web</b>, con los cambios que vas a hacer de verdad, no con un tutorial genérico. Y si te olvidás de algo, te lo volvemos a explicar.</>],
  ["¿Cómo se paga?",
   <>Mercado Pago, transferencia bancaria o USDT. En los dos planes se abona <b>50% para arrancar y 50% contra entrega</b>, así ninguno de los dos queda expuesto.</>],
  ["¿De verdad son 7 días?",
   <>Sí, también con reservas. El reloj arranca cuando nos mandás el material, no cuando pagás. Con el material completo, el <b>primer boceto lo ves en 72 horas</b>.</>],
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
          Escribinos por WhatsApp y te decimos en el momento qué plan le sirve a tu
          negocio, o si necesita algo distinto. Después hacemos una llamada corta
          para conocernos, y arrancamos.
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
