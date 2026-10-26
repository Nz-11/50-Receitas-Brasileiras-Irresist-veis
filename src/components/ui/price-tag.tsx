"use client";

import { motion } from "motion/react";
import { getPromotion, siteConfig } from "@/config/site";

const ease = [0.22, 1, 0.36, 1] as const;

function splitAmount(value: number) {
  const [int, cents] = value.toFixed(2).split(".");
  return { int, cents };
}

/** Valor riscado com traço que se desenha ao entrar na tela. */
function StrikePrice({ value, className = "" }: { value: string; className?: string }) {
  return (
    <span className={`relative ml-1 inline-block whitespace-nowrap ${className}`}>
      <span className="sr-only">Preço anterior: </span>
      {value}
      <motion.span
        aria-hidden
        data-anim
        className="absolute inset-x-[-4%] top-1/2 h-[2px] origin-left -rotate-[8deg] rounded-full bg-ember shadow-[0_0_10px_rgb(200_105_58/0.7)]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease, delay: 0.35 }}
      />
    </span>
  );
}

/** Selo circular com o desconto e texto girando ao redor. */
function DiscountSeal({ percentOff, savings }: { percentOff: number; savings: string }) {
  const ring = `ECONOMIZE ${savings} • OFERTA ESPECIAL • `;
  return (
    <motion.div
      data-anim
      aria-hidden
      className="relative grid size-[4.75rem] shrink-0 place-items-center sm:size-32"
      initial={{ scale: 0.4, rotate: -40, opacity: 0 }}
      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.5 }}
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,#2b8a5c,#0f3d29_70%)] shadow-[0_18px_40px_-12px_rgb(31_107_71/0.8),inset_0_1px_0_rgb(255_255_255/0.2)]" />
      <svg viewBox="0 0 120 120" className="absolute inset-0 size-full animate-seal">
        <defs>
          <path id="seal-ring" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
        </defs>
        <text className="fill-gold-soft text-[8.6px] font-semibold tracking-[0.18em]">
          <textPath href="#seal-ring">{ring}</textPath>
        </text>
      </svg>
      <div className="absolute inset-[22%] rounded-full border border-dashed border-gold/50" />
      <p className="relative text-center leading-none">
        <span className="block font-display text-[1.35rem] font-semibold italic text-cream sm:text-[2.3rem]">
          {percentOff}%
        </span>
        <span className="mt-0.5 block text-[0.5rem] sm:mt-1 sm:text-[0.6rem] font-bold tracking-[0.3em] text-gold-soft">OFF</span>
      </p>
    </motion.div>
  );
}

/** Bloco de preço completo da oferta. */
export function PriceTag() {
  const { price } = siteConfig;
  const promo = getPromotion(price);

  if (price.amount === null) {
    return (
      <p data-price="placeholder">
        <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-muted">Valor</span>
        <span className="mt-1 block font-display text-5xl font-light text-cream/40 sm:text-6xl">R$ --,--</span>
        <span className="mt-2 inline-block rounded-full border border-dashed border-gold/50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-soft">
          Preço a definir
        </span>
      </p>
    );
  }

  const { int, cents } = splitAmount(price.amount);

  return (
    <div
      data-price={promo ? "promo" : "regular"}
      className="relative overflow-hidden rounded-[28px] border border-gold/30 bg-[linear-gradient(145deg,rgb(214_173_98/0.12),rgb(214_173_98/0.02)_45%,rgb(31_107_71/0.1))] p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] sm:p-8"
    >
      {/* Brilho que atravessa o cartão */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-y-10 -left-1/3 w-1/4 rotate-12 bg-gradient-to-r from-transparent via-gold-soft/15 to-transparent animate-shine"
      />
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[radial-gradient(circle,rgb(214_173_98/0.25),transparent_65%)] blur-2xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          {promo && (
            <p className="flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-gold">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold/70" />
                <span className="relative inline-flex size-2 rounded-full bg-gold" />
              </span>
              Oferta especial
            </p>
          )}

          {promo && (
            <p className="mt-4 text-base text-sand sm:text-lg">
              De <StrikePrice value={promo.from} className="text-cream/60" />
            </p>
          )}

          <motion.p
            data-anim
            className="mt-1 flex items-end gap-2 leading-none"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease, delay: 0.2 }}
          >
            <span className="sr-only">{promo ? `Por ${promo.to}` : `Valor: R$ ${int},${cents}`}</span>
            <span aria-hidden className="flex items-end gap-2">
              {promo && <span className="mb-3 font-display text-xl italic text-sand">por</span>}
              <span className="mb-3 font-display text-2xl text-gold-soft sm:text-3xl">R$</span>
              <span className="flex items-end">
                <span className="font-display text-[5.2rem] font-semibold tracking-[-0.04em] text-gilded sm:text-[6.4rem]">
                  {int}
                </span>
                <span className="mb-3 ml-0.5 font-display text-3xl font-semibold text-gilded sm:text-4xl">,{cents}</span>
              </span>
            </span>
          </motion.p>
        </div>

        {promo && (
          <div className="absolute -right-2 -top-3 sm:static">
            <DiscountSeal percentOff={promo.percentOff} savings={promo.savings} />
          </div>
        )}
      </div>

      {promo && (
        <motion.p
          data-anim
          className="relative mt-6 inline-block rounded-full border border-leaf/50 bg-leaf/20 px-4 py-2 text-xs font-semibold text-cream"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.7 }}
        >
          <span aria-hidden className="mr-2 text-gold-soft">✦</span>
          Você economiza <span className="whitespace-nowrap text-gold-soft">{promo.savings}</span>{" "}
          <span className="whitespace-nowrap">({promo.percentOff}% de desconto)</span>
        </motion.p>
      )}
    </div>
  );
}

/** Versão compacta para perto dos botões (topo e seção final). */
export function PriceInline({ className = "" }: { className?: string }) {
  const { price } = siteConfig;
  const promo = getPromotion(price);
  if (price.amount === null) return null;
  const { int, cents } = splitAmount(price.amount);

  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-sand ${className}`}>
      {promo && (
        <span>
          De <StrikePrice value={promo.from} className="text-cream/55" />
        </span>
      )}
      <span className="whitespace-nowrap">
        {promo && "por "}
        <strong className="font-display text-2xl font-semibold text-gilded">
          R$ {int},{cents}
        </strong>
      </span>
      {promo && (
        <span className="rounded-full bg-leaf/30 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold-soft ring-1 ring-leaf/60">
          {promo.percentOff}% off
        </span>
      )}
    </p>
  );
}
