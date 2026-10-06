/**
 * General information about the parish and the catechesis group.
 *
 * **The content does not live here**: it lives in `content/*.json`, which is what the
 * admin panel (Decap CMS, at `/admin`) edits. This file only reads it and gives it
 * types, so the components receive objects with a stable shape.
 *
 * If you edit by hand, do it in `content/site.json`.
 */
import type { IconName } from "../components/ui";
import siteJson from "../../content/site.json";

/**
 * If someone has the panel open with an older version of the config and saves, the
 * file comes out WITHOUT the keys added later: the panel writes the fields its tab
 * knows about, not the ones on disk. That must not break the build over an optional
 * field, so keys that may be missing are declared optional and read as an empty
 * string, which is exactly what they mean.
 */
const raw = siteJson as typeof siteJson & {
  portadaFotoMovil?: string;
  bienvenidaVideo?: string;
  papaTitulo?: string;
  papaTexto?: string;
  papaVideo?: string;
  youtube?: string;
  tiktok?: string;
};

/** Visible marker for any piece of data that is not official yet. */
export const TO_BE_DEFINED = "[CONTENIDO POR DEFINIR]";

export const site = {
  brand: raw.marca,
  brandLine1: raw.marcaLinea1,
  brandLine2: raw.marcaLinea2,
  parish: raw.parroquia,
  parishLine2: raw.parroquiaLinea2,
  city: raw.ciudad,
  motto: raw.lema,
  verse: { text: raw.versiculoTexto, reference: raw.versiculoCita },
};

/**
 * Hero background: a photo, a video, or neither (then a composed blue gradient is
 * shown). Both can be set — the video only plays on large screens, and the photo is
 * what phones see, so we don't burn the data plan of someone who only came to check
 * a schedule.
 */
export const hero = {
  photo: raw.portadaFoto,
  /** Portrait version, for phones only. Empty = the one above is used. */
  mobilePhoto: raw.portadaFotoMovil ?? "",
  video: raw.portadaVideo,
};

/**
 * Turns whatever is pasted into the map field into a link that can be embedded.
 *
 * Google offers the **share** link first, and that one can't be embedded: it's refused
 * inside an iframe ("refused to connect"). The embed link is more hidden (Share → Embed
 * a map). Asking whoever maintains the site to tell the two apart means asking them to
 * remember something they have no reason to know, so any of the usual forms is
 * accepted here and translated:
 *
 *  - an embed link, as is;
 *  - the long URL from the address bar, from which the coordinates are extracted;
 *  - bare coordinates, "11.977989, -86.0876864";
 *  - anything else is treated as an address and searched for.
 *
 * The exception is short links (maps.app.goo.gl): only Google's server knows where
 * they point and the browser can't resolve them, so they are discarded and the
 * placeholder is shown, which explains what to paste. Better than a broken map with
 * no explanation.
 */
function toMapEmbedUrl(value: string): string {
  const v = value.trim();
  if (!v) return "";

  const embed = (query: string) =>
    `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=17&hl=es&output=embed`;

  if (v.includes("/maps/embed") || v.includes("output=embed")) return v;
  if (/(maps\.app\.goo\.gl|goo\.gl\/maps)/i.test(v)) return "";

  if (/^https?:\/\//i.test(v)) {
    // !3d/!4d are the place's coordinates; @lat,lng is the map center, used as a fallback.
    const place = v.match(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/);
    const center = v.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    const c = place ?? center;
    return c ? embed(`${c[1]},${c[2]}`) : "";
  }

  return embed(v);
}

export const contact = {
  phone: raw.telefono,
  /** Digits only, with country code, for the wa.me link. E.g. "50588887777". */
  whatsapp: raw.whatsapp,
  address: raw.direccion,
  officeHours: raw.horarioAtencion,
  /** Already converted to an embeddable link. Empty = the placeholder is shown. */
  mapEmbedUrl: toMapEmbedUrl(raw.mapaEmbedUrl),
  /**
   * Only the ones with a link are shown; the rest are hidden entirely.
   *
   * `background` is each network's official color, and it's a CSS value rather than a
   * Tailwind class because Instagram's is a five-stop gradient. The glyph always goes
   * in white on top, which is how each brand asks to be used.
   */
  socials: [
    { name: "Facebook", icon: "facebook", url: raw.facebook, background: "#1877F2" },
    {
      name: "Instagram", icon: "instagram", url: raw.instagram,
      background: "linear-gradient(45deg,#FEDA75 5%,#FA7E1E 28%,#D62976 55%,#962FBF 78%,#4F5BD5 100%)",
    },
    { name: "YouTube", icon: "youtube", url: raw.youtube ?? "", background: "#FF0000" },
    { name: "TikTok", icon: "tiktok", url: raw.tiktok ?? "", background: "#010101" },
  ] as { name: string; icon: IconName; url: string; background: string }[],
};

/**
 * YouTube video id from any link the panel may receive: youtu.be/ID, watch?v=ID,
 * /embed/ID or /shorts/ID, with or without the `?si=` tracking that Share adds.
 */
const youtubeId = (url: string) =>
  url.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([\w-]{11})/)?.[1] ?? "";

export const popeMessage = {
  title: raw.papaTitulo ?? "",
  paragraphs: (raw.papaTexto ?? "").split(/\n{2,}/).filter(Boolean),
  /** Empty = the section is hidden. */
  videoId: youtubeId(raw.papaVideo ?? ""),
};

export const mission ={ title: raw.misionTitulo, text: raw.misionTexto };
export const vision = { title: raw.visionTitulo, text: raw.visionTexto };

export const welcome = {
  title: raw.bienvenidaTitulo,
  /** The CMS stores a single text; double line breaks separate paragraphs. */
  paragraphs: raw.bienvenidaTexto.split(/\n{2,}/).filter(Boolean),
  photo: raw.bienvenidaFoto,
  /** Takes priority over the photo when set; anything that isn't a video file is ignored. */
  video: /\.(mp4|webm|ogv)(\?.*)?$/i.test(raw.bienvenidaVideo ?? "") ? raw.bienvenidaVideo! : "",
};

/**
 * Navigation bar sections (the id must exist on the page). The ids are the URL
 * anchors visitors see, so they stay in Spanish.
 */
export const navigation = [
  { id: "inicio", label: "Inicio" },
  { id: "nosotros", label: "Nosotros" },
  { id: "catequesis", label: "Catequesis" },
  { id: "inscripciones", label: "Inscripciones" },
  { id: "avisos", label: "Avisos" },
  { id: "contacto", label: "Contacto" },
];
