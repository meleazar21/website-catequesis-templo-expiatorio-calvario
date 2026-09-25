import { useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------------ Iconos
 * Trazos SVG propios: sin librería de iconos y sin emojis (el diseño los excluye).
 */
export type IconName =
  | "dove" | "flame" | "book" | "calendar" | "clock" | "pin" | "phone"
  | "mail" | "chat" | "check" | "arrow" | "menu" | "close" | "chevron" | "image";

const PATHS: Record<IconName, ReactNode> = {
  dove: <><path d="M4 13c3.5 0 6-2 7.5-4.5C13 6 15 5 17 5c2 0 3 1 3 2.5S19 10 17 10c3 0 3 3 1.5 5S14 18 11 18c-4 0-7-2-7-5z" /><circle cx="17.4" cy="7.2" r="0.6" fill="currentColor" /></>,
  flame: <path d="M12 3s4 3.5 4 7a4 4 0 1 1-8 0c0-1.2.5-2.2 1-3 .3 1 1 1.6 1.7 1.6C11 8.6 10 6 12 3z" />,
  book: <><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5z" /><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5z" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  pin: <><path d="M12 21s6.5-6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15 12 21 12 21z" /><circle cx="12" cy="10.5" r="2.4" /></>,
  phone: <path d="M6 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2C10.6 18.4 5.6 13.4 4 6.7A2 2 0 0 1 6 3.5z" />,
  mail: <><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="m3.6 7 8.4 6 8.4-6" /></>,
  chat: <path d="M4 5.5h16v10H9l-5 4z" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  arrow: <path d="M4.5 12h14m-5-5 5 5-5 5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  chevron: <path d="m8 10 4 4 4-4" />,
  image: <><rect x="3.5" y="5" width="17" height="14" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="m4.5 17 4.5-4 3.5 3 3-2.5 4 3.5" /></>,
};

export function Icon({ name, size = 20, className = "" }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}

/* ------------------------------------------------------------------ Reveal
 * Aparición suave al entrar en pantalla. Usa IntersectionObserver en vez de
 * escuchar el scroll, así no cuesta nada en móvil. Si el navegador no lo
 * soporta, el contenido simplemente se muestra.
 */
export function Reveal({ children, delay = 0, className = "" }: {
  children: ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${visible ? "animate-reveal" : "opacity-0"}`}
      style={visible && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ Sección */
export function Section({ id, className = "", children }: {
  id?: string; className?: string; children: ReactNode;
}) {
  return (
    <section id={id} className={`px-5 py-20 sm:px-8 md:py-28 ${className}`}>
      <div className="mx-auto max-w-content">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`text-[0.72rem] font-extrabold uppercase tracking-[0.22em] ${light ? "text-gold-light" : "text-gold"}`}>
      {children}
    </p>
  );
}

export function Title({ children, center = false, light = false }: {
  children: ReactNode; center?: boolean; light?: boolean;
}) {
  return (
    <h2
      className={`mt-3 text-[2rem] leading-[1.15] sm:text-[2.6rem] ${
        light ? "text-white" : "text-navy-deep"
      } ${center ? "text-center rule-gold-center" : "rule-gold"}`}
    >
      {children}
    </h2>
  );
}

export function Lead({ children, center = false, light = false }: {
  children: ReactNode; center?: boolean; light?: boolean;
}) {
  return (
    <p className={`mt-6 max-w-2xl text-[1.02rem] leading-relaxed ${
      light ? "text-white/80" : "text-ink-soft"
    } ${center ? "mx-auto text-center" : ""}`}>
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ Placeholder
 * Marcador de fotografía. Se usa a propósito en vez de fotos de archivo: el sitio
 * no debe mostrar imágenes ajenas como si fueran de esta parroquia. Cada marcador
 * dice qué foto va ahí, y se sustituye poniendo la ruta en el archivo de datos.
 */
export function PhotoPlaceholder({ label, className = "", compact = false }: {
  label: string; className?: string; compact?: boolean;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-navy-soft ${className}`}
      role="img"
      aria-label={`Fotografía por definir: ${label}`}
    >
      {/* Trama diagonal muy tenue, para que no parezca un bloque vacío. */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(30,58,138,0.06) 0 2px, transparent 2px 11px)",
        }}
      />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <Icon name="image" size={compact ? 20 : 28} className="text-navy/40" />
        {!compact && (
          <>
            <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-navy/45">
              Fotografía por definir
            </span>
            <span className="text-sm text-navy/60">{label}</span>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Varios */
export function Pill({ children, tone = "navy" }: {
  children: ReactNode; tone?: "navy" | "gold" | "sage" | "red";
}) {
  const tones = {
    navy: "bg-navy-soft text-navy",
    gold: "bg-gold-soft text-[#8a6d22]",
    sage: "bg-sage-soft text-sage",
    red: "bg-[#fbe3e3] text-[#b23636]",
  } as const;
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] ${tones[tone]}`}>
      {children}
    </span>
  );
}

/** Resalta en ámbar los textos "[CONTENIDO POR DEFINIR]" para que no pasen a producción. */
export function Provisional({ text }: { text: string }) {
  const partes = text.split("[CONTENIDO POR DEFINIR]");
  if (partes.length === 1) return <>{text}</>;
  return (
    <>
      {partes.map((p, i) => (
        <span key={i}>
          {p}
          {i < partes.length - 1 && (
            <mark className="rounded bg-gold-soft px-1.5 py-0.5 text-[0.82em] font-bold uppercase tracking-wide text-[#8a6d22]">
              contenido por definir
            </mark>
          )}
        </span>
      ))}
    </>
  );
}
