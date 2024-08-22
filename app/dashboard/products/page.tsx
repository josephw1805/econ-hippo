import { DataTable } from "@/components/custom/DataTable";
import { columns } from "@/components/products/ProductColumns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
  const data = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function ProductsRoute() {
  noStore();
  const products = await getData();

  return (
    <>
      <div className="flex items-center justify-end">
        <Button asChild className="flex items-center gap-x-2">
          <Link href="/dashboard/products/create">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </Link>
        </Button>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={products} searchKey="name" />
        </CardContent>
      </Card>
    </>
  );
}
