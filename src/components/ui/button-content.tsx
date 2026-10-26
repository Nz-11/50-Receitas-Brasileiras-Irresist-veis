import { ArrowDown, ArrowRight } from "./icons";
import { buttonIconWrap, type ButtonVariant } from "./button-styles";

/** Rótulo + ícone animado compartilhado por links e botões. */
export function ButtonContent({
  label,
  variant = "primary",
  direction = "right",
}: {
  label: string;
  variant?: ButtonVariant;
  direction?: "right" | "down";
}) {
  const Icon = direction === "down" ? ArrowDown : ArrowRight;
  const travel =
    direction === "down"
      ? ["group-hover:translate-y-[300%]", "-translate-y-[300%] group-hover:translate-y-0"]
      : ["group-hover:translate-x-[300%]", "-translate-x-[300%] group-hover:translate-x-0"];

  return (
    <>
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/40 opacity-0 blur-md transition-all duration-700 ease-[var(--ease-cinematic)] group-hover:left-[120%] group-hover:opacity-100"
        />
      )}
      <span className="relative">{label}</span>
      <span
        className={`${buttonIconWrap} ${variant === "primary" ? "bg-ink text-gold-soft" : "bg-cream/10 text-cream"}`}
      >
        <Icon className={`size-4 transition-transform duration-500 ease-[var(--ease-cinematic)] ${travel[0]}`} />
        <Icon
          className={`absolute size-4 transition-transform duration-500 ease-[var(--ease-cinematic)] ${travel[1]}`}
        />
      </span>
    </>
  );
}
