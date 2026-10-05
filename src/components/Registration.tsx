import { registration } from "../data/catechesis";
import { contact } from "../data/site";
import { Eyebrow, Icon, Provisional, Reveal, Section, Title } from "./ui";

/**
 * Registration: the most important section of the site, so it stands out on its own
 * background and its button is repeated up in the navbar.
 *
 * The open/closed state is set with `abiertas` in `content/inscripciones.json`; the
 * button goes to `enlace` (Google Forms, a custom form or WhatsApp) and, if there is
 * no link yet, falls back to the contact section.
 */
export function Registration() {
  const { abiertas: isOpen, enlace: link } = registration;
  const href = link || "#contacto";
  const isExternal = /^https?:\/\//i.test(href);

  return (
    <Section id="inscripciones" className="bg-ivory-deep">
      <Reveal>
        <div className="text-center">
          <Eyebrow>Nuevo Ciclo 2027</Eyebrow>
          <Title center>Inscripciones de catequesis</Title>

          <div className="mt-8 flex justify-center">
            <span
              className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[0.78rem] font-extrabold uppercase tracking-[0.14em] ${
                isOpen ? "bg-sage-soft text-sage" : "bg-[#fbe3e3] text-[#b23636]"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${isOpen ? "bg-sage" : "bg-[#b23636]"}`} />
              {isOpen ? "Inscripciones abiertas" : "Inscripciones cerradas"}
            </span>
          </div>
        </div>
      </Reveal>

      {/* Stacked rather than side by side: the requirements are six course lists, too
          long for half the width, so they take the full row below. */}
      <div className="mt-14 grid gap-6">
        {/* Registration details */}
        <Reveal>
          <div className="h-full rounded-2xl border border-navy/[0.08] bg-white p-8 shadow-card sm:p-10">
            <h3 className="text-[1.5rem] text-navy-deep">Cuándo y dónde</h3>

            <dl className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: "calendar" as const, k: "Inicio de inscripciones", v: registration.inicio },
                { icon: "calendar" as const, k: "Cierre de inscripciones", v: registration.cierre },
                { icon: "clock" as const, k: "Horario de atención", v: registration.horarioAtencion },
                { icon: "pin" as const, k: "Lugar", v: registration.lugar },
              ].map((f) => (
                <div key={f.k} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-soft text-navy">
                    <Icon name={f.icon} size={18} />
                  </span>
                  <div>
                    <dt className="text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-ink-faint">{f.k}</dt>
                    <dd className="mt-1 font-semibold text-navy-deep"><Provisional text={f.v} /></dd>
                  </div>
                </div>
              ))}
            </dl>

            <p className="mt-8 border-t border-navy/[0.08] pt-6 text-[0.9rem] leading-relaxed text-ink-soft">
              {registration.nota}
            </p>

            <a
              href={href}
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`mt-8 flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-[0.9rem] font-extrabold uppercase tracking-[0.14em] transition-transform ${
                isOpen
                  ? "bg-navy text-white shadow-lift hover:-translate-y-0.5 hover:bg-navy-light"
                  : "cursor-not-allowed bg-navy/15 text-navy/45"
              }`}
              aria-disabled={!isOpen}
              onClick={(e) => { if (!isOpen) e.preventDefault(); }}
            >
              {isOpen ? "Inscribirme" : "Inscripciones cerradas"}
              {isOpen && <Icon name="arrow" size={18} />}
            </a>
            {isOpen && !link && (
              <p className="mt-3 text-center text-[0.78rem] text-ink-faint">
                Por ahora el botón lleva a la sección de contacto.
              </p>
            )}
          </div>
        </Reveal>

        {/* Requirements */}
        <Reveal delay={110}>
          <div className="h-full rounded-2xl border border-navy/[0.08] bg-navy p-8 text-white shadow-card sm:p-10">
            <h3 className="text-[1.5rem] text-white">Requisitos</h3>
            <p className="mt-3 text-[0.9rem] text-white/70">
              Documentos que se presentan al momento de inscribir.
            </p>

            <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {registration.requisitos.map((g) => (
                <div key={g.curso}>
                  <h4 className="border-b border-white/15 pb-2 font-serif text-[1.2rem] text-gold-light">{g.curso}</h4>
                  <ul className="mt-4 space-y-3">
                    {g.documentos.map((d, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-light">
                          <Icon name="check" size={14} />
                        </span>
                        <span className="text-[0.95rem] leading-relaxed text-white/90">
                          <Provisional text={d} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-white/15 pt-6 text-[0.88rem] text-white/75">
              <p className="font-bold uppercase tracking-[0.12em] text-gold-light">¿Dudas?</p>
              <p className="mt-2 flex items-center gap-2">
                <Icon name="phone" size={16} className="shrink-0 text-gold-light" />
                <Provisional text={contact.phone} />
              </p>
              <p className="mt-1.5 flex items-center gap-2">
                <Icon name="mail" size={16} className="shrink-0 text-gold-light" />
                <Provisional text={contact.email} />
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
