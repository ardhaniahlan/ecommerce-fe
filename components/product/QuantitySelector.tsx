import { useState } from "react";

export default function QuantitySelector() {
    const [qty, setQty] = useState(1);
  return (
    <div className="flex items-center border border-gray-200 rounded-lg h-12 text-black">
      <button 
        className="px-4 text-gray-500 hover:text-black transition"
        onClick={() => setQty(Math.max(1, qty - 1))}
      >-</button>
      <span className="w-12 text-center font-medium">{qty}</span>
      <button 
        className="px-4 text-gray-500 hover:text-black transition"
        onClick={() => setQty(qty + 1)}
      >+</button>
    </div>
  );
}