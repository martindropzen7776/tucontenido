"use client";

import { useState } from "react";
import { Aparece } from "./aparece";
import { HONORARIO_DESDE } from "@/lib/site";
import { WaLink, Arrow } from "./wa-link";
import { MSG_AGENCIA } from "./hero";

/* ══════════ SERVICIOS ══════════
   Una lista con regla fina, no seis tarjetas: se lee de arriba a
   abajo y se compara de un vistazo. */

const SERVICIOS: [string, string][] = [
  ["Campañas en Meta", "Facebook, Instagram, Messenger y WhatsApp. Públicos, estructura y presupuesto, con anuncios que llevan a la compra, a un formulario o directo a tu WhatsApp."],
  ["Google Ads", "Búsqueda, Performance Max, YouTube y Display. Aparecés cuando alguien busca lo que vendés, con palabras clave elegidas por intención de compra y no por volumen."],
  ["Estrategia y presupuesto", "Antes de invertir un peso: qué objetivo, cuánto destinar, cómo repartirlo entre Meta y Google y cuánto podés pagar por cada cliente sin perder plata."],
  ["Anuncios y textos", "Imágenes, videos cortos y textos pensados para cada plataforma y cada momento de la compra. Se prueban varias versiones a la vez y se queda la que vende."],
  ["Medición bien hecha", "Píxel y API de Conversiones de Meta, etiqueta de conversiones de Google Ads y Google Analytics 4. Sin esto, las plataformas optimizan a ciegas y vos decidís a ciegas."],
  ["Reportes que se entienden", "Una vez por mes, en una página: cuánto invertiste, cuántas consultas o ventas trajo, cuánto costó cada una y qué vamos a cambiar."],
];

export function Servicios() {
  return (
    <section id="servicios" className="sec pad-x">
      <Aparece>
        <h2 className="disp h2 max-w-[16ch]">Todo lo que pasa entre el anuncio y la venta</h2>
        <p className="lede mt-7">
          Una sola agencia para la estrategia, los anuncios y la medición, en las
          dos plataformas. Cuando algo no vende, no hay a quién pasarle la culpa.
        </p>
      </Aparece>

      <div className="mt-[clamp(48px,6vw,80px)] max-w-[62rem]">
        {SERVICIOS.map(([t, d], i) => (
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

/* ══════════ META Y GOOGLE ══════════
   Las dos plataformas lado a lado, porque la pregunta que más se
   hace es "¿cuál me conviene?". La respuesta honesta es que hacen
   cosas distintas, y eso es lo que muestra la sección. */

const PLATAFORMAS: {
  nombre: string;
  rol: string;
  bajada: string;
  donde: string[];
  sirve: string;
}[] = [
  {
    nombre: "Meta",
    rol: "Crea la demanda",
    bajada: "Le muestra tu negocio a gente que todavía no te está buscando, pero que se parece a tu cliente.",
    donde: ["Facebook", "Instagram", "Messenger", "WhatsApp"],
    sirve: "Productos que entran por los ojos, lanzamientos, promociones y rubros donde la gente no sabe que te necesita hasta que te ve.",
  },
  {
    nombre: "Google",
    rol: "Captura la demanda",
    bajada: "Te pone adelante justo cuando alguien busca lo que vendés, en el momento en que está por decidir.",
    donde: ["Búsqueda", "YouTube", "Maps", "Display", "Gmail"],
    sirve: "Servicios que se buscan con urgencia, productos que la gente ya sabe que quiere y negocios que compiten por zona.",
  },
];

export function Plataformas() {
  return (
    <section id="plataformas" className="sec pad-x velo">
      <Aparece>
        <h2 className="disp h2 max-w-[16ch]">Meta y Google no hacen lo mismo</h2>
        <p className="lede mt-7">
          Una hace que te conozcan; la otra te encuentra cuando te buscan. Casi
          todos los negocios necesitan las dos, en distinta proporción. En el
          diagnóstico te decimos cuánto poner en cada una.
        </p>
      </Aparece>

      <div className="mt-[clamp(40px,5vw,64px)] grid gap-3 min-[900px]:grid-cols-2">
        {PLATAFORMAS.map((p, i) => (
          <Aparece key={p.nombre} delay={i * 0.05} className="h-full">
            <article className="flex h-full flex-col border border-ink/25 vidrio p-[clamp(26px,3.4vw,48px)]">
              <div className="mono !text-[11px] text-ink-soft">{p.rol}</div>
              <h3 className="disp mt-2.5 text-[clamp(40px,5.4vw,68px)] leading-[0.9] tracking-[-0.04em]">
                {p.nombre}
              </h3>
              <p className="mt-5 max-w-[40ch] text-[16px] leading-relaxed">{p.bajada}</p>

              <ul className="mt-7 flex flex-wrap gap-2" aria-label={`Dónde aparecen los anuncios de ${p.nombre}`}>
                {p.donde.map((d) => (
                  <li key={d} className="border border-ink/25 px-3 py-1.5 text-[13.5px] text-ink-soft">
                    {d}
                  </li>
                ))}
              </ul>

              {/* mt-auto + pt-7: queda al pie aunque las dos columnas
                  tengan textos de distinto largo, y nunca pegado. */}
              <div className="mt-auto pt-7">
                <div className="border-t border-[var(--rule)] pt-5">
                  <div className="text-[13px] font-semibold">Sirve sobre todo para</div>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{p.sirve}</p>
                </div>
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
  ["Antes de empezar", "Diagnóstico", "Miramos tu negocio, tu competencia y tus cuentas, si ya tenés. Qué está roto, qué funciona y dónde está la oportunidad más rápida. Sin cargo y sin compromiso."],
  ["Semana 1", "Medición y estrategia", "Dejamos instalados el píxel, la API de Conversiones y las conversiones de Google, y armamos el plan: objetivos, presupuesto, públicos y palabras clave."],
  ["Semana 2", "Lanzamiento", "Salen las campañas, con varias versiones de cada anuncio. Las primeras semanas sirven para aprender qué funciona, con los números a la vista."],
  ["Mes a mes", "Optimización y escala", "Cortamos lo que no vende y le damos más presupuesto a lo que sí. Cuando el costo por cliente es estable, subimos la inversión con criterio."],
];

export function Metodo() {
  return (
    <section id="como" className="sec pad-x on-c">
      <div className="grid items-start gap-[clamp(36px,6vw,90px)] lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-[120px]">
          <h2 className="disp h2">Primero se mide, después se escala</h2>
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

/* ══════════ CÓMO SE COBRA ══════════
   La gestión no tiene un precio único publicado: depende de cuántas
   plataformas y campañas. Si se fija un piso, va en HONORARIO_DESDE
   (lib/site.ts) y aparece en la tarjeta. Lo que sí queda claro acá
   es la estructura: nuestros honorarios por un lado y la inversión
   en anuncios, que se le paga directo a Meta y Google, por el otro. */

const ENTRA = [
  "Estrategia y reparto del presupuesto entre Meta y Google",
  "Armado y gestión diaria de las campañas",
  "Anuncios: imágenes, videos cortos y textos",
  "Píxel, API de Conversiones y conversiones de Google instalados",
  "Pruebas constantes de anuncios, públicos y palabras clave",
  "Reporte mensual en una página y una reunión para repasarlo",
  "Atención por WhatsApp, de lunes a sábado",
];

/* Lo que no hacemos: la agencia vende solo publicidad. */
const NO_ENTRA = [
  "Diseño y desarrollo de webs",
  "Manejo de redes y publicaciones orgánicas",
  "Sesiones de fotos o filmaciones en tu negocio",
  "La inversión en anuncios, que va directo a Meta y Google",
];

export function Precio() {
  return (
    <section id="precio" className="sec pad-x">
      <Aparece>
        <h2 className="disp h2 max-w-[15ch]">Cómo se cobra, sin letra chica</h2>
        <p className="lede mt-7">
          Dos cosas separadas: nuestros honorarios por la gestión, y lo que
          invertís en anuncios, que le pagás directo a Meta y a Google con tu
          tarjeta. Esa plata nunca pasa por nosotros.
        </p>
      </Aparece>

      <div className="mt-[clamp(40px,5vw,64px)] grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <Aparece delay={0.05} className="h-full">
          <div className="flex h-full flex-col border border-ink/70 p-[clamp(26px,3.6vw,52px)] vidrio">
            <div className="disp text-[clamp(20px,2.2vw,24px)] tracking-[-0.015em]">Gestión mensual</div>
            {HONORARIO_DESDE ? (
              <>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-[15px] text-ink-soft">desde</span>
                  <span className="disp text-[clamp(44px,6.4vw,84px)] leading-[0.82] tracking-[-0.04em]">
                    {HONORARIO_DESDE}
                  </span>
                </div>
                <div className="mt-4 text-[15px] text-ink-soft">
                  Por mes, sin contrato de permanencia
                </div>
              </>
            ) : (
              <>
                <div className="disp mt-6 text-[clamp(30px,4vw,48px)] leading-[0.95] tracking-[-0.03em]">
                  Un honorario fijo por mes
                </div>
                <div className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                  Te lo pasamos por escrito después del diagnóstico, según cuántas
                  plataformas y campañas necesites. Sin contrato de permanencia.
                </div>
              </>
            )}

            <ul className="mt-8 flex-1">
              {ENTRA.map((x) => (
                <li key={x} className="flex gap-3.5 border-t border-[var(--rule)] py-3 text-[15px] leading-snug">
                  <span className="mono !text-[13px] !tracking-normal shrink-0 text-ink">+</span>
                  {x}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <WaLink msg={MSG_AGENCIA} className="btn">
                Pedir el diagnóstico
                <Arrow />
              </WaLink>
            </div>
          </div>
        </Aparece>

        <div className="flex flex-col gap-3">
          <Aparece delay={0.07}>
            <div className="border border-ink vidrio-claro p-[clamp(26px,3.6vw,52px)] text-bone">
              <div className="flex items-baseline justify-between gap-4">
                <div className="disp text-[clamp(20px,2.2vw,24px)] tracking-[-0.015em]">Diagnóstico</div>
                <div className="disp text-[clamp(32px,4vw,46px)] leading-none tracking-[-0.03em]">$0</div>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-bone/65">
                Una llamada y una revisión de tus cuentas. Te llevás qué está
                fallando y cuánto conviene invertir, contrates o no.
              </p>
            </div>
          </Aparece>

          {/* De su alto natural: estirada hasta el pie de la tarjeta de
              la gestión quedaba media caja vacía. */}
          <Aparece delay={0.09}>
            <div className="border border-ink/25 bg-bone/30 p-[clamp(26px,3.6vw,52px)]">
              <div className="text-[15px] font-semibold">Esto no lo hacemos</div>
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
                Nos dedicamos <b className="font-semibold text-ink">solo a la publicidad paga</b>.
                Si tu web o tus fotos frenan las ventas, te lo decimos y te
                orientamos, pero no las hacemos nosotros.
              </p>
            </div>
          </Aparece>
        </div>
      </div>
    </section>
  );
}

/* ══════════ PREGUNTAS ══════════
   El texto plano de cada respuesta vive también en FAQ_SCHEMA
   (lib/site.ts), que alimenta el schema de Google. Si cambiás una,
   cambiala en los dos lados. */

const QA: [string, React.ReactNode][] = [
  ["¿Cuánto tengo que invertir en anuncios?",
   <>Depende de tu rubro, tu zona y lo que quieras conseguir, y te lo decimos <b>con números en el diagnóstico</b>. Esa inversión la pagás vos directo a Meta o a Google, con tu tarjeta y desde una cuenta a tu nombre: no pasa por nosotros. Nuestros honorarios van aparte.</>],
  ["¿Meta o Google?",
   <>Hacen cosas distintas. Google te muestra a quien <b>ya está buscando</b> lo que vendés; Meta (Facebook, Instagram y WhatsApp) le muestra tu negocio a gente que todavía no te buscaba pero se parece a tu cliente. La mayoría de los negocios necesita las dos en distinta proporción, y en el diagnóstico te decimos por dónde empezar.</>],
  ["¿Las cuentas quedan a mi nombre?",
   <>Sí. La cuenta publicitaria, el píxel, las audiencias y las campañas <b>son tuyas</b>. Trabajamos con un acceso que nos das y que podés quitar cuando quieras. Si un día dejás de trabajar con nosotros, te quedás con todo el historial.</>],
  ["¿En cuánto tiempo se ven resultados?",
   <>Las primeras consultas pueden llegar en la primera semana, pero las campañas necesitan unas semanas de datos para estabilizarse. Contá con <b>uno o dos meses</b> para saber, con números, cuánto te cuesta cada cliente. Nadie serio te puede garantizar un resultado; lo que sí vas a tener es cada número a la vista.</>],
  ["¿Hay contrato de permanencia?",
   <>No. Trabajamos <b>mes a mes</b> y podés darte de baja cuando quieras, avisando antes de que empiece el mes siguiente.</>],
  ["¿Necesito tener una web?",
   <>No siempre. En Meta las consultas pueden llegar <b>directo a tu WhatsApp</b> o a un formulario dentro de Facebook e Instagram. En Google conviene tener una página a donde mandar a la gente; si la tuya frena las ventas, te decimos qué cambiar. Webs no hacemos: nos dedicamos solo a la publicidad.</>],
  ["¿Cómo se paga?",
   <>Los honorarios se pagan <b>por mes</b>, con Mercado Pago, transferencia bancaria o USDT. La inversión en anuncios la cobran Meta y Google directamente a tu tarjeta.</>],
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
        <span className="pregunta__icono shrink-0 text-ink-soft" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {/* Se anima pero nunca se desmonta: si se desmontara, Google no
          vería la respuesta y perderíamos el contenido de cola larga. */}
      <div className={`pregunta__resp ${abierta ? "pregunta__resp--abierta" : ""}`}>
        <div>
          <div className="max-w-[64ch] pb-7 pr-8 text-[15.5px] leading-relaxed text-ink-soft [&_b]:font-semibold [&_b]:text-ink">
            {a}
          </div>
        </div>
      </div>
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
          <h2 className="disp h2">¿Hablamos de tus campañas?</h2>
        </div>
        <p className="lede mt-7">
          Contanos qué vendés y si hoy invertís en publicidad. Coordinamos una
          llamada de diagnóstico, sin cargo y sin compromiso, y te decimos con
          números por dónde empezar.
        </p>
        <div className="mt-9">
          <WaLink msg={`${MSG_AGENCIA} Mi negocio es:`} className="btn">
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
