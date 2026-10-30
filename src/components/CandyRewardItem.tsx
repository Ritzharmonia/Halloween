import React from 'react';
import { CandyReward } from '../types';

interface CandyRewardItemProps {
  candy: CandyReward;
  earnedCount: number;
  knockRating?: string;
}

export const CandyRewardItem: React.FC<CandyRewardItemProps> = ({
  candy,
  earnedCount,
  knockRating,
}) => {
  const renderCandyIcon = () => {
    switch (candy.type) {
      case 'chocolate':
        return (
          <svg viewBox="0 0 80 80" className="w-16 h-16 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
            <rect x="20" y="24" width="40" height="46" rx="4" fill="#240D12" stroke="#451D25" strokeWidth="2" />
            <rect x="26" y="30" width="12" height="16" fill="#14080B" stroke="#451D25" strokeWidth="1" />
            <rect x="42" y="30" width="12" height="16" fill="#14080B" stroke="#451D25" strokeWidth="1" />
            <rect x="26" y="50" width="12" height="15" fill="#14080B" stroke="#451D25" strokeWidth="1" />
            <rect x="42" y="50" width="12" height="15" fill="#14080B" stroke="#451D25" strokeWidth="1" />
            <path d="M 16 12 L 64 12 L 60 32 L 20 32 Z" fill="#6A2E39" stroke="#8E283E" strokeWidth="1.5" />
            <line x1="20" y1="32" x2="60" y2="32" stroke="#BAC2CE" strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>
        );

      case 'lollipop':
        return (
          <svg viewBox="0 0 80 80" className="w-16 h-16 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
            <line x1="40" y1="45" x2="40" y2="76" stroke="#877B5E" strokeWidth="3" strokeLinecap="round" />
            <circle cx="40" cy="30" r="22" fill={candy.colors.primary} stroke={candy.colors.accent} strokeWidth="2" />
            <path
              d="M 40 30 C 40 20 48 20 48 30 C 48 42 32 42 32 30 C 32 15 54 15 54 30"
              fill="none"
              stroke={candy.colors.glow}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path d="M 32 50 C 36 46 44 46 48 50 C 44 54 36 54 32 50 Z" fill="#A6AAB5" />
          </svg>
        );

      case 'macaron':
        return (
          <svg viewBox="0 0 80 80" className="w-16 h-16 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
            <ellipse cx="40" cy="32" rx="26" ry="12" fill={candy.colors.primary} stroke={candy.colors.accent} strokeWidth="1.5" />
            <rect x="15" y="32" width="50" height="8" rx="2" fill="#0A1810" />
            <ellipse cx="40" cy="40" rx="26" ry="12" fill={candy.colors.primary} stroke={candy.colors.accent} strokeWidth="1.5" />
            <circle cx="40" cy="27" r="3" fill="#FFFFFF" opacity="0.8" />
          </svg>
        );

      case 'wafer':
        return (
          <svg viewBox="0 0 80 80" className="w-16 h-16 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
            <rect x="22" y="20" width="36" height="44" rx="3" fill="#1A1A1E" stroke="#F0F0F2" strokeWidth="2" transform="rotate(-10 40 40)" />
            <line x1="26" y1="28" x2="54" y2="28" stroke="#F0F0F2" strokeWidth="1" strokeDasharray="3 2" transform="rotate(-10 40 40)" />
            <line x1="26" y1="38" x2="54" y2="38" stroke="#F0F0F2" strokeWidth="1" strokeDasharray="3 2" transform="rotate(-10 40 40)" />
            <line x1="26" y1="48" x2="54" y2="48" stroke="#F0F0F2" strokeWidth="1" strokeDasharray="3 2" transform="rotate(-10 40 40)" />
          </svg>
        );

      case 'truffle':
      case 'bonbon':
      case 'toffee':
      default:
        return (
          <svg viewBox="0 0 80 80" className="w-16 h-16 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
            <path d="M 22 40 L 8 26 L 10 54 Z" fill={candy.colors.accent} stroke="#FFFFFF" strokeWidth="1" />
            <path d="M 58 40 L 72 26 L 70 54 Z" fill={candy.colors.accent} stroke="#FFFFFF" strokeWidth="1" />
            <ellipse cx="40" cy="40" rx="20" ry="15" fill={candy.colors.primary} stroke={candy.colors.accent} strokeWidth="2" />
            <circle cx="37" cy="38" r="4" fill="none" stroke={candy.colors.glow} strokeWidth="1.2" />
            <circle cx="43" cy="41" r="2" fill={candy.colors.glow} />
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 animate-gentle-float text-center select-none">
      <div className="relative mb-2">
        <div
          className="absolute inset-0 rounded-full blur-md opacity-60"
          style={{ backgroundColor: candy.colors.glow }}
        />
        <div className="relative transform hover:scale-110 transition-transform duration-300">
          {renderCandyIcon()}
        </div>
      </div>
      <div className="font-cinzel text-sm sm:text-base font-bold text-slate-100 tracking-wide drop-shadow-md">
        {candy.name}
      </div>

      {/* Knock Quality Feedback */}
      {knockRating && (
        <div className="text-xs font-semibold text-amber-300 mt-1">
          {knockRating}
        </div>
      )}

      {/* Earned candy count badge */}
      <div className="mt-2 text-xs font-bold text-sky-300 bg-[#172744]/90 px-3 py-1 rounded-full border border-sky-400/40 shadow-sm">
        +{earnedCount} чихэр
      </div>
    </div>
  );
};
