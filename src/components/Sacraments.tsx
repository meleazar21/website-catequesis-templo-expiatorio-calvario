import { useState } from "react";
import { sacraments } from "../data/catechesis";
import { contact } from "../data/site";
import { Eyebrow, Icon, Lead, Provisional, Reveal, Section, Title, type IconName } from "./ui";

/**
 * Icon for each sacrament, inferred from its name. It's done this way rather than with
 * a panel field so whoever maintains the site doesn't have to pick from a list of icons
 * they can't see: they type "Unción de los enfermos" and get the right one. It matches
 * keywords, not the exact name, because every parish writes it its own way ("Primera
 * Comunión", "Eucaristía", "Confesión", "Penitencia"...). Anything unrecognized gets a
 * cross, which never looks out of place — that's the case for Holy Orders: the stole
 * and the laying on of hands aren't recognizable at 24px in a single stroke.
 */
function iconFor(name: string): IconName {
  const n = name.toLowerCase();
  if (/bautis|bautiz/.test(n)) return "water";
  if (/comuni|eucarist/.test(n)) return "chalice";
  if (/confirma/.test(n)) return "flame";         // the tongues of fire of Pentecost
  if (/matrimon|boda/.test(n)) return "rings";
  if (/reconcilia|confes|penitenc/.test(n)) return "heart";
  if (/unci[oó]n|enfermo/.test(n)) return "oil";
  return "cross";
}

/**
 * Sacraments. Shown as an accordion: each one carries information, requirements, dates
 * and notices, and showing them all open would make a very long section on the phone.
 * The first one starts expanded so it's clear what this is without tapping anything.
 */
export function Sacraments() {
  const [openName, setOpenName] = useState<string | null>(sacraments[0]?.nombre ?? null);

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
        {sacraments.map((s, i) => {
          const open = openName === s.nombre;
          return (
            <Reveal key={s.nombre} delay={i * 70}>
              <article className={`overflow-hidden rounded-2xl border bg-white shadow-card transition-colors ${
                open ? "border-gold/50" : "border-navy/[0.08]"
              }`}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenName(open ? null : s.nombre)}
                    aria-expanded={open}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left sm:px-8"
                  >
                    <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      open ? "bg-gold-soft text-[#8a6d22]" : "bg-navy-soft text-navy"
                    }`}>
                      <Icon name={iconFor(s.nombre)} size={20} />
                    </span>
                    <span className="flex-1 font-serif text-[1.3rem] text-navy-deep">{s.nombre}</span>
                    <Icon
                      name="chevron" size={20}
                      className={`shrink-0 text-navy/50 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>

                {open && (
                  <div className="border-t border-navy/[0.08] px-6 pb-8 pt-6 sm:px-8">
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
                          <span><Provisional text={contact.phone} /></span>
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
