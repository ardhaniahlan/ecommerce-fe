"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";
import { Product } from "@/types/product.types";
import { searchProduct } from "@/services/product.service";
import useDebounce from "@/hooks/useDebounce";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const fetchSearchResults = async () => {
      setIsSearching(true);
      try {
        const res = await searchProduct(debouncedSearchTerm);
        setSearchResults(res);
        setIsDropdownOpen(true);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={searchRef}
      className="flex-1 w-full flex flex-col relative"
    >
      <div className="relative w-full flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-gray-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (searchResults.length > 0) setIsDropdownOpen(true);
          }}
          placeholder="Search tech gadgets, monitors, audio..."
          className="w-full bg-[#f1f5f9] border border-[#e2e8f0] rounded-xl py-2.5 pl-12 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-700"
        />
        {isSearching && (
          <Loader2 className="absolute right-4 w-4 h-4 text-gray-400 animate-spin" />
        )}
      </div>

      {isDropdownOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden flex flex-col max-h-100">
          {searchResults.length > 0 ? (
            <div className="overflow-y-auto">
              {searchResults.map((product) => (
                <Link
                  href={`/explore/${product.id}`}
                  key={product.id}
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 p-3 hover:bg-slate-50 border-b border-gray-100 last:border-0 transition-colors"
                >
                  <div className="w-10 h-10 rounded bg-gray-100 shrink-0 overflow-hidden flex items-center justify-center">
                    {product.primary_image ? (
                      <img
                        src={product.primary_image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No Img</span>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      Rp {product.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-sm text-center text-gray-500">
              Tidak ada produk yang cocok dengan "{debouncedSearchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
