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

/** Un ID de píxel real son solo dígitos. Con el de ejemplo, el píxel
 *  no se carga: inicializarlo con un ID inválido ensucia la consola y
 *  no mide nada. */
export const PIXEL_LISTO = /^\d{10,20}$/.test(PIXEL_ID);

/** La dirección pública del sitio: la usan el canonical, el sitemap y
 *  la imagen que muestra WhatsApp al compartir, así que tiene que ser
 *  una que exista. En Netlify sale de URL, que Netlify completa en
 *  cada build con la dirección principal del sitio: hoy
 *  tucontenidoia.netlify.app, y el dominio propio el día que se
 *  conecte, sin tocar nada acá. Fuera de Netlify, el respaldo. */
export const SITE_URL = (process.env.URL || "https://tucontenido.ar").replace(/\/$/, "");
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
  ["¿Hay que hacer una llamada?",
   "Te la ofrecemos y te la recomendamos: son 15 minutos para conocernos, que nos cuentes tu negocio y que sepas con quién vas a trabajar antes de pagar. No es una llamada de venta, porque el precio ya lo sabés. Si preferís, hacemos todo por WhatsApp."],
  ["¿Y si después necesito cambiar algo?",
   "Lo cambiás vos, y te enseñamos cómo sin costo. Al entregarte la web te mostramos paso a paso cómo cambiar textos, fotos, precios, horarios y datos de contacto, y cómo mantenerla al día. Secciones nuevas o rediseños son presupuesto aparte."],
  ["¿Y si no me llevo bien con la computadora?",
   "No hace falta saber de diseño ni de programación. Te enseñamos sobre tu propia web, con los cambios que vas a hacer de verdad, y si te olvidás de algo te lo volvemos a explicar."],
  ["¿Cómo pago los $500.000?",
   "Mercado Pago, transferencia bancaria o USDT. Se abona 50% para arrancar y 50% contra entrega."],
  ["¿De verdad son 7 días?",
   "Sí, pero el reloj arranca cuando mandás el material, no cuando pagás. Con el material completo, el primer boceto lo ves en 72 horas."],
];
