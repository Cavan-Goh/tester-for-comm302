import React from 'react';
import { X, Moon, Sun, BarChart2, Grid, Calendar, Compass, Shield, RotateCcw, User } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onOpenAuth: () => void;
  paperBalance: number;
  onResetBalance: () => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  isOpen,
  onClose,
  darkMode,
  toggleDarkMode,
  onOpenAuth,
  paperBalance,
  onResetBalance,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div
        className="w-[300px] h-full bg-white dark:bg-[#131722] shadow-2xl flex flex-col justify-between border-r border-gray-100 dark:border-gray-800 transition-transform duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div>
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-8 h-6 text-[#131722] dark:text-white" fill="currentColor" viewBox="0 0 36 28">
                <path d="M0 4.5C0 2.01472 2.01472 0 4.5 0H11.5V19.5C11.5 21.9853 9.48528 24 7 24H0V4.5Z"></path>
                <path d="M14.5 0H21.5V28H14.5V0Z"></path>
                <path d="M24.5 4.5C24.5 2.01472 26.5147 0 29 0H36V19.5C36 21.9853 33.9853 24 31.5 24H24.5V4.5Z"></path>
              </svg>
              <span className="font-bold text-base text-[#131722] dark:text-white">TradingView</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User profile card */}
          <div className="p-4 bg-gray-50/80 dark:bg-[#1E222D] border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2962FF] to-[#9047FF] text-white flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-[#131722] dark:text-white">Pro Trader</div>
                <div className="text-xs text-gray-500 font-mono">
                  Cash: ${paperBalance.toLocaleString()}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="mt-3 w-full py-1.5 px-3 rounded-lg bg-[#2962FF] hover:bg-[#1e52e0] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer text-center block"
              type="button"
            >
              Manage Account / Upgrade
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-1 text-sm font-medium text-gray-700 dark:text-gray-200">
            <button
              onClick={onClose}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-left"
              type="button"
            >
              <BarChart2 className="w-4 h-4 text-[#2962FF]" />
              <span>Supercharts</span>
            </button>
            <button
              onClick={onClose}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-left"
              type="button"
            >
              <Grid className="w-4 h-4 text-[#089981]" />
              <span>Stock & Crypto Screener</span>
            </button>
            <button
              onClick={onClose}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-left"
              type="button"
            >
              <Calendar className="w-4 h-4 text-[#FB8C00]" />
              <span>Economic Calendar</span>
            </button>
            <button
              onClick={onClose}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-left"
              type="button"
            >
              <Compass className="w-4 h-4 text-[#9047FF]" />
              <span>Community Ideas & Streams</span>
            </button>
            <button
              onClick={onClose}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-left"
              type="button"
            >
              <Shield className="w-4 h-4 text-[#E53935]" />
              <span>Brokers & Integrations</span>
            </button>
          </div>
        </div>

        {/* Bottom Options & Theme Switch */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-600 dark:text-gray-300">
            <span>Dark Theme</span>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              type="button"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
            </button>
          </div>

          <button
            onClick={onResetBalance}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            type="button"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Paper Balance ($100k)
          </button>

          <p className="text-[11px] text-gray-400 text-center">
            TradingView v12.4.0 · Markets everywhere
          </p>
        </div>
      </div>
    </div>
  );
};
