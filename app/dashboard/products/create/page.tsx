import { CreateForm } from "@/components/products/CreateForm";
import prisma from "@/lib/db";

async function getCategory() {
  const data = await prisma.category.findMany();
  return data;
}

export default async function CreateRoute() {
  const categories = await getCategory();
  return <CreateForm categories={categories} />;
}
