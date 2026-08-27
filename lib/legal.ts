/* ═══════════════════════════════════════════════════════════
   Datos del titular del sitio.

   Decisión tomada: NO publicamos CUIT ni domicilio. En un sitio
   abierto esos datos quedan expuestos a cualquiera, y para quien
   trabaja desde su casa el domicilio fiscal y el particular son
   el mismo.

   La identificación se resuelve con nombre comercial + una casilla
   que funciona + el compromiso de entregar los datos fiscales
   completos a quien los pida. Es la práctica habitual de los
   proveedores de servicios chicos en Argentina.

   El canal de arrepentimiento y baja, que sí es obligatorio por la
   Disposición 954/2025, sigue funcionando por email sin registro
   previo — que es lo que la norma exige.
   ═══════════════════════════════════════════════════════════ */

export const TITULAR = {
  /** Nombre comercial: el que ve el cliente. */
  marca: "Tu Contenido",
  /** Casilla donde llegan consultas, reclamos, bajas y ejercicio de derechos. */
  email: "hola@tucontenido.ar",
  /** Jurisdicción a efectos de ley aplicable. No es un domicilio. */
  jurisdiccion: "Ciudad Autónoma de Buenos Aires, República Argentina",
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
