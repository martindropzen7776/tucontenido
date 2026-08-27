"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { PIXEL_ID } from "@/lib/site";

/* ═══════════════════════════════════════════════════════════
   Cookies y píxel.

   La regla que hace que esto no sea un cartel decorativo: si no
   aceptan, el script del píxel NO se descarga. No queda esperando
   ni se activa después — directamente no existe en la página.

   Eso tiene un costo real: vas a medir menos tráfico del que
   tenés, porque los que rechazan o ignoran el aviso quedan fuera
   de la medición. Es lo que dice la política, así que es lo que
   tiene que hacer el código.
   ═══════════════════════════════════════════════════════════ */

const CLAVE = "tc-cookies";
const EVENTO = "tc-cookies-cambio";

type Decision = "aceptado" | "rechazado" | null;

function leer(): Decision {
  try {
    const v = localStorage.getItem(CLAVE);
    return v === "aceptado" || v === "rechazado" ? v : null;
  } catch {
    /* Modo privado o cookies bloqueadas: tratamos como sin decidir.
       Nunca asumir consentimiento cuando no se puede leer. */
    return null;
  }
}

function guardar(d: Exclude<Decision, null>) {
  try {
    localStorage.setItem(CLAVE, d);
  } catch {
    /* Si no se puede guardar, la decisión vale para esta visita. */
  }
  window.dispatchEvent(new CustomEvent(EVENTO, { detail: d }));
}

function useDecision() {
  const [decision, setDecision] = useState<Decision>(null);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setDecision(leer());
    setMontado(true);
    const alCambiar = (e: Event) => setDecision((e as CustomEvent).detail as Decision);
    window.addEventListener(EVENTO, alCambiar);
    return () => window.removeEventListener(EVENTO, alCambiar);
  }, []);

  return { decision, montado };
}

/* ── El píxel: solo existe si lo aceptaron ── */
export function Pixel() {
  const { decision } = useDecision();
  if (decision !== "aceptado") return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
      </Script>
    </>
  );
}

/* ── El aviso ── */
export function BannerCookies() {
  const { decision, montado } = useDecision();
  const [abiertoAMano, setAbiertoAMano] = useState(false);

  useEffect(() => {
    const abrir = () => setAbiertoAMano(true);
    window.addEventListener("tc-abrir-cookies", abrir);
    return () => window.removeEventListener("tc-abrir-cookies", abrir);
  }, []);

  /* Antes de montar no mostramos nada: el HTML prerenderizado es el
     mismo para todos y no queremos un parpadeo del aviso a quien ya
     decidió hace meses. */
  if (!montado) return null;
  if (decision !== null && !abiertoAMano) return null;

  const decidir = (d: Exclude<Decision, null>) => {
    guardar(d);
    setAbiertoAMano(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[1000] border-t border-ink/25 bg-bone-2 px-5 py-5 sm:px-8"
    >
      <div className="mx-auto flex max-w-[62rem] flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
        <p className="text-[14.5px] leading-relaxed text-ink-soft">
          Usamos cookies de medición para saber qué anuncios traen consultas reales
          y cuáles no. <strong className="font-semibold text-ink">Si las rechazás,
          el sitio funciona igual</strong> y no se carga ningún rastreador.{" "}
          <a href="/legal/cookies" className="underline underline-offset-4 hover:text-ink">
            Cómo funcionan
          </a>
          .
        </p>

        <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
          <button type="button" onClick={() => decidir("rechazado")} className="btn btn-line min-h-[48px] justify-center px-6 text-[14px]">
            Rechazar
          </button>
          <button type="button" onClick={() => decidir("aceptado")} className="btn min-h-[48px] justify-center px-6 text-[14px]">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Reabrir el aviso desde la política de cookies ── */
export function BotonPreferencias() {
  const { decision, montado } = useDecision();
  const estado = !montado
    ? ""
    : decision === "aceptado"
      ? " (ahora: aceptadas)"
      : decision === "rechazado"
        ? " (ahora: rechazadas)"
        : " (todavía no elegiste)";

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("tc-abrir-cookies"))}
      className="underline underline-offset-4 hover:opacity-70"
    >
      Cambiar mi decisión sobre las cookies{estado}
    </button>
  );
}
