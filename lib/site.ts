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

/* ── Ejemplos ─────────────────────────────────────────────
   Siete sitios de muestra, uno por rubro, con negocios inventados
   (cada uno lo dice en su pie). No son clientes: la sección los
   presenta como ejemplos y nunca como "trabajos en producción".
   Los repos son privados (martindropzen7776/muestra-*). Los seis
   primeros los publica Ramón en Netlify; Cruce está en Cloudflare
   (muestras-webs/_herramientas/cloudflare.sh). La captura de cada
   uno vive en public/muestras/ y sale del inicio a 1440×900; la de
   Cruce, con una hamburguesa abierta.
   La tarjeta muestra solo nombre y rubro: Ramón sacó el plan y
   la línea de "qué probar adentro" porque sobraban.
   Arenales, Clara y el hotel traen reservas: aunque desde el 01/10
   se vende solo la web, Ramón pidió que se queden, y con ellas
   los paneles de turnos de Arenales y Clara.                    */
export type Trabajo = {
  nombre: string;
  rubro: string;
  url: string;
  img: string;
  /** Link secundario bajo la tarjeta (ej. el panel de turnos de demo). */
  extra?: { txt: string; url: string };
};

export const TRABAJOS: Trabajo[] = [
  { nombre: "Hamburguesas Cruce", rubro: "Hamburguesería", url: "https://muestra-hamburguesas-cruce.fedefalas15.workers.dev/", img: "/muestras/hamburguesas.webp" },
  { nombre: "Arenales Odontología", rubro: "Clínica dental", url: "https://arenalesdental.netlify.app/", img: "/muestras/dental.webp", extra: { txt: "Ver el panel donde la clínica gestiona los turnos", url: "https://arenalesdental.netlify.app/panel/" } },
  { nombre: "Clara", rubro: "Medicina estética", url: "https://esteticaclara.netlify.app/", img: "/muestras/estetica.webp", extra: { txt: "Ver el panel donde el consultorio gestiona los turnos", url: "https://esteticaclara.netlify.app/panel/" } },
  { nombre: "Alma de Uco", rubro: "Hotel boutique", url: "https://hotelamladeuco.netlify.app/", img: "/muestras/hotel.webp" },
  { nombre: "Forja Training Club", rubro: "Gimnasio", url: "https://forjagym0.netlify.app/", img: "/muestras/gym.webp" },
  { nombre: "Lumbre", rubro: "Restaurante", url: "https://restolumbre.netlify.app/", img: "/muestras/resto.webp" },
  { nombre: "Ferrand Metalúrgica", rubro: "Pyme industrial", url: "https://industriaferrandd.netlify.app/", img: "/muestras/industrial.webp" },
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
  ["¿La web es realmente mía?",
   "Sí. Al terminar te transferimos el proyecto a tu cuenta y el dominio se compra directamente a tu nombre. Podés editarla, cambiar de diseñador o darla de baja sin hablar con nosotros."],
  ["¿Hay que hacer una llamada?",
   "Te la ofrecemos y te la recomendamos: son 15 minutos para conocernos, que nos cuentes tu negocio y que sepas con quién vas a trabajar antes de pagar. No es una llamada de venta, porque el precio ya lo sabés. Si preferís, hacemos todo por WhatsApp."],
  ["¿Y si después necesito cambiar algo?",
   "Lo cambiás vos, y te enseñamos cómo sin costo. Al entregarte la web te mostramos paso a paso cómo cambiar textos, fotos, precios, horarios y datos de contacto, y cómo mantenerla al día. Secciones nuevas o rediseños son presupuesto aparte."],
  ["¿Y si no me llevo bien con la computadora?",
   "No hace falta saber de diseño ni de programación. Te enseñamos sobre tu propia web, con los cambios que vas a hacer de verdad, y si te olvidás de algo te lo volvemos a explicar."],
  ["¿Cómo se paga?",
   "Mercado Pago, transferencia bancaria o USDT. Se abona 50% para arrancar y 50% contra entrega."],
  ["¿De verdad son 7 días?",
   "Sí. El reloj arranca cuando mandás el material, no cuando pagás. Con el material completo, el primer boceto lo ves en 72 horas."],
];
