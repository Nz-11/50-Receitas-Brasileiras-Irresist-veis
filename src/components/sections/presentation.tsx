"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { MaskText } from "@/components/ui/mask-text";
import { Reveal } from "@/components/ui/reveal";

const stats = [
  { value: String(siteConfig.ebook.recipes), label: "receitas caseiras" },
  { value: "4", label: "tipos de preparo: pratos, acompanhamentos, lanches e doces" },
  { value: String(siteConfig.ebook.pages), label: `páginas em ${siteConfig.ebook.format}` },
];

export function Presentation() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const depth = Number(el.dataset.parallax ?? 10);
          gsap.fromTo(
            el,
            { yPercent: -depth },
            {
              yPercent: depth,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
        gsap.fromTo(
          "[data-clip]",
          { clipPath: "inset(18% 12% 18% 12% round 28px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            ease: "power2.out",
            scrollTrigger: { trigger: "[data-clip]", start: "top 90%", end: "top 30%", scrub: 0.8 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section id="apresentacao" ref={scope} className="relative overflow-hidden py-28 sm:py-36 lg:py-44">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 size-[40rem] rounded-full bg-[radial-gradient(circle,rgb(31_107_71/0.18),transparent_65%)] blur-3xl"
      />
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Composição fotográfica */}
        <div className="relative lg:col-span-6 lg:pr-10">
          <div data-clip className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[5/6]">
            <div data-parallax="8" className="absolute -inset-y-[10%] inset-x-0">
              <Image
                src="/images/ambiente/cozinhando.jpg"
                alt="Mãos mexendo uma panela com colher de pau"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </div>

          <Reveal
            className="absolute -bottom-12 right-0 w-[46%] sm:-bottom-16 sm:w-[42%] lg:-right-6"
            delay={0.2}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-[6px] border-ink shadow-[0_40px_80px_-20px_rgb(0_0_0/0.9)]">
              <div data-parallax="6" className="absolute -inset-y-[8%] inset-x-0">
                <Image
                  src="/images/ambiente/mesa-brasileira.jpg"
                  alt="Mesa com farofa, mandioca e feijão"
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="absolute left-4 top-4 sm:left-6 sm:top-6" delay={0.4}>
            <p className="glass rounded-full px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-cream">
              Feito em casa
            </p>
          </Reveal>
        </div>

        {/* Texto editorial */}
        <div className="flex flex-col justify-center pt-10 lg:col-span-6 lg:pt-0">
          <Reveal>
            <p className="eyebrow">Capítulo 01 · A cozinha de casa</p>
          </Reveal>
          <MaskText
            as="h2"
            className="mt-6 font-display text-[clamp(2.2rem,4.8vw,4.2rem)] font-light leading-[1.02] tracking-[-0.015em]"
            segments={[
              { text: "Cozinhar pode ser" },
              { text: "simples, gostoso", className: "italic text-gilded" },
              { text: "e cheio de memória." },
            ]}
          />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-sand">
              A culinária brasileira reúne sabores e tradições que fazem parte do nosso dia a dia. Este livro traz
              receitas caseiras com ingredientes acessíveis e instruções organizadas, para você preparar com calma
              e adaptar cada prato ao seu gosto.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <blockquote className="mt-10 border-l border-gold/50 pl-6 font-display text-xl italic leading-snug text-cream/90">
              “Use as receitas como ponto de partida: ajuste temperos, respeite as características dos
              ingredientes e anote as adaptações que funcionarem melhor na sua cozinha.”
              <footer className="mt-3 font-sans text-[0.65rem] font-semibold not-italic uppercase tracking-[0.24em] text-muted">
                Trecho do e-book
              </footer>
            </blockquote>
          </Reveal>

          <dl className="mt-14 grid grid-cols-3 gap-4 border-t border-line pt-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-4xl font-light text-gold sm:text-5xl">{s.value}</span>
                  <span className="mt-2 block text-xs leading-snug text-muted">{s.label}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
