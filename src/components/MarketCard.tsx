import React from 'react';
import { MarketAsset } from '../types/market';

interface MarketCardProps {
  asset: MarketAsset;
  onSelect: (asset: MarketAsset) => void;
}

export const MarketCard: React.FC<MarketCardProps> = ({ asset, onSelect }) => {
  const isPositive = asset.changePercent >= 0;
  const strokeColor = isPositive ? '#089981' : '#F23645';
  const gradientId = `grad-${asset.id}`;

  // Generate SVG path coordinates from asset.sparkline
  const points = asset.sparkline;
  const width = 160;
  const height = 30;
  const minVal = Math.min(...points);
  const maxVal = Math.max(...points);
  const range = maxVal - minVal || 1;

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((p - minVal) / range) * (height - 6) - 3;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const linePath = `M ${coords.join(' L ')}`;
  const areaPath = `M 0,${height} L ${coords.join(' L ')} L ${width},${height} Z`;

  // Render specific brand icons if requested
  const renderBadge = () => {
    if (asset.badge.isIcon === 'nvidia') {
      return (
        <div className="w-6 h-6 rounded-full bg-[#131722] flex items-center justify-center p-1 shrink-0">
          <svg className="w-4 h-4 fill-[#76B900]" viewBox="0 0 24 24">
            <path d="M8.9 14.9c-.8.8-1.7 1.4-2.8 1.6v2.2c1.7-.2 3.2-1.1 4.3-2.3l-1.5-1.5zm6.2-7.5c-2.3-1.6-5.3-1.9-7.9-.9-.7.3-1.4.7-2.1 1.2v2.3c.6-.4 1.2-.8 1.9-1 2-.8 4.3-.5 6 1 1.2 1.1 1.8 2.6 1.7 4.1l2.2.4c.2-2.1-.6-4.2-2.1-5.7l.3-.4zm3 12.3c2.4-2 3.9-5.1 3.9-8.5 0-3.3-1.4-6.4-3.8-8.4l-1.5 1.5c1.9 1.7 3.1 4.1 3.1 6.8 0 2.8-1.2 5.2-3.1 6.9l1.4 1.7z"></path>
          </svg>
        </div>
      );
    }

    if (asset.badge.isIcon === 'apple') {
      return (
        <div className="w-6 h-6 rounded-full bg-[#F0F3FA] dark:bg-gray-800 flex items-center justify-center p-1 shrink-0">
          <svg className="w-4 h-4 fill-[#131722] dark:fill-white" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12-14.42-6-9.13-10.74-19.46-14.23-31-3.48-11.53-5.23-22.37-5.23-32.52 0-14.79 3.78-26.68 11.35-35.68 7.56-8.99 17.06-13.59 28.5-13.79 4.35 0 9.24 1.13 14.67 3.38 5.43 2.25 9.06 3.42 10.89 3.51 1.41 0 5.23-1.31 11.46-3.92 6.23-2.61 11.66-3.76 16.29-3.46 12.39.87 22.06 5.56 29.02 14.07-10.88 6.53-16.1 15.56-15.66 27.1.44 9.14 4.02 16.86 10.75 23.16 6.73 6.3 14.79 9.9 24.18 10.8-2.61 7.84-5.87 15.67-9.78 23.49zM119.22 31.05c0-7.18 2.5-13.82 7.5-19.92 5-6.1 11.21-10.12 18.63-12.06.65 6.97-1.42 13.6-6.2 19.9-4.78 6.3-10.99 10.56-18.63 12.79-.43-.23-.87-.46-1.3-.71z"></path>
          </svg>
        </div>
      );
    }

    if (asset.badge.isIcon === 'amazon') {
      return (
        <div className="w-6 h-6 rounded-full bg-[#FF9900] text-black font-extrabold text-[12px] flex items-center justify-center shrink-0">
          a
        </div>
      );
    }

    return (
      <span
        style={{ backgroundColor: asset.badge.bg, color: asset.badge.textColor }}
        className="w-6 h-6 rounded-full text-[9px] font-bold flex items-center justify-center tracking-tighter shrink-0"
      >
        {asset.badge.text}
      </span>
    );
  };

  return (
    <article
      onClick={() => onSelect(asset)}
      className="flex-shrink-0 w-[240px] h-[168px] p-4 bg-white dark:bg-[#1E222D] rounded-2xl border border-[#E0E3EB] dark:border-gray-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:border-[#9598A1] dark:hover:border-gray-600 transition-all cursor-pointer active:scale-[0.98] select-none group"
    >
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          {renderBadge()}
          <div className="overflow-hidden">
            <h3 className="font-bold text-[14.5px] text-[#131722] dark:text-white leading-tight truncate group-hover:text-[#2962FF] transition-colors">
              {asset.name}
            </h3>
            {asset.subtitle && (
              <span className="text-[11px] text-[#787B86] dark:text-gray-400 truncate block">
                {asset.subtitle}
              </span>
            )}
          </div>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-xl font-bold tracking-tight text-[#131722] dark:text-white font-mono tabular-nums">
            {asset.currencyPrefix}
            {asset.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          <span
            className={`text-xs font-bold flex items-center font-mono tabular-nums ${
              isPositive ? 'text-[#089981]' : 'text-[#F23645]'
            }`}
          >
            {isPositive ? `+${asset.changePercent.toFixed(2)}%` : `${asset.changePercent.toFixed(2)}%`}
          </span>
        </div>

        <div className="text-[11px] font-medium text-[#787B86] dark:text-gray-400 font-mono tabular-nums">
          {isPositive ? `+${asset.currencyPrefix ? asset.currencyPrefix : ''}${asset.change.toFixed(2)} ${asset.currency}` : `${asset.currencyPrefix ? asset.currencyPrefix : ''}${asset.change.toFixed(2)} ${asset.currency}`}
        </div>
      </div>

      {/* Sparkline Chart SVG */}
      <div className="w-full h-8 pt-1">
        <svg className="w-full h-full overflow-visible" fill="none" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#${gradientId})`} />
          <path
            d={linePath}
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </article>
  );
};
