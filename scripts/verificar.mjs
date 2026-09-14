/* ═══════════════════════════════════════════════════════════
   Avisa, antes de cada build, si quedan datos de ejemplo en
   lib/site.ts. No frena el build: sirve para ver la maqueta en
   local. Pero si alguno de estos avisos aparece en el build de
   producción, el sitio sale con un WhatsApp que no existe o con
   el píxel apagado.
   ═══════════════════════════════════════════════════════════ */

import { readFile } from "node:fs/promises";

const site = await readFile(new URL("../lib/site.ts", import.meta.url), "utf8");
const valor = (nombre) => site.match(new RegExp(`export const ${nombre} = "([^"]*)"`))?.[1];

const avisos = [];
if (valor("WHATSAPP") === "5491100000000")
  avisos.push("WHATSAPP es el número de ejemplo: todos los botones de contacto abren un chat que no existe.");
if (!/^\d{10,20}$/.test(valor("PIXEL_ID") ?? ""))
  avisos.push("PIXEL_ID no es un ID real: el píxel no se carga y no se mide ninguna campaña.");
const email = valor("EMAIL") ?? "";
if (!email.endsWith("@tucontenido.online") && email.endsWith("@tucontenido.ar"))
  avisos.push(`EMAIL es ${email}, de un dominio que no es el del sitio: el contacto y el botón de arrepentimiento mandan a una casilla que no existe.`);
if (/listo: false/.test(site))
  avisos.push("TRABAJOS tiene proyectos sin URL: /web muestra tarjetas punteadas con \"Falta URL\".");

if (avisos.length) {
  console.warn("\n⚠  Datos de ejemplo en lib/site.ts:");
  for (const a of avisos) console.warn(`   · ${a}`);
  console.warn("");
}
