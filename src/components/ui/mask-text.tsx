"use client";

import { motion } from "motion/react";

export type TextSegment = { text: string; className?: string };

type Props = {
  segments: TextSegment[] | string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  /** "mount" anima ao carregar (hero); "view" anima ao entrar na tela. */
  trigger?: "mount" | "view";
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Texto revelado palavra por palavra através de máscaras.
 * O texto completo fica disponível para leitores de tela em um span oculto.
 */
export function MaskText({ segments, as: Tag = "span", className, delay = 0, stagger = 0.055, trigger = "view" }: Props) {
  const parts: TextSegment[] = typeof segments === "string" ? [{ text: segments }] : segments;
  const fullText = parts.map((p) => p.text).join(" ");

  let index = 0;
  const words = parts.flatMap((part) =>
    part.text
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, className: part.className, i: index++ })),
  );

  const target = { y: "0%", rotate: 0 };
  const animateProps =
    trigger === "mount"
      ? { animate: target }
      : { whileInView: target, viewport: { once: true, margin: "0px 0px -12% 0px" } };

  return (
    <Tag className={className}>
      <span className="sr-only">{fullText}</span>
      <span aria-hidden>
        {words.map(({ word, className: wordClass, i }) => (
          <span key={i}>
            <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
              <motion.span
                data-anim
                className={`inline-block origin-bottom-left ${wordClass ?? ""}`}
                initial={{ y: "112%", rotate: 5 }}
                {...animateProps}
                transition={{ duration: 1.1, ease, delay: delay + i * stagger }}
              >
                {word}
              </motion.span>
            </span>{" "}
          </span>
        ))}
      </span>
    </Tag>
  );
}
