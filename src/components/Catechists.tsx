import { useState } from "react";
import { catechists, type Catechist } from "../data/catechesis";
import { Eyebrow, Icon, Lead, PhotoPlaceholder, Reveal, Section, Title, useModalLayer } from "./ui";

/** Vertical anchor of the card's crop for each `encuadre` option in the panel. */
const CROP_POSITION: Record<string, string> = {
  arriba: "0%",
  normal: "30%",
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
          <Reveal key={c.nombre} delay={i * 80} className="h-full">
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
                <img src={c.foto} alt={c.nombre} loading="lazy"
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
  useModalLayer(onClose);
  const paragraphs = c.frase.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
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

        {/* On the phone the photo is shown WHOLE (object-contain, over a soft
            background): cropping it cut off half a face, and these are photos of
            people. It stays height-limited because, if it fills the whole screen, you
            have to scroll to discover there was text below. On desktop the column is
            narrow and vertical, like the photos, so cropping there removes almost
            nothing and filling the column looks better. */}
        {c.foto ? (
          <img
            src={c.foto} alt={c.nombre}
            /* The photo is shown WHOLE at both sizes, uncropped and without bars:
               `w-auto` on the phone (at full width, a portrait photo left half-width
               bars) and `self-start` on desktop (stretching it to fill the column cut
               off a third of the sides). The element IS the photo. */
            className="mx-auto max-h-[42vh] w-auto shrink-0 object-contain sm:mx-0 sm:max-h-[80vh] sm:w-64 sm:self-start md:w-72"
          />
        ) : (
          <PhotoPlaceholder label={c.nombre} className="h-48 w-full shrink-0 sm:h-auto sm:w-64 md:w-72" />
        )}

        <div className="flex-1 overflow-y-auto p-7 sm:p-9">
          <h3 className="font-serif text-[1.8rem] leading-tight text-navy-deep">{c.nombre}</h3>
          <p className="mt-2 text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-gold">
            {c.grupo}
          </p>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
            {paragraphs.map((p, k) => (
              <p key={k}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
