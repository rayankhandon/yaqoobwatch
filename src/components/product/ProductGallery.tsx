import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [activeImage, setActiveImage] = useState(images[0] || '');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Main Image with Zoom effect */}
      <div
        className="relative aspect-square w-full bg-[#F5F2EC] border border-[#e5e0d8] overflow-hidden cursor-crosshair group shadow-sm"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={activeImage}
          alt={productName}
          className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'
            }`}
          style={
            isZoomed
              ? {
                transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
              }
              : undefined
          }
        />

        <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest text-stone-600 border border-[#e5e0d8] pointer-events-none shadow-sm">
          Hover to Zoom
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(img)}
              className={`aspect-square w-full bg-[#F5F2EC] border transition-all duration-300 ${activeImage === img
                  ? 'border-[#B8924A] shadow-md'
                  : 'border-[#e5e0d8] opacity-70 hover:opacity-100'
                }`}
            >
              <img src={img} alt={`${productName} view ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
