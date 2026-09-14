/* ═══════════════════════════════════════════════════════════
   Lo que el calificador le pasa a /gracias.

   Viaja por sessionStorage y no por la URL: el mensaje lleva el
   nombre y las respuestas del prospecto, y una URL con eso queda
   en el historial, en los registros del servidor y en el píxel.
   ═══════════════════════════════════════════════════════════ */

const CLAVE = "tc-lead";

export type Lead = {
  /** El link de WhatsApp con el mensaje ya armado, por si no se abrió. */
  link: string;
  nombre: string;
  llamada: boolean;
};

export function guardarLead(lead: Lead) {
  try {
    sessionStorage.setItem(CLAVE, JSON.stringify(lead));
  } catch {
    /* Modo privado o almacenamiento bloqueado: /gracias muestra la
       versión genérica, que igual sirve. */
  }
}

export function leerLead(): Lead | null {
  try {
    const v = sessionStorage.getItem(CLAVE);
    return v ? (JSON.parse(v) as Lead) : null;
  } catch {
    return null;
  }
}
