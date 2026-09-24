interface QuantitySelectorProps {
  qty: number;
  setQty: (value: number) => void;
  maxStock?: number;
}

export default function QuantitySelector({
  qty,
  setQty,
  maxStock,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    setQty(Math.max(1, qty - 1));
  };

  const handleIncrement = () => {
    if (maxStock && qty >= maxStock) return;
    setQty(qty + 1);
  };

  return (
    <div className="flex items-center border border-gray-200 rounded-lg h-12 text-black w-fit">
      <button
        className="px-4 text-gray-500 hover:text-black transition disabled:opacity-50"
        onClick={handleDecrement}
        disabled={qty <= 1}
      >
        -
      </button>
      <span className="w-12 text-center font-medium">{qty}</span>
      <button
        className="px-4 text-gray-500 hover:text-black transition disabled:opacity-50"
        onClick={handleIncrement}
        disabled={maxStock !== undefined && qty >= maxStock}
      >
        +
      </button>
    </div>
  );
}
