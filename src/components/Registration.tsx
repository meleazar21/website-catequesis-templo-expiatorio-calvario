import { inscripciones } from "../data/catequesis";
import { contacto } from "../data/site";
import { Eyebrow, Icon, Provisional, Reveal, Section, Title } from "./ui";

/**
 * Inscripciones: la sección más importante del sitio, por eso va destacada sobre
 * fondo propio y el botón se repite arriba en la barra.
 *
 * El estado abierto/cerrado se cambia con `inscripciones.abiertas` en el archivo de
 * datos; el botón lleva a `inscripciones.enlace` (Google Forms, formulario propio o
 * WhatsApp) y, si aún no hay enlace, cae a la sección de contacto.
 */
export function Registration() {
  const { abiertas, enlace } = inscripciones;
  const destino = enlace || "#contacto";
  const externo = /^https?:\/\//i.test(destino);

  return (
    <Section id="inscripciones" className="bg-ivory-deep">
      <Reveal>
        <div className="text-center">
          <Eyebrow>Nuevo ciclo</Eyebrow>
          <Title center>Inscripciones de catequesis</Title>

          <div className="mt-8 flex justify-center">
            <span
              className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[0.78rem] font-extrabold uppercase tracking-[0.14em] ${
                abiertas ? "bg-sage-soft text-sage" : "bg-[#fbe3e3] text-[#b23636]"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${abiertas ? "bg-sage" : "bg-[#b23636]"}`} />
              {abiertas ? "Inscripciones abiertas" : "Inscripciones cerradas"}
            </span>
          </div>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        {/* Datos de la inscripción */}
        <Reveal>
          <div className="h-full rounded-2xl border border-navy/[0.08] bg-white p-8 shadow-card sm:p-10">
            <h3 className="text-[1.5rem] text-navy-deep">Cuándo y dónde</h3>

            <dl className="mt-7 grid gap-5 sm:grid-cols-2">
              {[
                { icon: "calendar" as const, k: "Inicio de inscripciones", v: inscripciones.inicio },
                { icon: "calendar" as const, k: "Cierre de inscripciones", v: inscripciones.cierre },
                { icon: "clock" as const, k: "Horario de atención", v: inscripciones.horarioAtencion },
                { icon: "pin" as const, k: "Lugar", v: inscripciones.lugar },
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
              {inscripciones.nota}
            </p>

            <a
              href={destino}
              {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`mt-8 flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-[0.9rem] font-extrabold uppercase tracking-[0.14em] transition-transform ${
                abiertas
                  ? "bg-navy text-white shadow-lift hover:-translate-y-0.5 hover:bg-navy-light"
                  : "cursor-not-allowed bg-navy/15 text-navy/45"
              }`}
              aria-disabled={!abiertas}
              onClick={(e) => { if (!abiertas) e.preventDefault(); }}
            >
              {abiertas ? "Inscribirme" : "Inscripciones cerradas"}
              {abiertas && <Icon name="arrow" size={18} />}
            </a>
            {abiertas && !enlace && (
              <p className="mt-3 text-center text-[0.78rem] text-ink-faint">
                Por ahora el botón lleva a la sección de contacto.
              </p>
            )}
          </div>
        </Reveal>

        {/* Requisitos */}
        <Reveal delay={110}>
          <div className="h-full rounded-2xl border border-navy/[0.08] bg-navy p-8 text-white shadow-card sm:p-10">
            <h3 className="text-[1.5rem] text-white">Requisitos</h3>
            <p className="mt-3 text-[0.9rem] text-white/70">
              Documentos que se presentan al momento de inscribir.
            </p>

            <ul className="mt-7 space-y-4">
              {inscripciones.requisitos.map((r, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-light">
                    <Icon name="check" size={14} />
                  </span>
                  <span className="text-[0.95rem] leading-relaxed text-white/90">
                    <Provisional text={r} />
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-white/15 pt-6 text-[0.88rem] text-white/75">
              <p className="font-bold uppercase tracking-[0.12em] text-gold-light">¿Dudas?</p>
              <p className="mt-2 flex items-center gap-2">
                <Icon name="phone" size={16} className="shrink-0 text-gold-light" />
                <Provisional text={contacto.telefono} />
              </p>
              <p className="mt-1.5 flex items-center gap-2">
                <Icon name="mail" size={16} className="shrink-0 text-gold-light" />
                <Provisional text={contacto.correo} />
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
