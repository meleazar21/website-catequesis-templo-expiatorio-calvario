import { useState } from "react";
import { cursos } from "../data/catequesis";
import { Eyebrow, Icon, Lead, Provisional, Reveal, Section, Title } from "./ui";

/**
 * Cursos de catequesis. "Ver información" despliega el detalle en la misma tarjeta:
 * en móvil evita mandar a la persona a otra pantalla para leer cuatro líneas.
 */
export function Courses() {
  const [abierto, setAbierto] = useState<string | null>(null);

  return (
    <Section id="catequesis">
      <Reveal>
        <div className="text-center">
          <Eyebrow>Formación</Eyebrow>
          <Title center>Nuestra catequesis</Title>
          <Lead center>
            Acompañamos cada etapa del camino de fe, desde el bautismo de los más
            pequeños hasta los adultos que desean completar su iniciación cristiana.
          </Lead>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cursos.map((c, i) => {
          const desplegado = abierto === c.nombre;
          return (
            <Reveal key={c.nombre} delay={i * 90} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-navy/8 bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold-soft text-[#8a6d22]">
                  <Icon name="book" size={22} />
                </span>

                <h3 className="mt-5 text-[1.35rem] leading-tight text-navy-deep">{c.nombre}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-soft">{c.descripcion}</p>

                <dl className="mt-6 space-y-2.5 border-t border-navy/8 pt-5 text-[0.88rem]">
                  {[
                    { k: "Edad", v: c.edad },
                    { k: "Horario", v: c.horario },
                    { k: "Duración", v: c.duracion },
                  ].map((f) => (
                    <div key={f.k} className="flex gap-2">
                      <dt className="w-20 shrink-0 text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-ink-faint">
                        {f.k}
                      </dt>
                      <dd className="font-semibold text-navy">
                        <Provisional text={f.v} />
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-auto pt-6">
                  <button
                    type="button"
                    onClick={() => setAbierto(desplegado ? null : c.nombre)}
                    aria-expanded={desplegado}
                    className="inline-flex items-center gap-1.5 text-[0.78rem] font-extrabold uppercase tracking-[0.13em] text-navy transition-colors hover:text-gold"
                  >
                    {desplegado ? "Ocultar" : "Ver información"}
                    <Icon
                      name="chevron" size={16}
                      className={`transition-transform ${desplegado ? "rotate-180" : ""}`}
                    />
                  </button>

                  {desplegado && (
                    <ul className="mt-4 space-y-2 border-t border-navy/8 pt-4 text-[0.88rem] text-ink-soft">
                      {c.detalle.map((d, k) => (
                        <li key={k} className="flex gap-2">
                          <Icon name="check" size={15} className="mt-1 shrink-0 text-sage" />
                          <span><Provisional text={d} /></span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
