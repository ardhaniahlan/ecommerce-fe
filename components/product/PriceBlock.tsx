import { Product } from "@/types/product.types";
import { formatRupiah } from "@/utils/format";
import { ShieldCheck } from "lucide-react";

export default function PriceBlock({ product }: { product: Product }) {
  const hasDiscount = product.discount_percentage > 0;
  const finalPrice = product.price;
  const originalPrice = hasDiscount
    ? product.price / (1 - (product.discount_percentage / 100))
    : product.price;

  return (
    <div className="bg-[#f8faff] p-6 rounded-2xl border border-blue-50 mt-6">
      <div className="flex flex-col sm:flex-row items-baseline gap-3">
        <span className="text-4xl font-bold text-slate-900">
          {formatRupiah(finalPrice)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-lg text-gray-400 line-through font-medium">
              ${formatRupiah(originalPrice)}
            </span>
            <span className="bg-[#dc2626] text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {product.discount_percentage}% OFF
            </span>
          </>
        )}
      </div>
      <p className="text-sm text-gray-500 mt-2 flex items-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-green-600" />
        Harga terbaik dalam 90 hari. Pajak sudah termasuk & ongkos kirim gratis.
      </p>
    </div>
  );
 }