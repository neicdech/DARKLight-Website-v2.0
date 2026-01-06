import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CAROUSEL_IMAGES = [
  {
    url: "https://69415646eaa0bc88a50c8649.imgix.net/DarkLight_Front_Black_Background.jpg?auto=format&fit=crop&q=80&w=1200",
    title: "Multi Layer PCB",
    desc: "Precision engineering on our signature purple substrate."
  },
  {
    url: "https://69415646eaa0bc88a50c8649.imgix.net/DarkLight_Back.jpg?auto=format&fit=crop&q=80&w=1200",
    title: "Core Processor",
    desc: "120MHz Cortex-M4 delivering deterministic performance."
  },
  {
    url: "https://69415646eaa0bc88a50c8649.imgix.net/DarkLight_Front_Black_Background.jpg?auto=format&fit=crop&q=80&w=1200",
    title: "Gold-Plated Headers",
    desc: "ENIG finish for maximum connectivity and longevity."
  },
  {
    url: "https://69415646eaa0bc88a50c8649.imgix.net/Screenshot%202026-01-06%20155037.jpg?auto=format&fit=crop&q=80&w=1200",
    title: "Embedded Systems",
    desc: "Built for complex, real-time industrial environments."
  },
  {
    url: "https://69415646eaa0bc88a50c8649.imgix.net/Screenshot%202026-01-06%20155216.jpg?auto=format&fit=crop&q=80&w=1200",
    title: "Modern Connectivity",
    desc: "Native USB-C for high-speed debugging and power."
  }
];

export const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  }, []);

  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, isHovering]);

  return (
    <div 
      className="relative w-full h-full group overflow-hidden bg-gray-900"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Images */}
      {CAROUSEL_IMAGES.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
        >
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-60 transition-opacity"
          />
          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
            <h3 className="text-xl font-bold text-white mb-1">{image.title}</h3>
            <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {image.desc}
            </p>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white hover:bg-brand-600 transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white hover:bg-brand-600 transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute top-6 right-6 flex gap-2">
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-brand-500' : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
      
      {/* Corner Overlay */}
      <div className="absolute bottom-4 right-4 pointer-events-none text-right">
          <div className="inline-block bg-black/60 backdrop-blur-md border border-brand-500/30 px-4 py-2 rounded-lg text-xs text-brand-100">
              <p className="font-bold text-brand-400">DarkLight Gallery</p>
              <p className="text-[10px] opacity-70">Hardware Spotlight</p>
          </div>
      </div>
    </div>
  );
};