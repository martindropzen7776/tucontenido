/* ═══════════════════════════════════════════════════════════
   Fondo fijo del sitio.

   Los anillos del Saturno, en grande, recorriendo toda la
   pantalla. Tienen la misma inclinación (−19,5°) y el mismo
   achatamiento (30%) que los del Saturno animado del hero, y el
   centro cae donde está ese planeta en la computadora: arriba de
   todo se leen como su continuación.

   Se mueve despacio (los anillos se mecen, las luces se desplazan),
   pero solo con transform sobre capas ya dibujadas: la placa de
   video las corre sin repintar. El dibujo en sí nunca cambia; si
   cambiara, el teléfono tendría que repintar toda la pantalla en
   cada cuadro, y el Saturno ya enseñó que eso lo congela. Las
   animaciones están en globals.css (.fondo).
   ═══════════════════════════════════════════════════════════ */

const CX = 1210;
const CY = 500;
const GIRO = -19.5;

/* [radio horizontal, opacidad, grosor]. El alto es el 30% del ancho.
   Un hueco entre el tercero y el cuarto hace de División de Cassini. */
const ANILLOS: [number, number, number][] = [
  [1180, 0.05, 1],
  [1000, 0.08, 1],
  [880, 0.06, 1],
  [700, 0.11, 1.5],
  [600, 0.07, 1],
  [520, 0.05, 1],
];

export function Fondo() {
  return (
    <div className="fondo" aria-hidden="true">
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" fill="none">
        <g transform={`rotate(${GIRO} ${CX} ${CY})`}>
          {/* Una banda ancha y muy tenue: le da cuerpo al anillo sin
              agregar más líneas. */}
          <ellipse cx={CX} cy={CY} rx={790} ry={790 * 0.3} stroke="#f4f4f1" strokeOpacity={0.025} strokeWidth={46} />
          {ANILLOS.map(([rx, op, w]) => (
            <ellipse key={rx} cx={CX} cy={CY} rx={rx} ry={rx * 0.3} stroke="#f4f4f1" strokeOpacity={op} strokeWidth={w} />
          ))}
        </g>
      </svg>
    </div>
  );
}
