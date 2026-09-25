/**
 * Datos generales de la parroquia y del grupo de catequesis.
 *
 * TODO lo marcado como `POR_DEFINIR` es contenido provisional: nada aquí es
 * información oficial verificada. Sustitúyelo por los datos reales antes de publicar.
 */

/** Marca visible para cualquier dato que todavía no es oficial. */
export const POR_DEFINIR = "[CONTENIDO POR DEFINIR]";

export const site = {
  grupo: "Grupo de Catequesis",
  parroquia: "Templo Expiatorio Arquidiocesano",
  parroquiaLinea2: "Parroquia El Calvario — Masaya",
  ciudad: "Masaya, Nicaragua",
  lema: "Formando corazones para Cristo.",
  versiculo: {
    texto: "Dejen que los niños se acerquen a mí.",
    cita: "Mateo 19, 14",
  },
};

export const contacto = {
  telefono: POR_DEFINIR,
  /** Solo dígitos con código de país, para el enlace wa.me. Ej.: "50588887777". */
  whatsapp: "",
  correo: POR_DEFINIR,
  direccion: POR_DEFINIR,
  horarioAtencion: POR_DEFINIR,
  /** Enlace para incrustar Google Maps. Vacío = no se muestra el mapa. */
  mapaEmbedUrl: "",
  redes: [
    { nombre: "Facebook", url: "" },
    { nombre: "Instagram", url: "" },
  ] as { nombre: string; url: string }[],
};

/** Texto oficial del grupo; hoy es provisional. */
export const mision = {
  titulo: "Nuestra misión",
  texto:
    "Acompañar a niños, adolescentes, jóvenes y familias de nuestra comunidad en su " +
    "crecimiento en la fe, preparándolos para recibir los sacramentos de iniciación " +
    "cristiana y para vivir el Evangelio en la vida diaria. " +
    POR_DEFINIR,
};

export const vision = {
  titulo: "Nuestra visión",
  texto:
    "Ser una comunidad de catequesis viva y cercana, donde cada persona encuentre a " +
    "Cristo, se sienta acogida y descubra su lugar en la Iglesia y en el servicio a " +
    "los demás. " +
    POR_DEFINIR,
};

export const bienvenida = {
  titulo: "Bienvenidos a nuestra comunidad",
  parrafos: [
    "Nuestro grupo de catequesis acompaña a niños, adolescentes, jóvenes y familias " +
      "en su camino de fe y en su preparación para recibir los sacramentos.",
    "Cada sábado nos reunimos en el templo para aprender, celebrar y crecer juntos. " +
      "Más que clases, formamos una comunidad que camina unida.",
  ],
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
