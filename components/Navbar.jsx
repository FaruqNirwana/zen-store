"use client";
import React from "react";
import { assets, BagIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

import {
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

// Import Icons
import { ShoppingCart, Home, BoxIcon } from "lucide-react";
const CartIcon = ShoppingCart;
const HomeIcon = Home;

const Navbar = () => {
  const { isSeller, router } = useAppContext();
  const { user, isSignedIn } = useUser();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-200 bg-white text-black backdrop-blur-lg">
      {/* LOGO */}
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />

      {/* MENU DESKTOP */}
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* RIGHT SIDE */}
      <ul className="hidden md:flex items-center gap-4">
        <Image
          className="w-4 h-4 cursor-pointer"
          src={assets.search_icon}
          alt="search icon"
        />

        {isSignedIn ? (
          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>
              <UserButton.Action
                label="Home"
                labelIcon={<HomeIcon size={18} />}
                onClick={() => router.push("/")}
              />
              <UserButton.Action
                label="Products"
                labelIcon={<BoxIcon size={18} />}
                onClick={() => router.push("/all-products")}
              />
              <UserButton.Action
                label="Cart"
                labelIcon={<CartIcon size={18} />}
                onClick={() => router.push("/cart")}
              />
              <UserButton.Action
                label="My Orders"
                labelIcon={<BagIcon size={18} />}
                onClick={() => router.push("/my-orders")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <SignInButton mode="modal">
            <button className="flex items-center gap-2 hover:text-gray-900 transition">
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
          </SignInButton>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}

        {isSignedIn ? (
          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>
            <UserButton.Action
                label="Home"
                labelIcon={<HomeIcon size={18} />}
                onClick={() => router.push("/")}
              />
            <UserButton.Action
                label="Products"
                labelIcon={<BoxIcon size={18} />}
                onClick={() => router.push("/all-products")}
              />
              <UserButton.Action
                label="Cart"
                labelIcon={<CartIcon size={18} />}
                onClick={() => router.push("/cart")}
              />
              <UserButton.Action
                label="My Orders"
                labelIcon={<BagIcon size={18} />}
                onClick={() => router.push("/my-orders")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <SignInButton mode="modal">
            <button className="flex items-center gap-2 hover:text-gray-900 transition">
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
