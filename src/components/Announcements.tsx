import { avisos, eventos, type Categoria } from "../data/catequesis";
import { Eyebrow, Icon, Lead, Pill, Provisional, Reveal, Section, Title } from "./ui";

/** Color de cada categoría; el dorado queda para inscripciones, que es lo prioritario. */
const TONO: Record<Categoria, "navy" | "gold" | "sage" | "red"> = {
  INSCRIPCIONES: "gold",
  SACRAMENTOS: "navy",
  REUNIONES: "sage",
  ACTIVIDADES: "navy",
  AVISOS: "red",
};

/** Avisos y próximas actividades: lo que cambia semana a semana. */
export function Announcements() {
  return (
    <Section id="avisos">
      <Reveal>
        <div className="text-center">
          <Eyebrow>Al día</Eyebrow>
          <Title center>Avisos y actividades</Title>
          <Lead center>
            Lo más reciente del grupo de catequesis y lo que viene en las próximas semanas.
          </Lead>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
        {/* Avisos */}
        <div>
          <h3 className="text-[0.72rem] font-sans font-extrabold uppercase tracking-[0.18em] text-ink-faint">
            Noticias y avisos
          </h3>
          <div className="mt-6 space-y-5">
            {avisos.map((a, i) => (
              <Reveal key={a.id} delay={i * 80}>
                <article className={`rounded-2xl border bg-white p-6 shadow-card transition-shadow hover:shadow-lift sm:p-7 ${
                  a.destacado ? "border-gold/50" : "border-navy/8"
                }`}>
                  <div className="flex flex-wrap items-center gap-3">
                    <Pill tone={TONO[a.categoria]}>{a.categoria}</Pill>
                    {a.destacado && <Pill tone="gold">Destacado</Pill>}
                    <span className="text-[0.8rem] text-ink-faint">
                      <Provisional text={a.fecha} />
                    </span>
                  </div>
                  <h4 className="mt-4 font-serif text-[1.35rem] leading-tight text-navy-deep">{a.titulo}</h4>
                  <p className="mt-3 leading-relaxed text-ink-soft">
                    <Provisional text={a.descripcion} />
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Próximas actividades */}
        <div>
          <h3 className="text-[0.72rem] font-sans font-extrabold uppercase tracking-[0.18em] text-ink-faint">
            Próximamente
          </h3>
          <div className="mt-6 space-y-4">
            {eventos.map((e, i) => (
              <Reveal key={e.id} delay={i * 80}>
                <article className="flex gap-5 rounded-2xl border border-navy/8 bg-white p-5 shadow-card transition-shadow hover:shadow-lift">
                  {/* Taco de calendario */}
                  <div className="flex h-[4.4rem] w-[4.4rem] shrink-0 flex-col items-center justify-center rounded-xl bg-navy text-white">
                    <span className="font-serif text-[1.7rem] leading-none">{e.dia}</span>
                    <span className="mt-1 text-[0.6rem] font-extrabold uppercase tracking-[0.14em] text-gold-light">
                      {e.mes}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-serif text-[1.15rem] leading-tight text-navy-deep">{e.titulo}</h4>
                    <p className="mt-2 flex items-center gap-1.5 text-[0.85rem] text-ink-soft">
                      <Icon name="clock" size={14} className="shrink-0 text-navy/50" />
                      <Provisional text={e.hora} />
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-[0.85rem] text-ink-soft">
                      <Icon name="pin" size={14} className="shrink-0 text-navy/50" />
                      <Provisional text={e.lugar} />
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
