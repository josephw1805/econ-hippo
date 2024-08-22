import { CategoriesSelection } from "@/components/storefront/CategorySelection";
import { FeaturedProducts } from "@/components/storefront/FeaturedProducts";
import { Hero } from "@/components/storefront/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategoriesSelection />
        <FeaturedProducts />
      </div>
    </>
  );
}
