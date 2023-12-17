"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'

const NavigationCrypto = () => {
    const pathname = usePathname()

  const isActive = (path: string) => {
    return path === pathname;
  };

  const navLinkClasses = (path: string) => {
    return `w-full text-base text-center font-nunito m-2.5 ${
      isActive(path)
        ? "bg-cyan text-gray-300"
        : "bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray"
    } border-0 cursor-pointer rounded capitalize font-semibold`;
  };

  return (
    <nav className="w-[40%] mt-16 flex justify-around align-middle border border-cyan rounded-lg">
      <Link href="/crypto" passHref className={navLinkClasses('/crypto')}>
        Crypto
      </Link>

      <Link href="/trendingcryptos" passHref className={navLinkClasses('/trendingcryptos')}>
        Trending
      </Link>

      {/* <Link href="/saved" passHref className={navLinkClasses('/saved')}>
        Saved
      </Link> */}
    </nav>
  );
};

export default NavigationCrypto;
