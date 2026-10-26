"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { featuredRecipes, type Recipe } from "@/content/landing";
import { siteConfig } from "@/config/site";
import { MaskText } from "@/components/ui/mask-text";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { Bowl, Clock } from "@/components/ui/icons";

const ratios = ["aspect-[4/5]", "aspect-[3/4]", "aspect-[4/5]", "aspect-[3/4]"];

function RecipeCard({ recipe, index }: { recipe: Recipe; index: number }) {
  return (
    <motion.article
      data-anim
      initial={{ opacity: 0, y: 60, rotateX: 18 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.08 }}
      className="[perspective:1200px]"
    >
      <TiltCard className="rounded-[22px]">
        <div className="group relative overflow-hidden rounded-[22px] border border-cream/10 bg-bark shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]">
          <div className={`relative ${ratios[index % ratios.length]} overflow-hidden`}>
            <Image
              src={recipe.image}
              alt={recipe.alt}
              fill
              sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
              className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-cinematic)] group-hover:scale-[1.08]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-ink/60 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-gold-soft backdrop-blur-md">
              {recipe.category}
            </span>
            <span className="absolute right-4 top-3 font-display text-3xl italic text-cream/30 transition-colors duration-500 group-hover:text-gold/80">
              {recipe.number}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 [transform:translateZ(40px)]">
            <h3 className="font-display text-2xl leading-tight text-cream">{recipe.name}</h3>
            <div className="mt-3 grid grid-rows-[1fr] transition-all lg:grid-rows-[0fr] lg:opacity-70 duration-700 ease-[var(--ease-cinematic)] lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100">
              <dl className="flex flex-wrap gap-x-4 gap-y-1 overflow-hidden text-xs text-sand">
                <div className="flex items-center gap-1.5">
                  <dt>
                    <Clock className="size-3.5 text-gold" />
                    <span className="sr-only">Tempo</span>
                  </dt>
                  <dd>{recipe.time}</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <dt>
                    <Bowl className="size-3.5 text-gold" />
                    <span className="sr-only">Rendimento</span>
                  </dt>
                  <dd>{recipe.yield}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
}

export function RecipeGallery() {
  const scope = useRef<HTMLElement>(null);
  const columns = [0, 1, 2, 3].map((c) => featuredRecipes.filter((_, i) => i % 4 === c));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Colunas em velocidades diferentes criam profundidade no desktop.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-column]").forEach((col, i) => {
          const distance = [40, -60, 70, -30][i] ?? 0;
          gsap.fromTo(
            col,
            { y: distance },
            {
              y: -distance,
              ease: "none",
              scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section id="receitas" ref={scope} className="relative overflow-hidden bg-coal py-28 sm:py-36">
      <div aria-hidden className="hairline absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">Capítulo 02 · Galeria</p>
            </Reveal>
            <MaskText
              as="h2"
              className="mt-6 font-display text-[clamp(2.2rem,5vw,4.4rem)] font-light leading-[1.02] tracking-[-0.015em]"
              segments={[{ text: "Um pouco do que" }, { text: "vai para a mesa.", className: "italic text-gilded" }]}
            />
          </div>
          <Reveal delay={0.15} className="max-w-sm">
            <p className="text-sand">
              Oito das {siteConfig.ebook.recipes} receitas do e-book, com o tempo e o rendimento indicados em cada
              uma.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-6">
          {columns.map((col, c) => (
            <div key={c} data-column className={`flex flex-col gap-5 lg:gap-6 ${c % 2 === 1 ? "lg:pt-20" : ""}`}>
              {col.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} index={featuredRecipes.indexOf(recipe)} />
              ))}
            </div>
          ))}
        </div>

        <Reveal className="mt-20 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-muted">
            Imagens meramente ilustrativas
          </p>
        </Reveal>
      </div>
    </section>
  );
}
