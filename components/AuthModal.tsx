
import React, { useState } from 'react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sử dụng thư viện Lorelei cho avatar trông nghệ thuật hơn
    const mockUser: User = {
      id: 'u1',
      name: email.split('@')[0],
      email: email,
      avatar: `https://api.dicebear.com/7.x/lorelei/svg?seed=${email}&backgroundColor=f8fafc`,
      linkedPayments: []
    };
    onLogin(mockUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 sm:p-12">
          <div className="text-center mb-10">
            <div className="inline-flex w-16 h-16 bg-slate-900 text-white rounded-2xl items-center justify-center text-3xl font-black mb-4 shadow-xl">
              T
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {isLoginView ? 'Chào mừng bạn' : 'Tạo tài khoản'}
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              {isLoginView ? 'Khám phá ngay siêu phẩm mới' : 'Gia nhập cộng đồng TechHaven'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tech@example.com"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-5 focus:border-indigo-500 focus:bg-white focus:ring-0 outline-none transition-all font-bold text-slate-700"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Mật khẩu</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-5 focus:border-indigo-500 focus:bg-white focus:ring-0 outline-none transition-all font-bold text-slate-700"
              />
            </div>
            {isLoginView && (
              <div className="text-right">
                <button type="button" className="text-sm font-bold text-indigo-600 hover:text-indigo-700">Quên mật khẩu?</button>
              </div>
            )}
            <button 
              type="submit"
              className="w-full bg-slate-900 text-white py-4.5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-slate-800 transition-all active:scale-95 mt-4"
            >
              {isLoginView ? 'Đăng nhập' : 'Đăng ký ngay'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm font-medium">
              {isLoginView ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
              <button 
                onClick={() => setIsLoginView(!isLoginView)}
                className="ml-2 font-black text-indigo-600 hover:underline"
              >
                {isLoginView ? 'Tạo mới' : 'Đăng nhập'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
