"use client";

import Link from "next/link";
import {
  LogOut,
  Search,
  ShoppingCart,
  StoreIcon,
  UserIcon,
  X,
} from "lucide-react";
import SearchBar from "@/components/search/SearchBar";
import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Cookies from "js-cookie";
import { useCartStore } from "@/store/useCartStore";
import BaseModal from "../modal/BaseModal";
import { useRouter } from "next/navigation";
import ModalFooterActions from "../modal/ModalFooterActions";
import NavbarCartIcon from "../cart/NavbarCartIcon";

export default function Navbar({ initialUser }: { initialUser: any }) {
  const router = useRouter();

  const { totalItems, fetchCart, clearCart } = useCartStore();

  const { user, isAuthenticated, login, logout } = useAuthStore();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      clearCart();
    }
  }, [isAuthenticated, fetchCart, clearCart]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (initialUser && !isAuthenticated) {
      login(initialUser);
    }
  }, [initialUser, isAuthenticated, login]);

  const activeUser = user || initialUser;
  const isLogin = isAuthenticated || !!initialUser;

  const userInitials = activeUser?.fullName
    ? activeUser.fullName.substring(0, 2).toUpperCase()
    : "US";

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user_session");

    logout();

    setIsDropdownOpen(false);
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const handleCartClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

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
              >
                <Search className="w-6 h-6" />
              </button>

              <NavbarCartIcon />

              <BaseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Masuk ke Akun"
                description="Silakan masuk ke akun Anda terlebih dahulu untuk melihat isi keranjang belanja."
                footer={
                  <ModalFooterActions
                    cancelText="Nanti Saja"
                    confirmText="Login Sekarang"
                    onCancel={() => setIsModalOpen(false)}
                    onConfirm={() => {
                      setIsModalOpen(false);
                      router.push("/auth/login?returnUrl=/cart");
                    }}
                  />
                }
              >
                <p className="text-gray-600 text-sm">
                  Silakan masuk ke akun Anda terlebih dahulu untuk melihat isi
                  keranjang belanja.
                </p>
              </BaseModal>

              {isLogin ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-300 transition-colors hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <span className="text-sm font-bold text-blue-700 tracking-wider">
                      {userInitials}
                    </span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {activeUser?.fullName}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {activeUser?.email}
                        </p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/profile"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <UserIcon className="w-4 h-4 text-gray-400" />
                          Profil Saya
                        </Link>
                      </div>

                      <div className="border-t border-gray-100 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Keluar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
                >
                  Masuk
                </Link>
              )}
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
