import prisma from "@/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { formatPrice } from "@/lib/utils";

async function getData() {
  const [user, products, order] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
      },
    }),
    prisma.product.findMany({
      select: {
        id: true,
      },
    }),
    prisma.order.findMany({
      select: {
        amount: true,
      },
    }),
  ]);

  return { user, products, order };
}

export async function DashboardStats() {
  const { user, products, order } = await getData();

  const totalAmount = order.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.amount;
  }, 0);

  return (
    <div className="grid gap-4 grid-cols-2 md:gap-8 md:grid-cols-4">
      <Card className="bg-green-300">
        <CardHeader className="pb-2">
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatPrice(totalAmount / 100)}</p>
          <p className="text-xs text-black">Based on {order.length} Charges</p>
        </CardContent>
      </Card>
      <Card className="bg-blue-300">
        <CardHeader className="pb-2">
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">+{order.length}</p>
          <p className="text-xs text-black">Total Sales on Digital Hippo</p>
        </CardContent>
      </Card>
      <Card className="bg-indigo-300">
        <CardHeader className="pb-2">
          <CardTitle>Total Product</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{products.length}</p>
          <p className="text-xs text-black">Total Products created</p>
        </CardContent>
      </Card>
      <Card className="bg-orange-300">
        <CardHeader className="pb-2">
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{user.length}</p>
          <p className="text-xs text-black">Total Users Signed up</p>
        </CardContent>
      </Card>
    </div>
  );
}
