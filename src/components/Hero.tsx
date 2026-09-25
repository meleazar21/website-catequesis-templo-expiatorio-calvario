import { useEffect, useState } from "react";
import { portada, site } from "../data/site";
import { Icon } from "./ui";

/**
 * Portada. El fondo se configura desde el panel (/admin → Configuración del sitio) y
 * admite **foto, video o ninguno de los dos**; sin nada, sale un degradado azul
 * compuesto, que es un fondo digno por sí mismo y no un hueco a la espera de imagen.
 *
 * Si hay las dos cosas, el video manda en pantalla grande y la foto es lo que se ve en
 * el teléfono: un fondo en bucle puede costarle varios megas de datos móviles a quien
 * solo venía a consultar un horario. Tampoco se reproduce si el sistema del visitante
 * pide menos movimiento.
 */
/**
 * Que el archivo del video sea realmente un video. El panel ya lo valida, pero una
 * fotografía puesta en ese campo deja la portada en negro sin explicar por qué —ya
 * pasó—, y aquí cuesta una línea descartarla.
 */
const esVideo = (src: string) => /\.(mp4|webm|ogv)(\?.*)?$/i.test(src);

export function Hero() {
  const [reproducir, setReproducir] = useState(false);
  const video = portada.video && esVideo(portada.video) ? portada.video : "";

  useEffect(() => {
    if (!video) return;
    const mq = window.matchMedia("(min-width: 640px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setReproducir(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [video]);

  const hayVideo = Boolean(video) && reproducir;
  // Con video o foto detrás hace falta más velo para que el texto siga legible.
  const conMedio = hayVideo || Boolean(portada.foto);

  return (
    <section id="inicio" className="relative flex min-h-[92vh] items-center overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 bg-navy-deep">
        {hayVideo ? (
          <video
            className="h-full w-full object-cover"
            src={video}
            poster={portada.foto || undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : portada.foto ? (
          <img src={portada.foto} alt="" className="h-full w-full object-cover" />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(120% 90% at 78% 8%, #2f4fb0 0%, transparent 55%)," +
                "radial-gradient(90% 70% at 8% 95%, #152a63 0%, transparent 60%)," +
                "linear-gradient(160deg, #142a63 0%, #0e1c44 100%)",
            }}
          />
        )}

        {/* Trama de arcos: evoca los del templo sin caer en iconografía recargada.
            Con foto o video detrás estorba, así que solo sale sobre el degradado. */}
        {!conMedio && (
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 100%, transparent 26px, #ffffff 26px, #ffffff 27px, transparent 27px)",
              backgroundSize: "64px 64px",
            }}
          />
        )}

        {/* Velo de legibilidad. */}
        <div
          className={`absolute inset-0 ${
            conMedio
              ? "bg-gradient-to-t from-navy-deep via-navy-deep/85 to-navy-deep/65"
              : "bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy-deep/45"
          }`}
        />
      </div>

      {/* Contenido */}
      <div className="relative mx-auto w-full max-w-content px-5 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-36">
        <div className="max-w-3xl animate-reveal">
          <img
            src="/logo.png"
            alt={site.marca}
            className="mb-8 h-28 w-auto object-contain sm:h-36"
          />

          <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.3em] text-gold-light">
            {site.marcaLinea1}
          </p>

          <h1 className="mt-5 text-[2.5rem] leading-[1.08] text-white sm:text-[3.6rem] lg:text-[4.2rem]">
            {site.parroquia}
            <span className="mt-2 block text-[1.6rem] font-normal text-white/85 sm:text-[2.1rem]">
              {site.parroquiaLinea2}
            </span>
          </h1>

          <figure className="mt-9 border-l-2 border-gold pl-5">
            <blockquote className="font-serif text-[1.35rem] italic leading-snug text-white/90 sm:text-[1.7rem]">
              “{site.versiculo.texto}”
            </blockquote>
            <figcaption className="mt-2 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-gold-light">
              {site.versiculo.cita}
            </figcaption>
          </figure>

          <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#inscripciones"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-[0.85rem] font-extrabold uppercase tracking-[0.14em] text-navy-deep shadow-lift transition-transform hover:-translate-y-0.5 hover:bg-gold-light"
            >
              Inscripciones <Icon name="arrow" size={17} />
            </a>
            <a
              href="#catequesis"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-8 py-4 text-[0.85rem] font-extrabold uppercase tracking-[0.14em] text-white transition-colors hover:border-white/70 hover:bg-white/10"
            >
              Conoce nuestra catequesis
            </a>
          </div>
        </div>
      </div>

      {/* Curva que enlaza con el marfil de la siguiente sección. */}
      <svg
        className="absolute inset-x-0 bottom-[-1px] h-10 w-full text-ivory sm:h-14"
        viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"
      >
        <path d="M0 60V28c240 26 480 32 720 18S1200 6 1440 24v36z" fill="currentColor" />
      </svg>
    </section>
  );
}
