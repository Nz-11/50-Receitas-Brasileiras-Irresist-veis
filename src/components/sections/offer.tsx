import { formatPrice, getPromotion, siteConfig } from "@/config/site";
import { BookMockup } from "@/components/ui/book-mockup";
import { CheckoutButton } from "@/components/ui/checkout-button";
import { MaskText } from "@/components/ui/mask-text";
import { Reveal } from "@/components/ui/reveal";
import { Check } from "@/components/ui/icons";
import { PriceTag } from "@/components/ui/price-tag";

const included = [
  `${siteConfig.ebook.recipes} receitas brasileiras caseiras`,
  "Ingredientes listados em cada receita",
  "Modo de preparo passo a passo",
  "Tempo de preparo e rendimento",
  "Dicas, sugestões de cardápio e armazenamento",
  `Arquivo digital em ${siteConfig.ebook.format} · ${siteConfig.ebook.pages} páginas`,
];

export function Offer() {
  const price = formatPrice(siteConfig.price);
  const promo = getPromotion(siteConfig.price);

  return (
    <section id="oferta" className="relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden className="wood-texture absolute inset-0 -z-20" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_40%,rgb(214_173_98/0.18),transparent_55%),linear-gradient(180deg,#0a0806,transparent_18%,transparent_82%,#0a0806)]" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <p className="eyebrow">Capítulo 06 · Leve para a sua cozinha</p>
          </Reveal>
          <MaskText
            as="h2"
            className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.2rem,5vw,4.4rem)] font-light leading-[1.02] tracking-[-0.015em]"
            segments={[{ text: "Todas as" }, { text: `${siteConfig.ebook.recipes} receitas`, className: "italic text-gilded" }, { text: "em um só lugar." }]}
          />
        </div>

        <Reveal delay={0.1} className="mt-16">
          <div className="relative overflow-hidden rounded-[36px] border border-gold/25 bg-[linear-gradient(160deg,rgb(27_19_13/0.95),rgb(10_8_6/0.98))] shadow-[0_60px_120px_-40px_rgb(0_0_0/0.95)]">
            <div aria-hidden className="hairline absolute inset-x-10 top-0" />
            <div className="grid items-center gap-12 p-7 sm:p-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:p-16">
              <div className="book-scene relative mx-auto w-[60%] max-w-[16rem] lg:w-[78%]">
                <div aria-hidden className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgb(214_173_98/0.3),transparent_65%)] blur-2xl animate-glow" />
                <div className="animate-float-slow" style={{ transformStyle: "preserve-3d" }}>
                  <div style={{ transform: "rotateY(-22deg) rotateX(6deg)", transformStyle: "preserve-3d" }}>
                    <BookMockup sizes="(min-width: 1024px) 260px, 55vw" />
                  </div>
                </div>
                {promo && (
                  <div
                    aria-hidden
                    className="absolute -right-6 -top-5 z-10 rotate-[10deg] rounded-2xl bg-[linear-gradient(135deg,#f1d391,#c8963f)] px-4 py-2.5 text-center text-ink shadow-[0_18px_40px_-12px_rgb(214_173_98/0.8)] animate-float [--float-rotate:3deg] sm:-right-10"
                  >
                    <span className="block font-display text-2xl font-semibold italic leading-none">-{promo.percentOff}%</span>
                    <span className="mt-1 block text-[0.55rem] font-bold uppercase tracking-[0.24em]">promoção</span>
                  </div>
                )}
              </div>

              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gold">E-book digital</p>
                <h3 className="mt-3 font-display text-3xl leading-tight text-cream sm:text-4xl">{siteConfig.productName}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-sand">{siteConfig.description}</p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {included.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-snug text-cream/90">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-leaf/30 text-gold-soft">
                        <Check className="size-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 border-t border-line pt-8">
                  <PriceTag />

                  <div className="mt-8">
                    <CheckoutButton label={price ? `Comprar por ${price}` : "Comprar o e-book"} />
                  </div>

                  <div className="mt-6 space-y-2 text-xs leading-relaxed text-muted">
                    <p>Você conclui a compra na página de pagamento. Esta página não coleta dados de cartão.</p>
                    {siteConfig.deliveryInfo && <p>{siteConfig.deliveryInfo}</p>}
                    {siteConfig.guaranteeInfo && <p className="text-sand">{siteConfig.guaranteeInfo}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
