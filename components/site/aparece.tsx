"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════
   Aparece — el reveal de la página.

   Regla de diseño: el estado por defecto es el LEGIBLE. El
   contenido se renderiza visible y recién después de que el
   JavaScript confirma que está corriendo se lo esconde para
   animarlo. Si el JS no carga, falla lento, o el navegador no
   compone frames, la página se ve entera igual.

   La versión anterior hacía lo contrario: arrancaba en
   blur(12px) y solo el JS la volvía nítida. Cuando esa
   animación no completaba, la web quedaba borrosa para
   siempre. Por eso acá no hay ningún filtro: solo opacidad y
   un desplazamiento corto, que aunque queden trabados dejan
   el texto legible.
   ═══════════════════════════════════════════════════════════ */

const useIsoLayout = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Aparece({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [estado, setEstado] = useState<"sinJs" | "oculto" | "visible">("sinJs");

  /* Antes del primer pintado: si hay JS y el usuario no pidió menos
     movimiento, escondemos. Al correr antes de pintar, no parpadea. */
  useIsoLayout(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEstado("visible");
      return;
    }
    setEstado("oculto");
  }, []);

  useEffect(() => {
    if (estado !== "oculto") return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEstado("visible");
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);

    /* Red de seguridad: si al segundo y medio esto sigue escondido
       pero ya está a la vista, lo mostramos igual. Nada que el
       usuario tenga delante puede quedar invisible. */
    const t = window.setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 1.3) setEstado("visible");
    }, 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [estado]);

  const escondido = estado === "oculto";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: escondido ? 0 : 1,
        transform: escondido ? "translateY(16px)" : "none",
        transition:
          estado === "visible"
            ? `opacity 620ms cubic-bezier(.22,.61,.36,1) ${delay}s, transform 620ms cubic-bezier(.22,.61,.36,1) ${delay}s`
            : "none",
      }}
    >
      {children}
    </div>
  );
}
