/* Seguimiento suave para efectos que persiguen al mouse (magnetic,
   tilt). Reemplaza al useSpring de motion: cada cuadro recorre una
   fracción de la distancia que falta y se apaga solo cuando llega.
   Con 0.16 por cuadro la sensación es la del SPRING_MOUSE que había,
   sin cargar la librería entera en la portada. */
export function crearSeguidor(n: number, aplicar: (v: number[]) => void, factor = 0.16) {
  const actual = new Array<number>(n).fill(0);
  let destino = new Array<number>(n).fill(0);
  let raf = 0;

  const paso = () => {
    let quieto = true;
    for (let i = 0; i < n; i++) {
      const falta = destino[i] - actual[i];
      if (Math.abs(falta) <= 0.01) {
        actual[i] = destino[i];
      } else {
        actual[i] += falta * factor;
        quieto = false;
      }
    }
    aplicar(actual);
    raf = quieto ? 0 : requestAnimationFrame(paso);
  };

  return {
    ir(valores: number[]) {
      destino = valores;
      if (!raf) raf = requestAnimationFrame(paso);
    },
    parar() {
      cancelAnimationFrame(raf);
      raf = 0;
    },
  };
}
