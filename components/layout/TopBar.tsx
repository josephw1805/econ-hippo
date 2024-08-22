"use client";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { dashboardNavLinks } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Icons } from "@/lib/Icons";
import { UserDropdown } from "../custom/UserDropdown";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

const TopBar = ({ user }: { user: KindeUser | null }) => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-[#E9F5FE] shadow-xl lg:hidden">
      <Link href="/" className="flex text-[18px] font-medium">
        <p className="text-[18px] font-medium">
          Digital <span className="text-primary">Hippo</span>
        </p>
      </Link>
      <div className="flex gap-8 max-md:hidden">
        {dashboardNavLinks.map((item) => (
          <Link
            href={item.url}
            key={item.label}
            className={cn(
              pathname === item.url ? "text-primary" : "text-muted-foreground",
              "transition-all hover:text-primary/70"
            )}
          >
            <p>{item.label}</p>
          </Link>
        ))}
        {user && (
          <UserDropdown
            email={user.email as string}
            name={user.given_name as string}
            userImage={
              user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
            }
          />
        )}
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="link" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <nav className="h-screen left-0 top-0 sticky flex flex-col gap-16">
            <Link href="/" className="flex text-[18px] font-medium">
              <div className="flex items-center gap-4 justify-center">
                <Icons.logo className="h-10 w-10" />
                <p className="text-[18px] font-medium">
                  Digital <span className="text-primary">Hippo</span>
                </p>
              </div>
            </Link>
            <div className="flex flex-col gap-12">
              {dashboardNavLinks.map((item) => (
                <Link
                  href={item.url}
                  key={item.label}
                  className={cn(
                    pathname === item.url
                      ? "bg-muted text-primary"
                      : "text-muted-foreground bg-none",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary/70"
                  )}
                >
                  {item.icon} <p>{item.label}</p>
                </Link>
              ))}

              {user && (
                <UserDropdown
                  email={user.email as string}
                  name={user.given_name as string}
                  userImage={
                    user.picture ??
                    `https://avatar.vercel.sh/${user.given_name}`
                  }
                />
              )}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default TopBar;
