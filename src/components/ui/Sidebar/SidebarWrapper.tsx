"use client";
import React, { useState } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/components/ui/Sidebar/Sidebar";
import { IconBrandTabler, IconTextScan2 } from "@tabler/icons-react";

export default function SidebarDemo() {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Content Generator",
      href: "/",
      icon: (
        <IconTextScan2 className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Premium Version",
      href: "https://apsan.com.np/contact",
      icon: (
        <IconBrandTabler className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "More Coming Soon...",
      href: "#",
      icon: (
        <IconBrandTabler className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <div className="py-1 text-sm font-normal">
            {open ? "LEXYO" : "LX"}
          </div>
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
