import type { Metadata } from "next";
import { Entrega } from "@/components/site/entrega";

/* Herramienta interna y hoja para el cliente. No tiene que aparecer
   en Google ni compartir señal con la home. */
export const metadata: Metadata = {
  title: "Hoja de entrega — Tu Contenido",
  description:
    "Lo que tenés que saber de tu sitio nuevo: el dominio, cómo hacerle cambios y cómo seguir sin depender de nadie.",
  robots: { index: false, follow: false },
};

export default function PaginaEntrega() {
  return (
    <main className="pad-x min-h-svh py-20 sm:py-24">
      <Entrega />
    </main>
  );
}
