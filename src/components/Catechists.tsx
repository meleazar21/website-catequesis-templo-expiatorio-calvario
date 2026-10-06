import { useState } from "react";
import { catechists, type Catechist } from "../data/catechesis";
import { Eyebrow, Icon, Lead, Lightbox, PhotoPlaceholder, Reveal, Section, Title, useModalLayer } from "./ui";

/** Vertical anchor of the card's crop for each `encuadre` option in the panel. */
const CROP_POSITION: Record<string, string> = {
  arriba: "0%",
  normal: "30%",
  centro: "50%",
  abajo: "100%",
};

/**
 * Same, for the oval photo in the profile on the phone. On a tall portrait (9:16)
 * "normal" at 30% landed on the chest and cut off the head; portraits have the face
 * near the top, so the oval anchors close to it. It's a vertical oval, not a circle,
 * because a circle is as tall as the photo is wide: on close-up portraits only the
 * face fit, and the oval also shows the shirt with the logo.
 */
const AVATAR_POSITION: Record<string, string> = {
  arriba: "0%",
  normal: "6%",
  centro: "50%",
  abajo: "100%",
};

/**
 * Catechist team. Managed from /admin → Catequistas; the order is set by each entry's
 * `orden` field.
 *
 * The bios are multi-paragraph. Expanding them inside the card stretched the column
 * and left a long text in a 270px box, which is exactly where it reads worst. They open
 * in a separate profile instead, with the photo large beside them.
 */
export function Catechists() {
  const [profile, setProfile] = useState<Catechist | null>(null);

  return (
    <Section>
      <Reveal>
        <div className="text-center">
          <Eyebrow>Quiénes acompañan</Eyebrow>
          <Title center>Nuestros catequistas</Title>
          <Lead center>
            Un equipo de servidores que dedica su tiempo a acompañar a niños, jóvenes
            y familias en su camino de fe.
          </Lead>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {catechists.map((c, i) => (
          // Stagger within a row only: `i * 80` made the 20th card wait 1.6s after
          // scrolling into view, which read as the section loading slowly.
          <Reveal key={c.nombre} delay={(i % 4) * 80} className="h-full">
            {/* The whole card opens the profile: on the phone, a small button at the
                bottom is an awkward target, and there's nothing else to tap in here. */}
            <button
              type="button"
              onClick={() => setProfile(c)}
              className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-navy/[0.08] bg-white text-left shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              {c.foto ? (
                // 2:3 is the shape of most of the portraits, so they show whole. Taller
                // ones (9:16) get cropped: "normal" keeps the head and the shirt logo.
                <img src={c.foto} alt={c.nombre} loading="lazy" decoding="async"
                  className="aspect-[2/3] w-full object-cover"
                  style={{ objectPosition: `center ${CROP_POSITION[c.encuadre ?? "normal"] ?? "30%"}` }} />
              ) : (
                <PhotoPlaceholder label={c.nombre} className="aspect-[2/3] w-full" />
              )}

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-[1.2rem] leading-tight text-navy-deep">{c.nombre}</h3>
                <p className="mt-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.13em] text-gold">
                  {c.grupo}
                </p>
                <p className="mt-4 line-clamp-3 text-[0.92rem] leading-relaxed text-ink-soft">
                  {c.frase}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.75rem] font-extrabold uppercase tracking-[0.13em] text-navy transition-colors group-hover:text-gold">
                  Ver perfil <Icon name="arrow" size={15} />
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {profile && <CatechistProfile c={profile} onClose={() => setProfile(null)} />}
    </Section>
  );
}

/** A catechist's full profile: the photo large and the whole bio. */
function CatechistProfile({ c, onClose }: { c: Catechist; onClose: () => void }) {
  const [enlarged, setEnlarged] = useState(false);
  useModalLayer(onClose);
  const paragraphs = c.frase.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <>
    <div
      role="dialog" aria-modal="true" aria-label={c.nombre}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-end justify-center bg-navy-deep/90 p-0 animate-fade sm:items-center sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-3xl animate-reveal flex-col overflow-hidden rounded-t-2xl bg-white shadow-lift sm:max-h-[88vh] sm:flex-row sm:rounded-2xl"
      >
        <button
          type="button" onClick={onClose} aria-label="Cerrar"
          className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy-deep/60 text-white backdrop-blur transition-colors hover:bg-navy-deep sm:bg-white/85 sm:text-navy sm:hover:bg-white"
        >
          <Icon name="close" size={20} />
        </button>

        {/* On the phone the photo is an oval avatar above the name: it takes little
            height, so the bio starts on the first screen. Tapping it opens the photo
            whole and large. On desktop the column is narrow and vertical, like the
            photos, so the photo is shown WHOLE beside the text (`self-start`:
            stretching it to fill the column cut off a third of the sides). */}
        {c.foto ? (
          <button
            type="button" onClick={() => setEnlarged(true)} aria-label={`Ver la foto de ${c.nombre} en grande`}
            className="mx-auto mt-8 shrink-0 cursor-zoom-in rounded-[50%] sm:mx-0 sm:mt-0 sm:w-64 sm:self-start sm:rounded-none md:w-72"
          >
            <img
              src={c.foto} alt={c.nombre}
              className="h-[15.5rem] w-48 rounded-[50%] object-cover shadow-card ring-4 ring-gold/40 sm:h-auto sm:max-h-[80vh] sm:w-full sm:rounded-none sm:object-contain sm:shadow-none sm:ring-0"
              style={{ objectPosition: `center ${AVATAR_POSITION[c.encuadre ?? "normal"] ?? "6%"}` }}
            />
          </button>
        ) : (
          <PhotoPlaceholder label={c.nombre} className="mx-auto mt-8 h-[15.5rem] w-48 shrink-0 rounded-[50%] sm:mx-0 sm:mt-0 sm:h-auto sm:w-64 sm:rounded-none md:w-72" />
        )}

        <div className="flex-1 overflow-y-auto p-7 sm:p-9">
          <h3 className="text-center font-serif text-[1.8rem] leading-tight text-navy-deep sm:text-left">{c.nombre}</h3>
          <p className="mt-2 text-center text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-gold sm:text-left">
            {c.grupo}
          </p>
          {c.foto && (
            <p className="mt-2 text-center text-[0.72rem] text-ink-faint sm:hidden">
              Toca la foto para verla en grande
            </p>
          )}
          <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
            {paragraphs.map((p, k) => (
              <p key={k}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Outside the profile: its `animate-reveal` leaves a transform on the panel, which
        would trap a `position: fixed` viewer inside it instead of covering the screen. */}
    {enlarged && c.foto && (
      <Lightbox src={c.foto} alt={c.nombre} onClose={() => setEnlarged(false)} />
    )}
    </>
  );
}
