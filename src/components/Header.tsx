import React from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  userBalance?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onOpenSearch,
  onOpenAuth,
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#131722]/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 transition-colors">
      {/* Left side: Hamburger Menu & Official TradingView geometric logo */}
      <div className="flex items-center gap-4">
        {/* Hamburger Menu Button */}
        <button
          onClick={onOpenMenu}
          aria-label="Open Menu"
          className="text-[#131722] dark:text-gray-200 hover:text-[#2962FF] dark:hover:text-[#2962FF] transition-colors focus:outline-none min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
          type="button"
        >
          <svg className="w-6 h-6 stroke-current stroke-[2.2]" fill="none" strokeLinecap="round" viewBox="0 0 24 24">
            <line x1="3" x2="21" y1="6" y2="6"></line>
            <line x1="3" x2="21" y1="12" y2="12"></line>
            <line x1="3" x2="21" y1="18" y2="18"></line>
          </svg>
        </button>

        {/* Official Geometric TV Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="TradingView Home"
          className="flex items-center gap-1.5 focus:outline-none cursor-pointer"
          type="button"
        >
          <svg className="w-9 h-7 text-[#131722] dark:text-white" fill="currentColor" viewBox="0 0 36 28">
            <path d="M0 4.5C0 2.01472 2.01472 0 4.5 0H11.5V19.5C11.5 21.9853 9.48528 24 7 24H0V4.5Z"></path>
            <path d="M14.5 0H21.5V28H14.5V0Z"></path>
            <path d="M24.5 4.5C24.5 2.01472 26.5147 0 29 0H36V19.5C36 21.9853 33.9853 24 31.5 24H24.5V4.5Z"></path>
          </svg>
        </button>
      </div>

      {/* Right side: Search, Theme switch & Get started CTA */}
      <div className="flex items-center gap-2">
        {/* Search icon */}
        <button
          onClick={onOpenSearch}
          aria-label="Search markets"
          className="min-h-[40px] min-w-[40px] flex items-center justify-center text-[#131722] dark:text-gray-200 hover:text-[#2962FF] dark:hover:text-[#2962FF] transition-colors rounded-full focus:outline-none cursor-pointer"
          type="button"
        >
          <Search className="w-5 h-5 stroke-[2]" />
        </button>

        {/* Theme quick toggle */}
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle theme"
          className="min-h-[38px] min-w-[38px] hidden sm:flex items-center justify-center text-[#787B86] hover:text-[#131722] dark:hover:text-white rounded-full transition-colors cursor-pointer"
          type="button"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? (
            <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Get Started Button with Blue-Purple Gradient */}
        <button
          onClick={onOpenAuth}
          className="badge-gradient-btn text-white text-[13.5px] font-semibold px-4 py-2 rounded-full shadow-sm hover:opacity-95 active:scale-95 transition-all duration-150 whitespace-nowrap cursor-pointer"
          type="button"
        >
          Get started
        </button>
      </div>
    </header>
  );
};
