"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";
export default function NavLink({ to, children }) {
  const pathName = usePathname();
  return (
    <Link
      href={to}
      className={`${pathName.startsWith(to) ? classes.active : ""} ${
        classes.link
      }`}
    >
      {children}
    </Link>
  );
}
