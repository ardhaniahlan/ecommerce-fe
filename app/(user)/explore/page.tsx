// app/(user)/explore/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import HeroBanner from "@/components/product/HeroBanner";
import ProductCard from "@/components/product/ProductCard";
import { getBanner, getProduct, searchProduct } from "@/services/product.service";
import { Banner, Product } from "@/types/product.types";
import Pagination from "@/components/pagination/Pagination";
import useDebounce from "@/hooks/useDebounce";
import Link from "next/link";
import { ProductCardLoad } from "@/components/loading/ProductCardLoad";
import { HeroBannerLoad } from "@/components/loading/HeroBannerLoad";

export default function ExplorePage() {

  const [banners, setBanners] = useState<Banner[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannerData, productData] = await Promise.all([
          getBanner(),
          getProduct(),
        ]);
        setBanners(bannerData ?? []);
        setProducts(productData ?? []);
      } catch (error) {
        console.error("Error fetching explore page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalItems = products.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div>
      {loading ? (
        <HeroBannerLoad />
      ) : (
        banners.length > 0 && <HeroBanner banners={banners} />
      )}

      <div className="flex justify-between items-end text-2xl font-bold text-black mt-6 py-4">
        <span>Koleksi Perangkat Keras Flagship</span>
        <p className="text-sm font-normal text-neutral-500">
          Menampilkan {currentProducts.length} dari {totalItems} produk
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ProductCardLoad key={index} />
          ))
        ) : currentProducts.length > 0 ? (
          currentProducts.map((product: Product) => (
            <Link href={`/explore/${product.id}`} key={product.id}>
              <ProductCard product={product} />
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center py-10">Produk tidak ditemukan.</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => {
          setCurrentPage(page);
          listRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
      />
    </div>
  );
}
