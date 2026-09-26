import { contacto } from "../data/site";
import { Eyebrow, Icon, Lead, Provisional, Reveal, Section, Title, type IconName } from "./ui";

/**
 * Contacto. Cada dato se vuelve enlace (tel:, mailto:, wa.me) **solo** cuando existe;
 * mientras sea provisional se muestra como texto, para no generar enlaces rotos.
 */
export function Contact() {
  const hayTelefono = contacto.telefono && !contacto.telefono.startsWith("[");
  const hayCorreo = contacto.correo && !contacto.correo.startsWith("[");
  const redes = contacto.redes.filter((r) => r.url);

  const datos: { icon: IconName; k: string; v: string; href?: string }[] = [
    { icon: "phone", k: "Teléfono", v: contacto.telefono, href: hayTelefono ? `tel:${contacto.telefono}` : undefined },
    { icon: "chat", k: "WhatsApp", v: contacto.whatsapp || "[CONTENIDO POR DEFINIR]", href: contacto.whatsapp ? `https://wa.me/${contacto.whatsapp}` : undefined },
    { icon: "mail", k: "Correo electrónico", v: contacto.correo, href: hayCorreo ? `mailto:${contacto.correo}` : undefined },
    { icon: "pin", k: "Dirección", v: contacto.direccion },
    { icon: "clock", k: "Horario de atención", v: contacto.horarioAtencion },
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
            {datos.map((d) => (
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

          {redes.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
              {redes.map((r) => (
                <a
                  key={r.nombre}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  /* Aquí el color va SOLO en el distintivo, no en toda la pastilla:
                     sobre el marfil, cuatro botones enteros de color chillarían al
                     lado de la paleta del sitio. */
                  className="inline-flex items-center gap-2.5 rounded-full border border-navy/15 py-1.5 pl-1.5 pr-5 text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-navy transition-colors hover:border-gold hover:text-gold"
                >
                  <span
                    style={{ background: r.fondo }}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white"
                  >
                    <Icon name={r.icono} size={16} />
                  </span>
                  {r.nombre}
                </a>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal delay={110}>
          {contacto.mapaEmbedUrl ? (
            <iframe
              src={contacto.mapaEmbedUrl}
              title="Ubicación del templo"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[22rem] w-full rounded-2xl border border-navy/8 shadow-card"
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
