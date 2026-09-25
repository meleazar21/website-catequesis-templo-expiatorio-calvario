import { catequistas } from "../data/catequesis";
import { Eyebrow, Lead, PhotoPlaceholder, Reveal, Section, Title } from "./ui";

/**
 * Equipo de catequistas. Los nombres del archivo de datos son **de ejemplo**: no
 * corresponden a personas reales. Al recibir el listado y las fotos de la parroquia
 * se sustituyen en `data/catequesis.ts`.
 */
export function Catechists() {
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
        {catequistas.map((c, i) => (
          <Reveal key={c.nombre} delay={i * 80} className="h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
              {c.foto ? (
                <img src={c.foto} alt={c.nombre} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              ) : (
                <PhotoPlaceholder label={c.nombre} className="aspect-[4/5] w-full" />
              )}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-[1.2rem] leading-tight text-navy-deep">{c.nombre}</h3>
                <p className="mt-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.13em] text-gold">
                  {c.grupo}
                </p>
                <p className="mt-4 font-serif text-[1.02rem] italic leading-relaxed text-ink-soft">
                  “{c.frase}”
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-10 text-center text-[0.82rem] text-ink-faint">
          Los nombres y fotografías mostrados son de ejemplo, a la espera del listado
          oficial del equipo de catequistas.
        </p>
      </Reveal>
    </Section>
  );
}
