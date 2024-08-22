import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Category } from "@prisma/client";
import { Skeleton } from "../ui/skeleton";

interface iAppProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: Category;
  };
}

export function ProductCard({ item }: iAppProps) {
  return (
    <div className="rounded-lg">
      <div className="relative h-[392px]">
        <Image
          src={item.images[0]}
          alt="Product Image"
          fill
          priority
          className="object-cover object-center h-full w-full rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        <h1 className="font-semibold text-xl">{item.name}</h1>
        <div className="flex gap-x-2">
          <h3 className="items-center rounded-md bg-green-500/10 px-2 py-1 font-medium text-green-500 ring-1 ring-inset ring-green-500/10">
            {item.category.title}
          </h3>
          <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
            {formatPrice(item.price)}
          </h3>
        </div>
      </div>
      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
        {item.description}
      </p>
      <Button className="w-full mt-5" asChild>
        <Link href={`/product/${item.id}`}>Learn More</Link>
      </Button>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[330px]" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      <Skeleton className="w-full h-10 mt-5" />
    </div>
  );
}
