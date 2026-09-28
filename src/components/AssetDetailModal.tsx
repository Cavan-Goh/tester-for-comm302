import React, { useState, useMemo } from 'react';
import { MarketAsset, Timeframe, CandlePoint } from '../types/market';
import { generateChartPoints } from '../data/marketData';
import { X, Star, TrendingUp, TrendingDown, BarChart2, Activity, Check } from 'lucide-react';

interface AssetDetailModalProps {
  asset: MarketAsset | null;
  onClose: () => void;
  isInWatchlist: boolean;
  onToggleWatchlist: (asset: MarketAsset) => void;
  onExecuteTrade?: (symbol: string, name: string, type: 'BUY' | 'SELL', shares: number, price: number) => void;
  cashBalance?: number;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose,
  isInWatchlist,
  onToggleWatchlist,
  onExecuteTrade,
  cashBalance = 100000,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [chartType, setChartType] = useState<'line' | 'candle'>('line');
  const [hoveredPoint, setHoveredPoint] = useState<CandlePoint | null>(null);
  const [tradeShares, setTradeShares] = useState<number>(5);
  const [tradeStatus, setTradeStatus] = useState<string | null>(null);

  if (!asset) return null;

  const chartData = useMemo(() => {
    return generateChartPoints(asset.price, timeframe, asset.changePercent);
  }, [asset.price, timeframe, asset.changePercent]);

  const activePoint = hoveredPoint || chartData[chartData.length - 1];
  const isPositive = asset.changePercent >= 0;
  const strokeColor = isPositive ? '#089981' : '#F23645';

  // SVG dimensions for modal chart
  const svgWidth = 340;
  const svgHeight = 160;
  const minPrice = Math.min(...chartData.map((d) => d.low));
  const maxPrice = Math.max(...chartData.map((d) => d.high));
  const priceRange = maxPrice - minPrice || 1;

  // Compute SVG Line path
  const lineCoords = chartData.map((d, i) => {
    const x = (i / (chartData.length - 1)) * svgWidth;
    const y = svgHeight - ((d.close - minPrice) / priceRange) * (svgHeight - 20) - 10;
    return { x, y, data: d };
  });

  const linePath = `M ${lineCoords.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' L ')}`;
  const areaPath = `M 0,${svgHeight} L ${lineCoords.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' L ')} L ${svgWidth},${svgHeight} Z`;

  const handleTrade = (type: 'BUY' | 'SELL') => {
    if (!onExecuteTrade) return;
    const totalCost = tradeShares * asset.price;
    if (type === 'BUY' && totalCost > cashBalance) {
      setTradeStatus('Insufficient simulated cash!');
      setTimeout(() => setTradeStatus(null), 2500);
      return;
    }
    onExecuteTrade(asset.symbol, asset.name, type, tradeShares, asset.price);
    setTradeStatus(`Simulated ${type} executed: ${tradeShares} shares!`);
    setTimeout(() => setTradeStatus(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* Modal Container */}
      <div
        className="w-full max-w-md bg-white dark:bg-[#1E222D] rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle pill */}
        <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto my-2.5 sm:hidden shrink-0" />

        {/* Modal Header */}
        <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span
              style={{ backgroundColor: asset.badge.bg, color: asset.badge.textColor }}
              className="w-8 h-8 rounded-full text-[11px] font-bold flex items-center justify-center tracking-tighter shrink-0"
            >
              {asset.badge.text}
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg font-bold text-[#131722] dark:text-white leading-tight">
                  {asset.symbol}
                </h2>
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase font-semibold">
                  {asset.category.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-[#787B86] dark:text-gray-400 truncate max-w-[200px]">
                {asset.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWatchlist(asset)}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isInWatchlist
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-500'
                  : 'text-gray-400 hover:text-amber-500 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              type="button"
            >
              <Star className="w-5 h-5 fill-current" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto no-scrollbar space-y-5">
          {/* Price Header */}
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-3xl font-extrabold tracking-tight text-[#131722] dark:text-white font-mono tabular-nums">
                {asset.currencyPrefix}
                {(activePoint?.close || asset.price).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold mt-1">
                <span
                  className={`flex items-center font-mono tabular-nums ${
                    isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                  }`}
                >
                  {isPositive ? <TrendingUp className="w-3.5 h-3.5 mr-0.5 inline" /> : <TrendingDown className="w-3.5 h-3.5 mr-0.5 inline" />}
                  {isPositive ? `+${asset.change.toFixed(2)}` : asset.change.toFixed(2)} ({isPositive ? `+${asset.changePercent.toFixed(2)}%` : `${asset.changePercent.toFixed(2)}%`})
                </span>
                <span className="text-gray-400 font-normal">
                  {hoveredPoint ? hoveredPoint.time : 'Today'}
                </span>
              </div>
            </div>

            {/* Line vs Candle Chart Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setChartType('line')}
                className={`p-1.5 rounded transition-all cursor-pointer ${
                  chartType === 'line'
                    ? 'bg-white dark:bg-gray-700 text-[#2962FF] shadow-xs'
                    : 'text-gray-500 hover:text-black dark:hover:text-white'
                }`}
                title="Line Chart"
                type="button"
              >
                <Activity className="w-4 h-4" />
              </button>
              <button
                onClick={() => setChartType('candle')}
                className={`p-1.5 rounded transition-all cursor-pointer ${
                  chartType === 'candle'
                    ? 'bg-white dark:bg-gray-700 text-[#2962FF] shadow-xs'
                    : 'text-gray-500 hover:text-black dark:hover:text-white'
                }`}
                title="Candlestick Chart"
                type="button"
              >
                <BarChart2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Chart Canvas */}
          <div className="relative bg-gray-50/70 dark:bg-[#131722]/50 rounded-2xl p-2 border border-gray-100 dark:border-gray-800/80">
            {chartType === 'line' ? (
              <div className="w-full h-44 relative">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  preserveAspectRatio="none"
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <defs>
                    <linearGradient id="modalGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
                      <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2={svgWidth} y2="40" stroke="currentColor" strokeOpacity="0.06" strokeDasharray="3 3" />
                  <line x1="0" y1="80" x2={svgWidth} y2="80" stroke="currentColor" strokeOpacity="0.06" strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2={svgWidth} y2="120" stroke="currentColor" strokeOpacity="0.06" strokeDasharray="3 3" />

                  {/* Shaded Area */}
                  <path d={areaPath} fill="url(#modalGrad)" />
                  {/* Line */}
                  <path
                    d={linePath}
                    stroke={strokeColor}
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />

                  {/* Interactive touch/hover points */}
                  {lineCoords.map((coord, idx) => (
                    <circle
                      key={idx}
                      cx={coord.x}
                      cy={coord.y}
                      r="7"
                      className="opacity-0 hover:opacity-100 transition-opacity cursor-pointer fill-[#2962FF]"
                      onMouseEnter={() => setHoveredPoint(coord.data)}
                      onTouchStart={() => setHoveredPoint(coord.data)}
                    />
                  ))}

                  {/* Hovered point marker */}
                  {hoveredPoint && (
                    <g>
                      {(() => {
                        const targetCoord = lineCoords.find((c) => c.data.time === hoveredPoint.time);
                        if (!targetCoord) return null;
                        return (
                          <>
                            <line
                              x1={targetCoord.x}
                              y1="0"
                              x2={targetCoord.x}
                              y2={svgHeight}
                              stroke="#2962FF"
                              strokeWidth="1.2"
                              strokeDasharray="2 2"
                            />
                            <circle
                              cx={targetCoord.x}
                              cy={targetCoord.y}
                              r="5"
                              fill="#2962FF"
                              stroke="#ffffff"
                              strokeWidth="2"
                            />
                          </>
                        );
                      })()}
                    </g>
                  )}
                </svg>
              </div>
            ) : (
              /* Candlestick Mode */
              <div className="w-full h-44 flex items-end justify-between px-1 py-2">
                {chartData.map((candle, idx) => {
                  const isUp = candle.close >= candle.open;
                  const candleColor = isUp ? '#089981' : '#F23645';
                  const highY = ((maxPrice - candle.high) / priceRange) * 120;
                  const lowY = ((maxPrice - candle.low) / priceRange) * 120;
                  const openY = ((maxPrice - candle.open) / priceRange) * 120;
                  const closeY = ((maxPrice - candle.close) / priceRange) * 120;
                  const bodyTop = Math.min(openY, closeY);
                  const bodyHeight = Math.max(Math.abs(closeY - openY), 2);

                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center cursor-pointer group relative py-1"
                      onMouseEnter={() => setHoveredPoint(candle)}
                    >
                      {/* Wick */}
                      <div
                        style={{
                          height: `${Math.max(lowY - highY, 4)}px`,
                          backgroundColor: candleColor,
                          width: '1.2px',
                        }}
                      />
                      {/* Body */}
                      <div
                        style={{
                          height: `${bodyHeight}px`,
                          backgroundColor: candleColor,
                          width: '5px',
                          borderRadius: '1px',
                          position: 'absolute',
                          top: `${bodyTop + 10}px`,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Timeframe Selector */}
            <div className="flex justify-between items-center pt-2 mt-1 border-t border-gray-100 dark:border-gray-800 text-[11px] font-semibold">
              {(['1D', '5D', '1M', '6M', '1Y', 'ALL'] as Timeframe[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    timeframe === tf
                      ? 'bg-[#131722] dark:bg-white text-white dark:text-black font-bold shadow-xs'
                      : 'text-[#787B86] dark:text-gray-400 hover:text-black dark:hover:text-white'
                  }`}
                  type="button"
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Key Statistics Grid */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#131722] dark:text-white uppercase tracking-wider">
              Key Statistics
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 flex justify-between">
                <span className="text-gray-500">Day High</span>
                <span className="font-bold text-[#131722] dark:text-white font-mono">
                  ${asset.stats.high.toFixed(2)}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 flex justify-between">
                <span className="text-gray-500">Day Low</span>
                <span className="font-bold text-[#131722] dark:text-white font-mono">
                  ${asset.stats.low.toFixed(2)}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 flex justify-between">
                <span className="text-gray-500">Volume</span>
                <span className="font-bold text-[#131722] dark:text-white font-mono">
                  {asset.stats.volume}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 flex justify-between">
                <span className="text-gray-500">Avg Volume</span>
                <span className="font-bold text-[#131722] dark:text-white font-mono">
                  {asset.stats.avgVolume}
                </span>
              </div>
              {asset.stats.marketCap && (
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 flex justify-between">
                  <span className="text-gray-500">Market Cap</span>
                  <span className="font-bold text-[#131722] dark:text-white font-mono">
                    {asset.stats.marketCap}
                  </span>
                </div>
              )}
              {asset.stats.peRatio && (
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 flex justify-between">
                  <span className="text-gray-500">P/E Ratio</span>
                  <span className="font-bold text-[#131722] dark:text-white font-mono">
                    {asset.stats.peRatio.toFixed(1)}
                  </span>
                </div>
              )}
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 flex justify-between">
                <span className="text-gray-500">52W High</span>
                <span className="font-bold text-[#131722] dark:text-white font-mono">
                  ${asset.stats.fiftyTwoWeekHigh.toFixed(2)}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 flex justify-between">
                <span className="text-gray-500">52W Low</span>
                <span className="font-bold text-[#131722] dark:text-white font-mono">
                  ${asset.stats.fiftyTwoWeekLow.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Paper Trading Simulation Bar */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#131722] dark:text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Paper Trade ({asset.symbol})
              </span>
              <span className="text-[11px] text-gray-500 font-mono">
                Cash: ${cashBalance.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <label className="text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                Shares:
              </label>
              <div className="flex items-center gap-1">
                {[1, 5, 10, 25].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setTradeShares(amt)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                      tradeShares === amt
                        ? 'bg-[#2962FF] text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                    }`}
                    type="button"
                  >
                    {amt}
                  </button>
                ))}
              </div>
              <span className="text-xs font-mono font-bold text-gray-700 dark:text-gray-300 ml-auto">
                ≈ ${(tradeShares * asset.price).toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleTrade('BUY')}
                className="py-2.5 rounded-xl bg-[#089981] hover:bg-[#078570] text-white font-bold text-xs shadow-sm active:scale-98 transition-all cursor-pointer"
                type="button"
              >
                Buy {tradeShares} @ ${asset.price.toFixed(2)}
              </button>
              <button
                onClick={() => handleTrade('SELL')}
                className="py-2.5 rounded-xl bg-[#F23645] hover:bg-[#d92c3a] text-white font-bold text-xs shadow-sm active:scale-98 transition-all cursor-pointer"
                type="button"
              >
                Sell {tradeShares} @ ${asset.price.toFixed(2)}
              </button>
            </div>

            {tradeStatus && (
              <div className="mt-2 text-center text-xs font-bold text-[#089981] flex items-center justify-center gap-1">
                <Check className="w-3.5 h-3.5" />
                {tradeStatus}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed pb-4">
            <h4 className="font-bold text-[#131722] dark:text-white mb-1">About {asset.name}</h4>
            <p>{asset.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
