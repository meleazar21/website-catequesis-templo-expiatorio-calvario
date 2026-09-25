import { horarios } from "../data/catequesis";
import { Eyebrow, Icon, Provisional, Reveal, Section, Title } from "./ui";

/**
 * Horarios. En escritorio es una tabla; en móvil, tarjetas — una tabla de cuatro
 * columnas obliga a desplazar en horizontal y es justo lo que hay que evitar en el
 * teléfono, que es desde donde más se consulta esta sección.
 */
export function Schedules() {
  return (
    <Section className="bg-navy-deep">
      <Reveal>
        <div className="text-center">
          <Eyebrow light>Cuándo nos reunimos</Eyebrow>
          <Title center light>Horarios de catequesis</Title>
        </div>
      </Reveal>

      {/* Escritorio */}
      <Reveal delay={80}>
        <div className="mt-14 hidden overflow-hidden rounded-2xl border border-white/12 md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-white/[0.06]">
                {["Curso", "Día", "Horario", "Lugar"].map((h) => (
                  <th key={h} className="px-6 py-4 text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-gold-light">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {horarios.map((h, i) => (
                <tr key={h.curso} className={i % 2 ? "bg-white/[0.02]" : ""}>
                  <td className="border-t border-white/10 px-6 py-5 font-serif text-[1.15rem] text-white">{h.curso}</td>
                  <td className="border-t border-white/10 px-6 py-5 text-white/75"><Provisional text={h.dia} /></td>
                  <td className="border-t border-white/10 px-6 py-5 font-semibold text-white"><Provisional text={h.hora} /></td>
                  <td className="border-t border-white/10 px-6 py-5 text-white/75"><Provisional text={h.lugar} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* Móvil */}
      <div className="mt-12 grid gap-4 md:hidden">
        {horarios.map((h, i) => (
          <Reveal key={h.curso} delay={i * 70}>
            <article className="rounded-2xl border border-white/12 bg-white/[0.04] p-5">
              <h3 className="text-[1.25rem] text-white">{h.curso}</h3>
              <dl className="mt-4 space-y-2.5 text-[0.9rem]">
                {[
                  { icon: "calendar" as const, v: h.dia },
                  { icon: "clock" as const, v: h.hora },
                  { icon: "pin" as const, v: h.lugar },
                ].map((f, k) => (
                  <div key={k} className="flex items-center gap-3 text-white/80">
                    <Icon name={f.icon} size={17} className="shrink-0 text-gold-light" />
                    <span><Provisional text={f.v} /></span>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
