
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem, User, PaymentMethod } from './types';
import ProductCard from './components/ProductCard';
import AIShoppingAssistant from './components/AIShoppingAssistant';
import AuthModal from './components/AuthModal';
import PaymentLinkingModal from './components/PaymentLinkingModal';
import ProductDetailModal from './components/ProductDetailModal';
import UserProfileModal from './components/UserProfileModal';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('techhaven_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('techhaven_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const POPULAR_SEARCHES = ['iPhone 15', 'MacBook M3', 'Gaming', 'Sony', 'Bàn phím cơ'];

  useEffect(() => {
    localStorage.setItem('techhaven_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('techhaven_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('techhaven_user');
    }
  }, [user]);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const matchCategory = selectedCategory === 'Tất cả' || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => id !== item.id));
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedPaymentId(null);
    setIsProfileModalOpen(false);
  };

  const handleLinkPayment = (method: PaymentMethod) => {
    if (user) {
      const updatedUser = {
        ...user,
        linkedPayments: [...user.linkedPayments, method]
      };
      setUser(updatedUser);
      setSelectedPaymentId(method.id);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 sm:pb-0 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2.5 bg-slate-100 text-slate-900 rounded-xl hover:bg-slate-200 transition-all active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                T
              </div>
              <h1 className="text-xl font-black tracking-tighter text-slate-900 uppercase hidden xs:block">TechHaven</h1>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="flex-1 max-w-xl hidden md:block relative group">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
              <input 
                type="text" 
                placeholder="Bạn đang tìm thiết bị gì?" 
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-12 pr-10 text-sm focus:ring-2 focus:ring-slate-900 outline-none transition-all shadow-inner"
              />
              <svg className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Desktop Suggestions Dropdown */}
            {isSearchFocused && !searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Gợi ý phổ biến</p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map(term => (
                    <button 
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-lg text-xs font-bold transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            {/* Mobile Search Button */}
            <button 
              onClick={() => setIsSearchOverlayOpen(true)}
              className="md:hidden p-3 bg-slate-100 text-slate-900 rounded-xl hover:bg-slate-200 transition-all active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {user ? (
              <div className="flex items-center gap-3 group relative cursor-pointer">
                <div 
                  onClick={() => setIsProfileModalOpen(true)}
                  className="flex items-center gap-3 hover:opacity-80 transition-all active:scale-95"
                >
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 shadow-sm object-cover" />
                  <div className="hidden lg:block text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Chào,</p>
                    <p className="text-sm font-black text-slate-900 leading-none truncate max-w-[100px]">{user.name}</p>
                  </div>
                </div>

                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none group-hover:pointer-events-auto transform translate-y-2 group-hover:translate-y-0 z-50">
                  <button onClick={() => setIsProfileModalOpen(true)} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 transition-colors flex items-center gap-3 font-bold">
                    <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Hồ sơ chi tiết
                  </button>
                  <button onClick={() => setIsPaymentModalOpen(true)} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 transition-colors flex items-center gap-3">
                    <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Thanh toán
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-rose-500 font-bold hover:bg-rose-50 transition-colors">
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-black hover:bg-slate-800 transition-all shadow-lg active:scale-95"
              >
                Đăng nhập
              </button>
            )}

            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-3 bg-slate-100 text-slate-900 rounded-2xl hover:bg-slate-200 transition-all relative group shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {isSearchOverlayOpen && (
        <div className="fixed inset-0 z-[150] bg-white animate-in slide-in-from-bottom duration-300 flex flex-col">
          <div className="p-4 flex items-center gap-3 border-b border-slate-100">
            <button 
              onClick={() => setIsSearchOverlayOpen(false)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-1 relative">
              <input 
                type="text"
                autoFocus
                placeholder="Tìm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 border-none rounded-xl py-3 pl-10 pr-4 text-base focus:ring-0 outline-none"
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {!searchQuery ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Gợi ý tìm kiếm</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {POPULAR_SEARCHES.map(term => (
                      <button 
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="flex items-center gap-2 p-4 bg-slate-50 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <svg className="h-4 w-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 font-bold mb-4">Tìm thấy {filteredProducts.length} kết quả</p>
                {filteredProducts.slice(0, 10).map(product => (
                  <div 
                    key={product.id} 
                    onClick={() => { setSelectedProduct(product); setIsSearchOverlayOpen(false); }}
                    className="flex items-center gap-4 p-3 bg-white border border-slate-100 rounded-2xl"
                  >
                    <img src={product.image} className="w-16 h-16 rounded-xl object-contain bg-slate-50" />
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-sm truncate">{product.name}</p>
                      <p className="text-xs text-indigo-600 font-bold">{formatPrice(product.price)}</p>
                    </div>
                  </div>
                ))}
                {filteredProducts.length > 10 && (
                  <button 
                    onClick={() => setIsSearchOverlayOpen(false)}
                    className="w-full py-4 text-indigo-600 text-sm font-black"
                  >
                    Xem tất cả kết quả
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Side Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-full max-w-xs bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black">T</div>
                <span className="font-black text-lg">TechHaven</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-slate-50 rounded-lg">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              <div className="px-2 pb-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Điều hướng</div>
              {[
                { label: 'Trang chủ', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                { label: 'Khuyến mãi hot', icon: 'M13 10V3L4 14h7v7l9-11h-7z', badge: 'New' },
                { label: 'Tin tức công nghệ', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z' },
                { label: 'Hệ thống cửa hàng', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
                { label: 'Liên hệ hỗ trợ', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' }
              ].map((item, i) => (
                <button 
                  key={i} 
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <span className="font-bold text-sm text-slate-700">{item.label}</span>
                  {item.badge && <span className="ml-auto px-2 py-0.5 bg-rose-500 text-white text-[8px] font-black rounded-full uppercase">{item.badge}</span>}
                </button>
              ))}

              <div className="pt-6 px-2 pb-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Danh mục phổ biến</div>
              <div className="grid grid-cols-2 gap-2 p-2">
                {CATEGORIES.slice(1).map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => { setSelectedCategory(cat); setIsMenuOpen(false); }}
                    className="p-3 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 hover:bg-indigo-600 hover:text-white transition-all text-center"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </nav>

            <div className="p-6 bg-slate-50 border-t border-slate-100">
              {user ? (
                <div className="flex items-center gap-3">
                   <img src={user.avatar} className="w-10 h-10 rounded-xl" />
                   <div>
                     <p className="text-xs font-black truncate">{user.name}</p>
                     <p className="text-[10px] text-slate-400">Khách hàng Platinum</p>
                   </div>
                </div>
              ) : (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm shadow-xl"
                >
                  Đăng nhập ngay
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Banner */}
        <div className="mb-12 bg-slate-900 rounded-[3rem] overflow-hidden relative min-h-[360px] flex items-center p-8 sm:p-12">
          <div className="z-10 max-w-2xl space-y-6">
            <span className="inline-block px-4 py-1.5 bg-indigo-500/20 backdrop-blur text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] rounded-full">
              Tech Innovation 2024
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-tight sm:leading-none">
              Định Nghĩa Lại <br className="hidden sm:block" /><span className="text-indigo-500">Trải Nghiệm</span> Công Nghệ
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-lg">
              Sở hữu những thiết bị dẫn đầu xu thế. Hiệu năng vượt trội, thiết kế tinh tế, hỗ trợ kỹ thuật 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black hover:bg-slate-100 transition-all shadow-xl active:scale-95">
                Mua ngay
              </button>
              <button className="bg-slate-800 text-white border border-slate-700 px-10 py-4 rounded-2xl font-black hover:bg-slate-700 transition-all active:scale-95">
                Xem cấu hình
              </button>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 opacity-20 pointer-events-none overflow-hidden">
             <div className="w-[800px] h-[800px] bg-indigo-600 rounded-full blur-[120px] absolute -right-40 -top-40"></div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-4 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-8 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                selectedCategory === cat 
                ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 scale-105' 
                : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Result Info */}
        {searchQuery && (
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-800">
              Kết quả cho: "<span className="text-indigo-600">{searchQuery}</span>"
            </h2>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-sm font-bold text-slate-400 hover:text-rose-500 flex items-center gap-2 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Xóa tìm kiếm
            </button>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} 
              onViewDetail={setSelectedProduct}
            />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-slate-800">Không tìm thấy thiết bị nào</h3>
              <p className="text-slate-500 mt-2">Vui lòng thử tìm kiếm với các thông số hoặc từ khóa khác.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all"
              >
                Quay lại trang chủ
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">Giỏ Hàng</h2>
                <p className="text-sm text-slate-500">{cart.length} thiết bị đã chọn</p>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cart.map(item => (
                <div key={item.id} className="flex gap-6 items-center">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-3xl bg-slate-100 shadow-sm" />
                  <div className="flex-1">
                    <h4 className="font-black text-slate-800 text-lg leading-tight">{item.name}</h4>
                    <p className="text-sm text-slate-500 mt-1">Số lượng: {item.quantity}</p>
                    <p className="font-bold text-slate-900 mt-2">{formatPrice(item.price)}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-rose-500 p-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}

              {cart.length > 0 && (
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <h3 className="text-sm font-black text-slate-400 uppercase mb-4 tracking-widest">Phương thức thanh toán</h3>
                  <div className="space-y-3">
                    {user && user.linkedPayments.map(method => (
                      <button 
                        key={method.id}
                        onClick={() => setSelectedPaymentId(method.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                          selectedPaymentId === method.id 
                          ? 'border-indigo-600 bg-indigo-50 shadow-md shadow-indigo-100' 
                          : 'border-slate-50 hover:border-slate-200'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${method.type === 'momo' ? 'bg-pink-600' : 'bg-indigo-600'}`}>
                          {method.type === 'momo' ? 'M' : 'B'}
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-slate-900 text-sm">{method.name}</p>
                          <p className="text-[10px] text-slate-500">{method.accountNumber}</p>
                        </div>
                        {selectedPaymentId === method.id && (
                          <div className="ml-auto w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                    
                    {(!user || user.linkedPayments.length === 0) ? (
                      <button 
                        onClick={() => user ? setIsPaymentModalOpen(true) : setIsAuthModalOpen(true)}
                        className="w-full p-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-all flex items-center justify-center gap-2 text-sm font-bold"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Kết nối thanh toán ngay
                      </button>
                    ) : (
                      <button 
                        onClick={() => setIsPaymentModalOpen(true)}
                        className="text-xs font-bold text-indigo-600 hover:underline px-2"
                      >
                        + Thêm phương thức khác
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-bold">Thành tiền:</span>
                <span className="text-3xl font-black text-slate-900">{formatPrice(cartTotal)}</span>
              </div>
              <button 
                disabled={cart.length === 0}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white py-5 rounded-[2rem] font-black text-xl shadow-2xl transition-all active:scale-95"
              >
                {selectedPaymentId ? 'Thanh toán ngay' : 'Vui lòng chọn thanh toán'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={(u) => setUser(u)}
      />

      <PaymentLinkingModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onLink={handleLinkPayment}
      />

      <UserProfileModal
        user={user}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onOpenPaymentLinking={() => {
            setIsProfileModalOpen(false);
            setIsPaymentModalOpen(true);
        }}
      />

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* AI Assistant */}
      <AIShoppingAssistant user={user} />
    </div>
  );
};

export default App;
