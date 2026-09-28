import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      onSuccess(email);
      onClose();
      setSubmitted(false);
      setEmail('');
    }, 1200);
  };

  const handleQuickDemo = () => {
    setSubmitted(true);
    setTimeout(() => {
      onSuccess('demo.trader@tradingview.com');
      onClose();
      setSubmitted(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div
        className="w-full max-w-sm bg-white dark:bg-[#1E222D] rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-800 relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>

        {/* TV Logo */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2962FF] to-[#9047FF] flex items-center justify-center text-white mx-auto mb-3 shadow-md">
          <svg className="w-7 h-5" fill="currentColor" viewBox="0 0 36 28">
            <path d="M0 4.5C0 2.01472 2.01472 0 4.5 0H11.5V19.5C11.5 21.9853 9.48528 24 7 24H0V4.5Z"></path>
            <path d="M14.5 0H21.5V28H14.5V0Z"></path>
            <path d="M24.5 4.5C24.5 2.01472 26.5147 0 29 0H36V19.5C36 21.9853 33.9853 24 31.5 24H24.5V4.5Z"></path>
          </svg>
        </div>

        <h3 className="text-xl font-bold text-[#131722] dark:text-white tracking-tight">
          Markets, everywhere
        </h3>
        <p className="text-xs text-gray-500 mt-1 mb-5">
          Join 60+ million traders. Track real-time prices, charts, and trade risk-free with virtual capital.
        </p>

        {submitted ? (
          <div className="py-8 flex flex-col items-center justify-center text-[#089981] space-y-2">
            <CheckCircle className="w-10 h-10 animate-bounce" />
            <span className="font-bold text-sm">Welcome aboard! Initializing terminal...</span>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Quick Demo Button */}
            <button
              onClick={handleQuickDemo}
              className="w-full badge-gradient-btn text-white font-bold text-sm py-3 rounded-xl shadow-sm hover:opacity-95 active:scale-98 transition-all cursor-pointer"
              type="button"
            >
              Start Free Paper Trading ($100k)
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
              <span className="flex-shrink mx-3 text-[11px] text-gray-400 font-semibold">OR</span>
              <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2.5">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 text-sm text-[#131722] dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-[#2962FF]"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#131722] dark:bg-white text-white dark:text-black font-semibold text-xs hover:opacity-90 active:scale-98 transition-all cursor-pointer"
              >
                Continue with Email
              </button>
            </form>

            <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#089981]" />
              <span>Free instant access · No credit card required</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
