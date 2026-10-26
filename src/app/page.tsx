import { siteConfig } from "@/config/site";
import { buildFaq } from "@/content/landing";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { RecipeMarquee } from "@/components/sections/recipe-marquee";
import { Presentation } from "@/components/sections/presentation";
import { RecipeGallery } from "@/components/sections/recipe-gallery";
import { Benefits } from "@/components/sections/benefits";
import { EbookShowcase } from "@/components/sections/ebook-showcase";
import { Audience } from "@/components/sections/audience";
import { Offer } from "@/components/sections/offer";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  const faq = buildFaq({
    deliveryInfo: siteConfig.deliveryInfo,
    guaranteeInfo: siteConfig.guaranteeInfo,
    pages: siteConfig.ebook.pages,
  });

  return (
    <>
      {/* Sem JavaScript, os elementos animados aparecem no estado final. */}
      <noscript>
        <style>{`[data-anim]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
      </noscript>
      <Header />
      <main id="conteudo-principal">
        <Hero />
        <RecipeMarquee />
        <Presentation />
        <RecipeGallery />
        <Benefits />
        <EbookShowcase />
        <Audience />
        <Offer />
        <Faq items={faq} />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
