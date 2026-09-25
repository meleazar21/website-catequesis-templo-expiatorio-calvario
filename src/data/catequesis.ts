/**
 * Cursos, horarios, inscripciones, catequistas, sacramentos, avisos, actividades y galería.
 *
 * **El contenido no vive aquí**: vive en `content/`, que es lo que edita el panel de
 * administración (Decap CMS, en `/admin`). Cada elemento de una colección es un archivo
 * JSON propio, así el CMS puede agregarlos y borrarlos sin tocar a los demás.
 * Este archivo solo los carga, los ordena y les pone tipos.
 *
 * ⚠️ El contenido de arranque es **provisional y de ejemplo**: no hay ningún dato
 * oficial, ni horarios, ni fechas, ni requisitos, ni personas reales.
 */
import horariosRaw from "../../content/horarios.json";
import inscripcionesRaw from "../../content/inscripciones.json";

/** Texto suelto dentro de una lista; el CMS no sabe guardar listas de cadenas planas. */
interface Linea { texto: string }
const lineas = (xs: Linea[] | undefined): string[] => (xs ?? []).map((x) => x.texto);

/**
 * Carga todos los JSON de una carpeta y los ordena por el campo `orden`.
 * `import.meta.glob` los resuelve en tiempo de compilación, así que no hay ninguna
 * petición de red: todo queda dentro del paquete estático.
 */
function coleccion<T extends { orden?: number }>(mods: Record<string, unknown>): T[] {
  return Object.keys(mods)
    .sort()
    .map((k) => (mods[k] as { default: T }).default)
    .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
}

// ---------------------------------------------------------------- Cursos
export interface Curso {
  orden?: number;
  nombre: string;
  edad: string;
  horario: string;
  duracion: string;
  descripcion: string;
  detalle: string[];
}
interface CursoRaw extends Omit<Curso, "detalle"> { detalle: Linea[] }

export const cursos: Curso[] = coleccion<CursoRaw>(
  import.meta.glob("../../content/cursos/*.json", { eager: true })
).map((c) => ({ ...c, detalle: lineas(c.detalle) }));

// ---------------------------------------------------------------- Horarios
export interface Horario { curso: string; dia: string; hora: string; lugar: string }
export const horarios: Horario[] = horariosRaw.items;

// ---------------------------------------------------------------- Inscripciones
export const inscripciones = {
  ...inscripcionesRaw,
  requisitos: lineas(inscripcionesRaw.requisitos),
};

// ---------------------------------------------------------------- Catequistas
export interface Catequista {
  orden?: number;
  nombre: string;
  grupo: string;
  frase: string;
  /** Ruta de la foto. Vacío = se dibuja un marcador "fotografía por definir". */
  foto?: string;
}
export const catequistas = coleccion<Catequista>(
  import.meta.glob("../../content/catequistas/*.json", { eager: true })
);

// ---------------------------------------------------------------- Sacramentos
export interface Sacramento {
  orden?: number;
  nombre: string;
  descripcion: string;
  requisitos: string[];
  fechas: string;
  aviso?: string;
}
interface SacramentoRaw extends Omit<Sacramento, "requisitos"> { requisitos: Linea[] }

export const sacramentos: Sacramento[] = coleccion<SacramentoRaw>(
  import.meta.glob("../../content/sacramentos/*.json", { eager: true })
).map((s) => ({ ...s, requisitos: lineas(s.requisitos) }));

// ---------------------------------------------------------------- Avisos
export type Categoria =
  | "INSCRIPCIONES" | "SACRAMENTOS" | "REUNIONES" | "ACTIVIDADES" | "AVISOS";

export interface Aviso {
  orden?: number;
  fecha: string;
  titulo: string;
  categoria: Categoria;
  descripcion: string;
  /** Los destacados se resaltan con borde dorado. */
  destacado?: boolean;
}
export const avisos = coleccion<Aviso>(
  import.meta.glob("../../content/avisos/*.json", { eager: true })
);

// ---------------------------------------------------------------- Actividades
export interface Evento {
  orden?: number;
  dia: string;
  mes: string;
  titulo: string;
  hora: string;
  lugar: string;
}
export const eventos = coleccion<Evento>(
  import.meta.glob("../../content/eventos/*.json", { eager: true })
);

// ---------------------------------------------------------------- Galería
export interface Foto {
  orden?: number;
  titulo: string;
  /** Ruta de la imagen. Vacío = se dibuja un marcador "fotografía por definir". */
  foto?: string;
  /** Alto relativo, para que la cuadrícula tipo masonry no quede plana. */
  alto: "corto" | "medio" | "alto";
}
export const galeria = coleccion<Foto>(
  import.meta.glob("../../content/galeria/*.json", { eager: true })
);
