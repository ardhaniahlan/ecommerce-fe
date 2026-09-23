"use client";

import Link from "next/link";
import { Search, ShoppingCart, StoreIcon, X } from "lucide-react";
import SearchBar from "@/components/search/SearchBar";
import { useState } from "react";

export default function Navbar() {
  const userName = "Budi Santoso";
  const userInitials = userName.substring(0, 2).toUpperCase();

  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 py-2">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4 md:gap-8 relative">
        {!isMobileSearchOpen && (
          <>
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <StoreIcon className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-[22px] tracking-tight text-[#0f172a]">
                Tech-Commerce
              </span>
            </Link>

            <div className="hidden md:flex flex-1 max-w-3xl">
              <SearchBar />
            </div>

            <div className="flex items-center gap-4 md:gap-6 shrink-0">
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="block md:hidden text-gray-700 hover:text-blue-600 transition-colors p-1"
                aria-label="Open Search"
              >
                <Search className="w-6 h-6" />
              </button>

              <button className="relative text-gray-700 hover:text-blue-600 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1.5 -right-2 bg-[#dc2626] text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  3
                </span>
              </button>

              <button className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-300 transition-colors hover:bg-slate-300">
                <span className="text-sm font-bold text-slate-700 tracking-wider">
                  {userInitials}
                </span>
              </button>
            </div>
          </>
        )}

        {isMobileSearchOpen && (
          <div className="absolute inset-x-0 top-0 h-16 bg-white px-4 flex items-center gap-3 md:hidden animate-in fade-in duration-150">
            <div className="flex-1">
              <SearchBar />
            </div>

            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="text-gray-500 hover:text-gray-700 p-2 shrink-0 bg-gray-50 rounded-xl border border-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
