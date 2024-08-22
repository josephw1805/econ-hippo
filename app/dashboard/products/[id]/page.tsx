import { EditForm } from "@/components/products/EditForm";
import prisma from "@/lib/db";
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

async function getCategory() {
  const data = await prisma.category.findMany();
  return data;
}

export default async function EditRoute({
  params,
}: {
  params: { id: string };
}) {
  noStore();
  const data = await getData(params.id);
  const categories = await getCategory();
  return <EditForm data={data} categories={categories} />;
}
