import { contacto, navegacion, site } from "../data/site";
import { Icon } from "./ui";

export function Footer() {
  const anio = new Date().getFullYear();
  const redes = contacto.redes.filter((r) => r.url);

  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Identidad */}
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="" className="h-14 w-14 object-contain" />
              <div className="leading-tight">
                <p className="font-serif text-[1.25rem]">{site.marcaLinea1}</p>
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-gold-light">
                  {site.marcaLinea2}
                </p>
              </div>
            </div>
            <p className="mt-6 text-[0.92rem] leading-relaxed text-white/70">
              {site.parroquia}
              <br />
              {site.parroquiaLinea2}
              <br />
              {site.ciudad}
            </p>
            <p className="mt-6 border-l-2 border-gold pl-4 font-serif text-[1.1rem] italic text-white/85">
              {site.lema}
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Pie de página">
            <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-gold-light">
              Secciones
            </p>
            <ul className="mt-5 space-y-2.5">
              {navegacion.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="text-[0.92rem] text-white/70 transition-colors hover:text-white"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Redes */}
          <div>
            <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-gold-light">
              Síguenos
            </p>
            {redes.length > 0 ? (
              /* Botones redondos en vez de una lista de nombres: un icono se reconoce
                 de un vistazo y ocupa menos en un pie que ya va cargado. */
              <ul className="mt-5 flex flex-wrap gap-3">
                {redes.map((r) => (
                  <li key={r.nombre}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={r.nombre}
                      title={r.nombre}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/75 transition-colors hover:border-gold hover:bg-white/10 hover:text-gold-light"
                    >
                      <Icon name={r.icono} size={19} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-[0.88rem] text-white/45">
                Enlaces de redes sociales por definir.
              </p>
            )}

            <a
              href="#inscripciones"
              className="mt-8 inline-block rounded-full bg-gold px-6 py-3 text-[0.78rem] font-extrabold uppercase tracking-[0.13em] text-navy-deep transition-colors hover:bg-gold-light"
            >
              Inscripciones
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-white/12 pt-7 text-center text-[0.8rem] text-white/45">
          © {anio} {site.marca}
        </div>
      </div>
    </footer>
  );
}
