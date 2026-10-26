import { AboutPreview } from "@/components/home/about-preview";
import { ArticlesPreview } from "@/components/home/articles-preview";
import { BenefitsSection } from "@/components/home/benefits-section";
import { BrandHighlights } from "@/components/home/brand-highlights";
import { ContactCta } from "@/components/home/contact-cta";
import { Distribution } from "@/components/home/distribution";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HeroSection } from "@/components/home/hero-section";
import { LifestyleGallery } from "@/components/home/lifestyle-gallery";
import { ProductShowcase } from "@/components/home/product-showcase";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Dapur Bersih. Hidup Lebih Segar.",
  description:
    "CITRAVA menghadirkan sabun cuci piring dan pembersih dapur dengan aroma citrus yang segar. Jelajahi varian, ukuran, dan cerita merek kami.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandHighlights />
      <AboutPreview />
      <FeaturedProducts />
      <BenefitsSection />
      <ProductShowcase />
      <LifestyleGallery />
      <ArticlesPreview />
      <Distribution />
      <ContactCta />
    </>
  );
}
