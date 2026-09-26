import { useEffect, useState } from "react";
import { navegacion, site } from "../data/site";
import { Icon } from "./ui";

/**
 * Barra fija. Sobre el hero va transparente y, al bajar, se vuelve sólida: así el
 * texto blanco del hero se lee y el resto de la página no pierde contraste.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Con el menú abierto no debe poder desplazarse el fondo.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const solido = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solido ? "bg-ivory/95 shadow-[0_1px_0_rgba(30,58,138,0.08)] backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center gap-3 px-5 py-2 sm:px-8">
        <a href="#inicio" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          {/* El escudo es el protagonista: crece con el ancho de pantalla y al bajar
              se encoge un poco para que la barra no ocupe media pantalla. */}
          <img
            src="/logo.png"
            alt={site.marca}
            className={`w-auto object-contain transition-all duration-300 ${
              solido ? "h-16 sm:h-[4.5rem]" : "h-[4.5rem] sm:h-24"
            }`}
          />
          {/* El escudo ya lleva el nombre grabado, así que en pantallas pequeñas el
              texto sobra: repetirlo solo apretaba la barra contra el menú. */}
          <span className="hidden leading-tight md:block">
            <span className={`block font-serif text-[1.15rem] font-semibold ${solido ? "text-navy-deep" : "text-white"}`}>
              {site.marcaLinea1}
            </span>
            <span className={`block whitespace-nowrap text-[0.64rem] font-bold uppercase tracking-[0.14em] ${solido ? "text-gold" : "text-gold-light"}`}>
              {site.marcaLinea2}
            </span>
          </span>
        </a>

        <span className="flex-1" />

        {/* Escritorio */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navegacion.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={`rounded-lg px-3 py-2 text-[0.82rem] font-bold uppercase tracking-[0.1em] transition-colors ${
                  solido ? "text-ink-soft hover:bg-navy-soft hover:text-navy" : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#inscripciones"
          className="ml-2 hidden rounded-full bg-gold px-5 py-2.5 text-[0.8rem] font-extrabold uppercase tracking-[0.12em] text-navy-deep shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-gold-light lg:inline-block"
        >
          Inscripciones
        </a>

        {/* Móvil */}
        <button
          type="button"
          className={`rounded-lg p-2 lg:hidden ${solido ? "text-navy" : "text-white"}`}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? "close" : "menu"} size={26} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-navy/10 bg-ivory lg:hidden">
          <ul className="mx-auto max-w-content px-5 py-3">
            {navegacion.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-navy/5 py-3.5 text-[0.95rem] font-bold uppercase tracking-[0.1em] text-navy"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href="#inscripciones"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-gold px-5 py-3.5 text-center text-[0.9rem] font-extrabold uppercase tracking-[0.12em] text-navy-deep"
              >
                Inscripciones
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
