import { navigation, site } from "../data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="" className="h-14 w-14 object-contain" />
              <div className="leading-tight">
                <p className="font-serif text-[1.25rem]">{site.brandLine1}</p>
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-gold-light">
                  {site.brandLine2}
                </p>
              </div>
            </div>
            <p className="mt-6 text-[0.92rem] leading-relaxed text-white/70">
              {site.parish}
              <br />
              {site.parishLine2}
              <br />
              {site.city}
            </p>
            <p className="mt-6 border-l-2 border-gold pl-4 font-serif text-[1.1rem] italic text-white/85">
              {site.motto}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Pie de página">
            <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-gold-light">
              Secciones
            </p>
            <ul className="mt-5 space-y-2.5">
              {navigation.map((n) => (
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

          {/* Registration: social links live in the Contact section, under the office hours. */}
          <div>
            <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-gold-light">
              Inscríbete
            </p>

            <a
              href="#inscripciones"
              className="mt-5 inline-block rounded-full bg-gold px-6 py-3 text-[0.78rem] font-extrabold uppercase tracking-[0.13em] text-navy-deep transition-colors hover:bg-gold-light"
            >
              Inscripciones
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-white/[0.12] pt-7 text-center text-[0.8rem] text-white/45">
          © {year} {site.brand}
        </div>
      </div>
    </footer>
  );
}
