"use client"
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { button as buttonStyles } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";

import ColorModeSwitchButton from "@/Components/color-mode-switch-button";
import { siteConfig } from "siteConfig";
import UserDropdown from "@/Components/user-dropdown";
import { Button } from "@nextui-org/react";
import { useSession, signIn } from "next-auth/react";

export default function Navbar() {
  const { data, status } = useSession();
  const navLinks = [
    {
      title: "Home",
      href: "/",
      description: "The homepage",
    },
    {
      title: "About",
      href: "/about",
      description: "About the project",
    },
    {
      title: "Contact",
      href: "/contact",
      description: "Contact us",
    },
    {
      Dashboard: "Dashboard",
      href: "/dashboard",
      description: "Dashboard",
    },
  ];
  return (
    <NextUINavbar maxWidth="full" position="sticky" aria-selected isBordered>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="max-w-fit gap-3 md:mr-7 lg:mr-10">
          <NextLink className="flex items-center justify-start" href="/">
            {siteConfig.logo}
            <p className="text-lg font-bold uppercase text-inherit">
              {siteConfig.name}
            </p>
          </NextLink>
        </NavbarBrand>

        {navLinks.map((navbarLink, index) => (
          <NavbarItem key={index}>
            <Link
              color="foreground"
              key={navbarLink.title}
              href={navbarLink.href}
              title={navbarLink.description}
            >
              {navbarLink.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem>
          <ColorModeSwitchButton />
        </NavbarItem>
        <NavbarItem>
          {status === "authenticated" ? (
            <UserDropdown />
          ) : (
            <Button
              onClick={() => signIn("google")}
              className={buttonStyles({ variant: "faded" })}
            >
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
}
