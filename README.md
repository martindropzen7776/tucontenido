# tucontenido

Dos páginas en un mismo dominio:

| Ruta | Qué es | Dónde vive |
|---|---|---|
| `/` | Tu Contenido .ads, la agencia general de publicidad paga | `app/page.tsx` + `components/site/agencia.tsx` |
| `/web` | Landing del servicio de webs a $500.000: llave en mano, sin mantenimiento, con capacitación para que el cliente la administre | `app/web/page.tsx` |

El resto de las rutas:

| Ruta | Qué es |
|---|---|
| `/empezar` | Calificador para tráfico pago (noindex) |
| `/gracias` | Adonde llega el calificador después de abrir WhatsApp (noindex) |
| `/entrega` | Generador de la hoja de entrega para el cliente (interna, fuera de robots) |
| `/legal/*` | Términos, privacidad, cookies y arrepentimiento, para los dos servicios |

`robots.txt`, `sitemap.xml`, la 404 y los íconos salen del build.

Next.js 16 · React 19 · Tailwind 4 · Motion · componentes de [beUI](https://beui.dev)

---

## Lo que hay que completar antes de publicar

Todo vive en **`lib/site.ts`**:

| Constante | Qué es |
|---|---|
| `WHATSAPP` | Tu número con código de país, sin `+` ni espacios. Arma los 8 puntos de contacto de la página. |
| `PIXEL_ID` | El ID del píxel de Meta. Sin esto no podés optimizar ni medir las campañas. |
| `TRABAJOS` | Las URL del portafolio. Poné el link y pasá `listo: true`; las que quedan en `false` se muestran en punteado. |
| `INSTAGRAM` | Opcional. Si queda vacío, el enlace no aparece en el footer. |

También conviene revisar los medios de pago en las preguntas frecuentes
(`components/site/sections.tsx` y `FAQ_SCHEMA` en `lib/site.ts` — están en
los dos lados porque uno es el texto visible y el otro alimenta el schema
de Google).

Cada build avisa si todavía quedan datos de ejemplo en `lib/site.ts`
(`scripts/verificar.mjs`). No lo frena, pero si el aviso aparece en el
build de producción, el sitio sale roto.

## Imágenes

`scripts/imagenes.mjs` genera las de Open Graph (`public/og/*.png`)
antes de cada `dev` y `build`, con las fuentes de `assets/fonts`. Si
cambia un titular, se cambia ahí. No se usa `opengraph-image.tsx` de
Next porque con exportación estática sale sin extensión y WhatsApp no
la muestra.

Los íconos (`app/favicon.ico`, `app/apple-icon.png`) se regeneran con
`npm run iconos`; `app/icon.svg` es el mismo signo a mano.

## Correr en local

```bash
npm install
npm run dev      # http://localhost:3000 (agencia) y /web (webs)
```

## Build

```bash
npm run build    # prerenderiza la página a HTML estático
npm start
```

Netlify usa `netlify.toml`, que ya trae el comando, el publish directory
y el plugin oficial de Next.

## Estructura

```
app/
  layout.tsx        fuentes, píxel y cookies, comunes a todas las páginas
  page.tsx          la agencia: orden de secciones, metadata y schema
  web/page.tsx      la landing de webs: orden de secciones, metadata y schema
  globals.css       tokens de color, tipografía y escala de motion
components/
  site/             las secciones (agencia.tsx es la raíz; el resto, /web)
  motion/           componentes de beUI (número, tilt, marquee, reveals…)
lib/site.ts         ← lo único que hay que tocar para publicar
```

## Notas

- La página se **prerenderiza a HTML estático**: el contenido está en el
  código fuente, incluidas las respuestas del FAQ, que se animan pero
  nunca se desmontan para que Google las indexe.
- Las fuentes se auto-hospedan con `next/font`: sin pedidos a Google y sin
  salto de layout.
- El tilt del portafolio solo se activa donde hay mouse. En un teléfono el
  gesto es scrollear.
