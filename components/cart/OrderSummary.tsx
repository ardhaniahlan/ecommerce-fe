import { applyVoucherAPI } from "@/services/voucher.service";
import { formatRupiah } from "@/utils/format";
import { Tag, ArrowRight } from "lucide-react";
import { useState } from "react";

interface OrderSummaryProps {
  subtotal: number;
  totalItems: number;
  onCheckout: (voucherCode?: string) => void;
}

export default function OrderSummary({
  subtotal,
  totalItems,
  onCheckout,
}: OrderSummaryProps) {
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  // Kalkulasi Diskon
  let discount = 0;
  if (appliedVoucher) {
    discount = (subtotal * appliedVoucher.discount_percentage) / 100;
    if (
      appliedVoucher.max_discount_amount > 0 &&
      discount > appliedVoucher.max_discount_amount
    ) {
      discount = appliedVoucher.max_discount_amount;
    }
  }

  const grandTotal = subtotal - discount;

  // Handler Apply Promo
  const handleApplyVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherCode.trim()) return;

    setIsLoading(true);
    setStatusMsg({ type: "", text: "" });

    try {
      const res = await applyVoucherAPI(voucherCode);
      setAppliedVoucher(res.data.data);
      setStatusMsg({
        type: "success",
        text: "Kode promo berhasil diterapkan!",
      });
    } catch (error: any) {
      setAppliedVoucher(null);
      setStatusMsg({
        type: "error",
        text: error.response?.data?.error || "Kode promo tidak valid.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handler Hapus Promo
  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherCode("");
    setStatusMsg({ type: "", text: "" });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {" "}
        Ringkasan Pesanan
      </h2>

      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700 block mb-2">
          Kode Promo
        </label>
        <form onSubmit={handleApplyVoucher} className="flex flex-col gap-2 text-black">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter code"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                disabled={isLoading || appliedVoucher !== null}
                className="w-full pl-9 pr-3 py-2.5  bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 uppercase disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>

            {appliedVoucher ? (
              <button
                type="button"
                onClick={handleRemoveVoucher}
                className="bg-red-50 hover:bg-red-100 text-red-600 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                Hapus
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading || !voucherCode}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:bg-gray-300"
              >
                {isLoading ? "Cek..." : "Terapkan"}
              </button>
            )}
          </div>

          {statusMsg.text && (
            <span
              className={`text-xs font-medium pl-1 ${statusMsg.type === "success" ? "text-green-600" : "text-red-500"}`}
            >
              {statusMsg.text}
            </span>
          )}
        </form>
      </div>

      <div className="space-y-3 text-sm text-gray-600 border-b border-gray-100 pb-4 mb-4">
        <div className="flex justify-between">
          <span>Subtotal ({totalItems} items)</span>
          <span className="font-semibold text-gray-900">
            {formatRupiah(subtotal)}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-red-500">
            <span>Discount</span>
            <span className="font-semibold">-{formatRupiah(discount)}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-end mb-6">
        <div>
          <p className="text-lg font-bold text-gray-900">Grand Total</p>
          <p className="text-xs text-gray-500 mt-1">
            Pajak akan dihitung saat checkout
          </p>
        </div>
        <span className="text-3xl font-bold text-blue-600">
          {formatRupiah(grandTotal)}
        </span>
      </div>

      <button className="w-full bg-[#0044cc] hover:bg-blue-800 text-white py-3.5 rounded-xl font-bold text-base flex justify-center items-center gap-2 transition-colors">
        Proses Checkout
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
