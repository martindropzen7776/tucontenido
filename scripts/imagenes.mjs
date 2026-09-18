/* ═══════════════════════════════════════════════════════════
   Genera las imágenes del sitio que no son fotos:

   - public/og/web.png (Open Graph, 1200×630)
   - app/favicon.ico, app/apple-icon.png (con --iconos)

   Corre solo antes de cada build (npm "prebuild"), así las de Open
   Graph nunca quedan desactualizadas respecto del titular.

   ¿Por qué no opengraph-image.tsx de Next? Porque con output:
   "export" las escribe sin extensión (out/opengraph-image) y
   muchos hostings las sirven como archivo genérico en lugar de
   PNG: WhatsApp y Facebook no las muestran. Acá salen .png.

   Las fuentes están en assets/fonts en TTF: el generador no lee
   el woff2 que usa next/font en la página.
   ═══════════════════════════════════════════════════════════ */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createElement as h } from "react";
import { ImageResponse } from "next/dist/compiled/@vercel/og/index.node.js";

const RAIZ = process.cwd();
const NEGRO = "#0a0a0c";
const HUESO = "#f4f4f1";
const GRIS = "#9a9aa4";

const fuente = (f) => readFile(join(RAIZ, "assets/fonts", f));
const [disp, body, bodyBold] = await Promise.all([
  fuente("BricolageGrotesque-ExtraBold.ttf"),
  fuente("InstrumentSans-Regular.ttf"),
  fuente("InstrumentSans-SemiBold.ttf"),
]);
const FUENTES = [
  { name: "Bricolage", data: disp, weight: 800, style: "normal" },
  { name: "Instrument", data: body, weight: 400, style: "normal" },
  { name: "InstrumentBold", data: bodyBold, weight: 600, style: "normal" },
];

async function png(elemento, width, height) {
  const r = new ImageResponse(elemento, { width, height, fonts: FUENTES });
  return Buffer.from(await r.arrayBuffer());
}

/* ── Open Graph ── */

function tarjeta({ sufijo, titular, bajada, bloque }) {
  const anillo = (rx, ry, color) =>
    h("ellipse", { cx: 280, cy: 280, rx, ry, fill: "none", stroke: color, strokeWidth: 2, transform: "rotate(-18 280 280)" });

  return h(
    "div",
    {
      style: {
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "space-between", background: NEGRO, color: HUESO,
        padding: "64px 72px", position: "relative",
      },
    },
    /* Los anillos del Saturno del hero, quietos. */
    h(
      "svg",
      { width: 560, height: 560, viewBox: "0 0 560 560", style: { position: "absolute", right: -90, top: -40 } },
      h("circle", { cx: 280, cy: 280, r: 96, fill: "#16161b" }),
      anillo(250, 70, "#2a2a31"),
      anillo(200, 54, "#24242a"),
      anillo(150, 40, "#1f1f25"),
    ),
    h(
      "div",
      { style: { display: "flex", fontFamily: "Bricolage", fontSize: 34, letterSpacing: -1 } },
      "tucontenido",
      h("span", { style: { color: GRIS } }, sufijo),
    ),
    /* Cortes fijos: con ajuste automático, "7" quedaba colgado al
       final de la primera línea, lejos de "días". */
    h(
      "div",
      { style: { display: "flex", flexDirection: "column", fontFamily: "Bricolage", fontSize: 104, lineHeight: 0.92, letterSpacing: -4 } },
      ...titular.map((linea) => h("div", { style: { display: "flex" } }, linea)),
    ),
    h(
      "div",
      { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40 } },
      h("div", { style: { display: "flex", fontFamily: "Instrument", fontSize: 30, color: GRIS, maxWidth: 640, lineHeight: 1.35 } }, bajada),
      h("div", { style: { display: "flex", background: HUESO, color: NEGRO, fontFamily: "InstrumentBold", fontSize: 30, padding: "22px 34px" } }, bloque),
    ),
  );
}

await mkdir(join(RAIZ, "public/og"), { recursive: true });

const OG = {
  web: {
    sufijo: ".",
    titular: ["Tu web lista", "en 7 días"],
    bajada: "A medida y a tu nombre. Si trabajás con turnos, con reservas.",
    bloque: "Desde $500.000",
  },
};

for (const [nombre, datos] of Object.entries(OG)) {
  const buf = await png(tarjeta(datos), 1200, 630);
  await writeFile(join(RAIZ, "public/og", `${nombre}.png`), buf);
  console.log(`og/${nombre}.png  ${(buf.length / 1024).toFixed(0)} KB`);
}

/* ── Íconos (solo con --iconos: cambian casi nunca y van en git) ──
   Cuadrado negro con una barra: el mismo signo que el SVG de
   app/icon.svg, en los tamaños que piden Windows y iOS. */

function marca(lado) {
  const u = lado / 32;
  return h(
    "div",
    { style: { width: "100%", height: "100%", display: "flex", background: NEGRO, position: "relative" } },
    h("div", { style: { position: "absolute", left: 7 * u, top: 14 * u, width: 18 * u, height: 4 * u, background: HUESO } }),
  );
}

/* Un .ico es un índice más los PNG adentro; desde Windows Vista se
   admite PNG embebido, así que no hace falta convertir a BMP. */
function ico(pngs) {
  const cabecera = Buffer.alloc(6 + 16 * pngs.length);
  cabecera.writeUInt16LE(0, 0);
  cabecera.writeUInt16LE(1, 2);
  cabecera.writeUInt16LE(pngs.length, 4);
  let offset = cabecera.length;
  pngs.forEach(({ lado, buf }, i) => {
    const e = 6 + 16 * i;
    cabecera.writeUInt8(lado >= 256 ? 0 : lado, e);
    cabecera.writeUInt8(lado >= 256 ? 0 : lado, e + 1);
    cabecera.writeUInt16LE(1, e + 4);
    cabecera.writeUInt16LE(32, e + 6);
    cabecera.writeUInt32LE(buf.length, e + 8);
    cabecera.writeUInt32LE(offset, e + 12);
    offset += buf.length;
  });
  return Buffer.concat([cabecera, ...pngs.map((p) => p.buf)]);
}

if (process.argv.includes("--iconos")) {
  const tamaños = [16, 32, 48];
  const pngs = [];
  for (const lado of tamaños) pngs.push({ lado, buf: await png(marca(lado), lado, lado) });
  await writeFile(join(RAIZ, "app/favicon.ico"), ico(pngs));
  await writeFile(join(RAIZ, "app/apple-icon.png"), await png(marca(180), 180, 180));
  console.log("app/favicon.ico y app/apple-icon.png");
}
