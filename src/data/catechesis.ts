/**
 * Courses, schedules, registration, catechists, announcements, events and gallery.
 *
 * **The content does not live here**: it lives in `content/`, which is what the admin
 * panel (Decap CMS, at `/admin`) edits. Each item in a collection is its own JSON file,
 * so the CMS can add and delete items without touching the others.
 * This file only loads them, sorts them and gives them types.
 *
 * Field names mirror the JSON keys in `content/`, so they stay in Spanish.
 *
 * ⚠️ The starter content is **provisional sample data**: none of it is official — no
 * schedules, dates, requirements or real people.
 */
import schedulesRaw from "../../content/horarios.json";
import registrationRaw from "../../content/inscripciones.json";

/** A single string inside a list; the CMS cannot store lists of plain strings. */
interface Line { texto: string }
const toLines = (xs: Line[] | undefined): string[] => (xs ?? []).map((x) => x.texto);

/**
 * Loads every JSON file in a folder and sorts them by their `orden` field.
 * `import.meta.glob` resolves them at build time, so there are no network requests:
 * everything ends up inside the static bundle.
 */
function loadCollection<T extends { orden?: number }>(mods: Record<string, unknown>): T[] {
  return Object.keys(mods)
    .sort()
    .map((k) => (mods[k] as { default: T }).default)
    .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
}

// ---------------------------------------------------------------- Courses
export interface Course {
  orden?: number;
  nombre: string;
  /** Course poster. Empty = the card shows the default icon. */
  imagen?: string;
  edad: string;
  horario: string;
  duracion: string;
  descripcion: string;
  detalle: string[];
}
interface CourseRaw extends Omit<Course, "detalle"> { detalle: Line[] }

export const courses: Course[] = loadCollection<CourseRaw>(
  import.meta.glob("../../content/cursos/*.json", { eager: true })
).map((c) => ({ ...c, detalle: toLines(c.detalle) }));

// ---------------------------------------------------------------- Schedules
export interface Schedule { curso: string; dia: string; hora: string; lugar: string }
export const schedules: Schedule[] = schedulesRaw.items;

// ---------------------------------------------------------------- Registration
export const registration = {
  ...registrationRaw,
  requisitos: toLines(registrationRaw.requisitos),
};

// ---------------------------------------------------------------- Catechists
export interface Catechist {
  orden?: number;
  nombre: string;
  grupo: string;
  frase: string;
  /** Photo path. Empty = a "photo to be defined" placeholder is drawn. */
  foto?: string;
  /** Which part of the photo the card keeps when it has to crop it. Empty = "normal". */
  encuadre?: "arriba" | "normal" | "centro" | "abajo";
}
export const catechists = loadCollection<Catechist>(
  import.meta.glob("../../content/catequistas/*.json", { eager: true })
);

// ---------------------------------------------------------------- Announcements
/** Values stored in the content files, and shown as-is on the page. */
export type Category =
  | "INSCRIPCIONES" | "SACRAMENTOS" | "REUNIONES" | "ACTIVIDADES" | "AVISOS";

export interface Announcement {
  orden?: number;
  fecha: string;
  titulo: string;
  categoria: Category;
  descripcion: string;
  /** Featured announcements get a gold border. */
  destacado?: boolean;
}
export const announcements = loadCollection<Announcement>(
  import.meta.glob("../../content/avisos/*.json", { eager: true })
);

// ---------------------------------------------------------------- Events
export interface CalendarEvent {
  orden?: number;
  dia: string;
  mes: string;
  titulo: string;
  hora: string;
  lugar: string;
}
export const events = loadCollection<CalendarEvent>(
  import.meta.glob("../../content/eventos/*.json", { eager: true })
);

// ---------------------------------------------------------------- Gallery
export interface GalleryPhoto {
  orden?: number;
  titulo: string;
  /** Image path. Empty = a "photo to be defined" placeholder is drawn. */
  foto?: string;
  /** Relative height, so the masonry grid doesn't look flat. */
  alto: "corto" | "medio" | "alto";
}
export const gallery = loadCollection<GalleryPhoto>(
  import.meta.glob("../../content/galeria/*.json", { eager: true })
);
