import prisma from "@/app/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { DollarSign, ShoppingBag, PartyPopper, User2 } from "lucide-react";

async function getData() {
  const [user, product, order] = await Promise.all([
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

  return { user, product, order };
}

export async function DashboardStats() {
  const { user, product, order } = await getData();
  const totalAmount = order.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatPrice(totalAmount / 100)}</p>
          <p className="text-xs text-muted-foreground">
            Based on {order.length} Charges
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Sales</CardTitle>
          <ShoppingBag className="h-4 w-4 text-indigo-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">+{order.length}</p>
          <p className="text-xs text-muted-foreground">
            Total Sales on Digital Hippo
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Products</CardTitle>
          <PartyPopper className="h-4 w-4 text-rose-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{product.length}</p>
          <p className="text-xs text-muted-foreground">
            Total Products Created
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Users</CardTitle>
          <User2 className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{user.length}</p>
          <p className="text-xs text-muted-foreground">Total Users Signed Up</p>
        </CardContent>
      </Card>
    </div>
  );
}
