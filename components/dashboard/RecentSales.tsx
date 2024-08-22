import prisma from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { formatPrice } from "@/lib/utils";

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      id: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });

  return data;
}

export async function RecentSales() {
  const data = await getData();

  return (
    <Card className="grainy-light h-[400px] overflow-auto">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {data.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <Avatar className="hidden 2xl:flex h-9 w-9">
              <AvatarImage src={item.user?.profileImage} alt="avatar image" />
              <AvatarFallback>
                {item.user?.firstName.slice(0, 3)}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium">
                {item.user?.firstName} {item.user?.lastName}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.user?.email}
              </p>
            </div>
            <p className="ml-auto font-medium">
              +{formatPrice(item.amount / 100)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
