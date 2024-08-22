import { checkOut, delItem } from "@/app/actions";
import { CheckoutButton, DeleteItem } from "@/components/custom/SubmitButton";
import { Button } from "@/components/ui/button";
import { redis } from "@/lib/redis";
import { Cart } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

export default async function CartRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);
  const totalPrice =
    cart?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  return (
    <div className="max-w-2xl mx-auto mt-10 min-h-[60vh] px-4 sm:px-6 lg:px-8">
      {!cart || !cart.items ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
          <Image
            src="/images/hippo-empty-cart.png"
            width={300}
            height={300}
            aria-hidden
            alt="empty cart"
            priority
          />
          <h2 className="mt-6 text-xl font-semibold">
            You have no items in your bag
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            You currently have no items in your shopping bag. Please add some so
            that you can see them right here.
          </p>
          <Button>
            <Link href="/">Shop Now!</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-10">
          {cart.items.map((item) => (
            <div key={item.id} className="flex">
              <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                <Image
                  className="rounded-md object-cover"
                  src={item.imageString}
                  alt="product image"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="ml-5 flex justify-between w-full font-medium">
                <p>{item.name}</p>
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center gap-x-2">
                    <p>{item.quantity}</p>x<p>{formatPrice(item.price)}</p>
                  </div>
                  <form action={delItem} className="text-end">
                    <input hidden name="productId" value={item.id} readOnly />
                    <DeleteItem />
                  </form>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-10">
            <div className="flex items-center justify-between font-medium">
              <p>Subtotal:</p>
              <p>{formatPrice(totalPrice)}</p>
            </div>
            <form action={checkOut}>
              <CheckoutButton />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
