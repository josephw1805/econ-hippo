import { DataTable } from "@/components/custom/DataTable";
import { columns } from "@/components/orders/OrderColumn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
  const data = await prisma.order.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function OrdersRoute() {
  noStore();
  const orders = await getData();

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store!</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={orders} searchKey="id" />
      </CardContent>
    </Card>
  );
}
