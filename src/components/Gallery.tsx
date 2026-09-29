import { gallery } from "../data/catechesis";
import { Eyebrow, Lead, PhotoPlaceholder, Reveal, Section, Title } from "./ui";

/**
 * Height of each tile: the uneven heights are what give it the mosaic look. The keys
 * are the `alto` values stored in `content/galeria/`.
 */
const TILE_HEIGHT = {
  corto: "h-52 sm:h-60",
  medio: "h-64 sm:h-80",
  alto: "h-80 sm:h-[26rem]",
} as const;

/**
 * Mosaic gallery (CSS columns). No stock photos: until the parish provides its own,
 * each tile is a placeholder saying what goes there. To publish a real photo, set its
 * `foto` path in the entry under `content/galeria/`.
 */
export function Gallery() {
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

      <Reveal delay={90}>
        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {gallery.map((f) =>
            f.foto ? (
              <img
                key={f.titulo}
                src={f.foto}
                alt={f.titulo}
                loading="lazy"
                className={`w-full break-inside-avoid rounded-2xl object-cover shadow-card ${TILE_HEIGHT[f.alto]}`}
              />
            ) : (
              <PhotoPlaceholder
                key={f.titulo}
                label={f.titulo}
                className={`w-full break-inside-avoid rounded-2xl shadow-card ${TILE_HEIGHT[f.alto]}`}
              />
            )
          )}
        </div>
      </Reveal>
    </Section>
  );
}
