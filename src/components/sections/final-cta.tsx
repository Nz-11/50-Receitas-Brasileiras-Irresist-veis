"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { CheckoutButton } from "@/components/ui/checkout-button";
import { MaskText } from "@/components/ui/mask-text";
import { PriceInline } from "@/components/ui/price-tag";
import { Reveal } from "@/components/ui/reveal";
import { buttonClasses } from "@/components/ui/button-styles";
import { ButtonContent } from "@/components/ui/button-content";

export function FinalCta() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-final-bg]",
          { scale: 1.25, yPercent: -6 },
          {
            scale: 1,
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} className="relative isolate overflow-hidden py-36 sm:py-48">
      <div data-final-bg className="absolute inset-0 -z-20">
        <Image
          src="/images/ambiente/pudim-escuro.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(10_8_6/0.35),rgb(10_8_6/0.92)_70%),linear-gradient(180deg,#0a0806,transparent_25%,transparent_75%,#0a0806)]" />

      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow">A mesa está posta</p>
        </Reveal>
        <MaskText
          as="h2"
          className="mt-8 font-display text-[clamp(2.6rem,7vw,6rem)] font-light leading-[0.98] tracking-[-0.02em]"
          segments={[{ text: "Sua próxima receita" }, { text: "começa aqui.", className: "italic text-gilded" }]}
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-sand">
            Cinquenta receitas brasileiras, do almoço de todo dia à sobremesa de domingo, prontas para consultar
            quando quiser.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <PriceInline className="mt-10 justify-center" />
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-start">
            <CheckoutButton label="Quero meu e-book" noticeAlign="center" />
            <a href="#oferta" className={buttonClasses("ghost", "lg")}>
              <ButtonContent label="Ver a oferta" variant="ghost" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
