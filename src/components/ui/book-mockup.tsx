import Image from "next/image";
import { siteConfig } from "@/config/site";

type Props = {
  className?: string;
  /** Use apenas no hero, onde a capa aparece na primeira dobra. */
  priority?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
};

/**
 * Livro em 3D (CSS) usando a capa do e-book.
 * Para trocar a capa, substitua `public/ebook/capa.jpg` (proporção 2:3, ex.: 1024×1536).
 */
export function BookMockup({ className = "", priority = false, sizes = "(min-width: 1024px) 420px, 70vw", style }: Props) {
  return (
    <div className={`book ${className}`} style={style}>
      <div className="book-back shadow-[0_40px_80px_-20px_rgb(0_0_0/0.9)]" />
      <div className="book-spine" />
      <div className="book-pages" />
      <div className="book-cover bg-cream">
        <Image
          src="/ebook/capa.jpg"
          alt={`Capa do e-book ${siteConfig.productName}`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    </div>
  );
}
