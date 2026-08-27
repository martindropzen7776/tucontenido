import type { Metadata } from "next";
import { TITULAR } from "@/lib/legal";
import { BotonPreferencias } from "@/components/site/cookies";

export const metadata: Metadata = {
  title: "Política de cookies — Tu Contenido",
  description: "Qué cookies usamos, para qué, y cómo cambiar tu decisión.",
  robots: { index: true, follow: true },
};

export default function Cookies() {
  return (
    <>
      <h1>Política de cookies</h1>

      <p>
        Una cookie es un archivo chico que un sitio guarda en tu navegador. Sirve
        para recordar cosas entre visitas. Acá usamos las mínimas, y te contamos
        exactamente cuáles.
      </p>

      <h2>Las que usamos</h2>

      <h3>Necesarias</h3>
      <p>
        Guardamos una sola cosa en tu navegador sin pedirte permiso:{" "}
        <strong>tu propia decisión sobre las cookies</strong>. Si no la guardáramos,
        tendríamos que preguntarte en cada visita. No se comparte con nadie y no
        identifica a nadie.
      </p>

      <h3>De medición y publicidad</h3>
      <p>
        Si las aceptás, se carga el <strong>píxel de Meta</strong> (Facebook e
        Instagram). Sirve para dos cosas: saber qué anuncios traen consultas reales y
        cuáles son plata tirada, y no volver a mostrarte un anuncio si ya nos
        escribiste.
      </p>
      <p>
        El píxel registra qué páginas viste, en qué paso del cuestionario estás y si
        tocaste un botón de contacto, y lo asocia a un identificador de tu navegador
        que administra Meta.
      </p>
      <p>
        <strong>Si no las aceptás, el píxel no se carga.</strong> No queda esperando
        ni se activa después: directamente no se descarga el script. El sitio
        funciona igual, con todas sus funciones.
      </p>

      <h2>Cambiar tu decisión</h2>
      <p>
        Podés cambiarla cuando quieras, sin explicaciones y sin trámite:
      </p>
      <p>
        <BotonPreferencias />
      </p>
      <p>
        También podés borrar o bloquear cookies desde la configuración de tu
        navegador. Si borrás las de este sitio, te volvemos a preguntar en la
        próxima visita.
      </p>

      <h2>Cookies de terceros</h2>
      <p>
        Las cookies de medición las administra Meta Platforms, no nosotros. Su
        tratamiento se rige además por las políticas de esa compañía.{" "}
        <strong>
          No estamos asociados ni patrocinados por Meta ni por ninguna plataforma.
        </strong>
      </p>

      <h2>Consultas</h2>
      <p>
        Cualquier duda sobre esto, escribinos a{" "}
        <a href={`mailto:${TITULAR.email}`}>{TITULAR.email}</a>. Más detalle sobre
        qué datos tratamos y tus derechos, en la{" "}
        <a href="/legal/privacidad">política de privacidad</a>.
      </p>
    </>
  );
}
