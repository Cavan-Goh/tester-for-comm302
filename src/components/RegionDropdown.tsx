import React from 'react';
import { Check } from 'lucide-react';

export type MarketRegion = 'everywhere' | 'us' | 'europe' | 'asia' | 'crypto';

interface RegionDropdownProps {
  currentRegion: MarketRegion;
  onSelectRegion: (region: MarketRegion) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const RegionDropdown: React.FC<RegionDropdownProps> = ({
  currentRegion,
  onSelectRegion,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const regions: { id: MarketRegion; label: string; desc: string }[] = [
    { id: 'everywhere', label: 'Everywhere', desc: 'All Global Indices, US Stocks & Crypto' },
    { id: 'us', label: 'United States', desc: 'S&P 500, Nasdaq, Dow & US Equities' },
    { id: 'europe', label: 'Europe', desc: 'FTSE 100, DAX 40, CAC 40 & Euro Stoxx' },
    { id: 'asia', label: 'Asia-Pacific', desc: 'Nikkei 225, Hang Seng & CSI 300' },
    { id: 'crypto', label: 'Crypto & Assets', desc: 'Bitcoin, Ethereum & Precious Metals' },
  ];

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div className="absolute top-16 left-4 z-40 w-72 bg-white dark:bg-[#1E222D] rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-1.5 animate-in fade-in zoom-in-95 duration-100">
        <div className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
          Select Market Territory
        </div>
        <div className="py-1 space-y-0.5">
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => {
                onSelectRegion(reg.id);
                onClose();
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left cursor-pointer transition-colors ${
                currentRegion === reg.id
                  ? 'bg-blue-50 dark:bg-blue-950/40 text-[#2962FF]'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-[#131722] dark:text-white'
              }`}
              type="button"
            >
              <div>
                <div className="text-sm font-bold leading-tight">{reg.label}</div>
                <div className="text-[11px] text-gray-500">{reg.desc}</div>
              </div>
              {currentRegion === reg.id && <Check className="w-4 h-4 text-[#2962FF] shrink-0" />}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
