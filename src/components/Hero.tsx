import { useEffect, useState } from "react";
import { hero, site } from "../data/site";
import { Icon } from "./ui";

/**
 * Checks that the video file really is a video. The panel already validates it, but a
 * photo put in that field leaves the hero black with no explanation —it has happened—
 * and here it takes one line to discard it.
 */
const isVideoFile = (src: string) => /\.(mp4|webm|ogv)(\?.*)?$/i.test(src);

/**
 * Hero. The background is set from the panel (/admin → Configuración del sitio) and
 * accepts **a photo, a video, or neither**; with nothing set, a composed blue gradient
 * is shown, which is a worthy background on its own and not a hole waiting for an image.
 *
 * If both are set, the video wins on large screens and the photo is what phones see: a
 * looping background can cost several megabytes of mobile data to someone who only
 * came to check a schedule. It also doesn't play if the visitor's system asks for
 * reduced motion.
 */
export function Hero() {
  const [canPlay, setCanPlay] = useState(false);
  const video = hero.video && isVideoFile(hero.video) ? hero.video : "";

  useEffect(() => {
    if (!video) return;
    const mq = window.matchMedia("(min-width: 640px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setCanPlay(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [video]);

  /**
   * A vertical (phone-recorded) video stretched over a wide hero gets cropped to a
   * third of its height and looks zoomed in. In that case it's shown whole, to the
   * right of the text, over a blurred copy of itself that fills the rest.
   */
  const [portrait, setPortrait] = useState(false);

  const showVideo = Boolean(video) && canPlay;
  // With a video or photo behind it, the text needs a heavier overlay to stay readable.
  const hasMedia = showVideo || Boolean(hero.photo);
  const portraitVideo = showVideo && portrait;

  return (
    <section id="inicio" className="relative flex min-h-[78svh] items-center overflow-hidden sm:min-h-[100svh]">
      {/* Background */}
      <div className="absolute inset-0 bg-navy-deep">
        {showVideo ? (
          <>
            {portraitVideo && (
              <video
                className="h-full w-full scale-110 object-cover opacity-60 blur-2xl"
                src={video}
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
              />
            )}
            <video
              className={
                portraitVideo
                  ? "absolute inset-y-0 right-0 h-full w-auto max-w-full object-contain lg:right-[6%]"
                  : "h-full w-full object-cover object-[center_38%]"
              }
              src={video}
              // The photo is a landscape poster: next to a vertical video it would be
              // letterboxed, so it's only used for the landscape layout.
              poster={portrait ? undefined : hero.photo || undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              onLoadedMetadata={(e) =>
                setPortrait(e.currentTarget.videoHeight > e.currentTarget.videoWidth)
              }
            />
          </>
        ) : hero.photo ? (
          /* <picture> rather than `hidden sm:block`: that way the phone downloads ONE
             image, its own, and not both. */
          /* `block h-full w-full`: <picture> is inline by default, and then the image's
             h-full would have nothing to measure against. */
          <picture className="block h-full w-full">
            {hero.mobilePhoto && (
              <source media="(max-width: 639px)" srcSet={hero.mobilePhoto} />
            )}
            <img src={hero.photo} alt="" className="h-full w-full object-cover object-[center_38%]" />
          </picture>
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

        {/* Arch pattern: evokes the temple's arches without heavy iconography. With a
            photo or video behind it, it gets in the way, so it only shows on the gradient. */}
        {!hasMedia && (
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 100%, transparent 26px, #ffffff 26px, #ffffff 27px, transparent 27px)",
              backgroundSize: "64px 64px",
            }}
          />
        )}

        {/* Readability overlay. */}
        {/* For a vertical video the overlay runs left to right: dark behind the text,
            light over the video so it reads as a video and not as a blue panel. */}
        <div
          className={`absolute inset-0 ${
            portraitVideo
              ? "bg-gradient-to-r from-navy-deep/90 via-navy-deep/60 to-navy-deep/10"
              : hasMedia
                ? "bg-gradient-to-t from-navy-deep via-navy-deep/85 to-navy-deep/65"
                : "bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy-deep/45"
          }`}
        />
        {portraitVideo && (
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-deep to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-content px-5 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-36">
        <div className="max-w-3xl animate-reveal">
          {/* The logo used to be here too. It sat almost on the same vertical as the
              navbar's, a few centimeters away: it read as repetition, not hierarchy.
              The logo lives in the navbar. */}
          {/* "Catequesis" is part of the h1 (styled as an eyebrow) so the page's main
              heading carries what people search for: "catequesis" + "El Calvario". */}
          <h1 className="text-[2.5rem] leading-[1.08] text-white sm:text-[3.6rem] lg:text-[4.2rem]">
            <span className="block font-sans text-[0.72rem] font-extrabold uppercase leading-normal tracking-[0.3em] text-gold-light">
              {site.brandLine1}
            </span>
            <span className="mt-5 block">{site.parish}</span>
            <span className="mt-2 block text-[1.6rem] font-normal text-white/85 sm:text-[2.1rem]">
              {site.parishLine2}
            </span>
          </h1>

          <figure className="mt-9 border-l-2 border-gold pl-5">
            <blockquote className="font-serif text-[1.35rem] italic leading-snug text-white/90 sm:text-[1.7rem]">
              “{site.verse.text}”
            </blockquote>
            <figcaption className="mt-2 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-gold-light">
              {site.verse.reference}
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

      {/* Curve that blends into the ivory of the next section. */}
      <svg
        className="absolute inset-x-0 bottom-[-1px] h-10 w-full text-ivory sm:h-14"
        viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"
      >
        <path d="M0 60V28c240 26 480 32 720 18S1200 6 1440 24v36z" fill="currentColor" />
      </svg>
    </section>
  );
}
