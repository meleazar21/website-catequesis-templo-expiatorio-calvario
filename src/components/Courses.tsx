import { useState } from "react";
import { courses } from "../data/catechesis";
import { Eyebrow, Icon, Lead, Lightbox, Provisional, Reveal, Section, Title } from "./ui";

/**
 * Catechesis courses. The card shows only the poster and the description; age,
 * schedule, duration and details live inside "Ver información". Descriptions vary a
 * lot in length, so showing everything at once left the details block at a different
 * height on every card and the grid looked misaligned. It expands inside the same
 * card: on mobile, that avoids sending the person to another screen.
 *
 * If the course has a poster, it heads the card. It's shown **whole** (`object-contain`)
 * rather than cropped: these are posters with text, and a crop eats exactly what
 * explains the course. And since the small print can't be read at this size, tapping
 * it opens it large.
 */
export function Courses() {
  const [openCourse, setOpenCourse] = useState<string | null>(null);
  const [poster, setPoster] = useState<{ src: string; alt: string } | null>(null);

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
        {courses.map((c, i) => {
          const expanded = openCourse === c.nombre;
          return (
            <Reveal key={c.nombre} delay={i * 90} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-navy/[0.08] bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                {c.imagen && (
                  <button
                    type="button"
                    onClick={() => setPoster({ src: c.imagen!, alt: `Cartel del curso ${c.nombre}` })}
                    title="Ver el cartel en grande"
                    className="group relative block w-full bg-ivory-deep"
                  >
                    <img
                      src={c.imagen} alt={`Cartel del curso ${c.nombre}`} loading="lazy"
                      /* No fixed aspect ratio: the poster keeps its own. Forcing 4:3 left
                         bars on the sides of a square one, which look like a bug. The
                         height cap stops a very tall poster from pushing the text out. */
                      className="max-h-64 w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-navy-deep/75 px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.1em] text-white opacity-0 transition-opacity group-hover:opacity-100">
                      <Icon name="image" size={12} /> Ampliar
                    </span>
                  </button>
                )}

                <div className="flex flex-1 flex-col p-7">
                {!c.imagen && (
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold-soft text-[#8a6d22]">
                    <Icon name="book" size={22} />
                  </span>
                )}

                <h3 className={`${c.imagen ? "" : "mt-5 "}text-[1.35rem] leading-tight text-navy-deep`}>{c.nombre}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-soft">{c.descripcion}</p>

                <div className="mt-auto pt-6">
                  <button
                    type="button"
                    onClick={() => setOpenCourse(expanded ? null : c.nombre)}
                    aria-expanded={expanded}
                    className="inline-flex items-center gap-1.5 text-[0.78rem] font-extrabold uppercase tracking-[0.13em] text-navy transition-colors hover:text-gold"
                  >
                    {expanded ? "Ocultar" : "Ver información"}
                    <Icon
                      name="chevron" size={16}
                      className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {expanded && (
                    <div className="mt-4 border-t border-navy/[0.08] pt-4">
                      <dl className="space-y-2.5 text-[0.88rem]">
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

                      {c.detalle.length > 0 && (
                        <ul className="mt-5 space-y-2 border-t border-navy/[0.08] pt-4 text-[0.88rem] text-ink-soft">
                          {c.detalle.map((d, k) => (
                            <li key={k} className="flex gap-2">
                              <Icon name="check" size={15} className="mt-1 shrink-0 text-sage" />
                              <span><Provisional text={d} /></span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {poster && (
        <Lightbox src={poster.src} alt={poster.alt} onClose={() => setPoster(null)} />
      )}
    </Section>
  );
}
