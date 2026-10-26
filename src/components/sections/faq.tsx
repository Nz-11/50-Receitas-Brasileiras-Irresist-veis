"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { FaqItem } from "@/content/landing";
import { MaskText } from "@/components/ui/mask-text";
import { Reveal } from "@/components/ui/reveal";
import { Plus } from "@/components/ui/icons";

function FaqRow({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <div className="border-t border-line last:border-b">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-7 text-left"
        >
          <span className="font-display text-xl leading-snug text-cream transition-colors duration-300 group-hover:text-gold-soft sm:text-2xl">
            {item.question}
          </span>
          <span
            className={`grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[var(--ease-cinematic)] ${
              open ? "rotate-45 border-gold bg-gold text-ink" : "border-cream/20 text-cream group-hover:border-gold/60"
            }`}
          >
            <Plus className="size-4" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-8 pr-14 leading-relaxed text-sand">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="duvidas" className="relative py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow">Capítulo 07 · Dúvidas</p>
          </Reveal>
          <MaskText
            as="h2"
            className="mt-6 font-display text-[clamp(2.2rem,4.4vw,3.8rem)] font-light leading-[1.02] tracking-[-0.015em]"
            segments={[{ text: "Perguntas" }, { text: "frequentes.", className: "italic text-gilded" }]}
          />
        </div>
        <Reveal className="lg:col-span-8" delay={0.1}>
          {items.map((item, i) => (
            <FaqRow key={item.question} item={item} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
