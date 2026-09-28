import React from 'react';
import { NavTab } from '../types/market';

interface BottomNavProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  watchlistCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  watchlistCount = 0,
}) => {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 dark:bg-[#131722]/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 py-1.5 px-4 flex justify-between items-center z-50 text-[11px] select-none"
      data-purpose="bottom-tab-navigation"
    >
      {/* Markets Tab */}
      <button
        onClick={() => onTabChange('markets')}
        className={`flex flex-col items-center gap-1 font-semibold min-h-[44px] justify-center flex-1 transition-colors cursor-pointer ${
          currentTab === 'markets'
            ? 'text-[#2962FF]'
            : 'text-[#787B86] dark:text-gray-400 hover:text-[#131722] dark:hover:text-white'
        }`}
        type="button"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
          viewBox="0 0 24 24"
        >
          <line x1="18" x2="18" y1="20" y2="10"></line>
          <line x1="12" x2="12" y1="20" y2="4"></line>
          <line x1="6" x2="6" y1="20" y2="14"></line>
        </svg>
        <span>Markets</span>
      </button>

      {/* News Tab */}
      <button
        onClick={() => onTabChange('news')}
        className={`flex flex-col items-center gap-1 font-medium min-h-[44px] justify-center flex-1 transition-colors cursor-pointer ${
          currentTab === 'news'
            ? 'text-[#2962FF] font-semibold'
            : 'text-[#787B86] dark:text-gray-400 hover:text-[#131722] dark:hover:text-white'
        }`}
        type="button"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
          <path d="M18 14h-8"></path>
          <path d="M15 18h-5"></path>
          <path d="M10 6h8v4h-8V6Z"></path>
        </svg>
        <span>News</span>
      </button>

      {/* Ideas Tab */}
      <button
        onClick={() => onTabChange('ideas')}
        className={`flex flex-col items-center gap-1 font-medium min-h-[44px] justify-center flex-1 transition-colors cursor-pointer ${
          currentTab === 'ideas'
            ? 'text-[#2962FF] font-semibold'
            : 'text-[#787B86] dark:text-gray-400 hover:text-[#131722] dark:hover:text-white'
        }`}
        type="button"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
          <circle cx="12" cy="12" r="4"></circle>
        </svg>
        <span>Ideas</span>
      </button>

      {/* Watchlist Tab */}
      <button
        onClick={() => onTabChange('watchlist')}
        className={`flex flex-col items-center gap-1 font-medium min-h-[44px] justify-center flex-1 transition-colors cursor-pointer relative ${
          currentTab === 'watchlist'
            ? 'text-[#2962FF] font-semibold'
            : 'text-[#787B86] dark:text-gray-400 hover:text-[#131722] dark:hover:text-white'
        }`}
        type="button"
      >
        <div className="relative">
          <svg
            className="w-5 h-5"
            fill={currentTab === 'watchlist' ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          {watchlistCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#2962FF] text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
              {watchlistCount}
            </span>
          )}
        </div>
        <span>Watchlist</span>
      </button>

      {/* More Tab */}
      <button
        onClick={() => onTabChange('more')}
        className={`flex flex-col items-center gap-1 font-medium min-h-[44px] justify-center flex-1 transition-colors cursor-pointer ${
          currentTab === 'more'
            ? 'text-[#2962FF] font-semibold'
            : 'text-[#787B86] dark:text-gray-400 hover:text-[#131722] dark:hover:text-white'
        }`}
        type="button"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="1.5"></circle>
          <circle cx="12" cy="5" r="1.5"></circle>
          <circle cx="12" cy="19" r="1.5"></circle>
        </svg>
        <span>More</span>
      </button>
    </nav>
  );
};
