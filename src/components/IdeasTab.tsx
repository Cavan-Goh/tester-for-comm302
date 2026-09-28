import React, { useState } from 'react';
import { IDEAS_DATA } from '../data/marketData';
import { TradingIdea } from '../types/market';
import { ThumbsUp, MessageSquare, ArrowUpRight, ArrowDownRight, Share2 } from 'lucide-react';

interface IdeasTabProps {
  onSelectSymbol?: (symbol: string) => void;
}

export const IdeasTab: React.FC<IdeasTabProps> = ({ onSelectSymbol }) => {
  const [ideas, setIdeas] = useState<TradingIdea[]>(IDEAS_DATA);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const handleToggleLike = (ideaId: string) => {
    setLikedMap((prev) => {
      const isLiked = !prev[ideaId];
      setIdeas((current) =>
        current.map((item) =>
          item.id === ideaId
            ? { ...item, likes: item.likes + (isLiked ? 1 : -1) }
            : item
        )
      );
      return { ...prev, [ideaId]: isLiked };
    });
  };

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] font-bold text-[#131722] dark:text-white tracking-tight">
          Community Ideas
        </h2>
        <span className="text-xs text-gray-400 font-medium">Top Authors</span>
      </div>

      <div className="space-y-4">
        {ideas.map((idea) => {
          const isLong = idea.direction === 'LONG';
          const isLiked = likedMap[idea.id];

          return (
            <div
              key={idea.id}
              className="p-4 bg-white dark:bg-[#1E222D] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xs space-y-3"
            >
              {/* Author Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={idea.author.avatar}
                    alt={idea.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-[#131722] dark:text-white">
                        {idea.author.name}
                      </span>
                      {idea.author.isPro && (
                        <span className="px-1 py-0.2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-extrabold rounded">
                          PRO
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400">
                      {idea.timestamp} · {idea.author.reputation.toLocaleString()} rep
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectSymbol && onSelectSymbol(idea.symbol)}
                    className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs font-bold text-[#131722] dark:text-white hover:text-[#2962FF] cursor-pointer"
                    type="button"
                  >
                    {idea.symbol}
                  </button>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-0.5 ${
                      isLong
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#089981]'
                        : 'bg-rose-50 dark:bg-rose-950/40 text-[#F23645]'
                    }`}
                  >
                    {isLong ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {idea.direction} · {idea.timeframe}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-bold text-[15px] text-[#131722] dark:text-white mb-1.5 leading-snug">
                  {idea.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {idea.description}
                </p>
                {idea.targetPrice && (
                  <div className="mt-2 text-xs font-semibold text-gray-500 flex items-center gap-1">
                    <span>Target:</span>
                    <span className="font-bold font-mono text-[#089981]">
                      ${idea.targetPrice.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Simulated Chart preview bar */}
              <div className="w-full h-12 bg-gray-50 dark:bg-[#131722] rounded-xl p-2 flex items-center justify-between border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-1 text-[11px] text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-[#089981]" />
                  <span>Technical Analysis Setup Chart</span>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">1D Candlestick</span>
              </div>

              {/* Social interactions */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500">
                <button
                  onClick={() => handleToggleLike(idea.id)}
                  className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
                    isLiked ? 'text-[#2962FF] font-bold bg-blue-50 dark:bg-blue-900/30' : 'hover:text-[#131722] dark:hover:text-white'
                  }`}
                  type="button"
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{idea.likes}</span>
                </button>

                <div className="flex items-center gap-1.5 py-1 px-2.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{idea.comments} comments</span>
                </div>

                <button
                  onClick={() => alert(`Idea link copied to clipboard!`)}
                  className="p-1.5 hover:text-[#131722] dark:hover:text-white transition-colors cursor-pointer"
                  type="button"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
