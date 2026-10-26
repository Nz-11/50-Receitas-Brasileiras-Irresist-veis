/** Faixa contínua com nomes de receitas que estão no e-book. */
const names = [
  "Arroz branco soltinho",
  "Feijão carioca caseiro",
  "Farofa de cebola e cenoura",
  "Pão de queijo mineiro",
  "Tapioca de queijo e tomate",
  "Cuscuz nordestino",
  "Bolo de fubá",
  "Beijinho de coco",
  "Mousse de maracujá",
  "Canjica cremosa",
  "Curau de milho",
  "Escondidinho de carne",
  "Baião de dois",
  "Caldo verde",
  "Bobó de frango",
  "Strogonoff de frango",
  "Quindim",
  "Bolo de mandioca",
  "Camarão ao leite de coco",
];

export function RecipeMarquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {names.map((name) => (
        <li key={name} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-2xl italic text-cream/80 sm:text-3xl">{name}</span>
          <span aria-hidden className="text-gold">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative overflow-hidden border-y border-line bg-coal py-6">
      <p className="sr-only">Algumas das receitas do e-book: {names.join(", ")}.</p>
      <div aria-hidden className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row(true)}
        {row(true)}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-coal to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-coal to-transparent" />
    </div>
  );
}
