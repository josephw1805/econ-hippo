import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  const data = await prisma.category.findMany({});
  return data;
}

export async function CategoriesSelection() {
  const categories = await getData();
  return (
    <div className="py-24 sm:py-32">
      <div className="flex justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Shop by Category
        </h2>
        <Link
          href="/products/all"
          className="text-sm font-semibold text-primary hover:text-primary/80"
        >
          Browse all products &rarr;
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:aspect-w-1 sm:row-span-2">
          <Image
            src={categories[2].imageString}
            alt="tour category"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55" />
          <div className="p-6 flex items-end">
            <Link href="/products/tour">
              <h3 className="text-white font-semibold">
                {categories[2].title}
              </h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>
        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={categories[1].imageString}
            alt="compilation category"
            fill
            className="object-cover object-center sm:absolute sm:inset-0 sm:w-full sm:h-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
          <div className="p-6 flex items-end sm:absolute sm:inset-0">
            <Link href="/products/compilation">
              <h3 className="text-white font-semibold">
                {categories[1].title}
              </h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>
        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={categories[0].imageString}
            alt="studio category"
            fill
            className="object-cover object-center sm:absolute sm:inset-0 sm:w-full sm:h-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
          <div className="p-6 flex items-end sm:absolute sm:inset-0">
            <Link href="/products/studio">
              <h3 className="text-white font-semibold">
                {categories[0].title}
              </h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
