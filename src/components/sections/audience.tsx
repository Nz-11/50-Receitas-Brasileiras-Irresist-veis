import Image from "next/image";
import { audiences } from "@/content/landing";
import { MaskText } from "@/components/ui/mask-text";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";

export function Audience() {
  return (
    <section id="para-quem" className="relative py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-5">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
            <Image
              src="/images/ambiente/mesa-compartilhada.jpg"
              alt="Pessoas servindo comida em uma mesa de madeira"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <p className="absolute inset-x-6 bottom-6 font-display text-3xl font-light italic leading-tight text-cream sm:inset-x-8 sm:bottom-8 sm:text-4xl">
              Receitas para dividir à mesa.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center lg:col-span-7 lg:pl-10">
          <Reveal>
            <p className="eyebrow">Capítulo 05 · Para quem é</p>
          </Reveal>
          <MaskText
            as="h2"
            className="mt-6 font-display text-[clamp(2.2rem,4.6vw,4rem)] font-light leading-[1.02] tracking-[-0.015em]"
            segments={[{ text: "Feito para quem" }, { text: "gosta de comida boa.", className: "italic text-gilded" }]}
          />

          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {audiences.map((a, i) => (
              <Reveal as="li" key={a.title} delay={0.1 * i} className="[perspective:1000px]">
                <TiltCard className="h-full rounded-3xl" max={7}>
                  <div className="glass flex h-full flex-col rounded-3xl p-6">
                    <span className="font-display text-4xl italic text-gold/80">0{i + 1}</span>
                    <h3 className="mt-8 font-display text-xl leading-snug text-cream">{a.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-sand">{a.text}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
