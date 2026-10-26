export type ButtonVariant = "primary" | "ghost";
export type ButtonSize = "md" | "lg";

const shared =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-semibold uppercase tracking-[0.18em] transition-[transform,box-shadow,background-color,color] duration-500 ease-[var(--ease-cinematic)] active:scale-[0.97] focus-visible:outline-offset-4";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(120deg,#f1d391,#d6ad62_45%,#b8873c)] text-ink shadow-[0_10px_40px_-10px_rgb(214_173_98/0.65),inset_0_1px_0_rgb(255_255_255/0.45)] hover:shadow-[0_18px_60px_-12px_rgb(214_173_98/0.85),inset_0_1px_0_rgb(255_255_255/0.5)] hover:-translate-y-0.5",
  ghost:
    "border border-cream/20 bg-cream/[0.03] text-cream backdrop-blur-md hover:border-gold/60 hover:bg-cream/[0.07] hover:text-gold-soft",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-12 pl-6 pr-2 text-[0.68rem]",
  lg: "h-14 pl-7 pr-2.5 text-[0.72rem] sm:h-16 sm:pl-8 sm:text-xs",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "lg", extra = "") {
  return `${shared} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}

/** Círculo com seta que desliza no hover. */
export const buttonIconWrap =
  "relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-full sm:size-11";
