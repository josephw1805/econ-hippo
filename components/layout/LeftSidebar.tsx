"use client";

import { dashboardNavLinks } from "@/lib/constants";
import { Icons } from "@/lib/Icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserDropdown } from "../custom/UserDropdown";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

const LeftSidebar = ({ user }: { user: KindeUser | null }) => {
  const pathname = usePathname();
  return (
    <nav className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-[#E9F5FE] shadow-xl max-lg:hidden">
      <Link href="/" className="flex text-[18px] font-medium">
        <div className="flex items-center gap-4 justify-center">
          <Icons.logo className="h-10 w-10" />
          <p className="text-[18px] font-medium">
            Digital <span className="text-primary">Hippo</span>
          </p>
        </div>
      </Link>
      <div className="flex flex-col gap-12">
        <div className="flex flex-row gap-2 items-center">
          {user && (
            <>
              <UserDropdown
                email={user.email as string}
                name={user.given_name as string}
                userImage={
                  user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
                }
              />
              <span>
                {user.given_name} {user.family_name}
              </span>
            </>
          )}
        </div>
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
      </div>
    </nav>
  );
};

export default LeftSidebar;
