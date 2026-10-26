/**
 * Conteúdo editorial da página. Todas as receitas citadas existem no e-book;
 * número, tempo e rendimento foram copiados do PDF.
 */

export type NavItem = { label: string; href: `#${string}` };

export const navItems: NavItem[] = [
  { label: "Receitas", href: "#receitas" },
  { label: "Conteúdo", href: "#conteudo" },
  { label: "O e-book", href: "#ebook" },
  { label: "Dúvidas", href: "#duvidas" },
];

export type Recipe = {
  slug: string;
  number: string;
  name: string;
  category: string;
  time: string;
  yield: string;
  image: string;
  alt: string;
};

/** Seleção ilustrativa: são 8 das 50 receitas do e-book. */
export const featuredRecipes: Recipe[] = [
  {
    slug: "moqueca",
    number: "23",
    name: "Moqueca de peixe",
    category: "Prato principal",
    time: "35 min",
    yield: "4 porções",
    image: "/images/receitas/moqueca-de-peixe.jpg",
    alt: "Moqueca servida em panela de ferro com concha",
  },
  {
    slug: "pao-de-queijo",
    number: "07",
    name: "Pão de queijo mineiro",
    category: "Lanche",
    time: "40 min",
    yield: "20–24 unidades",
    image: "/images/receitas/pao-de-queijo.jpg",
    alt: "Pães de queijo dourados, um deles aberto, sobre madeira escura",
  },
  {
    slug: "galinhada",
    number: "24",
    name: "Galinhada brasileira",
    category: "Prato principal",
    time: "45 min",
    yield: "5 porções",
    image: "/images/receitas/galinhada.jpg",
    alt: "Coxa de frango dourada sobre arroz amarelo",
  },
  {
    slug: "brigadeiro",
    number: "11",
    name: "Brigadeiro tradicional",
    category: "Doce",
    time: "20 min + resfriamento",
    yield: "20 unidades",
    image: "/images/receitas/brigadeiro.jpg",
    alt: "Brigadeiros e docinhos em forminhas sobre mesa de madeira",
  },
  {
    slug: "empadao",
    number: "42",
    name: "Empadão de frango",
    category: "Salgado",
    time: "1 h 15 min",
    yield: "8 porções",
    image: "/images/receitas/empadao-de-frango.jpg",
    alt: "Empadão com massa dourada e recheio de frango à mostra",
  },
  {
    slug: "pudim",
    number: "14",
    name: "Pudim de leite condensado",
    category: "Sobremesa",
    time: "1 h 20 min + geladeira",
    yield: "8 porções",
    image: "/images/receitas/pudim.jpg",
    alt: "Pudim com calda de caramelo em prato de cerâmica",
  },
  {
    slug: "picadinho",
    number: "34",
    name: "Picadinho de carne",
    category: "Prato principal",
    time: "40 min",
    yield: "4 porções",
    image: "/images/receitas/picadinho.jpg",
    alt: "Cubos de carne com batata ao lado de arroz branco",
  },
  {
    slug: "bolo-de-cenoura",
    number: "18",
    name: "Bolo de cenoura com chocolate",
    category: "Bolo",
    time: "55 min",
    yield: "10 fatias",
    image: "/images/receitas/bolo-de-cenoura.jpg",
    alt: "Bolo de cenoura recebendo cobertura de chocolate",
  },
];

export type Benefit = { title: string; text: string; detail: string };

export const benefits: Benefit[] = [
  {
    title: "50 receitas brasileiras",
    text: "Pratos principais, acompanhamentos, lanches, pães, bolos e sobremesas em um só lugar.",
    detail: "50",
  },
  {
    title: "Ingredientes organizados",
    text: "Cada receita traz a lista completa de ingredientes antes do preparo, para você separar tudo antes de começar.",
    detail: "Lista",
  },
  {
    title: "Passo a passo numerado",
    text: "Instruções em etapas curtas, com tempo de preparo, rendimento e uma dica ao final de cada receita.",
    detail: "1·2·3",
  },
  {
    title: "Para diferentes momentos",
    text: "Do arroz do dia a dia à moqueca de domingo, do lanche da tarde ao doce de festa.",
    detail: "Dia a dia",
  },
  {
    title: "Digital, para consultar quando quiser",
    text: "Arquivo em PDF que abre no celular, no tablet ou no computador, inclusive ao lado do fogão.",
    detail: "PDF",
  },
];

export const ebookContents: string[] = [
  "Boas-vindas e orientações de “Antes de começar”",
  "Sumário organizado por tipo de prato",
  "Tempo e rendimento em todas as receitas",
  "Dica prática ao final de cada preparo",
  "Sugestões para montar um cardápio semanal",
  "Orientações de armazenamento e segurança alimentar",
];

export type Audience = { title: string; text: string };

export const audiences: Audience[] = [
  {
    title: "Quem gosta de cozinhar",
    text: "E quer ter à mão receitas brasileiras clássicas, escritas de forma clara e direta.",
  },
  {
    title: "Quem quer variar o cardápio",
    text: "E procura ideias para sair da rotina, combinando pratos, acompanhamentos e sobremesas.",
  },
  {
    title: "Quem cozinha para os outros",
    text: "E quer receitas para compartilhar com a família e os amigos, no almoço de domingo ou numa festa.",
  },
];

export type FaqItem = { question: string; answer: string };

export function buildFaq(options: {
  deliveryInfo: string | null;
  guaranteeInfo: string | null;
  pages: number;
}): FaqItem[] {
  const items: FaqItem[] = [
    {
      question: "O e-book é físico ou digital?",
      answer: `É um produto 100% digital: um arquivo em PDF com ${options.pages} páginas. Nenhum item é enviado pelo correio.`,
    },
    {
      question: "Em quais aparelhos consigo ler?",
      answer:
        "Em qualquer celular, tablet ou computador com um leitor de PDF, como o navegador ou os aplicativos gratuitos de leitura.",
    },
    {
      question: "Quais receitas estão incluídas?",
      answer:
        "São 50 receitas caseiras da culinária brasileira, divididas entre pratos principais, acompanhamentos, lanches e pães, bolos e sobremesas. Entre elas: moqueca de peixe, galinhada, baião de dois, escondidinho, pão de queijo, brigadeiro, pudim e bolo de cenoura.",
    },
    {
      question: "Como cada receita é apresentada?",
      answer:
        "Com tempo de preparo, rendimento, lista de ingredientes, modo de preparo em passos numerados e uma dica ao final.",
    },
    {
      question: "Como funciona a compra?",
      answer:
        "Esta página não processa pagamentos e não pede dados de cartão. Ao clicar em comprar, você é levado à plataforma de pagamento, onde vê o valor, as formas de pagamento e as condições antes de confirmar.",
    },
    {
      question: "Como recebo o acesso?",
      answer:
        options.deliveryInfo ??
        "As instruções de acesso ao arquivo são informadas pela plataforma de pagamento durante a compra.",
    },
  ];

  if (options.guaranteeInfo) {
    items.push({ question: "Existe garantia?", answer: options.guaranteeInfo });
  }

  return items;
}
