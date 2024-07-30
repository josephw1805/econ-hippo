import prisma from "@/app/lib/db";
import redis from "@/app/lib/redis";
import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_SECRET_WEBHOOK as string
    );
  } catch (error: unknown) {
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    await prisma.order.create({
      data: {
        amount: session.amount_total as number,
        status: session.status as string,
        userId: session.metadata?.userId,
      },
    });

    await redis.del(`cart-${session.metadata?.userId}`);
  }

  return new Response(null, { status: 200 });
}
