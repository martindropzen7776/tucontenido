"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { crearSeguidor } from "@/lib/seguir";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

export interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/* Sin motion: la portada cargaba la librería entera para esto y dos
   efectos más. Mismo comportamiento: solo con mouse real y sin
   "reducir movimiento". */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const canHover = useHoverCapable();
  const seguidor = useRef<ReturnType<typeof crearSeguidor> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    seguidor.current = crearSeguidor(2, ([x, y]) => {
      el.style.transform = x || y ? `translate3d(${x}px, ${y}px, 0)` : "";
    });
    return () => seguidor.current?.parar();
  }, []);

  const activo = () => canHover && !matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !activo()) return;
    const rect = el.getBoundingClientRect();
    seguidor.current?.ir([
      (e.clientX - rect.left - rect.width / 2) * strength,
      (e.clientY - rect.top - rect.height / 2) * strength,
    ]);
  };

  const onLeave = () => seguidor.current?.ir([0, 0]);

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={cn("inline-block", className)}>
      {children}
    </div>
  );
}
