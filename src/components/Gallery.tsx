import { galeria } from "../data/catequesis";
import { Eyebrow, Lead, PhotoPlaceholder, Reveal, Section, Title } from "./ui";

/** Altura de cada pieza: el desnivel es lo que le da el aire de mosaico. */
const ALTO = {
  corto: "h-52 sm:h-60",
  medio: "h-64 sm:h-80",
  alto: "h-80 sm:h-[26rem]",
} as const;

/**
 * Galería en mosaico (columnas CSS). No se usan fotos de archivo: hasta que la
 * parroquia entregue las suyas, cada pieza es un marcador que dice qué va ahí.
 * Para publicar una foto real basta con poner su ruta en `src` dentro de `galeria`.
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
          {galeria.map((f) =>
            f.foto ? (
              <img
                key={f.titulo}
                src={f.foto}
                alt={f.titulo}
                loading="lazy"
                className={`w-full break-inside-avoid rounded-2xl object-cover shadow-card ${ALTO[f.alto]}`}
              />
            ) : (
              <PhotoPlaceholder
                key={f.titulo}
                label={f.titulo}
                className={`w-full break-inside-avoid rounded-2xl shadow-card ${ALTO[f.alto]}`}
              />
            )
          )}
        </div>
      </Reveal>
    </Section>
  );
}
