# 50 Receitas Brasileiras Irresistíveis — landing page

Landing page de vendas do e-book, em Next.js 16 (App Router), TypeScript e Tailwind CSS 4.
Animações com Motion (componentes), GSAP + ScrollTrigger (sequências ligadas à rolagem) e Lenis (scroll suave).

## Comandos

```bash
npm install
npm run dev        # http://localhost:7000
npm run lint
npm run typecheck
npm run build && npm start
```

## Configuração comercial

Copie `.env.example` para `.env.local` e preencha. Variáveis `NEXT_PUBLIC_*` entram no build:
reinicie o `npm run dev` após alterar e defina-as antes do `npm run build` em produção.

| Variável | Efeito quando vazia |
| --- | --- |
| `NEXT_PUBLIC_CHECKOUT_URL` | Botões de compra mostram "Checkout ainda não configurado". Nenhuma compra é simulada. |
| `NEXT_PUBLIC_PRICE_BRL` | Oferta mostra "R$ --,--" e "Preço a definir". |
| `NEXT_PUBLIC_PRICE_ORIGINAL_BRL` | Sem promoção: só o preço de venda aparece. Com valor maior, mostra "de/por", % de desconto e economia. |
| `NEXT_PUBLIC_DELIVERY_INFO` | FAQ diz que as instruções de acesso vêm da plataforma de pagamento. |
| `NEXT_PUBLIC_GUARANTEE_INFO` | A página não menciona garantia. |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_PRIVACY_URL`, `NEXT_PUBLIC_TERMS_URL`, `NEXT_PUBLIC_COMPANY_INFO` | Itens omitidos do rodapé (em desenvolvimento aparece um lembrete). |
| `NEXT_PUBLIC_SITE_URL` | Imagens de compartilhamento usam `http://localhost:7000`. |

A leitura dessas variáveis está em `src/config/site.ts`.

## Estrutura

```
src/
  app/                 layout, página, estilos globais, ícone
  config/site.ts       produto, preço, checkout, entrega, garantia, contato, políticas
  content/landing.ts   textos, receitas da galeria, benefícios, público, FAQ
  components/
    providers/         Lenis + MotionConfig (movimento reduzido)
    sections/          uma seção da página por arquivo
    ui/                botões, checkout, texto com máscara, reveal, card 3D, livro 3D, ícones
  lib/gsap.ts          registro do GSAP/ScrollTrigger
public/
  ebook/               capa do e-book e páginas internas renderizadas do PDF real
  images/              fotografias (Unsplash, licença Unsplash)
postcss.config.mjs     Tailwind + contorno para "#" no nome da pasta
```

## Imagens

- `public/ebook/capa.jpg` vem de `capa/50 Receitas Brasileiras Irresistíveis.png`. As páginas `pagina-*.jpg` foram renderizadas de `50_receitas_brasileiras_irresistiveis.pdf`.
  Para trocar a capa, substitua `capa.jpg` mantendo a proporção 2:3 (ex.: 1024 × 1536).
- As fotos de pratos são do Unsplash (uso comercial permitido, sem atribuição obrigatória) e estão marcadas
  na página como ilustrativas. Todas as receitas mostradas na galeria existem no e-book.

## Nome da pasta com "#"

O resolvedor de módulos usado pelo Tailwind falha quando o caminho do projeto contém `#`.
`postcss.config.mjs` aplica um contorno que só atua nesse caso. Se a pasta for renomeada sem `#`,
o bloco pode ser removido.
