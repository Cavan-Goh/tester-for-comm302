/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  INDICES_DATA,
  WORLD_INDICES_DATA,
  US_STOCKS_DATA,
  MARKET_MOVERS_ACTIVE,
  MARKET_MOVERS_GAINERS,
  MARKET_MOVERS_LOSERS,
  MARKET_MOVERS_VOLATILE,
  CRYPTO_COMMODITIES_DATA,
} from './data/marketData';
import { MarketAsset, NavTab, AssetCategory } from './types/market';
import { Header } from './components/Header';
import { MarketCard } from './components/MarketCard';
import { MarketMovers } from './components/MarketMovers';
import { BottomNav } from './components/BottomNav';
import { AssetDetailModal } from './components/AssetDetailModal';
import { SearchModal } from './components/SearchModal';
import { SideMenu } from './components/SideMenu';
import { GetStartedModal } from './components/GetStartedModal';
import { RegionDropdown, MarketRegion } from './components/RegionDropdown';
import { NewsTab } from './components/NewsTab';
import { IdeasTab } from './components/IdeasTab';
import { WatchlistTab } from './components/WatchlistTab';
import { MoreTab } from './components/MoreTab';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  // Navigation & UI States
  const [currentTab, setCurrentTab] = useState<NavTab>('markets');
  const [activeCategory, setActiveCategory] = useState<AssetCategory>('overview');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true); // mobile frame vs responsive desktop view
  const [isRegionOpen, setIsRegionOpen] = useState<boolean>(false);
  const [currentRegion, setCurrentRegion] = useState<MarketRegion>('everywhere');

  // Modals
  const [selectedAsset, setSelectedAsset] = useState<MarketAsset | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Watchlist State (seeded with Apple & NVIDIA)
  const [watchlist, setWatchlist] = useState<MarketAsset[]>([
    US_STOCKS_DATA[0], // NVDA
    US_STOCKS_DATA[1], // AAPL
    INDICES_DATA[0],   // S&P 500
    CRYPTO_COMMODITIES_DATA[0], // BTC
  ]);

  // Paper Trading Cash Balance
  const [cashBalance, setCashBalance] = useState<number>(100000);

  // All assets flattened for search & lookup
  const allAssets: MarketAsset[] = [
    ...INDICES_DATA,
    ...WORLD_INDICES_DATA,
    ...US_STOCKS_DATA,
    ...MARKET_MOVERS_ACTIVE,
    ...MARKET_MOVERS_GAINERS,
    ...MARKET_MOVERS_LOSERS,
    ...MARKET_MOVERS_VOLATILE,
    ...CRYPTO_COMMODITIES_DATA,
  ];

  // Distinct assets by id
  const uniqueAssets = Array.from(new Map(allAssets.map((item) => [item.symbol, item])).values());

  // Category pills list
  const categoryPills: { id: AssetCategory; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'indices', label: 'Indices' },
    { id: 'stocks', label: 'US stocks' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'futures', label: 'Futures' },
    { id: 'forex', label: 'Forex' },
    { id: 'bonds', label: 'Bonds' },
  ];

  // References for smooth scrolling to sections
  const indicesRef = useRef<HTMLElement>(null);
  const worldIndicesRef = useRef<HTMLElement>(null);
  const usStocksRef = useRef<HTMLElement>(null);
  const moversRef = useRef<HTMLDivElement>(null);
  const cryptoRef = useRef<HTMLElement>(null);

  // Handle Pill Click
  const handlePillClick = (cat: AssetCategory) => {
    setActiveCategory(cat);
    if (cat === 'indices') {
      indicesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (cat === 'stocks') {
      usStocksRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (cat === 'crypto') {
      cryptoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (cat === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Watchlist Toggle
  const handleToggleWatchlist = (asset: MarketAsset) => {
    setWatchlist((prev) => {
      const exists = prev.some((item) => item.symbol === asset.symbol);
      if (exists) {
        return prev.filter((item) => item.symbol !== asset.symbol);
      } else {
        return [...prev, asset];
      }
    });
  };

  const isInWatchlist = (symbol: string) => {
    return watchlist.some((item) => item.symbol === symbol);
  };

  // Paper Trade execution
  const handleExecuteTrade = (
    symbol: string,
    name: string,
    type: 'BUY' | 'SELL',
    shares: number,
    price: number
  ) => {
    const cost = shares * price;
    if (type === 'BUY') {
      setCashBalance((prev) => Math.max(prev - cost, 0));
    } else {
      setCashBalance((prev) => prev + cost);
    }
  };

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Open asset from News or Ideas symbol tag
  const handleSelectSymbol = (symbol: string) => {
    const found = uniqueAssets.find(
      (a) => a.symbol.toLowerCase() === symbol.toLowerCase() || a.name.toLowerCase().includes(symbol.toLowerCase())
    );
    if (found) {
      setSelectedAsset(found);
    } else {
      // Fallback: create mock asset
      setSelectedAsset(US_STOCKS_DATA[0]);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-[#0c0f17] text-[#f0f3fa]' : 'bg-[#F8F9FD] text-[#131722]'} flex flex-col items-center justify-start selection:bg-[#2962FF] selection:text-white transition-colors duration-200`}>
      {/* Top Device & Viewport Controller Bar (visible for easy testing & inspection) */}
      <div className="w-full max-w-4xl px-4 py-2 flex items-center justify-between text-xs text-gray-500 border-b border-gray-200/50 dark:border-gray-800/60 hidden md:flex">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Display Layout:</span>
          <button
            onClick={() => setDeviceFrameMode(true)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              deviceFrameMode ? 'bg-[#2962FF] text-white shadow-xs' : 'hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
            type="button"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Device (Exact Spec)</span>
          </button>
          <button
            onClick={() => setDeviceFrameMode(false)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              !deviceFrameMode ? 'bg-[#2962FF] text-white shadow-xs' : 'hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
            type="button"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Responsive Screen</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[11px] font-mono">
            Simulated Cash: <strong className="text-emerald-600 dark:text-emerald-400">${cashBalance.toLocaleString()}</strong>
          </span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xs font-semibold text-[#2962FF] hover:underline cursor-pointer"
            type="button"
          >
            {darkMode ? 'Light Theme' : 'Dark Theme'}
          </button>
        </div>
      </div>

      {/* Main Container: Mobile phone mockup container (max-w-md matching the screenshot) or fluid responsive */}
      <div
        className={`w-full ${
          deviceFrameMode ? 'max-w-md shadow-2xl border-x border-gray-200/80 dark:border-gray-800' : 'max-w-xl'
        } min-h-screen bg-white dark:bg-[#131722] pb-24 relative flex flex-col font-sans transition-colors duration-200`}
      >
        {/* BEGIN: MainHeader */}
        <Header
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          userBalance={cashBalance}
        />
        {/* END: MainHeader */}

        {/* Tab Content Rendering */}
        {currentTab === 'markets' && (
          <>
            {/* BEGIN: TitleAndCategoryFilter */}
            <section className="pt-5 pb-2 px-4 relative" data-purpose="page-title-dropdown">
              {/* Title with Dropdown Arrow */}
              <div
                onClick={() => setIsRegionOpen(!isRegionOpen)}
                className="flex items-center gap-2 cursor-pointer group select-none"
              >
                <h1 className="text-[28px] font-bold text-[#131722] dark:text-white tracking-tight leading-tight">
                  {currentRegion === 'everywhere' ? 'Markets, everywhere' : `Markets, ${currentRegion.toUpperCase()}`}
                </h1>
                <svg
                  className={`w-5 h-5 text-[#131722] dark:text-white transition-transform ${
                    isRegionOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>

              {/* Territory Dropdown Menu */}
              <RegionDropdown
                currentRegion={currentRegion}
                onSelectRegion={(reg) => setCurrentRegion(reg)}
                isOpen={isRegionOpen}
                onClose={() => setIsRegionOpen(false)}
              />

              {/* Horizontal Pills / Market Categories */}
              <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 text-[13px] font-medium tracking-tight">
                {categoryPills.map((pill) => (
                  <button
                    key={pill.id}
                    onClick={() => handlePillClick(pill.id)}
                    className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                      activeCategory === pill.id
                        ? 'bg-[#131722] dark:bg-white text-white dark:text-black font-semibold shadow-xs'
                        : 'bg-[#F0F3FA] dark:bg-[#1E222D] text-[#131722] dark:text-gray-300 hover:bg-[#E0E3EB] dark:hover:bg-gray-800'
                    }`}
                    type="button"
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </section>
            {/* END: TitleAndCategoryFilter */}

            <main className="space-y-6 pt-3">
              {/* BEGIN: IndicesSection */}
              <section ref={indicesRef} className="space-y-3" data-purpose="indices-carousel">
                <div className="px-4 flex items-center justify-between">
                  <button
                    onClick={() => handlePillClick('indices')}
                    className="inline-flex items-center gap-1 text-[22px] font-bold text-[#131722] dark:text-white tracking-tight hover:text-[#2962FF] dark:hover:text-[#2962FF] group cursor-pointer"
                    type="button"
                  >
                    <span>Indices</span>
                    <svg
                      className="w-5 h-5 text-[#131722] dark:text-white group-hover:text-[#2962FF] transition-transform group-hover:translate-x-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        clipRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {/* Horizontal Scroll Carousel for Indices */}
                <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
                  {INDICES_DATA.map((asset) => (
                    <MarketCard
                      key={asset.id}
                      asset={asset}
                      onSelect={(a) => setSelectedAsset(a)}
                    />
                  ))}
                </div>
              </section>
              {/* END: IndicesSection */}

              {/* BEGIN: WorldIndicesSection */}
              <section ref={worldIndicesRef} className="space-y-3" data-purpose="world-indices-carousel">
                <div className="px-4 flex items-center justify-between">
                  <button
                    onClick={() => handlePillClick('indices')}
                    className="inline-flex items-center gap-1 text-[22px] font-bold text-[#131722] dark:text-white tracking-tight hover:text-[#2962FF] dark:hover:text-[#2962FF] group cursor-pointer"
                    type="button"
                  >
                    <span>World indices</span>
                    <svg
                      className="w-5 h-5 text-[#131722] dark:text-white group-hover:text-[#2962FF] transition-transform group-hover:translate-x-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        clipRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {/* Horizontal Scroll Carousel for World Indices */}
                <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
                  {WORLD_INDICES_DATA.map((asset) => (
                    <MarketCard
                      key={asset.id}
                      asset={asset}
                      onSelect={(a) => setSelectedAsset(a)}
                    />
                  ))}
                </div>
              </section>
              {/* END: WorldIndicesSection */}

              {/* BEGIN: USStocksSection */}
              <section ref={usStocksRef} className="space-y-3" data-purpose="us-stocks-carousel">
                <div className="px-4 flex items-center justify-between">
                  <button
                    onClick={() => handlePillClick('stocks')}
                    className="inline-flex items-center gap-2 text-[22px] font-bold text-[#131722] dark:text-white tracking-tight hover:text-[#2962FF] dark:hover:text-[#2962FF] group cursor-pointer"
                    type="button"
                  >
                    {/* US Flag SVG icon matching spec */}
                    <span className="w-6 h-6 rounded-full overflow-hidden inline-flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-xs flex-shrink-0">
                      <svg className="w-full h-full" viewBox="0 0 512 512">
                        <path d="M0 0h512v512H0z" fill="#BD3D44"></path>
                        <path
                          d="M0 55h512M0 128h512M0 201h512M0 274h512M0 347h512M0 420h512M0 493h512"
                          stroke="#fff"
                          strokeWidth="37"
                        ></path>
                        <path d="M0 0h240v260H0z" fill="#192F5D"></path>
                        <circle cx="45" cy="40" fill="#fff" r="8"></circle>
                        <circle cx="95" cy="40" fill="#fff" r="8"></circle>
                        <circle cx="145" cy="40" fill="#fff" r="8"></circle>
                        <circle cx="195" cy="40" fill="#fff" r="8"></circle>
                        <circle cx="70" cy="80" fill="#fff" r="8"></circle>
                        <circle cx="120" cy="80" fill="#fff" r="8"></circle>
                        <circle cx="170" cy="80" fill="#fff" r="8"></circle>
                        <circle cx="45" cy="120" fill="#fff" r="8"></circle>
                        <circle cx="95" cy="120" fill="#fff" r="8"></circle>
                        <circle cx="145" cy="120" fill="#fff" r="8"></circle>
                        <circle cx="195" cy="120" fill="#fff" r="8"></circle>
                        <circle cx="70" cy="160" fill="#fff" r="8"></circle>
                        <circle cx="120" cy="160" fill="#fff" r="8"></circle>
                        <circle cx="170" cy="160" fill="#fff" r="8"></circle>
                      </svg>
                    </span>
                    <span>US stocks</span>
                    <svg
                      className="w-5 h-5 text-[#131722] dark:text-white group-hover:text-[#2962FF] transition-transform group-hover:translate-x-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        clipRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {/* Horizontal Scroll Cards for US Stocks */}
                <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
                  {US_STOCKS_DATA.map((asset) => (
                    <MarketCard
                      key={asset.id}
                      asset={asset}
                      onSelect={(a) => setSelectedAsset(a)}
                    />
                  ))}
                </div>
              </section>
              {/* END: USStocksSection */}

              {/* BEGIN: MarketMoversTable */}
              <div ref={moversRef}>
                <MarketMovers
                  onSelect={(a) => setSelectedAsset(a)}
                  onSeeAll={() => setIsSearchOpen(true)}
                />
              </div>
              {/* END: MarketMoversTable */}

              {/* BEGIN: CryptoGlance */}
              <section ref={cryptoRef} className="mt-4 px-4 pb-4" data-purpose="crypto-and-commodities-strip">
                <h2 className="text-[20px] font-bold text-[#131722] dark:text-white tracking-tight mb-3">
                  Crypto & Commodities
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {CRYPTO_COMMODITIES_DATA.map((asset) => {
                    const isPositive = asset.changePercent >= 0;
                    return (
                      <div
                        key={asset.id}
                        onClick={() => setSelectedAsset(asset)}
                        className="p-3 bg-[#F8F9FD] dark:bg-[#1E222D] border border-[#E0E3EB]/80 dark:border-gray-800 rounded-xl hover:border-gray-400 dark:hover:border-gray-600 transition-all cursor-pointer active:scale-98 select-none"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-[#6A6D78] dark:text-gray-300 truncate max-w-[90px]">
                            {asset.symbol}
                          </span>
                          <span
                            className={`text-[11px] font-bold font-mono ${
                              isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                            }`}
                          >
                            {isPositive ? `+${asset.changePercent.toFixed(2)}%` : `${asset.changePercent.toFixed(2)}%`}
                          </span>
                        </div>
                        <div className="text-lg font-bold text-[#131722] dark:text-white font-mono tabular-nums">
                          ${asset.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
              {/* END: CryptoGlance */}
            </main>
          </>
        )}

        {/* Tab 2: News */}
        {currentTab === 'news' && <NewsTab onSelectSymbol={handleSelectSymbol} />}

        {/* Tab 3: Community Ideas */}
        {currentTab === 'ideas' && <IdeasTab onSelectSymbol={handleSelectSymbol} />}

        {/* Tab 4: Watchlist */}
        {currentTab === 'watchlist' && (
          <WatchlistTab
            watchlist={watchlist}
            onRemove={(id) => setWatchlist((prev) => prev.filter((i) => i.id !== id))}
            onSelectAsset={(a) => setSelectedAsset(a)}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}

        {/* Tab 5: More Tools & Settings */}
        {currentTab === 'more' && (
          <MoreTab
            darkMode={darkMode}
            toggleDarkMode={() => setDarkMode(!darkMode)}
            currency="USD"
            onSelectCurrency={(c) => alert(`Base currency switched to ${c}`)}
            onResetBalance={() => setCashBalance(100000)}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {/* BEGIN: MobileStickyBottomNav */}
        <BottomNav
          currentTab={currentTab}
          onTabChange={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          watchlistCount={watchlist.length}
        />
        {/* END: MobileStickyBottomNav */}

        {/* Asset Detail Interactive Modal */}
        <AssetDetailModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          isInWatchlist={selectedAsset ? isInWatchlist(selectedAsset.symbol) : false}
          onToggleWatchlist={handleToggleWatchlist}
          onExecuteTrade={handleExecuteTrade}
          cashBalance={cashBalance}
        />

        {/* Search Symbols Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          allAssets={uniqueAssets}
          onSelectAsset={(asset) => setSelectedAsset(asset)}
        />

        {/* Side Menu Drawer */}
        <SideMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          onOpenAuth={() => setIsAuthOpen(true)}
          paperBalance={cashBalance}
          onResetBalance={() => setCashBalance(100000)}
        />

        {/* Get Started / Registration Modal */}
        <GetStartedModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={(email) => {
            alert(`Welcome ${email}! Virtual paper balance loaded with $100,000.`);
          }}
        />
      </div>
    </div>
  );
}
