
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetail?: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetail }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div 
      onClick={() => onViewDetail?.(product)}
      className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group cursor-pointer relative flex flex-col h-full"
    >
      <div className="relative overflow-hidden aspect-square p-10 bg-[#fbfbfc] flex items-center justify-center">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={product.image} 
          alt={product.name} 
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-contain transition-all duration-700 pointer-events-none drop-shadow-2xl ${
            imageLoaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          } group-hover:scale-110`}
          loading="lazy"
        />
        <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black text-slate-800 shadow-sm border border-white z-10 flex items-center gap-1">
          <span className="text-yellow-400">★</span> {product.rating}
        </div>
      </div>
      
      <div className="p-7 flex flex-col flex-1">
        <span className="text-[10px] font-black text-indigo-500 mb-2 block uppercase tracking-[0.2em]">
          {product.category}
        </span>
        <h3 className="font-black text-slate-900 text-lg mb-1 truncate group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2 mb-6 h-8 leading-relaxed font-medium">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="font-black text-slate-900 text-xl tracking-tighter">
            {formatPrice(product.price)}
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-slate-900 hover:bg-indigo-600 text-white p-3.5 rounded-2xl transition-all shadow-lg active:scale-90 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
