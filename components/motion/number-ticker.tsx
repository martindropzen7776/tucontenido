"use client";
// Reescrito sin motion: cada dígito es una columna 0-9 que sube con una
// transición de CSS. Misma interfaz que la versión de beui (blur incluido).

import { useEffect, useMemo, useRef, useState } from "react";
import { EASE_OUT_CSS } from "@/lib/ease";
import { cn } from "@/lib/utils";

export interface NumberTickerProps {
  value: number;
  pad?: number;
  duration?: number;
  stagger?: number;
  startOnView?: boolean;
  prefix?: string;
  suffix?: string;
  blur?: boolean;
  className?: string;
  digitClassName?: string;
  locale?: boolean;
  format?: (value: number) => string;
}

const DIGIT_HEIGHT_EM = 1.1;
const DIGITS = Array.from({ length: 10 }, (_, n) => n);

export function NumberTicker({
  value,
  pad,
  duration = 0.9,
  stagger = 0.04,
  startOnView = true,
  prefix,
  suffix,
  blur = false,
  className,
  digitClassName,
  locale,
  format,
}: NumberTickerProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [armed, setArmed] = useState(!startOnView);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = containerRef.current;
    if (!startOnView || !el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [startOnView]);

  const text = useMemo(() => {
    const rounded = Math.round(value);
    const formatted = format ? format(rounded) : locale ? rounded.toLocaleString() : rounded.toString();
    return pad ? formatted.padStart(pad, "0") : formatted;
  }, [value, pad, format, locale]);
  const glyphs = useMemo(() => {
    const chars = text.split("");
    return chars.map((char, i) => ({ char, id: `g-${chars.length - 1 - i}` }));
  }, [text]);
  const readableText = `${prefix ?? ""}${text}${suffix ?? ""}`;

  return (
    <span ref={containerRef} className={cn("inline-flex items-center tabular-nums", className)}>
      <span className="sr-only">{readableText}</span>
      <span aria-hidden="true" className="inline-flex items-center">
        {prefix ? <span>{prefix}</span> : null}
        {glyphs.map(({ char, id }, i) => {
          if (!/\d/.test(char)) {
            return (
              <span key={id} className="inline-block">
                {char}
              </span>
            );
          }
          const digit = armed ? Number(char) : 0;
          const t = reduce ? "none" : `transform ${duration}s ${EASE_OUT_CSS} ${i * stagger}s, filter ${Math.min(duration * 0.75, 0.32)}s ${EASE_OUT_CSS} ${i * stagger}s`;
          return (
            <span
              key={id}
              className={cn("relative inline-block overflow-hidden", digitClassName)}
              style={{ height: `${DIGIT_HEIGHT_EM}em`, width: "1ch" }}
            >
              <span
                className="absolute inset-x-0 top-0 flex flex-col items-center"
                style={{
                  transform: `translateY(-${digit * DIGIT_HEIGHT_EM}em)`,
                  filter: blur && !reduce && !armed ? "blur(10px)" : undefined,
                  transition: t,
                }}
              >
                {DIGITS.map((n) => (
                  <span key={n} className="flex h-[1.1em] items-center justify-center leading-none">
                    {n}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
        {suffix ? <span>{suffix}</span> : null}
      </span>
    </span>
  );
}
