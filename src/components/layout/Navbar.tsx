"use client";

import {useState} from "react";

import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname()

  const menuItems = [
    {
      id:0,
      name:"Home",
      path:"/"
    },
    {
      id:1,
      name:"Equation Solver",
      path:"/equation-solver"
    },
  ]

  return (
    <NextNavbar  isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} 
    className=" w-screen bg-[#265A5C] text-white">
      <NavbarContent  className="text-white sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          DSA
          <p className="font-bold text-inherit">VISUALIZED</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="text-white  w-full hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          DSA
          <p className="font-bold text-inherit">VISUALIZED</p>
        </NavbarBrand>

        {menuItems.map((item, index) => (
          <NavbarItem key={`${item.id}-${item.name}`} isActive={pathname==item.path} >
            <Link
              
              className={`w-full  ${pathname==item.path ? 'text-yellow-300 border-b-2' : "text-white"} `}
              
              href={item.path}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}

       
      </NavbarContent>



      <NavbarMenu className="bg-[#265A5C] text-white ">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.id}-${item.name}`}>
            <Link
              className={`w-full  ${pathname==item.path ? 'text-yellow-300 border-b-2' : "text-white"} `}
              
              href={item.path}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextNavbar>
  );
}
