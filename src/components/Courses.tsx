import { useState } from "react";
import { cursos } from "../data/catequesis";
import { Eyebrow, Icon, Lead, Lightbox, Provisional, Reveal, Section, Title } from "./ui";

/**
 * Cursos de catequesis. En la tarjeta va solo el cartel y la descripción; la edad, el
 * horario, la duración y el detalle viven dentro de "Ver información". Las
 * descripciones son de largos muy distintos, así que tenerlo todo a la vista dejaba la
 * ficha de datos a distinta altura en cada tarjeta y la rejilla se veía descuadrada.
 * Se despliega en la misma tarjeta: en móvil evita mandar a la persona a otra pantalla.
 *
 * Si el curso tiene cartel, encabeza la tarjeta. Se muestra **entero** (`object-contain`)
 * y no recortado: son carteles con texto y un recorte se come justo lo que explica el
 * curso. Y como a este tamaño la letra pequeña no se lee, al tocarlo se abre en grande.
 */
export function Courses() {
  const [abierto, setAbierto] = useState<string | null>(null);
  const [cartel, setCartel] = useState<{ src: string; alt: string } | null>(null);

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
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                {c.imagen && (
                  <button
                    type="button"
                    onClick={() => setCartel({ src: c.imagen!, alt: `Cartel del curso ${c.nombre}` })}
                    title="Ver el cartel en grande"
                    className="group relative block w-full bg-ivory-deep"
                  >
                    <img
                      src={c.imagen} alt={`Cartel del curso ${c.nombre}`} loading="lazy"
                      /* Sin proporción fija: el cartel toma la suya. Forzar 4:3 le dejaba
                         franjas a los lados a uno cuadrado, que parecen un error. El tope
                         de altura evita que un cartel muy vertical empuje el texto fuera. */
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
                    <div className="mt-4 border-t border-navy/8 pt-4">
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
                        <ul className="mt-5 space-y-2 border-t border-navy/8 pt-4 text-[0.88rem] text-ink-soft">
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

      {cartel && (
        <Lightbox src={cartel.src} alt={cartel.alt} onClose={() => setCartel(null)} />
      )}
    </Section>
  );
}
