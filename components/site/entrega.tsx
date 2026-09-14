"use client";

import { useEffect, useState } from "react";
import { wa } from "@/lib/site";

/* ═══════════════════════════════════════════════════════════
   Hoja de entrega.

   Se genera por cliente con parámetros en la URL y se manda por
   WhatsApp el día que se termina el trabajo. Dos minutos de
   armado.

   Hace dos trabajos a la vez: cierra el proyecto dejando por
   escrito lo único que el cliente necesita saber, y pide el
   referido en el único momento en que pedirlo no es incómodo —
   cuando acaba de recibir algo que le gustó.

   Ejemplo:
   /entrega?n=Consultorio+Pérez&d=consultorioperez.com.ar
           &v=2027-03-15&u=https://consultorioperez.com.ar
   ═══════════════════════════════════════════════════════════ */

type Datos = {
  nombre: string;
  dominio: string;
  vence: string;
  url: string;
};

const VACIO: Datos = { nombre: "", dominio: "", vence: "", url: "" };

function leerParams(): Datos {
  if (typeof window === "undefined") return VACIO;
  const p = new URLSearchParams(location.search);
  return {
    nombre: p.get("n") || "",
    dominio: p.get("d") || "",
    vence: p.get("v") || "",
    url: p.get("u") || "",
  };
}

function fechaLarga(iso: string) {
  if (!iso) return "";
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return iso;
  const meses = ["enero","febrero","marzo","abril","mayo","junio","julio",
                 "agosto","septiembre","octubre","noviembre","diciembre"];
  return `${Number(m[3])} de ${meses[Number(m[2]) - 1]} de ${m[1]}`;
}

function Punto({ n, titulo, children }: { n: number; titulo: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[2.2rem_1fr] items-start gap-x-4 border-t border-[var(--rule)] py-6 sm:grid-cols-[3rem_1fr] sm:gap-x-7">
      <span className="mono !text-[11px] pt-1 text-ink-soft">
        {String(n).padStart(2, "0")}
      </span>
      <div>
        <h2 className="disp mb-2 text-[19px] leading-tight tracking-[-0.015em] sm:text-[22px]">
          {titulo}
        </h2>
        <div className="text-[15.5px] leading-relaxed text-ink-soft [&_b]:font-semibold [&_b]:text-ink">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Entrega() {
  const [d, setD] = useState<Datos>(VACIO);
  useEffect(() => setD(leerParams()), []);

  const sinDatos = !d.nombre && !d.dominio;

  return (
    <div className="mx-auto w-full max-w-[46rem]">
      {sinDatos ? (
        <ComoUsar />
      ) : (
        <>
          <p className="mono !text-[11px] text-ink-soft">Tu sitio ya está online</p>
          <h1 className="disp mt-3 text-[clamp(30px,6.5vw,54px)] leading-[1.02] tracking-[-0.028em]">
            {d.nombre || "Tu negocio"}
          </h1>

          {d.url && (
            <a
              href={d.url}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex items-center gap-2.5 border border-ink/30 px-5 py-3 text-[15px] transition-colors hover:border-ink"
            >
              {d.dominio || d.url.replace(/^https?:\/\//, "")}
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M3 10 10 3M4.5 3H10v5.5" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </a>
          )}

          <p className="mt-9 max-w-[58ch] text-[16px] leading-relaxed text-ink-soft">
            Tres cosas para que sepas, y ninguna es técnica. Guardá esta página:
            es lo único que vas a necesitar.
          </p>

          <div className="mt-8">
            <Punto n={1} titulo="El dominio es tuyo, y se renueva una vez al año">
              <p>
                {d.dominio && <><b>{d.dominio}</b> está registrado a tu nombre. </>}
                {d.vence ? (
                  <>Vence el <b>{fechaLarga(d.vence)}</b>. </>
                ) : null}
                Si no se renueva, el sitio deja de estar online. Te aviso un mes
                antes para que no se te pase, pero el recordatorio es una cortesía:
                la renovación depende de vos.
              </p>
            </Punto>

            <Punto n={2} titulo="Los cambios los hacés vos">
              <p>
                Textos, fotos, precios, horarios y datos de contacto los cambiás
                desde tu cuenta, como te enseñé en la entrega. No tenés que pedirle
                permiso a nadie ni esperar a que te contesten. Si te olvidás cómo
                se hacía algo, escribime y te lo explico de nuevo,{" "}
                <b>sin costo</b>.
              </p>
              <p className="mt-2">
                Secciones nuevas o rediseños son otra cosa y te los presupuesto
                antes de tocar nada.
              </p>
            </Punto>

            <Punto n={3} titulo="Si algún día no querés seguir conmigo">
              <p>
                No hay nada que reclamar ni permiso que pedir. El dominio ya es
                tuyo, y los archivos del sitio te los paso el día que los pidas
                para que se los des a quien quieras.{" "}
                <b>No quedás atado a mí por nada.</b>
              </p>
            </Punto>
          </div>

          <Referido nombre={d.nombre} />

          <p className="mono !text-[11px] mt-14 border-t border-[var(--rule)] pt-6 leading-relaxed text-ink-soft/70">
            Guardá esta página o mandátela a vos mismo. Tiene todo lo que necesitás.
          </p>
        </>
      )}
    </div>
  );
}

/* El referido va acá y no antes: es el único momento en que pedirlo
   no incomoda, porque el cliente acaba de recibir algo que le gustó. */
function Referido({ nombre }: { nombre: string }) {
  return (
    <div className="mt-14 border border-ink/25 p-6 sm:p-8">
      <h2 className="disp text-[20px] leading-tight tracking-[-0.018em] sm:text-[23px]">
        ¿Conocés a alguien a quien le sirva?
      </h2>
      <p className="mt-3 max-w-[58ch] text-[15.5px] leading-relaxed text-ink-soft">
        No hago publicidad. Trabajo casi todo por recomendación, así que si se te
        ocurre alguien —un colega, alguien del rubro, el de al lado— pasale el
        contacto o pasame el suyo. Es la forma más directa de devolverme el favor,
        y no te cuesta nada.
      </p>
      <a
        href={wa(
          `Hola! Soy ${nombre || "un cliente"}. Te quiero recomendar a alguien que necesita una web.`
        )}
        target="_blank"
        rel="noopener"
        className="btn mt-6 min-h-[52px] justify-center text-[15px]"
      >
        Recomendar a alguien
      </a>
    </div>
  );
}

/* Lo que ve el dueño cuando abre la página sin parámetros. */

const DOMINIO = /^(?!https?:)[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i;

/* Devuelve el error de cada campo, o null. Un campo vacío no es
   error mientras no sea obligatorio: solo el nombre lo es. */
function validar(f: { n: string; d: string; v: string; u: string }) {
  return {
    n: f.n.trim() ? null : "Falta el nombre del negocio.",
    d: !f.d || DOMINIO.test(f.d.trim()) ? null : "Escribilo sin https:// ni barras, así: consultorioperez.com.ar",
    v: !f.v || !Number.isNaN(new Date(f.v).getTime()) ? null : "La fecha no es válida.",
    u: !f.u || /^https?:\/\/[^\s.]+\.[^\s]+$/i.test(f.u.trim()) ? null : "Tiene que empezar con https://",
  };
}

function Campo({
  id,
  error,
  mostrar,
  ...rest
}: { id: string; error: string | null; mostrar: boolean } & React.ComponentPropsWithoutRef<"input">) {
  const conError = mostrar && !!error;
  return (
    <div className="flex flex-col gap-1.5">
      <input
        id={id}
        aria-label={rest["aria-label"] ?? rest.placeholder}
        aria-invalid={conError}
        aria-describedby={conError ? `${id}-error` : undefined}
        className={`min-h-[52px] w-full border bg-transparent px-4 text-[15px] outline-none transition-colors placeholder:text-ink-soft/60 ${
          conError ? "border-[#ff7a6b] focus:border-[#ff7a6b]" : "border-ink/30 focus:border-ink"
        }`}
        {...rest}
      />
      {conError && (
        <p id={`${id}-error`} role="alert" className="text-[13.5px] leading-snug text-[#ff7a6b]">
          {error}
        </p>
      )}
    </div>
  );
}

function ComoUsar() {
  const [f, setF] = useState({ n: "", d: "", v: "", u: "" });
  /* El error de un campo aparece cuando se sale de él, no mientras
     se escribe: nadie quiere un cartel rojo en la segunda letra. */
  const [tocado, setTocado] = useState<Record<string, boolean>>({});
  const [copia, setCopia] = useState<"" | "ok" | "error">("");
  const errores = validar(f);
  const valido = !Object.values(errores).some(Boolean);

  const link =
    typeof window !== "undefined"
      ? `${location.origin}/entrega/?n=${encodeURIComponent(f.n.trim())}&d=${encodeURIComponent(f.d.trim())}&v=${encodeURIComponent(f.v)}&u=${encodeURIComponent(f.u.trim())}`
      : "";

  const props = (k: keyof typeof f) => ({
    value: f[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setF({ ...f, [k]: e.target.value });
      setCopia("");
    },
    onBlur: () => setTocado((t) => ({ ...t, [k]: true })),
    error: errores[k],
    mostrar: !!tocado[k],
  });

  async function copiar() {
    try {
      await navigator.clipboard.writeText(link);
      setCopia("ok");
      window.setTimeout(() => setCopia(""), 1800);
    } catch {
      setCopia("error");
    }
  }

  return (
    <>
      <h1 className="disp text-[clamp(28px,6vw,44px)] leading-[1.04] tracking-[-0.028em]">
        Armar una hoja de entrega
      </h1>
      <p className="mt-5 max-w-[58ch] text-[16px] leading-relaxed text-ink-soft">
        Completá los datos y copiá el enlace. Se lo mandás al cliente por
        WhatsApp el día que termina el trabajo.
      </p>

      <div className="mt-9 flex flex-col gap-3">
        <Campo id="n" placeholder="Nombre del negocio" autoComplete="off" {...props("n")} />
        <Campo id="d" placeholder="Dominio (consultorioperez.com.ar)" autoComplete="off" {...props("d")} />
        <label htmlFor="v" className="mono !text-[11px] mt-1 text-ink-soft">
          Vencimiento del dominio
        </label>
        <Campo id="v" type="date" {...props("v")} />
        <Campo id="u" type="url" placeholder="URL del sitio (https://...)" autoComplete="off" {...props("u")} />
      </div>

      {f.n.trim() && (
        <div className="mt-8 border border-ink/25 p-5">
          <p className="mono !text-[11px] mb-3 text-ink-soft">El enlace para mandarle</p>
          {valido ? (
            <p className="break-all font-mono text-[13px] leading-relaxed">{link}</p>
          ) : (
            <p className="text-[14.5px] leading-relaxed text-[#ff7a6b]">
              Corregí los campos marcados para generar el enlace.
            </p>
          )}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={copiar}
              disabled={!valido}
              className="btn min-h-[48px] px-6 text-[14px] disabled:pointer-events-none disabled:opacity-40"
            >
              {copia === "ok" ? "Copiado" : "Copiar enlace"}
            </button>
            {valido && (
              <a href={link} className="btn btn-line min-h-[48px] px-6 text-[14px]">
                Ver cómo queda
              </a>
            )}
            {copia === "error" && (
              <p role="alert" className="text-[13.5px] text-[#ff7a6b]">
                No se pudo copiar. Seleccioná el enlace y copialo a mano.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
