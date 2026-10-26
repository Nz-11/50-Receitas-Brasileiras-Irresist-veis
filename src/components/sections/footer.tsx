import { navItems } from "@/content/landing";
import { siteConfig } from "@/config/site";

export function Footer() {
  const { contact, legal } = siteConfig;
  const isDev = process.env.NODE_ENV === "development";
  const legalLinks = [
    { label: "Política de privacidade", href: legal.privacyUrl, env: "NEXT_PUBLIC_PRIVACY_URL" },
    { label: "Termos de uso", href: legal.termsUrl, env: "NEXT_PUBLIC_TERMS_URL" },
  ];

  return (
    <footer className="relative border-t border-line bg-coal">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#topo" className="inline-flex items-baseline gap-3">
              <span className="font-display text-5xl font-semibold italic leading-none text-gold">50</span>
              <span className="font-display text-xl leading-tight text-cream">
                Receitas Brasileiras
                <br />
                <span className="italic text-sand">Irresistíveis</span>
              </span>
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">{siteConfig.tagline}.</p>
          </div>

          <nav aria-label="Rodapé" className="md:col-span-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold">Navegação</p>
            <ul className="mt-5 space-y-3 text-sm">
              {[...navItems, { label: "Comprar", href: "#oferta" as const }].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sand transition-colors hover:text-cream">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold">Contato e políticas</p>
            <ul className="mt-5 space-y-3 text-sm">
              {contact.email ? (
                <li>
                  <a href={`mailto:${contact.email}`} className="text-sand transition-colors hover:text-cream">
                    {contact.email}
                  </a>
                </li>
              ) : (
                isDev && <li className="text-muted/70">[Dev] Contato: defina NEXT_PUBLIC_CONTACT_EMAIL</li>
              )}
              {legalLinks.map((l) =>
                l.href ? (
                  <li key={l.label}>
                    <a href={l.href} className="text-sand transition-colors hover:text-cream">
                      {l.label}
                    </a>
                  </li>
                ) : (
                  isDev && (
                    <li key={l.label} className="text-muted/70">
                      [Dev] {l.label}: defina {l.env}
                    </li>
                  )
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.productName}
            {legal.companyInfo ? ` · ${legal.companyInfo}` : ""}
          </p>
          <p>
            Fotografias:{" "}
            <a href="https://unsplash.com" className="underline decoration-gold/40 underline-offset-4 hover:text-cream">
              Unsplash
            </a>{" "}
            · imagens ilustrativas
          </p>
        </div>
      </div>
    </footer>
  );
}
