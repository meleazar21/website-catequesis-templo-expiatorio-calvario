import { bienvenida, mision, vision } from "../data/site";
import { Eyebrow, Icon, Lead, PhotoPlaceholder, Provisional, Reveal, Section, Title } from "./ui";

/** Bienvenida + Misión y Visión. Ambas viven en la sección "Nosotros" del menú. */
export function Welcome() {
  return (
    <>
      <Section id="nosotros">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Nuestra comunidad</Eyebrow>
            <Title>{bienvenida.titulo}</Title>
            {bienvenida.parrafos.map((p, i) => (
              <Lead key={i}>{p}</Lead>
            ))}
            <a
              href="#catequesis"
              className="mt-8 inline-flex items-center gap-2 text-[0.82rem] font-extrabold uppercase tracking-[0.14em] text-navy transition-colors hover:text-gold"
            >
              Ver los cursos <Icon name="arrow" size={16} />
            </a>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative">
              {bienvenida.foto ? (
                <img src={bienvenida.foto} alt="" loading="lazy"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card" />
              ) : (
                <PhotoPlaceholder label="La comunidad reunida en el templo"
                  className="aspect-[4/3] w-full rounded-2xl shadow-card" />
              )}
              {/* Filete dorado en la esquina: detalle discreto, sin iconografía recargada. */}
              <div className="pointer-events-none absolute -bottom-3 -right-3 hidden h-24 w-24 rounded-br-2xl border-b-2 border-r-2 border-gold/60 sm:block" />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-ivory-deep">
        <Reveal>
          <div className="text-center">
            <Eyebrow>Lo que nos mueve</Eyebrow>
            <Title center>Misión y visión</Title>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {[
            // El Ojo de la Providencia para la misión: el triángulo de la Trinidad y el
            // ojo de Dios que ve y cuida. La estrella para la visión: hacia dónde vamos.
            { icon: "providencia" as const, ...mision },
            { icon: "estrella" as const, ...vision },
          ].map((c, i) => (
            <Reveal key={c.titulo} delay={i * 110}>
              <article className="h-full rounded-2xl border border-navy/[0.08] bg-white p-8 shadow-card transition-shadow hover:shadow-lift sm:p-10">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-soft text-navy">
                  <Icon name={c.icon} size={24} />
                </span>
                <h3 className="mt-6 text-[1.6rem] text-navy-deep">{c.titulo}</h3>
                <p className="mt-4 leading-relaxed text-ink-soft">
                  <Provisional text={c.texto} />
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
