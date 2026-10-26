import { benefits, ebookContents } from "@/content/landing";
import { MaskText } from "@/components/ui/mask-text";
import { Reveal } from "@/components/ui/reveal";
import { Check } from "@/components/ui/icons";

export function Benefits() {
  return (
    <section id="conteudo" className="relative overflow-x-clip py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgb(214_173_98/0.12),transparent_70%)]"
      />
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow">Capítulo 03 · Conteúdo</p>
            </Reveal>
            <MaskText
              as="h2"
              className="mt-6 font-display text-[clamp(2.2rem,4.6vw,4rem)] font-light leading-[1.02] tracking-[-0.015em]"
              segments={[{ text: "O que você" }, { text: "vai receber.", className: "italic text-gilded" }]}
            />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-sand">
                Um livro de receitas digital, direto ao ponto: o que separar, quanto tempo leva, quanto rende e
                como preparar, etapa por etapa.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="glass mt-10 rounded-3xl p-6 sm:p-8">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold">Também no e-book</p>
                <ul className="mt-5 space-y-3">
                  {ebookContents.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-snug text-cream/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {benefits.map((b, i) => (
            <Reveal as="li" key={b.title} delay={0.05 * i}>
              <div className="group relative grid grid-cols-[auto_1fr] gap-6 border-t border-line py-10 last:border-b sm:gap-10 sm:py-12">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-1000 ease-[var(--ease-cinematic)] group-hover:scale-x-100"
                />
                <span className="font-display text-sm italic text-gold">0{i + 1}</span>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <h3 className="font-display text-3xl font-light leading-tight text-cream transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:translate-x-2 sm:text-4xl">
                      {b.title}
                    </h3>
                    <span
                      aria-hidden
                      className="font-display text-2xl italic text-cream/15 transition-colors duration-700 group-hover:text-gold/70"
                    >
                      {b.detail}
                    </span>
                  </div>
                  <p className="mt-4 max-w-lg leading-relaxed text-sand">{b.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
