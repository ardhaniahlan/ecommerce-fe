"use client";

import Image from "next/image";
import { Product } from "@/types/product.types";
import { formatRupiah } from "@/utils/format";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = Number(product.discount_percentage) > 0;

  const finalPrice = product.price;

  const originalPrice = hasDiscount
    ? product.price / (1 - Number(product.discount_percentage) / 100)
    : product.price;

  const stockStatus =
    product.stock === 0
      ? "Stok Habis"
      : product.stock < 5
        ? `Stok Menipis (Sisa ${product.stock})`
        : "Stok Tersedia";

  const stockColor =
    product.stock === 0
      ? "text-gray-500"
      : product.stock < 5
        ? "text-[#c52828]"
        : "text-green-600";

  return (
    <div className="flex flex-col p-4 border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow bg-white">
      <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden mb-4 hover:scale-105 transition-transform duration-200">
        <Image
          src={product.primary_image || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="text-[17px] font-semibold text-slate-900 line-clamp-2 leading-snug mb-4">
        {product.name}
      </h3>

      <div className="mt-auto flex flex-col gap-3">
        <div className="flex flex-col">
          {hasDiscount && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[15px] text-gray-400 line-through font-medium">
                {formatRupiah(originalPrice)}
              </span>
              <span className="text-[12px] font-bold text-white bg-[#dc3545] px-2.5 py-0.5 rounded-full tracking-wide">
                {product.discount_percentage}% OFF
              </span>
            </div>
          )}
          <p className="text-[22px] font-bold text-slate-900 leading-none">
            {formatRupiah(finalPrice)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${stockColor.replace("text-", "bg-")}`}
          />
          <span className={`text-[14px] font-medium ${stockColor}`}>
            {stockStatus}
          </span>
        </div>
      </div>
    </div>
  );
}
