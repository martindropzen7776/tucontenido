# tucontenido

Dos páginas en un mismo dominio:

| Ruta | Qué es | Dónde vive |
|---|---|---|
| `/` | Tu Contenido .ads, la agencia general de paid media | `public/index.html` — HTML plano, no pasa por Next |
| `/web` | Landing del servicio de webs a $500.000: llave en mano, sin mantenimiento, con capacitación para que el cliente la administre | `app/web/page.tsx` |

El resto de las rutas (`/empezar`, `/entrega`, `/legal/*`) son del servicio de webs.

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

## Correr en local

```bash
npm install
npm run dev      # http://localhost:3000/web
```

En desarrollo la raíz da 404: Next sirve `public/index.html` en
`/index.html`, no en `/`. En el build sí queda en la raíz, porque la
exportación copia `public/` tal cual a `out/`.

## Build

```bash
npm run build    # prerenderiza la página a HTML estático
npm start
```

Netlify usa `netlify.toml`, que ya trae el comando, el publish directory
y el plugin oficial de Next.

## Estructura

```
public/
  index.html        la página de la agencia (raíz del dominio)
app/
  layout.tsx        fuentes, píxel y cookies, comunes a las rutas de Next
  web/page.tsx      la landing de webs: orden de secciones, metadata y schema
  globals.css       tokens de color, tipografía y escala de motion
components/
  site/             las secciones de la página
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
