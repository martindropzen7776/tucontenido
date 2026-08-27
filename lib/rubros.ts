/* ═══════════════════════════════════════════════════════════
   Rubros.

   El negocio NO está nicheado: se le vende a cualquiera que
   aparezca. Lo que sí necesita un rubro es el rastrillaje —
   "negocios de CABA" no es una búsqueda, "odontólogos de CABA"
   sí. El rubro es la variable de la semana, no una identidad.

   Cada entrada solo cambia los sustantivos del calificador. La
   URL manda: /empezar?r=odontologia. Sin parámetro, sale la
   versión genérica, que es la que además se prerenderiza.

   Rotar el rubro cada semana es lo que después te dice cuál
   contesta más y cuál paga mejor — que es exactamente el dato
   con el que conviene nichear, si algún día conviene.
   ═══════════════════════════════════════════════════════════ */

export type Rubro = {
  /** Cómo se llama el lugar: consultorio, estudio, local. */
  local: string;
  /** Cómo se llama a quien le vende: pacientes, clientes, socios. */
  cliente: string;
  /** Lo que alguien tipea en Google para encontrarlo. */
  busqueda: string;
  /** La tercera opción de "cómo te contactan hoy". */
  presencial: string;
  /** Lo que se muestra al pie de la página. */
  pie: string;
};

const GENERICO: Rubro = {
  local: "negocio",
  cliente: "clientes",
  busqueda: "un negocio como el tuyo",
  presencial: "Vienen al local",
  pie: "Negocios de Buenos Aires",
};

export const RUBROS: Record<string, Rubro> = {
  odontologia: {
    local: "consultorio",
    cliente: "pacientes",
    busqueda: "un odontólogo en su zona",
    presencial: "Vienen al consultorio",
    pie: "Odontología · Buenos Aires",
  },
  estetica: {
    local: "centro",
    cliente: "clientas",
    busqueda: "un centro de estética cerca",
    presencial: "Vienen al centro",
    pie: "Estética · Buenos Aires",
  },
  gimnasio: {
    local: "gimnasio",
    cliente: "socios",
    busqueda: "un gimnasio en el barrio",
    presencial: "Pasan por el gimnasio",
    pie: "Gimnasios · Buenos Aires",
  },
  veterinaria: {
    local: "veterinaria",
    cliente: "clientes",
    busqueda: "una veterinaria cerca",
    presencial: "Vienen a la veterinaria",
    pie: "Veterinarias · Buenos Aires",
  },
  contador: {
    local: "estudio",
    cliente: "clientes",
    busqueda: "un contador en su zona",
    presencial: "Vienen al estudio",
    pie: "Estudios contables · Buenos Aires",
  },
  abogados: {
    local: "estudio",
    cliente: "clientes",
    busqueda: "un abogado en su zona",
    presencial: "Vienen al estudio",
    pie: "Estudios jurídicos · Buenos Aires",
  },
  inmobiliaria: {
    local: "inmobiliaria",
    cliente: "clientes",
    busqueda: "una inmobiliaria de la zona",
    presencial: "Pasan por la oficina",
    pie: "Inmobiliarias · Buenos Aires",
  },
};

/** Devuelve el rubro del parámetro `r`, o el genérico. */
export function leerRubro(param: string | null | undefined): {
  clave: string;
  rubro: Rubro;
} {
  const k = (param || "").toLowerCase().trim();
  return RUBROS[k] ? { clave: k, rubro: RUBROS[k] } : { clave: "general", rubro: GENERICO };
}
