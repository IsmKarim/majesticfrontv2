"use client";
import { usePathname } from "next/navigation";
import { NavItem } from "@/config/navigation";
import { NavComponent } from "../navbar";

export default function ActiveNavItem({ navItem }: { navItem: NavItem }) {
  const pathname = usePathname();
  return <NavComponent navItem={navItem} pathname={pathname} />;
}