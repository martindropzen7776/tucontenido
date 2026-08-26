"use client";

import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Marquee } from "@/components/motion/marquee";
import { EMAIL, INSTAGRAM } from "@/lib/site";
import { WaLink } from "./wa-link";

const NAV = [
  { href: "#diferencia", label: "La diferencia" },
  { href: "#incluye", label: "Qué incluye" },
  { href: "#dias", label: "Los 7 días" },
  { href: "#trabajos", label: "Trabajos" },
  { href: "#precio", label: "Precio" },
];

export function Nav() {
  return (
    <>
      <ScrollProgress variant="bar" position="top" height={3} className="!bg-cobalt z-[300]" />
      <nav className="pad-x fixed inset-x-0 top-0 z-[200] flex h-[68px] items-center justify-between gap-4 border-b border-[var(--rule)] bg-bone/90 backdrop-blur-md backdrop-saturate-150 max-[620px]:h-[60px]">
        <a href="#" className="disp tap text-[19px] tracking-[-0.03em]">
          tucontenido<i className="not-italic text-cobalt">.</i>
        </a>
        <div className="hidden gap-[34px] lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-cobalt"
            >
              {n.label}
            </a>
          ))}
        </div>
        <WaLink
          msg="Hola! Quiero mi web en 7 días."
          className="tap bg-cobalt px-5 py-[11px] text-[13px] font-semibold text-bone transition-colors hover:bg-ink max-[620px]:px-4 max-[620px]:text-xs"
        >
          Escribinos
        </WaLink>
      </nav>
    </>
  );
}

const CINTA = [
  "Diseño a medida",
  "Anda en el celular",
  "Textos incluidos",
  "WhatsApp integrado",
  "Sin cuota mensual",
  "Queda a tu nombre",
];

export function Cinta() {
  return (
    <div className="overflow-hidden bg-ink py-[15px] text-bone">
      <Marquee speed={38} pauseOnHover gap="0px">
        {CINTA.map((t) => (
          <span
            key={t}
            className="disp inline-flex items-center gap-[26px] whitespace-nowrap px-[18px] text-[13px] uppercase tracking-[0.02em] sm:px-[26px] sm:text-[15px]"
            style={{ fontStretch: "80%", fontWeight: 700 }}
          >
            {t}
            <span className="h-[7px] w-[7px] bg-acid" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="pad-x bg-ink pb-[30px] pt-[clamp(52px,6vw,76px)] text-bone">
      <div className="grid gap-[clamp(28px,4vw,60px)] border-b border-bone/15 pb-10 min-[620px]:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
        <div>
          <span className="disp text-[19px] tracking-[-0.03em]">
            tucontenido<i className="not-italic text-acid">.</i>
          </span>
          <p className="mt-3.5 max-w-[34ch] text-[15px] leading-relaxed text-bone/60">
            Diseñamos webs para negocios que quieren vender por internet sin quedar
            atados a una agencia. Siete días y queda a tu nombre.
          </p>
        </div>

        <div>
          <h5 className="mono !text-[11px] mb-4 text-bone/40">Servicio</h5>
          <ul>
            {NAV.slice(1, 4).map((n) => (
              <li key={n.href}>
                <a href={n.href} className="tap text-[15px] text-bone/60 hover:text-bone">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="mono !text-[11px] mb-4 text-bone/40">Contacto</h5>
          <ul>
            <li>
              <WaLink
                msg="Hola! Quiero consultar por una web."
                className="tap text-[15px] text-bone/60 hover:text-bone"
              >
                WhatsApp
              </WaLink>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="tap text-[15px] text-bone/60 hover:text-bone">
                Email
              </a>
            </li>
            {INSTAGRAM && (
              <li>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener"
                  className="tap text-[15px] text-bone/70 hover:text-acid"
                >
                  Instagram
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="mono !text-[11px] flex flex-wrap items-center justify-between gap-3.5 pt-6 text-bone/40">
        <span>© 2026 Tu Contenido · Argentina</span>
        <span>Hecha con este mismo proceso</span>
      </div>
    </footer>
  );
}

export function WaFab() {
  return (
    <WaLink
      msg="Hola! Quiero mi web en 7 días."
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-4 right-4 z-[900] inline-flex items-center gap-[11px] border-2 border-ink bg-ink px-[15px] py-3.5 text-sm font-semibold text-bone shadow-[5px_5px_0_rgba(244,244,241,0.2)] transition-transform hover:-translate-x-[3px] hover:-translate-y-[3px] sm:bottom-5 sm:right-5 sm:px-[22px]"
    >
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.16c-.25.69-1.43 1.32-1.99 1.4-.53.08-1.2.11-1.94-.12-.45-.14-1.02-.33-1.76-.65-3.1-1.34-5.12-4.46-5.28-4.67-.15-.21-1.26-1.67-1.26-3.19s.8-2.26 1.08-2.57c.28-.31.61-.39.82-.39.2 0 .41 0 .59.01.19.01.44-.07.69.53.25.6.86 2.12.94 2.27.08.16.13.34.02.55-.1.21-.16.34-.31.52-.16.18-.33.4-.47.54-.16.15-.32.32-.14.63.18.31.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.54.31.15.49.13.67-.08.18-.21.77-.9.98-1.21.2-.31.41-.26.69-.15.28.1 1.79.84 2.1.99.31.16.51.23.59.36.08.13.08.75-.17 1.44Z" />
      </svg>
      <span className="max-[600px]:hidden">WhatsApp</span>
    </WaLink>
  );
}
