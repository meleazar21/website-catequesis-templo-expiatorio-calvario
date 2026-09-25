/**
 * Datos generales de la parroquia y del grupo de catequesis.
 *
 * **El contenido no vive aquí**: vive en `content/*.json`, que es lo que edita el panel
 * de administración (Decap CMS, en `/admin`). Este archivo solo lo lee y le pone tipos,
 * para que los componentes sigan recibiendo objetos con la forma de siempre.
 *
 * Si editas a mano, hazlo en `content/site.json`.
 */
import raw from "../../content/site.json";

/** Marca visible para cualquier dato que todavía no es oficial. */
export const POR_DEFINIR = "[CONTENIDO POR DEFINIR]";

export const site = {
  marca: raw.marca,
  marcaLinea1: raw.marcaLinea1,
  marcaLinea2: raw.marcaLinea2,
  parroquia: raw.parroquia,
  parroquiaLinea2: raw.parroquiaLinea2,
  ciudad: raw.ciudad,
  lema: raw.lema,
  versiculo: { texto: raw.versiculoTexto, cita: raw.versiculoCita },
};

/**
 * Fondo de la portada: una foto, un video, o ninguno de los dos (entonces sale un
 * degradado azul compuesto). Pueden convivir — el video solo se reproduce en pantallas
 * grandes, y la foto es lo que se ve en el teléfono, para no gastarle los datos a quien
 * solo venía a consultar un horario.
 */
export const portada = {
  foto: raw.portadaFoto,
  video: raw.portadaVideo,
};

export const contacto = {
  telefono: raw.telefono,
  /** Solo dígitos con código de país, para el enlace wa.me. Ej.: "50588887777". */
  whatsapp: raw.whatsapp,
  correo: raw.correo,
  direccion: raw.direccion,
  horarioAtencion: raw.horarioAtencion,
  /** Enlace para incrustar Google Maps. Vacío = no se muestra el mapa. */
  mapaEmbedUrl: raw.mapaEmbedUrl,
  redes: [
    { nombre: "Facebook", url: raw.facebook },
    { nombre: "Instagram", url: raw.instagram },
  ] as { nombre: string; url: string }[],
};

export const mision = { titulo: raw.misionTitulo, texto: raw.misionTexto };
export const vision = { titulo: raw.visionTitulo, texto: raw.visionTexto };

export const bienvenida = {
  titulo: raw.bienvenidaTitulo,
  /** El CMS guarda un solo texto; los saltos de línea dobles separan párrafos. */
  parrafos: raw.bienvenidaTexto.split(/\n{2,}/).filter(Boolean),
  foto: raw.bienvenidaFoto,
};

/** Secciones de la barra de navegación (el id debe existir en la página). */
export const navegacion = [
  { id: "inicio", label: "Inicio" },
  { id: "nosotros", label: "Nosotros" },
  { id: "catequesis", label: "Catequesis" },
  { id: "inscripciones", label: "Inscripciones" },
  { id: "sacramentos", label: "Sacramentos" },
  { id: "avisos", label: "Avisos" },
  { id: "contacto", label: "Contacto" },
];
