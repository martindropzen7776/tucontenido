# Dónde publicar

El sitio se **exporta estático**: `npm run build` produce la carpeta `out/`
con HTML, CSS y JS planos. Sin servidor, sin runtime, sin adaptadores.

Eso lo vuelve portátil: la misma carpeta sube igual a cualquier lado. El
hosting deja de ser una decisión difícil de revertir.

## Cloudflare Pages — recomendado

Ancho de banda **ilimitado** en el plan gratuito, no pide tarjeta, permite
uso comercial y el dominio propio con SSL viene incluido.

| Campo | Valor |
|---|---|
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | variable `NODE_VERSION` = `22` |

500 builds por mes en el plan gratuito. Los archivos estáticos no tienen
límite de pedidos.

## Netlify

Configurado en `netlify.toml`. Funciona, pero desde 2025 usa un modelo de
créditos: 300 por mes en el plan gratuito, 15 por deploy y 20 por GB de
tráfico. Para un sitio se banca; para veinte, se queda corto.

## Cualquier otro

Al ser una carpeta de archivos, también sirve GitHub Pages, Vercel, o un
hosting argentino con FTP. Se sube `out/` y listo.

## Dominios .com.ar

No los registra Cloudflare. Van por **NIC.ar** o un registrador acreditado,
y se pagan **en pesos, sin impuesto PAÍS y sin tarjeta internacional**.
Ese es el único costo recurrente real del cliente.
