import React, { useState } from 'react';
import { NEWS_DATA } from '../data/marketData';
import { NewsItem } from '../types/market';
import { Clock, TrendingUp, TrendingDown, Minus, BookOpen, X } from 'lucide-react';

interface NewsTabProps {
  onSelectSymbol?: (symbol: string) => void;
}

export const NewsTab: React.FC<NewsTabProps> = ({ onSelectSymbol }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Technology', 'Indices', 'Crypto', 'Macro', 'Automotive'];

  const filteredNews = NEWS_DATA.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] font-bold text-[#131722] dark:text-white tracking-tight">
          Financial News
        </h2>
        <span className="text-xs font-semibold text-[#089981] flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#089981] animate-ping" />
          Live Feed
        </span>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 text-xs font-semibold">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-[#131722] dark:bg-white text-white dark:text-black'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
            }`}
            type="button"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Articles Feed */}
      <div className="space-y-3">
        {filteredNews.map((news) => (
          <article
            key={news.id}
            onClick={() => setSelectedNews(news)}
            className="p-4 bg-white dark:bg-[#1E222D] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xs hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer active:scale-99"
          >
            <div className="flex items-center justify-between text-[11px] text-gray-400 mb-2">
              <span className="font-semibold text-[#2962FF]">{news.source}</span>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {news.timeAgo}
                </span>
                <span>·</span>
                <span>{news.readTime}</span>
              </div>
            </div>

            <h3 className="font-bold text-[15px] text-[#131722] dark:text-white leading-snug mb-2 hover:text-[#2962FF] transition-colors">
              {news.title}
            </h3>

            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
              {news.summary}
            </p>

            <div className="flex items-center justify-between pt-1 border-t border-gray-50 dark:border-gray-800/80">
              {news.relatedSymbol ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectSymbol) onSelectSymbol(news.relatedSymbol!);
                  }}
                  className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[#131722] dark:text-white text-[11px] font-bold hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-[#2962FF] transition-colors"
                  type="button"
                >
                  ${news.relatedSymbol}
                </button>
              ) : (
                <span className="text-[11px] text-gray-400">{news.category}</span>
              )}

              <span
                className={`text-[11px] font-bold flex items-center gap-0.5 ${
                  news.sentiment === 'bullish'
                    ? 'text-[#089981]'
                    : news.sentiment === 'bearish'
                    ? 'text-[#F23645]'
                    : 'text-gray-500'
                }`}
              >
                {news.sentiment === 'bullish' && <TrendingUp className="w-3 h-3" />}
                {news.sentiment === 'bearish' && <TrendingDown className="w-3 h-3" />}
                {news.sentiment === 'neutral' && <Minus className="w-3 h-3" />}
                {news.sentiment.toUpperCase()}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            className="w-full max-w-md bg-white dark:bg-[#1E222D] rounded-2xl p-6 shadow-2xl border border-gray-100 dark:border-gray-800 space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2962FF] uppercase">
                {selectedNews.source} · {selectedNews.timeAgo}
              </span>
              <button
                onClick={() => setSelectedNews(null)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-bold text-[#131722] dark:text-white leading-tight">
              {selectedNews.title}
            </h3>

            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
              <p>{selectedNews.summary}</p>
              <p>
                Market analysts note that broader index breadth and macro resilience remain key drivers as traders position for the upcoming quarterly earnings calendar and monetary policy directives.
              </p>
              <p>
                TradingView Market Data monitors high volume flows across equities, commodities, and derivatives 24/7 with zero-latency quote streaming.
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
              <span className="text-gray-400">{selectedNews.readTime}</span>
              <button
                onClick={() => setSelectedNews(null)}
                className="px-4 py-2 rounded-xl bg-[#2962FF] text-white font-semibold cursor-pointer"
                type="button"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
