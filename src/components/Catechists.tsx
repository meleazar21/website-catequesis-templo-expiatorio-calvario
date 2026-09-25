import { useState } from "react";
import { catequistas } from "../data/catequesis";
import { Eyebrow, Icon, Lead, PhotoPlaceholder, Reveal, Section, Title } from "./ui";

/**
 * Equipo de catequistas. Se administra desde /admin → Catequistas; el orden lo fija el
 * campo `orden` de cada ficha.
 *
 * La reseña puede ser de un renglón o de varios párrafos, así que la tarjeta recorta a
 * cuatro líneas y se despliega al tocar "Leer más": cuatro biografías completas, una al
 * lado de otra, dejan las tarjetas de alturas dispares y hacen un muro de texto en el
 * teléfono. Si la reseña es corta, el botón no aparece.
 */
export function Catechists() {
  const [abierto, setAbierto] = useState<string | null>(null);

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
        {catequistas.map((c, i) => {
          const parrafos = c.frase.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
          const desplegado = abierto === c.nombre;
          // Umbral a ojo: por debajo de esto la reseña ya cabe en las cuatro líneas y un
          // botón "Leer más" que no despliega nada sería solo ruido.
          const esLarga = parrafos.length > 1 || c.frase.length > 180;

          return (
            <Reveal key={c.nombre} delay={i * 80} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
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

                  <div
                    className={`mt-4 space-y-3 text-[0.92rem] leading-relaxed text-ink-soft ${
                      esLarga && !desplegado ? "line-clamp-4" : ""
                    }`}
                  >
                    {parrafos.map((p, k) => (
                      <p key={k}>{p}</p>
                    ))}
                  </div>

                  {esLarga && (
                    <div className="mt-auto pt-4">
                      <button
                        type="button"
                        onClick={() => setAbierto(desplegado ? null : c.nombre)}
                        aria-expanded={desplegado}
                        className="inline-flex items-center gap-1.5 text-[0.75rem] font-extrabold uppercase tracking-[0.13em] text-navy transition-colors hover:text-gold"
                      >
                        {desplegado ? "Leer menos" : "Leer más"}
                        <Icon
                          name="chevron" size={15}
                          className={`transition-transform ${desplegado ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
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
