import { ProductCard } from "@/components/storefront/ProductCard";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(productCategory: string) {
  switch (productCategory) {
    case "all": {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
          category: true,
        },
        where: {
          status: "published",
        },
      });

      return {
        title: "All Products",
        data: data,
      };
    }
    case "tour": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          categoryId: "60bbe9d2-4139-45bf-9df9-65e436abc5df",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
          category: true,
        },
      });

      return {
        title: "World Tour",
        data: data,
      };
    }
    case "compilation": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          categoryId: "b2b667a8-7fa8-4494-be65-0657ace917cc",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
          category: true,
        },
      });

      return {
        title: "Compilation Album",
        data: data,
      };
    }
    case "studio": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          categoryId: "363a3669-c91e-4bf0-8f25-67009c6f8fa0",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
          category: true,
        },
      });

      return {
        title: "Studio Album",
        data: data,
      };
    }
    default: {
      return notFound();
    }
  }
}

export default async function CategoriesPage({
  params,
}: {
  params: { name: string };
}) {
  noStore();
  const { data, title } = await getData(params.name);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-semibold text-3xl my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
