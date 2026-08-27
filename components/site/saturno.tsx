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

   ── Sobre el rendimiento ──
   La primera versión ocupaba todo el hero: en un teléfono eso son
   750x2574 píxeles de buffer, o sea casi dos megapíxeles que se
   borraban y repintaban sesenta veces por segundo para dibujar en
   el 13% del área. La animación caía a unos pocos cuadros y se
   veía congelada.

   Ahora el canvas es un cuadrado del tamaño de los anillos, el
   devicePixelRatio se limita a 1.5 en pantallas chicas (las
   partículas son puntos de un píxel, no ganan nada con más) y en
   móvil corre a 30 cuadros por segundo, que en una órbita lenta
   es indistinguible de 60. Entre las tres, el trabajo por segundo
   baja más de veinte veces.
   ═══════════════════════════════════════════════════════════ */

type P = {
  a: number;      // ángulo en el anillo
  r: number;      // radio, en fracción del lado del canvas
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

    let lado = 0;
    let particulas: P[] = [];
    let raf = 0;
    let corriendo = false;
    let ultimo = 0;

    /* Cuatro bandas con un hueco en el medio: la División de Cassini
       es lo que hace que un anillo parezca "de Saturno" y no un aro. */
    const BANDAS = [
      { desde: 0.42, hasta: 0.58, densidad: 0.2, brillo: 0.3 },
      { desde: 0.6, hasta: 0.8, densidad: 0.34, brillo: 0.55 },
      // hueco (Cassini)
      { desde: 0.86, hasta: 1.02, densidad: 0.3, brillo: 0.42 },
      { desde: 1.06, hasta: 1.14, densidad: 0.16, brillo: 0.22 },
    ];

    function sembrar() {
      const total = chico.matches ? 700 : 1500;
      particulas = [];
      for (const b of BANDAS) {
        const n = Math.round(total * b.densidad);
        for (let i = 0; i < n; i++) {
          const r = b.desde + Math.random() * (b.hasta - b.desde);
          particulas.push({
            a: Math.random() * Math.PI * 2,
            r,
            vel: 0.055 / Math.pow(r, 1.5), // Kepler: más lejos, más lento
            brillo: b.brillo * (0.35 + Math.random() * 0.65),
            tam: Math.random() < 0.08 ? 1.9 : 1.05,
          });
        }
      }
    }

    function medir() {
      const rect = cv!.getBoundingClientRect();
      /* Las partículas son puntos de un píxel: por encima de 1.5 el
         buffer crece al cuadrado sin que se note la diferencia. */
      const dpr = Math.min(window.devicePixelRatio || 1, chico.matches ? 1.5 : 2);
      lado = Math.max(1, Math.round(Math.min(rect.width, rect.height)));
      cv!.width = Math.round(lado * dpr);
      cv!.height = Math.round(lado * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function pintar() {
      ctx!.clearRect(0, 0, lado, lado);

      const cx = lado / 2;
      const cy = lado / 2;
      const escala = lado * 0.42;

      const inclinacion = 0.3; // cuánto se achata la elipse
      const giro = -0.34; // rotación del plano, en radianes
      const cosG = Math.cos(giro);
      const senG = Math.sin(giro);
      const radioPlaneta = escala * 0.34;

      const dibujar = (soloLejos: boolean) => {
        for (const p of particulas) {
          const lejos = Math.sin(p.a) < 0;
          if (lejos !== soloLejos) continue;
          const x = Math.cos(p.a) * p.r * escala;
          const y = Math.sin(p.a) * p.r * escala * inclinacion;
          const px = cx + x * cosG - y * senG;
          const py = cy + x * senG + y * cosG;
          const prof = (Math.sin(p.a) + 1) / 2; // 0 lejos, 1 cerca
          ctx!.globalAlpha = p.brillo * (0.45 + prof * 0.55);
          const s = p.tam * (0.75 + prof * 0.35);
          ctx!.fillRect(px - s / 2, py - s / 2, s, s);
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

      ctx!.globalAlpha = 0.5;
      ctx!.strokeStyle = "#3A3A46";
      ctx!.lineWidth = 1;
      ctx!.stroke();

      // 3 · lo que pasa por delante
      ctx!.fillStyle = "#FFFFFF";
      dibujar(false);

      ctx!.globalAlpha = 1;
    }

    /* En móvil, 30 cuadros por segundo. La órbita es lenta: nadie
       distingue la diferencia y el teléfono hace la mitad del trabajo. */
    const intervalo = chico.matches ? 1000 / 30 : 0;

    function paso(t: number) {
      if (!corriendo) return;
      raf = requestAnimationFrame(paso);
      if (intervalo && t - ultimo < intervalo) return;
      const dt = ultimo ? Math.min((t - ultimo) / 1000, 0.1) : 0.016;
      ultimo = t;
      for (const p of particulas) p.a += p.vel * dt;
      pintar();
    }

    function arrancar() {
      if (corriendo || menosMovimiento.matches) return;
      corriendo = true;
      ultimo = 0;
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

    /* Solo re-sembramos si el lado cambió de verdad. En móvil la barra
       de direcciones dispara resizes constantes al scrollear, y
       re-sembrar en cada uno reinicia las órbitas. */
    let ladoPrevio = lado;
    const ro = new ResizeObserver(() => {
      const antes = ladoPrevio;
      medir();
      if (Math.abs(lado - antes) > 8) {
        sembrar();
        ladoPrevio = lado;
      }
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
      className={`pointer-events-none absolute ${className}`}
    />
  );
}
