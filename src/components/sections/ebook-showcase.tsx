"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { BookMockup } from "@/components/ui/book-mockup";
import { MaskText } from "@/components/ui/mask-text";
import { Reveal } from "@/components/ui/reveal";

/** Páginas renderizadas do PDF real do e-book (public/ebook). */
const pages = [
  { src: "/ebook/pagina-sumario.jpg", alt: "Página de boas-vindas e sumário do e-book", pos: "left-[4%] top-[6%] -rotate-[9deg]" },
  { src: "/ebook/pagina-brigadeiro.jpg", alt: "Página do e-book com a receita de brigadeiro", pos: "left-[26%] top-0 -rotate-[2deg]" },
  { src: "/ebook/pagina-bolo-de-cenoura.jpg", alt: "Página do e-book com a receita de bolo de cenoura", pos: "left-[48%] top-[7%] rotate-[7deg]" },
];

export function EbookShowcase() {
  const scope = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const width = () => stage.current?.offsetWidth ?? 1000;
        const pinEl = scope.current?.querySelector<HTMLElement>("[data-pin]");
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: pinEl,
            start: "center center",
            end: "+=140%",
            pin: pinEl,
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });

        tl.from("[data-show-book]", { x: () => width() * 0.36, scale: 1.3, rotateY: -50, rotateX: 12, duration: 1.2 })
          .from("[data-show-tablet]", { opacity: 0, y: 160, rotateX: 40, scale: 0.85, duration: 1 }, 0.55)
          .from(
            "[data-show-page]",
            { opacity: 0, x: () => -width() * 0.35, y: 80, rotate: 0, scale: 0.6, stagger: 0.18, duration: 1 },
            0.8,
          )
          .from("[data-show-caption]", { opacity: 0, y: 24, stagger: 0.12, duration: 0.6 }, 1.4);
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section id="ebook" ref={scope} className="relative overflow-hidden bg-coal">
      <div aria-hidden className="hairline absolute inset-x-0 top-0" />
      <div data-pin className="relative flex min-h-[100svh] flex-col justify-center py-24 sm:py-32 lg:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(214_173_98/0.14),transparent_60%)]"
        />
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Reveal>
                <p className="eyebrow">Capítulo 04 · O e-book</p>
              </Reveal>
              <MaskText
                as="h2"
                className="mt-6 font-display text-[clamp(2.2rem,4.6vw,4rem)] font-light leading-[1.02] tracking-[-0.015em]"
                segments={[{ text: "Folheie antes" }, { text: "de cozinhar.", className: "italic text-gilded" }]}
              />
            </div>
            <Reveal delay={0.15} className="max-w-sm">
              <p className="text-sand">
                Capa e páginas internas do e-book: {siteConfig.ebook.pages} páginas em {siteConfig.ebook.format},
                para ler no celular, no tablet ou no computador.
              </p>
            </Reveal>
          </div>

          <div
            ref={stage}
            className="book-scene mt-14 grid items-center gap-14 sm:grid-cols-2 lg:mt-12 lg:grid-cols-[0.9fr_1fr_1.25fr] lg:gap-8"
          >
            {/* Livro */}
            <div className="relative z-30 mx-auto w-[62%] max-w-[17rem] sm:w-[70%] lg:w-[82%]">
              <div data-show-book style={{ transformStyle: "preserve-3d" }}>
                <div style={{ transform: "rotateY(-18deg) rotateX(4deg)", transformStyle: "preserve-3d" }}>
                  <BookMockup sizes="(min-width: 1024px) 260px, 60vw" />
                </div>
              </div>
              <p data-show-caption className="mt-8 text-center text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-muted">
                Capa
              </p>
            </div>

            {/* Tablet */}
            <div className="relative z-20 mx-auto w-[78%] max-w-[19rem] [perspective:1400px] sm:w-[80%] lg:w-[88%]">
              <div
                data-show-tablet
                className="rounded-[1.8rem] border border-cream/15 bg-[linear-gradient(145deg,#2a2622,#0d0b09)] p-2.5 shadow-[0_50px_100px_-30px_rgb(0_0_0/0.95),inset_0_1px_0_rgb(255_255_255/0.08)] [transform:rotateY(10deg)_rotateX(4deg)]"
              >
                <div className="relative aspect-[595/842] overflow-hidden rounded-[1.3rem] bg-white">
                  <Image
                    src="/ebook/pagina-moqueca.jpg"
                    alt="Página do e-book com a receita de moqueca de peixe, exibida em um tablet"
                    fill
                    sizes="(min-width: 1024px) 300px, 70vw"
                    className="object-cover object-top"
                  />
                  <div aria-hidden className="absolute inset-0 bg-[linear-gradient(125deg,rgb(255_255_255/0.18),transparent_40%)]" />
                </div>
              </div>
              <p data-show-caption className="mt-8 text-center text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-muted">
                No tablet
              </p>
            </div>

            {/* Páginas em leque */}
            <div className="relative z-10 sm:col-span-2 lg:col-span-1">
              <div className="relative mx-auto aspect-[5/4] w-full max-w-md">
                {pages.map((p) => (
                  <div
                    key={p.src}
                    data-show-page
                    className={`absolute w-[48%] overflow-hidden rounded-md bg-white shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)] ${p.pos}`}
                  >
                    <div className="relative aspect-[595/842]">
                      <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 200px, 45vw" className="object-cover" />
                    </div>
                  </div>
                ))}
              </div>
              <p data-show-caption className="mt-6 text-center text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-muted">
                Páginas internas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
