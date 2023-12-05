"use client";

import { cn } from "@/lib/utils";
import {
  Grape,
  User,
  HelpCircle,
  X,
  Menu,
  ShoppingCart,
  Heart,
  Package,
  Clock,
  Users,
  Newspaper,
  Mail,
  Briefcase,
  Book,
  HelpingHand,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigationItems = [
    {
      name: "How it works",
      url: "/how-it-works",
      icon: <Clock size={20} />,
    },
    {
      name: "About us",
      url: "/about-us",
      icon: <Users size={20} />,
    },
    {
      name: "Our produce",
      url: "/our-produce",
      icon: <ShoppingCart size={20} />,
    },
    {
      name: "Trendy store perks",
      url: "/store-perks",
      icon: <Heart size={20} />,
    },
    {
      name: "Eco-friendly packaging",
      url: "/eco-friendly-packaging",
      icon: <Package size={20} />,
    },
    {
      name: "Join our waitlist",
      url: "/waitlist",
      icon: <User size={20} />,
    },
    {
      name: "Referral program",
      url: "/referral-program",
      icon: <Grape size={20} />,
    },
  ];

  const moreNavigationItems = [
    {
      name: "Blog",
      url: "/blog",
      icon: <Newspaper size={20} />,
    },
    {
      name: "FAQs",
      url: "/faqs",
      icon: <HelpCircle size={20} />,
    },
    {
      name: "Help Center",
      url: "/help-center",
      icon: <HelpingHand size={20} />,
    },
    {
      name: "Contact Us",
      url: "/contact-us",
      icon: <Mail size={20} />,
    },
    {
      name: "Careers",
      url: "/careers",
      icon: <Briefcase size={20} />,
    },
    {
      name: "Reviews & Press",
      url: "/reviews-press",
      icon: <Book size={20} />,
    },
  ];

  const pathname = usePathname();

  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };

  // remove second scrollbar when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  if (!isOpen)
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden relative items-center justify-center p-2"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
    );

  return (
    <div>
      <div className="relative z-40 lg:hidden">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </div>

      <div className="fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex">
        <div className="w-full">
          <div className="relative flex w-full flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div className="flex flex-row items-center justify-between px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative items-center justify-center p-2"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
              <Link
                className="relative z-20 flex items-center text-xl font-bold"
                href="/"
              >
                <Grape className="mr-2 h-6 w-6" />
                Trendy Store
              </Link>
              <Link
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "flex items-center gap-2 font-bold"
                )}
                href="/login"
              >
                <User />
              </Link>
            </div>

            <div className="flex flex-col mt-2 p-4 gap-2">
              <Button className="w-full">Get Started</Button>
              <Button
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                  }),
                  "w-full"
                )}
              >
                Sign In
              </Button>
            </div>

            <div className="px-4 py-6">
              <div className="flow-root">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <h3 className="flex text-lg font-bold">About</h3>
                    </AccordionTrigger>
                    <ul>
                      {navigationItems.map((item, index) => (
                        <AccordionContent key={index}>
                          <Link
                            onClick={() => closeOnCurrent(`${item.url}`)}
                            href={item.url}
                            className="flex flex-row gap-3 items-center hover:underline"
                          >
                            {item.icon}
                            {item.name}
                          </Link>
                        </AccordionContent>
                      ))}
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <div className="space-y-6 px-4 py-6">
              <div className="flow-root">
                <ul className="flex flex-col gap-2">
                  {moreNavigationItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        className="flex flex-row gap-3 items-center hover:underline"
                        href={item.url}
                        onClick={() => closeOnCurrent(`${item.url}`)}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
