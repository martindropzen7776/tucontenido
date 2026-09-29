"use client";
// beui.dev/components/motion/tilt-card, reescrito sin motion

import { useEffect, useRef, type ReactNode } from "react";
import { crearSeguidor } from "@/lib/seguir";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

export interface TiltCardProps {
  children: ReactNode;
  max?: number;
  glare?: boolean;
  className?: string;
}

export function TiltCard({ children, max = 12, glare = true, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const brillo = useRef<HTMLDivElement>(null);
  const canHover = useHoverCapable();
  const seguidor = useRef<ReturnType<typeof crearSeguidor> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    seguidor.current = crearSeguidor(2, ([rx, ry]) => {
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    return () => seguidor.current?.parar();
  }, []);

  const enabled = canHover && typeof window !== "undefined" && !matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !enabled) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    seguidor.current?.ir([(0.5 - py) * max, (px - 0.5) * max]);
    if (brillo.current) {
      brillo.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, var(--foreground), transparent 50%)`;
    }
  };

  const onLeave = () => seguidor.current?.ir([0, 0]);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)", transformStyle: "preserve-3d" }}
      className={cn("relative overflow-hidden rounded-2xl will-change-transform", className)}
    >
      {children}
      {glare && enabled ? (
        <div
          ref={brillo}
          aria-hidden
          style={{ background: "radial-gradient(circle at 50% 50%, var(--foreground), transparent 50%)" }}
          className="pointer-events-none absolute inset-0 opacity-15"
        />
      ) : null}
    </div>
  );
}
