"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Banner } from '@/types/product.types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroBannerProps {
  banners: Banner[];
}

export default function HeroBanner({ banners }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeBanners = banners?.filter((b) => b.isActive) || [];

  if (activeBanners.length === 0) return null;

  const currentBanner = activeBanners[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % activeBanners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? activeBanners.length - 1 : prevIndex - 1
    );
  };

  const hasMultipleBanners = activeBanners.length > 1;

  return (
    <div className="relative w-full rounded-2xl bg-blue-600 overflow-hidden shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-16 relative z-10">
        
        <div className="text-white max-w-xl flex flex-col items-start gap-4 z-10">
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
            Promo Spesial
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold leading-tight capitalize">
            {currentBanner.title}
          </h1>
          
          <p className="text-blue-100 text-sm md:text-base mb-2">
            Nikmati penawaran terbaik untuk setup workstation Anda. Penawaran terbatas.
          </p>

          <button className="bg-white text-gray-900 font-semibold px-6 py-2.5 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm">
            Lihat Promo <span>→</span>
          </button>
        </div>

        <div className="hidden md:block relative w-full max-w-md aspect-video mt-8 md:mt-0 right-0">
          <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm -rotate-3 border border-white/20"></div>
          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-white border border-white/30">
            <Image
              src={currentBanner.imageUrl} 
              alt={currentBanner.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {hasMultipleBanners && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white z-20 hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white z-20 hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}
