import { contact } from "../data/site";
import { Eyebrow, Icon, Lead, Provisional, Reveal, Section, Title, type IconName } from "./ui";

/**
 * Contact. Each item becomes a link (tel:, wa.me) **only** when it exists;
 * while it's provisional it's shown as text, so no broken links are generated.
 */
export function Contact() {
  const hasPhone = contact.phone && !contact.phone.startsWith("[");
  const socials = contact.socials.filter((r) => r.url);

  const details: { icon: IconName; k: string; v: string; href?: string }[] = [
    { icon: "phone", k: "Teléfono", v: contact.phone, href: hasPhone ? `tel:+${contact.phone.replace(/\D/g, "")}` : undefined },
    { icon: "chat", k: "WhatsApp", v: contact.whatsapp || "[CONTENIDO POR DEFINIR]", href: contact.whatsapp ? `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}` : undefined },
    { icon: "pin", k: "Dirección", v: contact.address },
    { icon: "clock", k: "Horario de atención", v: contact.officeHours },
  ];

  return (
    <Section id="contacto">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>Estamos para servirte</Eyebrow>
          <Title>¿Tienes alguna pregunta?</Title>
          <Lead>
            Escríbenos o acércate al templo. Con gusto te orientamos sobre los cursos,
            las inscripciones y los sacramentos.
          </Lead>

          <dl className="mt-10 space-y-5">
            {details.map((d) => (
              <div key={d.k} className="flex gap-4">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-soft text-navy">
                  <Icon name={d.icon} size={19} />
                </span>
                <div className="min-w-0">
                  <dt className="text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-ink-faint">{d.k}</dt>
                  <dd className="mt-1 break-words font-semibold text-navy-deep">
                    {d.href ? (
                      <a
                        href={d.href}
                        {...(d.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="transition-colors hover:text-gold"
                      >
                        {d.v}
                      </a>
                    ) : (
                      <Provisional text={d.v} />
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          {socials.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
              {socials.map((r) => (
                <a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  /* Here the color goes ONLY on the badge, not the whole pill: on the
                     ivory, four fully colored buttons would clash with the site's
                     palette. */
                  className="inline-flex items-center gap-2.5 rounded-full border border-navy/15 py-1.5 pl-1.5 pr-5 text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-navy transition-colors hover:border-gold hover:text-gold"
                >
                  <span
                    style={{ background: r.background }}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white"
                  >
                    <Icon name={r.icon} size={16} />
                  </span>
                  {r.name}
                </a>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal delay={110}>
          {contact.mapEmbedUrl ? (
            <iframe
              src={contact.mapEmbedUrl}
              title="Ubicación del templo"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[22rem] w-full rounded-2xl border border-navy/[0.08] shadow-card"
            />
          ) : (
            <div className="flex h-full min-h-[22rem] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-navy/20 bg-white/60 p-8 text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-soft text-navy">
                <Icon name="pin" size={26} />
              </span>
              <p className="font-serif text-[1.25rem] text-navy-deep">Ubicación del templo</p>
              <p className="max-w-xs text-[0.88rem] leading-relaxed text-ink-soft">
                Aquí se mostrará el mapa. Para activarlo, busca el templo en Google Maps y
                pega en el panel la dirección que aparece en la barra del navegador. Los
                enlaces cortos de “Compartir” no sirven: Google no permite incrustarlos.
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
