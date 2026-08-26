"use client";

import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   Saturno.

   Anillos de partículas sobre una elipse inclinada. Tres cosas
   hacen que se lea como un planeta y no como un óvalo girando:

   1. Las partículas de la mitad lejana se dibujan ANTES que el
      disco, así el planeta las tapa. Las de la mitad cercana van
      después y pasan por delante. Esa oclusión es todo el efecto.
   2. Cada anillo gira más lento cuanto más lejos está, como manda
      Kepler. Si giraran todos igual parecería un disco rígido.
   3. La mitad lejana va más tenue y más chica: da profundidad.

   Es canvas 2D, sin librería. Se apaga solo cuando sale de
   pantalla y respeta prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════ */

type P = {
  a: number;      // ángulo en el anillo
  r: number;      // radio, en fracción del ancho de referencia
  vel: number;    // velocidad angular
  brillo: number;
  tam: number;
};

export function Saturno({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d", { alpha: true });
    if (!ctx) return;

    const menosMovimiento = matchMedia("(prefers-reduced-motion: reduce)");
    const chico = matchMedia("(max-width: 720px)");

    let ancho = 0;
    let alto = 0;
    let dpr = 1;
    let particulas: P[] = [];
    let raf = 0;
    let corriendo = false;
    let t = 0;

    /* Cuatro bandas con un hueco en el medio: la División de Cassini
       es lo que hace que un anillo parezca "de Saturno" y no un aro. */
    const BANDAS = [
      { desde: 0.42, hasta: 0.58, densidad: 0.20, brillo: 0.30 },
      { desde: 0.60, hasta: 0.80, densidad: 0.34, brillo: 0.55 },
      // hueco (Cassini)
      { desde: 0.86, hasta: 1.02, densidad: 0.30, brillo: 0.42 },
      { desde: 1.06, hasta: 1.14, densidad: 0.16, brillo: 0.22 },
    ];

    function sembrar() {
      const total = chico.matches ? 620 : 1500;
      particulas = [];
      for (const b of BANDAS) {
        const n = Math.round(total * b.densidad);
        for (let i = 0; i < n; i++) {
          const r = b.desde + Math.random() * (b.hasta - b.desde);
          particulas.push({
            a: Math.random() * Math.PI * 2,
            r,
            // Kepler: más lejos, más lento.
            vel: 0.055 / Math.pow(r, 1.5),
            brillo: b.brillo * (0.35 + Math.random() * 0.65),
            tam: Math.random() < 0.08 ? 1.9 : 1.05,
          });
        }
      }
    }

    function medir() {
      const rect = cv!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      ancho = Math.max(1, Math.round(rect.width));
      alto = Math.max(1, Math.round(rect.height));
      cv!.width = Math.round(ancho * dpr);
      cv!.height = Math.round(alto * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function pintar() {
      ctx!.clearRect(0, 0, ancho, alto);

      /* El sistema se ancla a la derecha y algo arriba: deja la
         columna izquierda libre para el texto. */
      const cx = ancho * (chico.matches ? 0.5 : 0.72);
      const cy = alto * (chico.matches ? 0.42 : 0.46);
      const escala = Math.min(ancho, alto) * (chico.matches ? 0.46 : 0.5);

      const inclinacion = 0.30;        // cuánto se achata la elipse
      const giro = -0.34;              // rotación del plano, en radianes
      const cosG = Math.cos(giro);
      const senG = Math.sin(giro);
      const radioPlaneta = escala * 0.34;

      const proyectar = (p: P) => {
        const x = Math.cos(p.a) * p.r * escala;
        const y = Math.sin(p.a) * p.r * escala * inclinacion;
        return {
          x: cx + x * cosG - y * senG,
          y: cy + x * senG + y * cosG,
          lejos: Math.sin(p.a) < 0,
          prof: (Math.sin(p.a) + 1) / 2, // 0 lejos, 1 cerca
        };
      };

      const dibujar = (soloLejos: boolean) => {
        for (const p of particulas) {
          const q = proyectar(p);
          if (q.lejos !== soloLejos) continue;
          const atenua = 0.45 + q.prof * 0.55;
          ctx!.globalAlpha = p.brillo * atenua;
          const s = p.tam * (0.75 + q.prof * 0.35);
          ctx!.fillRect(q.x - s / 2, q.y - s / 2, s, s);
        }
      };

      ctx!.fillStyle = "#FFFFFF";

      // 1 · lo que pasa por detrás del planeta
      dibujar(true);

      // 2 · el planeta: un disco negro con un borde apenas visible
      ctx!.globalAlpha = 1;
      const g = ctx!.createRadialGradient(
        cx - radioPlaneta * 0.35, cy - radioPlaneta * 0.4, radioPlaneta * 0.1,
        cx, cy, radioPlaneta
      );
      g.addColorStop(0, "#191920");
      g.addColorStop(0.72, "#0C0C10");
      g.addColorStop(1, "#08080B");
      ctx!.beginPath();
      ctx!.arc(cx, cy, radioPlaneta, 0, Math.PI * 2);
      ctx!.fillStyle = g;
      ctx!.fill();

      // borde: el planeta tiene que recortarse contra los anillos
      ctx!.globalAlpha = 0.5;
      ctx!.strokeStyle = "#3A3A46";
      ctx!.lineWidth = 1;
      ctx!.stroke();

      // 3 · lo que pasa por delante
      ctx!.fillStyle = "#FFFFFF";
      dibujar(false);

      ctx!.globalAlpha = 1;
    }

    function paso() {
      if (!corriendo) return;
      t += 1;
      for (const p of particulas) p.a += p.vel * 0.016;
      pintar();
      raf = requestAnimationFrame(paso);
    }

    function arrancar() {
      if (corriendo || menosMovimiento.matches) return;
      corriendo = true;
      raf = requestAnimationFrame(paso);
    }
    function frenar() {
      corriendo = false;
      cancelAnimationFrame(raf);
    }

    medir();
    sembrar();
    pintar();

    /* Fuera de pantalla no se anima: no tiene sentido gastar batería
       dibujando algo que nadie ve. */
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? arrancar() : frenar()),
      { threshold: 0 }
    );
    io.observe(cv);

    const ro = new ResizeObserver(() => {
      medir();
      sembrar();
      pintar();
    });
    ro.observe(cv);

    const alCambiarPreferencia = () => {
      if (menosMovimiento.matches) {
        frenar();
        pintar();
      } else arrancar();
    };
    menosMovimiento.addEventListener("change", alCambiarPreferencia);

    return () => {
      frenar();
      io.disconnect();
      ro.disconnect();
      menosMovimiento.removeEventListener("change", alCambiarPreferencia);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
