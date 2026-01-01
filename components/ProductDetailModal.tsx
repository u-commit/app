
import React from 'react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        {/* Header di động */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 sm:hidden">
          <h3 className="font-black text-slate-900">Chi tiết sản phẩm</h3>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="flex flex-col md:flex-row">
            {/* Hình ảnh sản phẩm */}
            <div className="md:w-1/2 p-8 sm:p-12 bg-slate-50 flex items-center justify-center min-h-[300px]">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto max-h-[450px] object-contain drop-shadow-2xl"
              />
            </div>

            {/* Nội dung chi tiết */}
            <div className="md:w-1/2 p-8 sm:p-12 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-500 font-bold">
                    ★ <span>{product.rating}</span>
                    <span className="text-slate-300 text-xs font-medium ml-1">({product.reviews} đánh giá)</span>
                  </div>
                </div>
                <h2 className="text-3xl font-black text-slate-900 leading-tight">{product.name}</h2>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {product.description}
                </p>
                <div className="text-3xl font-black text-slate-900 pt-4">
                  {formatPrice(product.price)}
                </div>
              </div>

              {/* Thông số kỹ thuật */}
              {product.specs && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Thông số kỹ thuật</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-start text-sm border-b border-slate-50 pb-2">
                        <span className="text-slate-400 font-medium">{key}</span>
                        <span className="text-slate-800 font-bold text-right ml-4">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Nút hành động */}
              <div className="pt-8 flex gap-4 sticky bottom-0 bg-white">
                <button 
                  onClick={() => {
                    onAddToCart(product);
                  }}
                  className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Thêm vào giỏ
                </button>
                <button 
                  onClick={onClose}
                  className="hidden sm:block p-4 bg-slate-100 text-slate-400 rounded-2xl hover:bg-slate-200 hover:text-slate-600 transition-all"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
