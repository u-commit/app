
import React, { useState } from 'react';
import { PaymentMethod } from '../types';

interface PaymentLinkingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLink: (method: PaymentMethod) => void;
}

const PaymentLinkingModal: React.FC<PaymentLinkingModalProps> = ({ isOpen, onClose, onLink }) => {
  const [step, setStep] = useState<'select' | 'form'>('select');
  const [type, setType] = useState<'momo' | 'bank'>('momo');
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState('');

  if (!isOpen) return null;

  const handleLink = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newMethod: PaymentMethod = {
        id: Math.random().toString(36).substr(2, 9),
        type: type,
        name: type === 'momo' ? 'Ví MoMo' : 'Vietcombank',
        accountNumber: account || (type === 'momo' ? '091****888' : '1012****999'),
      };
      onLink(newMethod);
      setLoading(false);
      onClose();
      setStep('select');
      setAccount('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8">
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            {step === 'select' ? 'Liên kết thanh toán' : `Kết nối ${type === 'momo' ? 'MoMo' : 'Ngân hàng'}`}
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            Thanh toán nhanh chóng và bảo mật hơn với các phương thức đã liên kết.
          </p>

          {step === 'select' ? (
            <div className="space-y-4">
              <button 
                onClick={() => { setType('momo'); setStep('form'); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-50 hover:border-pink-500 hover:bg-pink-50 transition-all group text-left"
              >
                <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center text-white font-bold shrink-0">
                  M
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-pink-600 transition-colors">Ví điện tử MoMo</h4>
                  <p className="text-xs text-slate-500">Liên kết nhanh qua số điện thoại</p>
                </div>
                <svg className="ml-auto h-5 w-5 text-slate-300 group-hover:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button 
                onClick={() => { setType('bank'); setStep('form'); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-50 hover:border-indigo-500 hover:bg-indigo-50 transition-all group text-left"
              >
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shrink-0">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Tài khoản Ngân hàng</h4>
                  <p className="text-xs text-slate-500">Hỗ trợ tất cả ngân hàng nội địa</p>
                </div>
                <svg className="ml-auto h-5 w-5 text-slate-300 group-hover:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  {type === 'momo' ? 'Số điện thoại MoMo' : 'Số tài khoản / Số thẻ'}
                </label>
                <input 
                  type="text"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  placeholder={type === 'momo' ? '09xx xxx xxx' : 'xxxx xxxx xxxx'}
                  className="w-full bg-transparent border-none p-0 text-xl font-bold focus:ring-0 outline-none"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setStep('select')}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-100 transition-all"
                >
                  Quay lại
                </button>
                <button 
                  onClick={handleLink}
                  disabled={loading || !account}
                  className={`flex-[2] py-4 rounded-2xl font-black text-white shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${
                    type === 'momo' ? 'bg-pink-600 hover:bg-pink-700 shadow-pink-100' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'
                  }`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : 'Xác nhận liên kết'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentLinkingModal;
