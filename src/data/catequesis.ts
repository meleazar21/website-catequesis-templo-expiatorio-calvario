import { POR_DEFINIR } from "./site";

/**
 * Cursos, horarios, inscripciones, catequistas, sacramentos, avisos y actividades.
 *
 * ⚠️ TODO el contenido de este archivo es **provisional y de ejemplo**. No hay aquí
 * ningún dato oficial: ni horarios, ni fechas, ni requisitos, ni personas reales.
 * Al recibir la información de la parroquia, se reemplaza aquí — los componentes no
 * se tocan.
 */

// ---------------------------------------------------------------- Cursos
export interface Curso {
  id: string;
  nombre: string;
  edad: string;
  horario: string;
  duracion: string;
  descripcion: string;
  /** Lo que se vive en el curso; se muestra al desplegar "Ver información". */
  detalle: string[];
}

export const cursos: Curso[] = [
  {
    id: "primera-comunion",
    nombre: "Primera Comunión",
    edad: "7 – 10 años",
    horario: "Sábados · 9:00 a. m.",
    duracion: "2 años",
    descripcion:
      "Preparación de los niños para recibir por primera vez la Eucaristía.",
    detalle: [
      "Iniciación a la oración y a la vida sacramental.",
      "Preparación para la Primera Confesión.",
      "Acompañamiento a las familias durante los dos años.",
      POR_DEFINIR,
    ],
  },
  {
    id: "confirmacion",
    nombre: "Confirmación",
    edad: "12 – 15 años",
    horario: "Sábados · 2:00 p. m.",
    duracion: "2 años",
    descripcion:
      "Formación de adolescentes y jóvenes para recibir el Espíritu Santo.",
    detalle: [
      "Profundización en la fe y en la Sagrada Escritura.",
      "Retiro de preparación antes de la celebración.",
      "Servicio y compromiso dentro de la comunidad.",
      POR_DEFINIR,
    ],
  },
  {
    id: "pre-bautismo",
    nombre: "Pre-Bautismo",
    edad: "Padres y padrinos",
    horario: "Domingos · 5:00 p. m.",
    duracion: "Ciclo corto de sesiones",
    descripcion:
      "Preparación de padres y padrinos antes del bautizo del niño o niña.",
    detalle: [
      "Sentido del sacramento del Bautismo.",
      "Responsabilidad de padres y padrinos en la educación en la fe.",
      POR_DEFINIR,
    ],
  },
  {
    id: "cica",
    nombre: "CICA — Catequesis para adultos",
    edad: "Mayores de 18 años",
    horario: POR_DEFINIR,
    duracion: POR_DEFINIR,
    descripcion:
      "Para adultos que no han recibido uno o varios sacramentos de iniciación cristiana.",
    detalle: [
      "Bautismo, Primera Comunión y Confirmación según lo que cada persona necesite.",
      "Acompañamiento personal a lo largo del proceso.",
      POR_DEFINIR,
    ],
  },
];

// ---------------------------------------------------------------- Horarios
export interface Horario {
  curso: string;
  dia: string;
  hora: string;
  lugar: string;
}

export const horarios: Horario[] = [
  { curso: "Primera Comunión", dia: "Sábado", hora: "9:00 a. m.", lugar: "Salón 1" },
  { curso: "Confirmación", dia: "Sábado", hora: "2:00 p. m.", lugar: "Salón 2" },
  { curso: "Pre-Bautismo", dia: "Domingo", hora: "5:00 p. m.", lugar: "Salón parroquial" },
  { curso: "CICA — Adultos", dia: POR_DEFINIR, hora: POR_DEFINIR, lugar: POR_DEFINIR },
];

// ---------------------------------------------------------------- Inscripciones
export const inscripciones = {
  /** Cambia a `false` para mostrar el aviso de inscripciones cerradas. */
  abiertas: true,
  inicio: POR_DEFINIR,
  cierre: POR_DEFINIR,
  horarioAtencion: POR_DEFINIR,
  lugar: POR_DEFINIR,
  /** Enlace del botón: Google Forms, formulario propio o wa.me. Vacío = lleva a Contacto. */
  enlace: "",
  nota:
    "Las fechas y los horarios de inscripción se confirman cada año en el templo y " +
    "en nuestras redes sociales.",
  requisitos: [
    "Partida de nacimiento del niño o niña.",
    "Partida de bautismo (si ya fue bautizado).",
    "Documento de identidad del padre, madre o tutor.",
    "Dos fotografías tamaño carné.",
    POR_DEFINIR,
  ],
};

// ---------------------------------------------------------------- Catequistas
export interface Catequista {
  nombre: string;
  grupo: string;
  frase: string;
}

/** Personas de ejemplo: NO son catequistas reales de la parroquia. */
export const catequistas: Catequista[] = [
  {
    nombre: "Nombre de ejemplo 1",
    grupo: "Catequista de Primera Comunión",
    frase: "Servir a los niños y acompañarlos en su encuentro con Cristo.",
  },
  {
    nombre: "Nombre de ejemplo 2",
    grupo: "Catequista de Confirmación",
    frase: "Caminar con los jóvenes mientras descubren su vocación.",
  },
  {
    nombre: "Nombre de ejemplo 3",
    grupo: "Catequista de Pre-Bautismo",
    frase: "Acompañar a las familias desde el primer sacramento.",
  },
  {
    nombre: "Nombre de ejemplo 4",
    grupo: "Coordinación",
    frase: "Que nadie se quede sin conocer el amor de Dios.",
  },
];

// ---------------------------------------------------------------- Sacramentos
export interface Sacramento {
  id: string;
  nombre: string;
  descripcion: string;
  requisitos: string[];
  fechas: string;
  aviso?: string;
}

export const sacramentos: Sacramento[] = [
  {
    id: "bautismo",
    nombre: "Bautismo",
    descripcion:
      "Primer sacramento de iniciación cristiana. Los padres y padrinos participan " +
      "antes en la preparación de Pre-Bautismo.",
    requisitos: [
      "Partida de nacimiento del niño o niña.",
      "Fe de bautismo de los padrinos.",
      "Haber participado en la preparación de Pre-Bautismo.",
      POR_DEFINIR,
    ],
    fechas: POR_DEFINIR,
  },
  {
    id: "primera-comunion",
    nombre: "Primera Comunión",
    descripcion:
      "Se celebra al concluir el proceso de preparación, normalmente de dos años.",
    requisitos: ["Estar bautizado.", "Haber completado la preparación.", POR_DEFINIR],
    fechas: POR_DEFINIR,
  },
  {
    id: "confirmacion",
    nombre: "Confirmación",
    descripcion:
      "Completa la iniciación cristiana y fortalece al creyente con el Espíritu Santo.",
    requisitos: [
      "Estar bautizado y haber recibido la Primera Comunión.",
      "Un padrino o una madrina confirmado.",
      POR_DEFINIR,
    ],
    fechas: POR_DEFINIR,
  },
  {
    id: "matrimonio",
    nombre: "Matrimonio",
    descripcion:
      "Preparación y celebración del sacramento del Matrimonio en la parroquia.",
    requisitos: [POR_DEFINIR],
    fechas: POR_DEFINIR,
    aviso: "Consulte en la oficina parroquial para iniciar el proceso.",
  },
];

// ---------------------------------------------------------------- Avisos
export type Categoria =
  | "INSCRIPCIONES"
  | "SACRAMENTOS"
  | "REUNIONES"
  | "ACTIVIDADES"
  | "AVISOS";

export interface Aviso {
  id: string;
  fecha: string;
  titulo: string;
  categoria: Categoria;
  descripcion: string;
  /** Los destacados también aparecen arriba, en la página de inicio. */
  destacado?: boolean;
}

export const avisos: Aviso[] = [
  {
    id: "a1",
    fecha: POR_DEFINIR,
    titulo: "Apertura de inscripciones",
    categoria: "INSCRIPCIONES",
    descripcion:
      "Se anuncian las fechas de inscripción para el nuevo ciclo de catequesis. " +
      POR_DEFINIR,
    destacado: true,
  },
  {
    id: "a2",
    fecha: POR_DEFINIR,
    titulo: "Reunión general de padres de familia",
    categoria: "REUNIONES",
    descripcion:
      "Encuentro con los padres para presentar el plan del año. " + POR_DEFINIR,
  },
  {
    id: "a3",
    fecha: POR_DEFINIR,
    titulo: "Retiro de preparación",
    categoria: "SACRAMENTOS",
    descripcion:
      "Retiro para los jóvenes que se preparan para la Confirmación. " + POR_DEFINIR,
  },
];

// ---------------------------------------------------------------- Actividades
export interface Evento {
  id: string;
  dia: string;
  mes: string;
  titulo: string;
  hora: string;
  lugar: string;
}

export const eventos: Evento[] = [
  { id: "e1", dia: "28", mes: "Marzo", titulo: "Reunión de padres de familia", hora: "5:00 p. m.", lugar: "Salón parroquial" },
  { id: "e2", dia: "12", mes: "Abril", titulo: "Retiro de Confirmación", hora: "8:00 a. m.", lugar: "Templo El Calvario" },
  { id: "e3", dia: "03", mes: "Mayo", titulo: "Celebración de Primera Comunión", hora: POR_DEFINIR, lugar: "Templo El Calvario" },
];

// ---------------------------------------------------------------- Galería
export interface Foto {
  id: string;
  titulo: string;
  /** Ruta de la imagen real. Vacío = se dibuja un marcador "fotografía por definir". */
  src?: string;
  /** Alto relativo, para que la cuadrícula tipo masonry no quede plana. */
  alto: "corto" | "medio" | "alto";
}

export const galeria: Foto[] = [
  { id: "g1", titulo: "Celebración parroquial", alto: "alto" },
  { id: "g2", titulo: "Catequesis de niños", alto: "medio" },
  { id: "g3", titulo: "Retiro de jóvenes", alto: "corto" },
  { id: "g4", titulo: "Equipo de catequistas", alto: "medio" },
  { id: "g5", titulo: "Primera Comunión", alto: "corto" },
  { id: "g6", titulo: "Templo El Calvario", alto: "alto" },
];
