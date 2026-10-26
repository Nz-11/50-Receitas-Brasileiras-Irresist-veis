/**
 * Configuração comercial da landing page.
 *
 * Tudo que depende de decisão de negócio fica aqui ou em variáveis de ambiente
 * (veja `.env.example`). Valores `null` são exibidos como pendentes na página,
 * nunca substituídos por dados inventados.
 */

export type Price = {
  /** Valor de venda em reais, por exemplo 29.9. `null` mostra o placeholder "Preço a definir". */
  amount: number | null;
  /** Valor "de" da promoção. Só é usado quando for maior que `amount`. */
  originalAmount: number | null;
  currency: "BRL";
};

function parseBrl(raw: string | undefined): number | null {
  const parsed = raw ? Number(raw.trim().replace(",", ".")) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function readPrice(): Price {
  const amount = parseBrl(process.env.NEXT_PUBLIC_PRICE_BRL);
  const original = parseBrl(process.env.NEXT_PUBLIC_PRICE_ORIGINAL_BRL);
  return {
    amount,
    originalAmount: amount !== null && original !== null && original > amount ? original : null,
    currency: "BRL",
  };
}

function readUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export const siteConfig = {
  productName: "50 Receitas Brasileiras Irresistíveis",
  shortName: "50 Receitas Brasileiras",
  tagline: "Um livro de receitas caseiras para todos os dias",
  description:
    "E-book com 50 receitas da culinária brasileira: pratos principais, acompanhamentos, lanches, bolos e sobremesas, com ingredientes e modo de preparo passo a passo.",

  /** Fatos verificados no arquivo do e-book (50_receitas_brasileiras_irresistiveis.pdf). */
  ebook: {
    format: "PDF",
    pages: 28,
    recipes: 50,
  },

  price: readPrice(),

  /**
   * URL externa do checkout (Hotmart, Kiwify, Eduzz, Mercado Pago etc.).
   * Defina NEXT_PUBLIC_CHECKOUT_URL. Sem ela, os botões de compra exibem um aviso
   * de checkout não configurado e nenhuma compra é simulada.
   */
  checkoutUrl: readUrl(process.env.NEXT_PUBLIC_CHECKOUT_URL),

  /**
   * Texto sobre a entrega, somente depois de confirmado com a plataforma de pagamento.
   * Exemplo: "Você recebe o link de download no e-mail informado na compra."
   */
  deliveryInfo: process.env.NEXT_PUBLIC_DELIVERY_INFO?.trim() || null,

  /**
   * Garantia somente se houver política real. Exemplo: "7 dias de garantia, conforme
   * o Código de Defesa do Consumidor." Sem valor, a página não menciona garantia.
   */
  guaranteeInfo: process.env.NEXT_PUBLIC_GUARANTEE_INFO?.trim() || null,

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null,
  },

  legal: {
    privacyUrl: readUrl(process.env.NEXT_PUBLIC_PRIVACY_URL),
    termsUrl: readUrl(process.env.NEXT_PUBLIC_TERMS_URL),
    /** Ex.: "Nome da empresa · CNPJ 00.000.000/0000-00" */
    companyInfo: process.env.NEXT_PUBLIC_COMPANY_INFO?.trim() || null,
  },
} as const;

export function formatBrl(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function formatPrice(price: Price): string | null {
  return price.amount === null ? null : formatBrl(price.amount);
}

/** Dados da promoção, ou `null` quando não há valor "de" configurado. */
export function getPromotion(price: Price) {
  if (price.amount === null || price.originalAmount === null) return null;
  return {
    from: formatBrl(price.originalAmount),
    to: formatBrl(price.amount),
    savings: formatBrl(price.originalAmount - price.amount),
    percentOff: Math.floor(((price.originalAmount - price.amount) / price.originalAmount) * 100),
  };
}
