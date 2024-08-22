"use client";

import { Menu, ShoppingBag } from "lucide-react";
import { storeNavLinks } from "@/lib/constants";
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
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Cart } from "@/lib/types";
import { cn } from "@/lib/utils";

interface iAppProps {
  user: KindeUser | null;
  cart: Cart | null;
}

const Navbar = ({ user, cart }: iAppProps) => {
  const pathname = usePathname();

  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-[#E9F5FE] shadow-xl">
      <div className="flex items-center">
        <Link href="/" className="flex text-[18px] font-medium">
          <p className="text-[18px] font-medium">
            Digital <span className="text-primary">Hippo</span>
          </p>
        </Link>
        <div className="flex gap-x-2 ml-8 max-md:hidden">
          {storeNavLinks.map((item) => (
            <Link
              href={item.url}
              key={item.label}
              className={cn(
                pathname === item.url
                  ? "text-primary"
                  : "text-muted-foreground",
                "transition-all hover:text-primary/70"
              )}
            >
              <p>{item.label}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="hidden md:flex items-center">
        {user ? (
          <>
            <Link href="/cart" className="group p-2 flex items-center mr-2">
              <ShoppingBag className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                {total}
              </span>
            </Link>
            <UserDropdown
              id={user.id}
              email={user.email as string}
              name={user.given_name as string}
              userImage={
                user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
              }
            />
          </>
        ) : (
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
            <Button variant="ghost" asChild>
              <LoginLink>Login</LoginLink>
            </Button>
            <span className="h-6 w-px bg-gray-200" />
            <Button variant="ghost" asChild>
              <RegisterLink>Create Account</RegisterLink>
            </Button>
          </div>
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
          <nav className="h-screen left-0 top-0 sticky flex flex-col gap-8">
            <Link href="/" className="flex text-[18px] font-medium">
              <div className="flex items-center gap-x-2 justify-center">
                <Icons.logo className="h-10 w-10" />
                <p className="text-[18px] font-medium">
                  Digital <span className="text-primary">Hippo</span>
                </p>
              </div>
            </Link>
            <div className="flex flex-col gap-8">
              {storeNavLinks.map((item) => (
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
              {user ? (
                <div className="flex gap-8">
                  <UserDropdown
                    id={user.id}
                    email={user.email as string}
                    name={user.given_name as string}
                    userImage={
                      user.picture ??
                      `https://avatar.vercel.sh/${user.given_name}`
                    }
                  />
                  <Link href="/cart" className="group flex items-center">
                    <ShoppingBag className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {total}
                    </span>
                  </Link>
                </div>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <LoginLink>Login</LoginLink>
                  </Button>
                  <Button variant="ghost" asChild>
                    <RegisterLink>Create Account</RegisterLink>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
