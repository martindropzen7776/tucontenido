import type { Metadata } from "next";
import { TITULAR, DIAS_ARREPENTIMIENTO } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Botón de arrepentimiento y baja — Tu Contenido",
  description:
    "Revocá la contratación o pedí la baja del servicio. Sin registro y sin trámites previos.",
  robots: { index: true, follow: true },
};

/* Disposición 954/2025 de la Subsecretaría de Defensa del Consumidor y
   Lealtad Comercial, vigente desde el 04/09/2025. Derogó las Resoluciones
   316/2018 y 424/2020 y unificó ambos botones. Exige que estén a simple
   vista, en lugar destacado y en el primer acceso, y prohíbe pedir
   registración previa o cualquier otro trámite. */

const ASUNTO_ARREPENTIMIENTO = encodeURIComponent("ARREPENTIMIENTO - Revocación de contratación");
const ASUNTO_BAJA = encodeURIComponent("BAJA DE SERVICIO");
const CUERPO = encodeURIComponent(
  [
    "Nombre y apellido:",
    "DNI o CUIT:",
    "Servicio contratado:",
    "Fecha de contratación:",
    "Teléfono de contacto:",
    "",
    "(No hace falta que expliques el motivo.)",
  ].join("\n")
);

export default function Arrepentimiento() {
  return (
    <>
      <h1>Arrepentimiento y baja de servicio</h1>

      <p>
        No necesitás registrarte, crear una cuenta ni hacer ningún trámite previo.
        Tocá el botón que corresponda, mandá el mensaje y listo.
      </p>

      <div className="no-prosa my-10 flex flex-col gap-3">
        <a
          href={`mailto:${TITULAR.email}?subject=${ASUNTO_ARREPENTIMIENTO}&body=${CUERPO}`}
          className="btn min-h-[60px] justify-center text-center text-[15px]"
        >
          BOTÓN DE ARREPENTIMIENTO
        </a>
        <a
          href={`mailto:${TITULAR.email}?subject=${ASUNTO_BAJA}&body=${CUERPO}`}
          className="btn btn-line min-h-[60px] justify-center text-center text-[15px]"
        >
          BOTÓN DE BAJA DE SERVICIO
        </a>
      </div>

      <h2>Arrepentimiento</h2>
      <p>
        Si contrataste a distancia, tenés <strong>{DIAS_ARREPENTIMIENTO} días
        corridos</strong> para revocar la aceptación sin dar ninguna explicación y
        sin costo alguno, contados desde la contratación del servicio. Es un derecho
        que te da el artículo 34 de la <strong>Ley 24.240</strong> de Defensa del
        Consumidor y que no se puede renunciar.
      </p>

      <h2>Baja</h2>
      <p>
        Si querés dar de baja un servicio en curso, usá el segundo botón. La baja se
        hace efectiva sin que tengamos que ofrecerte alternativas ni retenerte.
      </p>

      <h2>Qué pasa después</h2>
      <p>
        Dentro de las <strong>24 horas</strong> te respondemos por el mismo medio con
        un <strong>código de identificación</strong> de la solicitud, y tomamos las
        medidas para hacerla efectiva. Si correspondiera devolución de dinero, se
        hace por la misma vía por la que pagaste.
      </p>
      <p>
        Guardá ese código: es tu comprobante de que hiciste el pedido y de cuándo lo
        hiciste.
      </p>

      <h2>Si preferís escribirnos directamente</h2>
      <p>
        También vale un correo a <a href={`mailto:${TITULAR.email}`}>{TITULAR.email}</a>{" "}
        con la palabra ARREPENTIMIENTO o BAJA en el asunto. Y si querés dejar
        constancia formal, podés hacerlo por carta documento a{" "}
        {TITULAR.domicilio}.
      </p>

      <h2>Dónde reclamar si no te respondemos</h2>
      <p>
        Podés presentar un reclamo ante la autoridad de aplicación de Defensa del
        Consumidor a través del portal oficial{" "}
        <a href="https://autogestion.produccion.gob.ar/consumidores" target="_blank" rel="noopener">
          Ventanilla Única Federal de Defensa del Consumidor
        </a>
        .
      </p>
    </>
  );
}
