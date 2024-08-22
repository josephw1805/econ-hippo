import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/storefront/Footer";
import { redis } from "@/lib/redis";
import { Cart } from "@/lib/types";
import { unstable_noStore as noStore } from "next/cache";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Hippo Shop",
  description: "Digital Hippo Shop e-commerce project",
};

export default async function StoreFrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const cart: Cart | null = await redis.get(`cart-${user?.id}`);

  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Navbar user={user} cart={cart} />
        </header>
        <main className="mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
