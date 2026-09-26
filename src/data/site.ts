/**
 * Datos generales de la parroquia y del grupo de catequesis.
 *
 * **El contenido no vive aquí**: vive en `content/*.json`, que es lo que edita el panel
 * de administración (Decap CMS, en `/admin`). Este archivo solo lo lee y le pone tipos,
 * para que los componentes sigan recibiendo objetos con la forma de siempre.
 *
 * Si editas a mano, hazlo en `content/site.json`.
 */
import bruto from "../../content/site.json";

/**
 * Si alguien tiene el panel abierto con una versión anterior de la configuración y
 * guarda, el archivo sale SIN las claves añadidas después: el panel escribe los campos
 * que su pestaña conoce, no los que hay en disco. Eso no debe tumbar la compilación por
 * un campo opcional, así que las claves que pueden faltar se declaran opcionales y se
 * leen como cadena vacía, que es justo lo que significan.
 */
const raw = bruto as typeof bruto & {
  portadaFotoMovil?: string;
};

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
  /** Versión vertical, solo para el teléfono. Vacío = se usa la de arriba. */
  fotoMovil: raw.portadaFotoMovil ?? "",
  video: raw.portadaVideo,
};

/**
 * Convierte lo que se pegue en el campo del mapa en un enlace que se pueda incrustar.
 *
 * Google ofrece de primeras el enlace de **compartir**, y ese no se puede incrustar: lo
 * rechaza dentro de un iframe ("refused to connect"). El enlace de incrustar está más
 * escondido (Compartir → Insertar un mapa). Pedirle a quien mantiene el sitio que
 * distinga los dos es pedirle que se acuerde de algo que no tiene por qué saber, así que
 * aquí se acepta cualquiera de las formas habituales y se traduce:
 *
 *  - un enlace de incrustar, tal cual;
 *  - la URL larga de la barra de direcciones, de la que se sacan las coordenadas;
 *  - unas coordenadas sueltas, "11.977989, -86.0876864";
 *  - cualquier otra cosa se trata como dirección y se busca.
 *
 * La excepción son los enlaces cortos (maps.app.goo.gl): solo el servidor de Google sabe
 * a dónde apuntan y el navegador no puede resolverlos, así que se descartan y sale el
 * marcador, que explica qué pegar. Es preferible a un mapa roto sin explicación.
 */
function mapaEmbed(valor: string): string {
  const v = valor.trim();
  if (!v) return "";

  const mapa = (consulta: string) =>
    `https://maps.google.com/maps?q=${encodeURIComponent(consulta)}&z=17&hl=es&output=embed`;

  if (v.includes("/maps/embed") || v.includes("output=embed")) return v;
  if (/(maps\.app\.goo\.gl|goo\.gl\/maps)/i.test(v)) return "";

  if (/^https?:\/\//i.test(v)) {
    // !3d/!4d son las del lugar; @lat,lng es el centro del mapa, que sirve de respaldo.
    const lugar = v.match(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/);
    const centro = v.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    const c = lugar ?? centro;
    return c ? mapa(`${c[1]},${c[2]}`) : "";
  }

  return mapa(v);
}

export const contacto = {
  telefono: raw.telefono,
  /** Solo dígitos con código de país, para el enlace wa.me. Ej.: "50588887777". */
  whatsapp: raw.whatsapp,
  correo: raw.correo,
  direccion: raw.direccion,
  horarioAtencion: raw.horarioAtencion,
  /** Ya convertido a un enlace incrustable. Vacío = se muestra el marcador. */
  mapaEmbedUrl: mapaEmbed(raw.mapaEmbedUrl),
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
