"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { MaskText } from "@/components/ui/mask-text";
import { BookMockup } from "@/components/ui/book-mockup";
import { CheckoutButton } from "@/components/ui/checkout-button";
import { PriceInline } from "@/components/ui/price-tag";
import { buttonClasses } from "@/components/ui/button-styles";
import { ButtonContent } from "@/components/ui/button-content";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const scope = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Câmera simulada: o cursor desloca as camadas em profundidades diferentes.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const bookRotY = useTransform(sx, [-1, 1], [-32, -14]);
  const bookRotX = useTransform(sy, [-1, 1], [12, 2]);
  const nearX = useTransform(sx, [-1, 1], [-22, 22]);
  const nearY = useTransform(sy, [-1, 1], [-16, 16]);
  const farX = useTransform(sx, [-1, 1], [10, -10]);
  const farY = useTransform(sy, [-1, 1], [8, -8]);

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    mx.set((e.clientX / window.innerWidth) * 2 - 1);
    my.set((e.clientY / window.innerHeight) * 2 - 1);
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: 0.6 },
        });
        tl.to("[data-hero-bg]", { scale: 1.18, yPercent: 12 }, 0)
          .to("[data-hero-text]", { yPercent: -18, opacity: 0.15 }, 0)
          .to("[data-hero-visual]", { yPercent: -8 }, 0)
          .to("[data-hero-scroll]", { opacity: 0 }, 0);
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      id="topo"
      ref={scope}
      onPointerMove={onPointerMove}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28 sm:pt-32 lg:pb-16"
    >
      {/* Fundo fotográfico com movimento de câmera */}
      <div data-hero-bg className="absolute inset-0 -z-20 origin-center">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.25, opacity: 0, filter: "blur(12px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.6, ease }}
        >
          <Image
            src="/images/ambiente/paes-e-especiarias.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_center] opacity-50"
          />
        </motion.div>
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0a0806_0%,rgb(10_8_6/0.92)_35%,rgb(10_8_6/0.45)_70%,rgb(10_8_6/0.7)_100%)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-ink to-transparent" />

      {/* Luz volumétrica */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/3 right-[12%] h-[140%] w-[38rem] origin-top rotate-[22deg] bg-[linear-gradient(180deg,rgb(236_210_155/0.22),rgb(236_210_155/0)_70%)] blur-2xl mix-blend-screen animate-glow" />
        <div className="absolute -top-1/3 right-[34%] h-[120%] w-56 origin-top rotate-[16deg] bg-[linear-gradient(180deg,rgb(236_210_155/0.14),transparent_65%)] blur-xl mix-blend-screen" />
        <div className="absolute right-[8%] top-[18%] size-[34rem] rounded-full bg-[radial-gradient(circle,rgb(214_173_98/0.22),transparent_62%)] blur-2xl" />
        <div className="absolute -left-40 bottom-0 size-[28rem] rounded-full bg-[radial-gradient(circle,rgb(31_107_71/0.28),transparent_65%)] blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* Texto */}
        <div data-hero-text className="relative z-10 lg:col-span-7">
          <motion.p
            data-anim
            className="eyebrow flex items-center gap-3"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease, delay: 0.3 }}
          >
            <span className="h-px w-10 bg-gold" aria-hidden />
            Um sabor de Brasil em cada receita
          </motion.p>

          <MaskText
            as="h1"
            trigger="mount"
            delay={0.45}
            stagger={0.07}
            className="mt-7 font-display text-[clamp(2.6rem,6.2vw,5.6rem)] font-light leading-[0.98] tracking-[-0.02em] text-cream"
            segments={[
              { text: "O melhor da" },
              { text: "cozinha brasileira,", className: "italic font-normal text-gilded" },
              { text: "direto para a sua mesa." },
            ]}
          />

          <motion.p
            data-anim
            className="mt-8 max-w-xl text-base leading-relaxed text-sand sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 1.25 }}
          >
            Um e-book com {siteConfig.ebook.recipes} receitas caseiras, de pratos principais a sobremesas, com
            ingredientes organizados e modo de preparo passo a passo para você preparar em casa.
          </motion.p>

          <motion.div
            data-anim
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 1.45 }}
          >
            <CheckoutButton label="Quero meu e-book" />
            <a href="#receitas" className={buttonClasses("ghost", "lg")}>
              <ButtonContent label="Explorar as receitas" variant="ghost" direction="down" />
            </a>
          </motion.div>

          <motion.div
            data-anim
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.65 }}
          >
            <PriceInline className="mt-6" />
          </motion.div>

          <motion.ul
            data-anim
            className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.8 }}
          >
            <li>
              <span className="text-gold-soft">{siteConfig.ebook.recipes}</span> receitas
            </li>
            <li>
              {siteConfig.ebook.format} · <span className="text-gold-soft">{siteConfig.ebook.pages}</span> páginas
            </li>
            <li>Pratos · lanches · doces</li>
          </motion.ul>
        </div>

        {/* Composição visual */}
        <div data-hero-visual className="relative z-0 lg:col-span-5">
          <div className="book-scene relative mx-auto aspect-[4/5] w-full max-w-[30rem]">
            <motion.div
              style={{ x: farX, y: farY }}
              className="absolute left-0 top-[4%] w-[52%]"
              initial={{ opacity: 0, y: 60, rotate: -14 }}
              animate={{ opacity: 1, y: 0, rotate: -8 }}
              transition={{ duration: 1.6, ease, delay: 0.9 }}
            >
              <figure className="overflow-hidden rounded-2xl border border-cream/10 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)]">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/images/receitas/moqueca-de-peixe.jpg"
                    alt="Moqueca de peixe em panela de ferro"
                    fill
                    sizes="(min-width: 1024px) 240px, 45vw"
                    className="object-cover"
                  />
                </div>
              </figure>
            </motion.div>

            <motion.div
              style={{ x: farX, y: farY }}
              className="absolute bottom-[2%] right-0 w-[50%]"
              initial={{ opacity: 0, y: 60, rotate: 14 }}
              animate={{ opacity: 1, y: 0, rotate: 7 }}
              transition={{ duration: 1.6, ease, delay: 1.05 }}
            >
              <figure className="overflow-hidden rounded-2xl border border-cream/10 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)]">
                <div className="relative aspect-square">
                  <Image
                    src="/images/receitas/pao-de-queijo.jpg"
                    alt="Pães de queijo dourados"
                    fill
                    sizes="(min-width: 1024px) 240px, 45vw"
                    className="object-cover"
                  />
                </div>
              </figure>
            </motion.div>

            <motion.div
              className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2"
              style={{ x: nearX, y: nearY }}
            >
              <motion.div
                initial={{ opacity: 0, y: 120, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.8, ease, delay: 0.6 }}
              >
                <div className="animate-float-slow">
                  <motion.div style={{ rotateY: bookRotY, rotateX: bookRotX, transformStyle: "preserve-3d" }}>
                    <BookMockup priority sizes="(min-width: 1024px) 280px, 55vw" />
                  </motion.div>
                </div>
                <div
                  aria-hidden
                  className="mx-auto mt-6 h-6 w-4/5 rounded-[100%] bg-black/70 blur-xl"
                />
              </motion.div>
            </motion.div>

            {/* Indicadores flutuantes */}
            <motion.div
              className="absolute -left-2 bottom-[22%] sm:-left-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease, delay: 1.7 }}
            >
              <div className="glass animate-float rounded-2xl px-4 py-3 [--float-rotate:-2deg]">
                <p className="font-display text-3xl italic leading-none text-gold">50</p>
                <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-sand">receitas</p>
              </div>
            </motion.div>
            <motion.div
              className="absolute -right-1 top-[16%] sm:-right-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease, delay: 1.9 }}
            >
              <div className="glass animate-float rounded-full px-4 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-cream [--float-rotate:2deg] [animation-delay:-3s]">
                <span className="mr-2 inline-block size-1.5 rounded-full bg-leaf align-middle shadow-[0_0_10px_#1f6b47]" />
                Passo a passo
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Indicador de rolagem */}
      <div data-hero-scroll className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block">
        <motion.a
          href="#apresentacao"
          data-anim
          className="flex flex-col items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-muted transition-colors hover:text-cream"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
        >
          <span className="relative flex h-10 w-6 justify-center rounded-full border border-cream/25 pt-2">
            <span className="block size-1 rounded-full bg-gold animate-scroll-dot" />
          </span>
          Role para descobrir
        </motion.a>
      </div>
    </section>
  );
}
