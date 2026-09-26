import { useState } from "react";
import { catequistas, type Catequista } from "../data/catequesis";
import { Eyebrow, Icon, Lead, PhotoPlaceholder, Reveal, Section, Title, useCapaModal } from "./ui";

/**
 * Equipo de catequistas. Se administra desde /admin → Catequistas; el orden lo fija el
 * campo `orden` de cada ficha.
 *
 * Las reseñas son biografías de varios párrafos. Desplegarlas dentro de la tarjeta
 * estiraba la columna y dejaba un texto largo en una caja de 270px, que es justo donde
 * peor se lee. Se abren en una ficha aparte, con la fotografía en grande al lado.
 */
export function Catechists() {
  const [perfil, setPerfil] = useState<Catequista | null>(null);

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
            {/* La tarjeta entera abre la ficha: en el teléfono, un botón pequeño al pie
                es un blanco incómodo, y aquí no hay nada más dentro que pulsar. */}
            <button
              type="button"
              onClick={() => setPerfil(c)}
              className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-navy/[0.08] bg-white text-left shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
            >
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
                <p className="mt-4 line-clamp-3 text-[0.92rem] leading-relaxed text-ink-soft">
                  {c.frase}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.75rem] font-extrabold uppercase tracking-[0.13em] text-navy transition-colors group-hover:text-gold">
                  Ver perfil <Icon name="arrow" size={15} />
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {perfil && <PerfilCatequista c={perfil} onClose={() => setPerfil(null)} />}
    </Section>
  );
}

/** Ficha completa de un catequista: fotografía en grande y la reseña entera. */
function PerfilCatequista({ c, onClose }: { c: Catequista; onClose: () => void }) {
  useCapaModal(onClose);
  const parrafos = c.frase.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <div
      role="dialog" aria-modal="true" aria-label={c.nombre}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-end justify-center bg-navy-deep/90 p-0 animate-fade sm:items-center sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-3xl animate-reveal flex-col overflow-hidden rounded-t-2xl bg-white shadow-lift sm:max-h-[88vh] sm:flex-row sm:rounded-2xl"
      >
        <button
          type="button" onClick={onClose} aria-label="Cerrar"
          className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy-deep/60 text-white backdrop-blur transition-colors hover:bg-navy-deep sm:bg-white/85 sm:text-navy sm:hover:bg-white"
        >
          <Icon name="close" size={20} />
        </button>

        {/* En el teléfono la foto va ENTERA (object-contain, sobre un fondo suave):
            recortándola se perdía media cara, y estas son fotos de personas. Sigue
            limitada en altura porque, si ocupa toda la pantalla, hay que desplazarse
            para descubrir que debajo había texto. En escritorio la columna es
            estrecha y vertical, como las fotos, así que ahí recortar apenas quita
            nada y llenar la columna se ve mejor. */}
        {c.foto ? (
          <img
            src={c.foto} alt={c.nombre}
            /* La foto se ve ENTERA en los dos tamaños, sin recorte y sin franjas:
               `w-auto` en el teléfono (con ancho completo, una vertical dejaba franjas
               de medio ancho) y `self-start` en escritorio (estirándola para llenar la
               columna se comía un tercio de los lados). El elemento ES la foto. */
            className="mx-auto max-h-[42vh] w-auto shrink-0 object-contain sm:mx-0 sm:max-h-[80vh] sm:w-64 sm:self-start md:w-72"
          />
        ) : (
          <PhotoPlaceholder label={c.nombre} className="h-48 w-full shrink-0 sm:h-auto sm:w-64 md:w-72" />
        )}

        <div className="flex-1 overflow-y-auto p-7 sm:p-9">
          <h3 className="font-serif text-[1.8rem] leading-tight text-navy-deep">{c.nombre}</h3>
          <p className="mt-2 text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-gold">
            {c.grupo}
          </p>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
            {parrafos.map((p, k) => (
              <p key={k}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
