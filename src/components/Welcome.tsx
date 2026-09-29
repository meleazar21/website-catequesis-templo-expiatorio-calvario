import { mission, vision, welcome } from "../data/site";
import { Eyebrow, Icon, Lead, PhotoPlaceholder, Provisional, Reveal, Section, Title } from "./ui";

/** Welcome + Mission and Vision. Both live under the "Nosotros" menu section. */
export function Welcome() {
  return (
    <>
      <Section id="nosotros">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Nuestra comunidad</Eyebrow>
            <Title>{welcome.title}</Title>
            {welcome.paragraphs.map((p, i) => (
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
              {welcome.photo ? (
                <img src={welcome.photo} alt="" loading="lazy"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card" />
              ) : (
                <PhotoPlaceholder label="La comunidad reunida en el templo"
                  className="aspect-[4/3] w-full rounded-2xl shadow-card" />
              )}
              {/* Gold corner rule: a discreet detail, without heavy iconography. */}
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
            // The Eye of Providence for the mission: the Trinity's triangle and the eye
            // of God who sees and cares. The star for the vision: where we are headed.
            { icon: "providence" as const, ...mission },
            { icon: "star" as const, ...vision },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 110}>
              <article className="h-full rounded-2xl border border-navy/[0.08] bg-white p-8 shadow-card transition-shadow hover:shadow-lift sm:p-10">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-soft text-navy">
                  <Icon name={c.icon} size={24} />
                </span>
                <h3 className="mt-6 text-[1.6rem] text-navy-deep">{c.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-soft">
                  <Provisional text={c.text} />
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
