/* ═══════════════════════════════════════════════════════════
   Configuración del sitio.
   Todo lo que hay que cambiar antes de publicar está acá.
   ═══════════════════════════════════════════════════════════ */

/** Número con código de país, sin + ni espacios.
 *  Argentina: 54 + 9 + área sin el 0 + número sin el 15.
 *  Ej. Buenos Aires 11 2345-6789 → "5491123456789"          */
export const WHATSAPP = "5491100000000";

/** ID del píxel de Meta. */
export const PIXEL_ID = "TU_PIXEL_ID";

export const SITE_URL = "https://tucontenido.ar";
export const EMAIL = "hola@tucontenido.ar";
export const INSTAGRAM = "";

/** Arma el link de WhatsApp con el mensaje ya escrito. */
export function wa(mensaje = "Hola!") {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

/* ── Portafolio ───────────────────────────────────────────
   ⚠️ PENDIENTE: poner las URL reales y pasar listo a true.
   Las que estén en false se muestran en punteado y no enlazan. */
export type Trabajo = {
  nombre: string;
  rubro: string;
  url: string;
  listo: boolean;
};

export const TRABAJOS: Trabajo[] = [
  { nombre: "Proyecto 01", rubro: "⚠ Falta URL", url: "", listo: false },
  { nombre: "Proyecto 02", rubro: "⚠ Falta URL", url: "", listo: false },
  { nombre: "Proyecto 03", rubro: "⚠ Falta URL", url: "", listo: false },
  { nombre: "Proyecto 04", rubro: "⚠ Falta URL", url: "", listo: false },
  { nombre: "Proyecto 05", rubro: "⚠ Falta URL", url: "", listo: false },
  { nombre: "Proyecto 06", rubro: "⚠ Falta URL", url: "", listo: false },
];

/** Dispara el evento Contact del píxel. Silencioso si no cargó. */
export function trackContacto() {
  const w = window as unknown as { fbq?: (...a: unknown[]) => void };
  if (typeof w.fbq === "function") w.fbq("track", "Contact");
}

/* ── FAQ en texto plano, solo para el schema FAQPage ──────
   Las respuestas visibles viven en sections.tsx con su formato.
   Si cambiás una, cambiala en los dos lados.                */
export const FAQ_SCHEMA: [string, string][] = [
  ["¿Por qué hay 10 dólares por mes si dicen que no hay mantenimiento?",
   "Son dos cosas distintas. Los USD 10 mensuales son el alojamiento y los pagás vos directo a la plataforma donde vive tu web. No cobramos nada por mes. Si el alojamiento estuviera a nuestro nombre, el día que quisieras irte tendrías que pedirnos permiso. Necesitás una tarjeta habilitada para pagos en dólares."],
  ["¿La web es realmente mía?",
   "Sí. Al terminar te transferimos el proyecto a tu cuenta y el dominio se compra directamente a tu nombre. Podés editarla, cambiar de diseñador o darla de baja sin hablar con nosotros."],
  ["¿En serio no hay ninguna llamada?",
   "Ninguna, salvo que vos la quieras. Todo se resuelve por WhatsApp: te decimos el precio en el momento, mandás el material cuando puedas y el primer boceto te llega por el mismo chat."],
  ["¿Y si después necesito cambiar algo?",
   "Los cambios chicos se hacen sin costo: textos, fotos, precios, horarios, datos de contacto. Secciones nuevas o rediseños son presupuesto aparte."],
  ["¿Cómo pago los USD 500?",
   "Mercado Pago, transferencia bancaria o USDT. Se abona 50% para arrancar y 50% contra entrega."],
  ["¿De verdad son 7 días?",
   "Sí, pero el reloj arranca cuando mandás el material, no cuando pagás. Con el material completo, el primer boceto lo ves en 72 horas."],
];
