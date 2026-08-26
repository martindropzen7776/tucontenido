"use client";

import { wa, trackContacto } from "@/lib/site";

/* Un solo componente para todos los puntos de contacto: el link se arma
   desde lib/site.ts y cada clic dispara el evento Contact del píxel. */
export function WaLink({
  msg,
  className,
  children,
  ...rest
}: {
  msg: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"a">, "href" | "children">) {
  return (
    <a
      href={wa(msg)}
      target="_blank"
      rel="noopener"
      className={className}
      onClick={trackContacto}
      {...rest}
    >
      {children}
    </a>
  );
}

export function Arrow() {
  return (
    <svg className="arw" width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden="true">
      <path d="M1 6h12M9 1.5 13.5 6 9 10.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
