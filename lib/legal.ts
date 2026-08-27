/* ═══════════════════════════════════════════════════════════
   Datos legales del titular del sitio.

   ⚠️  COMPLETAR ANTES DE PUBLICAR. Una página de términos con
   datos de relleno es peor que no tenerla: se ve que salió de
   una plantilla y, si alguien reclama, no identifica a nadie.

   Los tres primeros son obligatorios para que los términos y la
   política de privacidad tengan valor:
   - razón social o nombre completo del titular
   - CUIT o CUIL
   - domicilio (puede ser el fiscal)
   ═══════════════════════════════════════════════════════════ */

export const TITULAR = {
  /** Razón social, o tu nombre y apellido si facturás como persona física. */
  nombre: "[COMPLETAR: razón social o nombre completo]",
  /** CUIT o CUIL, con guiones. */
  cuit: "[COMPLETAR: CUIT / CUIL]",
  /** Domicilio. Alcanza el fiscal; no hace falta que sea una oficina. */
  domicilio: "[COMPLETAR: domicilio], Ciudad Autónoma de Buenos Aires, Argentina",
  /** Casilla donde recibís reclamos, bajas y ejercicio de derechos. */
  email: "hola@tucontenido.ar",
  /** Nombre comercial, el que ve el cliente. */
  marca: "Tu Contenido",
};

/** Última revisión de los textos legales. Actualizar al cambiarlos. */
export const VIGENCIA = "27 de agosto de 2026";

/** Plazo de arrepentimiento que fija la Ley 24.240, art. 34. */
export const DIAS_ARREPENTIMIENTO = 10;

export const PAGINAS_LEGALES = [
  { href: "/legal/terminos", titulo: "Términos y condiciones" },
  { href: "/legal/privacidad", titulo: "Política de privacidad" },
  { href: "/legal/cookies", titulo: "Política de cookies" },
  { href: "/legal/arrepentimiento", titulo: "Arrepentimiento y baja" },
];
