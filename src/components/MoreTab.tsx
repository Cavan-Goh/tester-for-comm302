import React from 'react';
import { Sun, Moon, Globe, Clock, Shield, Sliders, RefreshCw } from 'lucide-react';

interface MoreTabProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  currency: string;
  onSelectCurrency: (c: string) => void;
  onResetBalance: () => void;
  onOpenAuth: () => void;
}

export const MoreTab: React.FC<MoreTabProps> = ({
  darkMode,
  toggleDarkMode,
  currency,
  onSelectCurrency,
  onResetBalance,
  onOpenAuth,
}) => {
  return (
    <div className="px-4 py-4 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] font-bold text-[#131722] dark:text-white tracking-tight">
          Tools & Settings
        </h2>
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-[#2962FF]">
          v12.4 PRO
        </span>
      </div>

      {/* Global Trading Sessions Clock */}
      <div className="p-4 bg-white dark:bg-[#1E222D] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#131722] dark:text-white uppercase tracking-wider">
          <Clock className="w-4 h-4 text-[#2962FF]" />
          <span>Global Market Sessions</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#131722] dark:text-white">New York</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-[11px] text-gray-500 mt-1">NYSE / NASDAQ</div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">OPEN (Regular)</div>
          </div>

          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#131722] dark:text-white">London</span>
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            </div>
            <div className="text-[11px] text-gray-500 mt-1">LSE (UK)</div>
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-0.5">CLOSING AUCTION</div>
          </div>

          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#131722] dark:text-white">Tokyo</span>
              <span className="w-2 h-2 rounded-full bg-gray-400" />
            </div>
            <div className="text-[11px] text-gray-500 mt-1">TSE (Japan)</div>
            <div className="text-xs font-bold text-gray-500 mt-0.5">CLOSED</div>
          </div>

          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#131722] dark:text-white">Crypto 24/7</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-[11px] text-gray-500 mt-1">Global Blockchain</div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">ACTIVE ALWAYS</div>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="p-4 bg-white dark:bg-[#1E222D] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#131722] dark:text-white uppercase tracking-wider">
          <Sliders className="w-4 h-4 text-[#2962FF]" />
          <span>Terminal Preferences</span>
        </div>

        {/* Theme */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
          <span className="text-sm text-gray-700 dark:text-gray-200">Color Theme</span>
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-200 cursor-pointer"
            type="button"
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-gray-600" />
                <span>Light Mode</span>
              </>
            )}
          </button>
        </div>

        {/* Currency Display */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
          <span className="text-sm text-gray-700 dark:text-gray-200">Base Currency</span>
          <div className="flex gap-1">
            {['USD', 'EUR', 'GBP', 'JPY'].map((curr) => (
              <button
                key={curr}
                onClick={() => onSelectCurrency(curr)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold cursor-pointer transition-colors ${
                  currency === curr
                    ? 'bg-[#2962FF] text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
                type="button"
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Paper Portfolio */}
        <div className="flex items-center justify-between py-2">
          <div>
            <div className="text-sm text-gray-700 dark:text-gray-200">Paper Trading Cash</div>
            <div className="text-[11px] text-gray-400">Restore default $100,000 balance</div>
          </div>
          <button
            onClick={onResetBalance}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
            type="button"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Account Card */}
      <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-md space-y-2">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-200" />
          <h4 className="font-bold text-base">TradingView Account</h4>
        </div>
        <p className="text-xs text-blue-100">
          Sync your custom watchlists, chart drawings, and price alerts across desktop, mobile, and web.
        </p>
        <button
          onClick={onOpenAuth}
          className="mt-2 py-2 px-4 rounded-xl bg-white text-[#2962FF] font-bold text-xs shadow-sm hover:bg-blue-50 active:scale-98 transition-all cursor-pointer"
          type="button"
        >
          Sign In or Register
        </button>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-gray-400 pt-3 pb-8 space-y-1">
        <p className="font-semibold text-gray-500 dark:text-gray-400">
          TradingView Inc. · Markets, everywhere
        </p>
        <p className="text-[11px]">Real-time quotes powered by Tier-1 Direct Exchange Feeds</p>
      </div>
    </div>
  );
};
