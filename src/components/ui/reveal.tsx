"use client";

import { motion } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article";
};

/** Entrada suave ao entrar na tela (fade + deslocamento + desfoque). */
export function Reveal({ children, className, delay = 0, y = 36, as = "div" }: Props) {
  const Component = motion[as];

  return (
    <Component
      data-anim
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  );
}
