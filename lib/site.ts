/* ═══════════════════════════════════════════════════════════
   Configuración del sitio.
   Todo lo que hay que cambiar antes de publicar está acá.
   ═══════════════════════════════════════════════════════════ */

/** Número con código de país, sin + ni espacios.
 *  Argentina: 54 + 9 + área sin el 0 + número sin el 15.
 *  Ej. Buenos Aires 11 2345-6789 → "5491123456789"          */
export const WHATSAPP = "5491165651322";

/** ID del píxel de Meta. */
export const PIXEL_ID = "TU_PIXEL_ID";

/** Un ID de píxel real son solo dígitos. Con el de ejemplo, el píxel
 *  no se carga: inicializarlo con un ID inválido ensucia la consola y
 *  no mide nada. */
export const PIXEL_LISTO = /^\d{10,20}$/.test(PIXEL_ID);

/** La dirección pública del sitio: la usan el canonical, el sitemap y
 *  la imagen que muestra WhatsApp al compartir, así que tiene que ser
 *  una que exista. En Netlify sale de URL, que Netlify completa en
 *  cada build con el dominio principal del sitio (tucontenido.online);
 *  si algún día cambia, se actualiza solo. Fuera de Netlify, el
 *  respaldo. */
export const SITE_URL = (process.env.URL || "https://tucontenido.online").replace(/\/$/, "");
/** Casilla de contacto. También es la del botón de arrepentimiento,
 *  que es obligatorio: tiene que ser una casilla que exista. */
export const EMAIL = "launchmasteryy@gmail.com";
export const INSTAGRAM = "";

/** Arma el link de WhatsApp con el mensaje ya escrito. */
export function wa(mensaje = "Hola!") {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

/* ── Honorarios ─────────────────────────────────────────
   Desde el 13/11/2026 el sitio es una agencia de publicidad en Meta
   y Google; la landing de webs ($500.000) se sacó y está en el
   historial de git, con sus once muestras.
   Si querés publicar desde cuánto arranca la gestión mensual, ponelo
   acá con el formato "$000.000" y aparece en la tarjeta de precios.
   Vacío, la tarjeta dice que se cotiza después del diagnóstico.   */
export const HONORARIO_DESDE = "";

/** Dispara el evento Contact del píxel. Silencioso si no cargó. */
export function trackContacto() {
  const w = window as unknown as { fbq?: (...a: unknown[]) => void };
  if (typeof w.fbq === "function") w.fbq("track", "Contact");
}

/* ── FAQ en texto plano, solo para el schema FAQPage ──────
   Las respuestas visibles viven en sections.tsx con su formato.
   Si cambiás una, cambiala en los dos lados.                */
export const FAQ_SCHEMA: [string, string][] = [
  ["¿Cuánto tengo que invertir en anuncios?",
   "Depende de tu rubro, tu zona y lo que quieras conseguir, y te lo decimos con números en el diagnóstico. Esa inversión la pagás vos directo a Meta o a Google, con tu tarjeta y desde una cuenta a tu nombre: no pasa por nosotros. Nuestros honorarios van aparte."],
  ["¿Meta o Google?",
   "Hacen cosas distintas. Google te muestra a quien ya está buscando lo que vendés; Meta (Facebook, Instagram y WhatsApp) le muestra tu negocio a gente que todavía no te buscaba pero se parece a tu cliente. La mayoría de los negocios necesita las dos en distinta proporción, y en el diagnóstico te decimos por dónde empezar."],
  ["¿Las cuentas quedan a mi nombre?",
   "Sí. La cuenta publicitaria, el píxel, las audiencias y las campañas son tuyas. Trabajamos con un acceso que nos das y que podés quitar cuando quieras. Si un día dejás de trabajar con nosotros, te quedás con todo el historial."],
  ["¿En cuánto tiempo se ven resultados?",
   "Las primeras consultas pueden llegar en la primera semana, pero las campañas necesitan unas semanas de datos para estabilizarse. Contá con uno o dos meses para saber, con números, cuánto te cuesta cada cliente. Nadie serio te puede garantizar un resultado; lo que sí vas a tener es cada número a la vista."],
  ["¿Hay contrato de permanencia?",
   "No. Trabajamos mes a mes y podés darte de baja cuando quieras, avisando antes de que empiece el mes siguiente."],
  ["¿Necesito tener una web?",
   "No siempre. En Meta las consultas pueden llegar directo a tu WhatsApp o a un formulario dentro de Facebook e Instagram. En Google conviene tener una página a donde mandar a la gente; si la tuya frena las ventas, te decimos qué cambiar. Webs no hacemos: nos dedicamos solo a la publicidad."],
  ["¿Cómo se paga?",
   "Los honorarios se pagan por mes, con Mercado Pago, transferencia bancaria o USDT. La inversión en anuncios la cobran Meta y Google directamente a tu tarjeta."],
];
