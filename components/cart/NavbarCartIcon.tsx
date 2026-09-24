import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function NavbarCartIcon() {
  const { totalItems, cartBumpToggle } = useCartStore();
  const [isBumping, setIsBumping] = useState(false);

  useEffect(() => {
    if (cartBumpToggle === 0) return;

    setIsBumping(true);

    const timer = setTimeout(() => {
      setIsBumping(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [cartBumpToggle]);

  return (
    <Link href="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors">
      <ShoppingCart className="w-6 h-6" />
      
      {totalItems > 0 && (
        <span 
          className={`
            absolute -top-1.5 -right-2 bg-[#dc2626] text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white
            transition-transform duration-300 ease-out
            ${isBumping ? 'scale-150' : 'scale-100'} 
          `}
        >
          {totalItems}
        </span>
      )}
    </Link>
  );
}