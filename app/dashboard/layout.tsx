import LeftSidebar from "@/components/layout/LeftSidebar";
import TopBar from "@/components/layout/TopBar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import "../globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "../api/uploadthing/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { unstable_noStore as noStore } from "next/cache";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Hippo Shop",
  description: "Digital Hippo Shop e-commerce project",
};

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.id !== process.env.NEXT_PUBLIC_ADMIN_USER) {
    return redirect("/");
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex max-lg:flex-col text-[#616161]">
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <header>
            <LeftSidebar user={user} />
            <TopBar user={user} />
          </header>
          <main className="flex-1 my-5 mx-2.5">{children}</main>
        </div>
      </body>
    </html>
  );
}
