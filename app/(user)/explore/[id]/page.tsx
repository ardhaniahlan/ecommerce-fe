"use client";

import { DetailProductLoad } from "@/components/loading/DetailProductLoad";
import CountdownTimer from "@/components/product/CountdownTimer";
import PriceBlock from "@/components/product/PriceBlock";
import QuantitySelector from "@/components/product/QuantitySelector";
import { getProductById } from "@/services/product.service";
import { Product, ProductImage } from "@/types/product.types";
import {
  ArrowLeft,
  RefreshCw,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProductDetailPage() {
  const router = useRouter();

  const params = useParams();
  const id = params.id as string;

  const { isAuthenticated } = useAuthStore();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeImage, setActiveImage] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  const [isExpandedDesc, setIsExpandedDesc] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      const hasMoreText = element.scrollHeight > element.clientHeight;
      setIsClamped(hasMoreText);
    }
  }, [product?.description]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(id);

        if (!productData) {
          setProduct(null);
          return;
        }

        setProduct(productData);

        let mainImg = "";
        let thumbnailList: string[] = [];

        if (
          productData.image_url &&
          Array.isArray(productData.image_url) &&
          productData.image_url.length > 0
        ) {
          thumbnailList = productData.image_url.map(
            (img: ProductImage) => img.image_url,
          );

          const primaryObj = productData.image_url.find(
            (img: ProductImage) => img.is_primary,
          );

          if (primaryObj) {
            mainImg = primaryObj.image_url;
          } else {
            mainImg = thumbnailList[0];
          }
        }

        if (!mainImg && productData.primary_image) {
          mainImg = productData.primary_image;
          if (thumbnailList.length === 0) {
            thumbnailList = [productData.primary_image];
          }
        }

        setActiveImage(mainImg);
        setImages(thumbnailList);
      } catch (error) {
        console.error("Gagal mengambil detail produk:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    try {
      alert("Berhasil ditambahkan ke keranjang!");
    } catch (error) {
      console.error("Gagal menambah ke keranjang", error);
    }
  };

  if (loading) {
    return <DetailProductLoad />;
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">
          Produk Tidak Ditemukan
        </h2>
        <p className="text-gray-500 mt-2">
          Maaf, barang yang Anda cari mungkin sudah dihapus.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-700 flex items-center gap-2 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        <div className="text-sm text-gray-500">
          Catalog &gt; Tech Gadgets &gt;{" "}
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          <div className="relative w-full aspect-4/3 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
            {activeImage ? (
              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-gray-400 bg-gray-100">
                Gambar tidak tersedia
              </div>
            )}
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {images.map((imgString, idx) => {
              if (!imgString) return null;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgString)}
                  className={`relative w-24 aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === imgString
                      ? "border-blue-600"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={imgString}
                    alt={`Thumb ${idx}`}
                    fill
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
              In Stock ({product.stock} units available)
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
            {product.name}
          </h1>

          <div className="text-gray-600 text-base leading-relaxed">
            <p ref={textRef} className={isExpandedDesc ? "" : "line-clamp-4"}>
              {product.description}
            </p>

            {isClamped && (
              <button
                onClick={() => setIsExpandedDesc(!isExpandedDesc)}
                className="text-blue-600 hover:text-blue-800 font-semibold text-sm mt-2 transition-colors block"
              >
                {isExpandedDesc ? "Lebih Sedikit" : "Selengkapnya"}
              </button>
            )}
          </div>

          <PriceBlock product={product} />

          {product.discount_percentage > 0 && product.discount_end && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 mt-6 flex justify-between items-center">
              <span className="text-red-700 font-semibold flex items-center gap-2">
                ⚡ Flash Sale Ends In:
              </span>

              <CountdownTimer targetDate={product.discount_end} />
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <QuantitySelector />
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
            <div className="flex flex-col gap-1 items-center md:items-start md:flex-row text-xs text-gray-500">
              <Truck className="w-4 h-4 text-blue-600" /> Dispatches in 24h
            </div>
            <div className="flex flex-col gap-1 items-center md:items-start md:flex-row text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> 3-Year Warranty
            </div>
            <div className="flex flex-col gap-1 items-center md:items-start md:flex-row text-xs text-gray-500">
              <RefreshCw className="w-4 h-4 text-blue-600" /> 30-Day Returns
            </div>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Login Diperlukan
            </h3>
            <p className="text-gray-600 mb-6">
              Silakan login terlebih dahulu untuk menyimpan produk ini ke
              keranjang belanja Anda.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition"
              >
                Nanti Saja
              </button>
              <button
                onClick={() =>
                  router.push(`/auth/login?returnUrl=/explore/${product.id}`)
                }
                className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-lg transition"
              >
                Lanjut Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
