import { LoadingProductCard } from "@/components/storefront/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingFile() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Skeleton className="h-10 w-56 my-5" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <LoadingProductCard />
      </div>
    </div>
  );
}
