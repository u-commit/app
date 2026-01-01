
import React from 'react';
import { User } from '../types';

interface UserProfileModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenPaymentLinking: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, isOpen, onClose, onOpenPaymentLinking }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-slate-900 h-32 w-full relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="px-8 pb-10 -mt-16 relative">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-32 h-32 rounded-[2rem] border-4 border-white bg-slate-100 shadow-xl object-cover"
              />
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-4 uppercase tracking-tight">{user.name}</h2>
            <p className="text-slate-500 font-medium">{user.email}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10">
            <div className="bg-slate-50 p-4 rounded-3xl text-center border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Đơn hàng</p>
              <p className="text-xl font-black text-slate-900">12</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-3xl text-center border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Yêu thích</p>
              <p className="text-xl font-black text-slate-900">08</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-3xl text-center border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Điểm</p>
              <p className="text-xl font-black text-indigo-600">2.5k</p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-10 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Ví & Thẻ liên kết</h3>
              <button 
                onClick={onOpenPaymentLinking}
                className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-widest"
              >
                + Thêm mới
              </button>
            </div>
            
            {user.linkedPayments.length > 0 ? (
              <div className="space-y-3">
                {user.linkedPayments.map(method => (
                  <div key={method.id} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-slate-200 transition-all shadow-sm">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold ${method.type === 'momo' ? 'bg-pink-600' : 'bg-indigo-600'}`}>
                      {method.type === 'momo' ? 'M' : 'B'}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{method.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{method.accountNumber}</p>
                    </div>
                    <div className="ml-auto">
                      <div className="px-2 py-1 bg-green-50 text-green-600 text-[8px] font-black rounded-md uppercase tracking-tighter">Đã xác thực</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <p className="text-xs text-slate-400 font-bold">Chưa có phương thức thanh toán nào.</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            <button className="bg-slate-900 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95">
              Chỉnh sửa hồ sơ
            </button>
            <button className="bg-white text-slate-900 border-2 border-slate-100 py-4 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all active:scale-95">
              Lịch sử mua hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
