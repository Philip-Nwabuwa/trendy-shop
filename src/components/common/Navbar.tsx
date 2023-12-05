"use client";

import { Clock, Grape, Heart, Menu, Package, ShoppingCart, User, Users, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";
const Navbar = () => {
  const pathName = usePathname();
  const RenderNull = pathName === "/login" || pathName === "/register";
  const HomePage = pathName === "/";

  const navigationItems = [
    {
      name: "How it works",
      url: "/how-it-works",
    },
    {
      name: "About us",
      url: "/about-us",
    },
        {
      name: "FAQs",
      url: "/faqs",
    },
    {
      name: "Our produce",
      url: "/our-produce",
    },
    {
      name: "Trendy store perks",
      url: "/store-perks",
    },
    {
      name: "Eco-friendly packaging",
      url: "/eco-friendly-packaging",
    },
    {
      name: "Join our waitlist",
      url: "/waitlist",
    },
    {
      name: "Referral program",
      url: "/referral-program",
    },
  ];
  
  return (
    <div>
      {RenderNull ? null : (
        <MaxWidthWrapper className="fixed z-10 top-0 right-0">
          {HomePage ? (
            <div className="w-full h-16 flex item-center justify-center">
              <p className="flex items-center justify-center text-center">
                Congrats! You&apos;ve earned free shipping on each of your first two
                orders of $35 or more Learn more.
              </p>
            </div>
          ) : null}
          <div className="h-[80px] flex items-center justify-between">
            <Link
              className="relative z-20 flex items-center text-xl font-bold"
              href="/"
            >
              <Grape className="mr-2 h-6 w-6" />
              Trendy Store
            </Link>
            <div className="flex flex-row items-center gap-4 lg:gap-6">
              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="font-bold">
                      About Us
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[150px] max-w-full grid gap-y-2 p-4">
                      <ul>
                      {navigationItems.map((item, index) => (
                        <li key={index}>
                          <NavigationMenuLink
                            href={item.url}
                            className="flex flex-row gap-4 items-center hover:underline"
                          >
                            {item.name}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Link
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "flex items-center gap-2 font-bold"
                )}
                href="/login"
              >
                <User /> <span>Sign in</span>
              </Link>

              <Link
                href="/register"
                className={cn(
                  buttonVariants({
                    variant: "default",
                  }),
                  "w-[160px] h-[44px] hidden lg:flex"
                )}
              >
                Get Started
              </Link>
              <MobileNav />
            </div>
          </div>
        </MaxWidthWrapper>
      )}
    </div>
  );
};

export default Navbar;
