import { addItem } from "@/app/actions";
import { ShoppingBagButton } from "@/components/custom/SubmitButton";
import { FeaturedProducts } from "@/components/storefront/FeaturedProducts";
import { ImageSlider } from "@/components/storefront/ImageSlider";
import prisma from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      category: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function ProductRoute({
  params,
}: {
  params: { id: string };
}) {
  noStore();
  const data = await getData(params.id);
  const addToCart = addItem.bind(null, data.id);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
        <ImageSlider images={data.images} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {data.name}
          </h1>
          <p className="text-3xl mt-2 text-primary">
            {formatPrice(data.price)}
          </p>
          <div className="mt-3 flex items-center gap-4">
            <h3 className="items-center rounded-md bg-green-500/10 px-2 py-1 font-medium text-green-500 ring-1 ring-inset ring-green-500/10">
              {data.category.title}
            </h3>
            {data.isFeatured && (
              <h3 className="items-center rounded-md bg-orange-500/10 px-2 py-1 font-medium text-orange-500 ring-1 ring-inset ring-orange-500/10">
                Featured
              </h3>
            )}
          </div>
          <p className="text-base text-gray-700 mt-6">{data.description}</p>
          <form action={addToCart}>
            <ShoppingBagButton />
          </form>
        </div>
      </div>
      <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeaturedProducts />
      </div>
    </>
  );
}
