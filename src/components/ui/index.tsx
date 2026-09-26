import { useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------------ Iconos
 * Trazos SVG propios: sin librería de iconos y sin emojis (el diseño los excluye).
 */
export type IconName =
  | "flame" | "book" | "calendar" | "clock" | "pin" | "phone"
  | "mail" | "chat" | "check" | "arrow" | "menu" | "close" | "chevron" | "image"
  // Misión y visión
  | "providencia" | "estrella"
  // Sacramentos
  | "agua" | "caliz" | "anillos" | "corazon" | "oleo" | "cruz"
  // Redes sociales
  | "facebook" | "instagram" | "youtube" | "tiktok";

const PATHS: Record<IconName, ReactNode> = {
  /* Paloma de perfil, en vuelo y descendiendo: cabeza y pico arriba a la derecha,
     el ala abierta sobre el cuerpo y la cola hacia abajo a la izquierda. La versión
     anterior, de un solo trazo, se leía como una alubia. */
  flame: <><path d="M12 2.6s4.6 4 4.6 8a4.6 4.6 0 1 1-9.2 0c0-1.4.6-2.5 1.2-3.4.3 1.1 1.1 1.8 1.9 1.8C10.7 9 9.6 6 12 2.6z" /><path d="M12 17.2v4.2M8.2 17.4l-1.4 3.4M15.8 17.4l1.4 3.4" /></>,
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

  /* Ojo de la Providencia: el triángulo es la Trinidad y el ojo, que Dios ve y
     cuida. Los rayos no son adorno — son lo que distingue la versión cristiana,
     que representa la gloria divina, del ojo a secas. */
  providencia: <>
    <path d="M12 6.6 21 20.2H3z" />
    <path d="M7.7 15.4c1.4-2 2.9-3 4.3-3s2.9 1 4.3 3c-1.4 2-2.9 3-4.3 3s-2.9-1-4.3-3z" />
    <circle cx="12" cy="15.4" r="1.25" fill="currentColor" stroke="none" />
    <path d="M12 4.4V1.3M8.1 5.3 6.2 2.4M15.9 5.3 17.8 2.4" />
  </>,
  estrella: <path d="M12.0 2.9 14.2 8.9 20.7 9.2 15.6 13.2 17.3 19.4 12.0 15.8 6.7 19.4 8.4 13.2 3.3 9.2 9.8 8.9z" />,

  /* Bautismo: el agua cayendo sobre la pila. */
  agua: <>
    <path d="M12 3.2c2.3 2.7 3.5 4.6 3.5 6a3.5 3.5 0 0 1-7 0c0-1.4 1.2-3.3 3.5-6z" />
    <path d="M3.6 16.4q2.1-1.7 4.2 0t4.2 0 4.2 0 4.2 0" />
    <path d="M3.6 19.8q2.1-1.7 4.2 0t4.2 0 4.2 0 4.2 0" />
  </>,
  /* Eucaristía: el cáliz y la hostia. */
  caliz: <>
    <circle cx="12" cy="3.9" r="2.1" />
    <path d="M12 3.2v1.4M11.3 3.9h1.4" />
    <path d="M5.9 8.9h12.2c0 3.6-2.7 6.2-6.1 6.2S5.9 12.5 5.9 8.9z" />
    <path d="M12 15.1v3.6M7.9 20.6h8.2" />
  </>,
  /* Matrimonio: las dos alianzas enlazadas. */
  anillos: <>
    <circle cx="9" cy="14.4" r="5.1" />
    <circle cx="15" cy="14.4" r="5.1" />
    <path d="M12 2.4v3.4M10.3 4.1h3.4" />
  </>,
  /* Reconciliación: la misericordia, no el pecado — un corazón con la cruz. */
  corazon: <>
    <path d="M12 20.6s-7.4-4.6-7.4-9.6a4.2 4.2 0 0 1 7.4-2.7 4.2 4.2 0 0 1 7.4 2.7c0 5-7.4 9.6-7.4 9.6z" />
    <path d="M12 9.8v5.4M9.5 12.1h5" />
  </>,
  /* Unción de los enfermos: la ampolla del óleo. */
  oleo: <>
    <path d="M9.8 2.8h4.4v2.4l1.6 2.2v11a2 2 0 0 1-2 2h-3.6a2 2 0 0 1-2-2v-11l1.6-2.2z" />
    <path d="M8.2 11.6h7.6M12 14.2v3.4M10.3 15.9h3.4" />
  </>,
  cruz: <path d="M12 2.8v18.4M6.6 8.2h10.8" />,

  /* Marcas: se dibujan con su forma reconocible, no con una inicial. */
  facebook: <path d="M13.9 21.4v-8.2h2.8l.5-3.3h-3.3V7.8c0-.9.3-1.6 1.7-1.6h1.7V3.2c-.8-.1-1.7-.2-2.6-.2-2.6 0-4.4 1.6-4.4 4.5v2.4H7.1v3.3h3.2v8.2z" fill="currentColor" stroke="none" />,
  instagram: <>
    <rect x="2.9" y="2.9" width="18.2" height="18.2" rx="5.2" />
    <circle cx="12" cy="12" r="4.1" />
    <circle cx="17.2" cy="6.8" r="1.05" fill="currentColor" stroke="none" />
  </>,
  youtube: <>
    <rect x="2.4" y="5.4" width="19.2" height="13.2" rx="4" />
    <path d="m10.3 9.2 5.1 2.8-5.1 2.8z" fill="currentColor" stroke="none" />
  </>,
  tiktok: <path d="M14.4 2.9v11.6a3.5 3.5 0 1 1-2.8-3.4V8.2a6.3 6.3 0 1 0 5.6 6.3V8.8a6 6 0 0 0 3.5 1.1V7a3.6 3.6 0 0 1-3.5-4.1z" fill="currentColor" stroke="none" />,
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
/**
 * Visor para ver una imagen en grande. Los carteles de curso llevan texto pequeño que
 * en la tarjeta no se lee; sin esto, la imagen estaría de adorno.
 *
 * Cierra con Escape y tocando el fondo, y mientras está abierto se bloquea el scroll de
 * la página: en el teléfono, si no, se desplaza lo de detrás en vez de la imagen.
 */
/**
 * Lo común a todo lo que se abre encima de la página: cierra con Escape y bloquea el
 * scroll del fondo mientras está abierto (en el teléfono, si no, se desplaza lo de
 * detrás en vez del contenido). Va en un hook porque lo necesitan el visor de imagen y
 * el perfil del catequista, y repetirlo es asegurarse de que a uno se le olvide.
 */
export function useCapaModal(onClose: () => void) {
  useEffect(() => {
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", tecla);
    return () => {
      document.body.style.overflow = previo;
      window.removeEventListener("keydown", tecla);
    };
  }, [onClose]);
}

export function Lightbox({ src, alt, onClose }: {
  src: string; alt: string; onClose: () => void;
}) {
  useCapaModal(onClose);
  const [ampliada, setAmpliada] = useState(false);

  return (
    <div
      role="dialog" aria-modal="true" aria-label={alt}
      onClick={onClose}
      /* `overflow-auto` + `touch-pinch-zoom`: ampliada, la imagen se sale de la
         pantalla y hay que poder recorrerla con el dedo y hacer pellizco. */
      className="fixed inset-0 z-[70] flex touch-pinch-zoom items-center justify-center overflow-auto overscroll-contain bg-navy-deep/[0.92] p-4 animate-fade sm:p-8"
    >
      <button
        type="button" onClick={onClose} aria-label="Cerrar"
        className="fixed right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-6 sm:top-6"
      >
        <Icon name="close" size={22} />
      </button>

      <img
        src={src} alt={alt}
        onClick={(e) => { e.stopPropagation(); setAmpliada((v) => !v); }}
        className={
          ampliada
            ? "max-w-none cursor-zoom-out rounded-xl shadow-lift [width:220vw] sm:[width:150vw]"
            : "max-h-full max-w-full cursor-zoom-in rounded-xl object-contain shadow-lift"
        }
      />

      {/* En el teléfono, "ajustada" ocupa el ancho de la pantalla y se ve igual que en
          la tarjeta: sin este aviso, tocar y que no pase nada parece que está rota. */}
      <p className="pointer-events-none fixed inset-x-0 bottom-5 text-center text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-white/70">
        {ampliada ? "Toca la imagen para ajustarla" : "Toca la imagen para ampliarla"}
      </p>
    </div>
  );
}

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
