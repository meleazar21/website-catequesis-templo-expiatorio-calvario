import { popeMessage } from "../data/site";
import { Eyebrow, Reveal, Section, Title } from "./ui";

/**
 * Pope Francis's message to catechists (a YouTube video). Text and link come from the
 * panel (/admin → Configuración del sitio); without a valid link the section is hidden.
 *
 * The player is YouTube's privacy-enhanced domain and loads lazily, so it costs
 * nothing until the visitor scrolls down to it.
 */
export function PopeMessage() {
  const { title, paragraphs, videoId } = popeMessage;
  if (!videoId) return null;

  return (
    <Section id="mensaje-papa" className="bg-navy-deep">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
        <Reveal>
          <Eyebrow light>La voz de la Iglesia</Eyebrow>
          <Title light>{title}</Title>
          {paragraphs.map((p, i) => (
            <p key={i} className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-white/80">{p}</p>
          ))}
        </Reveal>

        <Reveal delay={120}>
          <div className="overflow-hidden rounded-2xl border border-white/[0.12] shadow-lift">
            <iframe
              className="aspect-video w-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
              title={title}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
