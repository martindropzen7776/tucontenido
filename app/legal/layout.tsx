import Link from "next/link";
import { PAGINAS_LEGALES, VIGENCIA, TITULAR } from "@/lib/legal";

/* Cáscara común de las páginas legales: una columna angosta, tipografía
   de lectura larga y la navegación entre documentos al pie. */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="pad-x mx-auto min-h-svh max-w-[46rem] pb-24 pt-24">
      <Link
        href="/"
        className="mono !text-[11px] text-ink-soft underline underline-offset-4 transition-opacity hover:opacity-70"
      >
        ← Volver al inicio
      </Link>

      <div className="prosa mt-10">{children}</div>

      <nav className="mt-20 border-t border-[var(--rule)] pt-8">
        <ul className="flex flex-col gap-3">
          {PAGINAS_LEGALES.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="text-[15px] text-ink-soft underline underline-offset-4 transition-colors hover:text-ink"
              >
                {p.titulo}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mono !text-[11px] mt-8 leading-relaxed text-ink-soft/70">
          {TITULAR.marca} · Última actualización: {VIGENCIA}
        </p>
      </nav>
    </main>
  );
}
