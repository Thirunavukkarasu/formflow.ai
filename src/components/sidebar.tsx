"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { menuOptions } from "@/lib/constant";
import clsx from "clsx";
import { ModeToggle } from "@/components/global/mode-toggle";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

type Props = {};

const MenuOptions = (props: Props) => {
  const pathName = usePathname();

  return (
    <nav className=" dark:bg-black bg-black/80 border-neutral-900 h-screen overflow-scroll justify-between flex items-center flex-col gap-10 py-6 px-2 w-24">
      <div className="flex items-center justify-center flex-col gap-8">
        <Link className="flex font-bold flex-row " href="/">
          <Image
            src="/logo.png"
            width={15}
            height={15}
            alt="FormFlow logo"
            className="shadow-sm"
          />
        </Link>
        <TooltipProvider>
          {menuOptions.map((menuItem: any) => (
            <ul key={menuItem.name}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <li>
                    <Link
                      href={menuItem.href}
                      className={clsx(
                        "group h-46w-6 flex items-center justify-center  scale-[1.5] rounded-lg p-[3px]  cursor-pointer",
                        {
                          "dark:bg-[#2F006B] bg-[#EEE0FF] ":
                            pathName === menuItem.href,
                        }
                      )}
                    >
                      <menuItem.Component
                        selected={pathName === menuItem.href}
                      />
                    </Link>
                  </li>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-black/10 backdrop-blur-xl"
                >
                  <p>{menuItem.name}</p>
                </TooltipContent>
              </Tooltip>
            </ul>
          ))}
        </TooltipProvider>
      </div>
      <div className="flex items-center justify-center flex-col gap-8">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default MenuOptions;
