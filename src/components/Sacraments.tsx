import { useState } from "react";
import { sacramentos } from "../data/catequesis";
import { contacto } from "../data/site";
import { Eyebrow, Icon, Lead, Provisional, Reveal, Section, Title } from "./ui";

/**
 * Sacramentos. Va en acordeón: cada uno trae información, requisitos, fechas y
 * avisos, y mostrarlo todo abierto haría una sección larguísima en el teléfono.
 * El primero arranca desplegado para que se vea de qué va sin tener que tocar nada.
 */
export function Sacraments() {
  const [abierto, setAbierto] = useState<string | null>(sacramentos[0]?.nombre ?? null);

  return (
    <Section id="sacramentos" className="bg-ivory-deep">
      <Reveal>
        <div className="text-center">
          <Eyebrow>Vida sacramental</Eyebrow>
          <Title center>Sacramentos</Title>
          <Lead center>
            Información, requisitos y fechas de los sacramentos que se celebran en
            nuestra parroquia.
          </Lead>
        </div>
      </Reveal>

      <div className="mx-auto mt-14 max-w-3xl space-y-4">
        {sacramentos.map((s, i) => {
          const open = abierto === s.nombre;
          return (
            <Reveal key={s.nombre} delay={i * 70}>
              <article className={`overflow-hidden rounded-2xl border bg-white shadow-card transition-colors ${
                open ? "border-gold/50" : "border-navy/8"
              }`}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setAbierto(open ? null : s.nombre)}
                    aria-expanded={open}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left sm:px-8"
                  >
                    <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      open ? "bg-gold-soft text-[#8a6d22]" : "bg-navy-soft text-navy"
                    }`}>
                      <Icon name="dove" size={20} />
                    </span>
                    <span className="flex-1 font-serif text-[1.3rem] text-navy-deep">{s.nombre}</span>
                    <Icon
                      name="chevron" size={20}
                      className={`shrink-0 text-navy/50 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>

                {open && (
                  <div className="border-t border-navy/8 px-6 pb-8 pt-6 sm:px-8">
                    <p className="leading-relaxed text-ink-soft">{s.descripcion}</p>

                    <div className="mt-7 grid gap-7 sm:grid-cols-2">
                      <div>
                        <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-ink-faint">
                          Requisitos
                        </p>
                        <ul className="mt-3 space-y-2">
                          {s.requisitos.map((r, k) => (
                            <li key={k} className="flex gap-2 text-[0.92rem] text-ink-soft">
                              <Icon name="check" size={15} className="mt-1 shrink-0 text-sage" />
                              <span><Provisional text={r} /></span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-ink-faint">
                          Fechas importantes
                        </p>
                        <p className="mt-3 flex gap-2 text-[0.92rem] text-ink-soft">
                          <Icon name="calendar" size={15} className="mt-1 shrink-0 text-navy/60" />
                          <span><Provisional text={s.fechas} /></span>
                        </p>

                        {s.aviso && (
                          <p className="mt-5 rounded-xl bg-gold-soft px-4 py-3 text-[0.88rem] leading-relaxed text-[#8a6d22]">
                            {s.aviso}
                          </p>
                        )}

                        <p className="mt-5 flex gap-2 text-[0.88rem] text-ink-soft">
                          <Icon name="phone" size={15} className="mt-1 shrink-0 text-navy/60" />
                          <span><Provisional text={contacto.telefono} /></span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
