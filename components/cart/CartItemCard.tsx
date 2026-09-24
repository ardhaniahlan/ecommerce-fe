import Image from "next/image";
import { Trash2 } from "lucide-react";
import QuantitySelector from "../product/QuantitySelector";
import { CartItem } from "@/types/cart.types";
import { formatRupiah } from "@/utils/format";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import BaseModal from "../modal/BaseModal";
import ModalFooterActions from "../modal/ModalFooterActions";
import Link from "next/link";

interface CartItemCardProps {
  item: CartItem;
  onUpdateUI: (id: number, newQty: number) => void;
  onUpdateAPI: (id: number, newQty: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItemCard({
  item,
  onUpdateUI,
  onUpdateAPI,
  onRemove,
}: CartItemCardProps) {
  const [localQty, setLocalQty] = useState(item.quantity);
  const debouncedQty = useDebounce(localQty, 400);

  const [isRemoveModal, setIsRemoveModal] = useState(false);

  const handleQtyChange = (newQty: number) => {
    setLocalQty(newQty);
    onUpdateUI(item.id, newQty);
  };

  useEffect(() => {
    if (debouncedQty !== item.quantity) {
      onUpdateAPI(item.id, debouncedQty);
    }
  }, [debouncedQty, item.id, item.quantity, onUpdateAPI]);

  const localSubtotal = item.activePrice * localQty;

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6 p-5 bg-white border border-gray-100 rounded-2xl mb-4 shadow-sm">
      <Link
        href={`/explore/${item.productId}`}
        className="flex items-center gap-4 flex-1 min-w-0"
      >
        <div className="w-24 h-24 shrink-0 bg-gray-50 rounded-xl overflow-hidden relative border border-gray-100">
          <Image
            src={item.imageUrl || "/placeholder.png"}
            alt={item.productName}
            fill
            className="object-contain p-2"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-blue-600 tracking-wider mb-1 uppercase">
            Category Name
          </p>
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {item.productName}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            SKU: PRD-{item.productId}
          </p>
        </div>
      </Link>

      <div className="flex items-center gap-3 md:gap-8 w-full md:w-auto mt-4 md:mt-0 justify-between md:justify-end">
        <div className="text-right hidden md:flex flex-col w-32 items-end">
          {item.discountPercentage > 0 ? (
            <>
              <span className="text-sm font-bold text-red-500 bg-red-100 px-1.5 py-0.5 rounded mr-2">
                {item.discountPercentage}%
              </span>
              <del className="text-xs text-gray-400">
                {formatRupiah(item.originalPrice)}
              </del>
              <p className="text-base font-bold text-gray-900">
                {formatRupiah(item.activePrice)}
              </p>
            </>
          ) : (
            <p className="text-base font-bold text-gray-900">
              {formatRupiah(item.activePrice)}
            </p>
          )}
        </div>

        <div className="shrink-0">
          <QuantitySelector
            qty={localQty}
            setQty={handleQtyChange}
            maxStock={item.stock}
          />
        </div>

        <div className="text-right md:w-32 min-w-0">
          <p className="text-sm md:text-base font-bold text-gray-900 truncate">
            {formatRupiah(localSubtotal)}
          </p>
        </div>

        <button
          onClick={() => setIsRemoveModal(true)}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 hover:bg-red-50 rounded-lg shrink-0"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {isRemoveModal && (
        <BaseModal
          isOpen={isRemoveModal}
          onClose={() => setIsRemoveModal(false)}
          title="Hapus item dari keranjang"
          description="Apakah Anda yakin ingin menghapus item ini dari keranjang?"
          footer={
            <ModalFooterActions
              cancelText="Batal"
              confirmText="Hapus"
              onCancel={() => setIsRemoveModal(false)}
              onConfirm={() => {
                onRemove(item.id);
                setIsRemoveModal(false);
              }}
            />
          }
        />
      )}
    </div>
  );
}
