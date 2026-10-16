import { useRef, useState } from "react";
import { gallery, type GalleryPhoto } from "../data/catechesis";
import { Eyebrow, Icon, Lead, Lightbox, PhotoPlaceholder, Reveal, Section, Title } from "./ui";

/** Photos per page: one large on top and four small underneath. */
const PAGE_SIZE = 5;

const pages: GalleryPhoto[][] = [];
for (let i = 0; i < gallery.length; i += PAGE_SIZE) pages.push(gallery.slice(i, i + PAGE_SIZE));

/**
 * Gallery carousel in pages of five: one photo large on top and the other four in a row
 * of small ones underneath, on every screen size. A full mosaic made the page very long
 * on the phone, where most visitors are; this keeps the section the same height however
 * many photos are added.
 *
 * Tapping a small photo moves it into the large spot; tapping the large one opens it
 * full screen. The arrows (or a swipe on the large photo) go to the next five.
 */
export function Gallery() {
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = pages.length;

  const go = (p: number) => {
    setPage((p + count) % count);
    setSelected(0);
  };

  const photos = pages[page] ?? [];
  const main = photos[selected];
  const thumbs = photos.map((f, i) => ({ f, i })).filter(({ i }) => i !== selected);

  return (
    <Section className="bg-ivory-deep">
      <Reveal>
        <div className="text-center">
          <Eyebrow>Nuestra vida en comunidad</Eyebrow>
          <Title center>Galería</Title>
          <Lead center>
            Momentos de catequesis, celebraciones, retiros y actividades de nuestra comunidad.
          </Lead>
        </div>
      </Reveal>

      {main && (
        <Reveal delay={90}>
          <div aria-roledescription="carrusel" aria-label="Galería de fotos" className="mx-auto mt-12 max-w-4xl sm:mt-14">
            {/* Large photo. `key` remounts it on each change, so it fades in instead of popping. */}
            <div
              key={`${page}-${selected}`}
              onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) > 50) go(page + (dx < 0 ? 1 : -1));
              }}
              className="animate-fade"
            >
              {main.foto ? (
                <button
                  type="button"
                  onClick={() => setOpen({ src: main.foto!, alt: main.titulo })}
                  aria-label={`Ver en grande: ${main.titulo}`}
                  className="group block h-60 w-full cursor-zoom-in overflow-hidden rounded-2xl shadow-card sm:h-[22rem] lg:h-[25rem]"
                >
                  <img
                    src={main.foto}
                    alt={main.titulo}
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>
              ) : (
                <PhotoPlaceholder label={main.titulo} className="h-60 w-full rounded-2xl shadow-card sm:h-[22rem] lg:h-[25rem]" />
              )}
            </div>

            {/* The four small ones. */}
            {thumbs.length > 0 && (
              <div className="mt-3 grid grid-cols-4 gap-2 sm:mt-4 sm:gap-4">
                {thumbs.map(({ f, i }) =>
                  f.foto ? (
                    <button
                      key={f.titulo + i}
                      type="button"
                      onClick={() => setSelected(i)}
                      aria-label={`Mostrar: ${f.titulo}`}
                      className="group h-16 overflow-hidden rounded-lg shadow-card sm:h-24 sm:rounded-xl lg:h-28"
                    >
                      <img
                        src={f.foto}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-[1.06] group-hover:opacity-100"
                      />
                    </button>
                  ) : (
                    <PhotoPlaceholder key={f.titulo + i} label={f.titulo} compact className="h-16 rounded-lg sm:h-24 sm:rounded-xl lg:h-28" />
                  )
                )}
              </div>
            )}

            {count > 1 && (
              <div className="mt-6 flex items-center justify-center gap-5">
                <button
                  type="button" onClick={() => go(page - 1)} aria-label="Fotos anteriores"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 text-navy transition-colors hover:border-gold hover:bg-gold hover:text-white"
                >
                  <Icon name="arrow" size={18} className="rotate-180" />
                </button>
                <p className="min-w-[4.5rem] text-center text-[0.8rem] font-extrabold tabular-nums tracking-[0.14em] text-ink-soft" aria-live="polite">
                  {page + 1} / {count}
                </p>
                <button
                  type="button" onClick={() => go(page + 1)} aria-label="Fotos siguientes"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 text-navy transition-colors hover:border-gold hover:bg-gold hover:text-white"
                >
                  <Icon name="arrow" size={18} />
                </button>
              </div>
            )}
          </div>
        </Reveal>
      )}

      {open && <Lightbox src={open.src} alt={open.alt} onClose={() => setOpen(null)} />}
    </Section>
  );
}
