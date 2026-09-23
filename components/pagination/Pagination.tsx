// components/ui/Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Hitung jumlah item yang sedang ditampilkan untuk progress bar
  const currentShowing = Math.min(currentPage * itemsPerPage, totalItems);
  const progressPercentage = totalItems > 0 ? (currentShowing / totalItems) * 100 : 0;

  // Generate array untuk nomor halaman (contoh sederhana)
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) return null; // Sembunyikan jika hanya 1 halaman

  return (
    <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-4 shadow-sm w-full mt-8">
      {/* Kiri: Info Produk & Progress Bar */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-500 text-sm">
          Showing <span className="font-semibold text-black">{currentShowing}</span> of <span className="font-semibold text-black">{totalItems}</span> products
        </span>
        <div className="w-24 h-1.5 bg-blue-100 rounded-full overflow-hidden flex">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Kanan: Navigasi Halaman */}
      <div className="flex items-center space-x-1 text-sm font-medium">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center text-gray-400 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 transition-colors"
        >
          <span className="mr-1">‹</span> Prev
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
              currentPage === page
                ? "bg-blue-700 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center text-gray-400 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 transition-colors"
        >
          Next <span className="ml-1">›</span>
        </button>
      </div>
    </div>
  );
}