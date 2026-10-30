import React from 'react';
import { ArrowUp, Award, RotateCcw, Sparkles } from 'lucide-react';
import { UserProgress } from '../types';

interface EndingSectionProps {
  progress: UserProgress;
  onScrollToTop: () => void;
  onResetProgress: () => void;
}

export const EndingSection: React.FC<EndingSectionProps> = ({
  progress,
  onScrollToTop,
  onResetProgress,
}) => {
  const discoveredDoorsCount = Object.values(progress.openedDoors).filter(Boolean).length;
  const isCompletedAll = discoveredDoorsCount === 13;

  return (
    <footer className="relative w-full py-16 px-4 sm:px-8 mt-20 text-center z-10 border-t border-[#172744] bg-gradient-to-b from-transparent via-[#090E1B] to-[#04060A]">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Emblem */}
        <div className="relative mb-5">
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#A6AAB5] flex items-center justify-center bg-[#101B35] shadow-[0_0_30px_rgba(82,103,128,0.4)] ${
              isCompletedAll ? 'animate-bounce shadow-[0_0_50px_rgba(142,162,198,0.8)] border-sky-300' : ''
            }`}
          >
            {isCompletedAll ? (
              <Award className="w-8 h-8 sm:w-10 sm:h-10 text-sky-200" />
            ) : (
              <span className="text-2xl sm:text-3xl">🗝️</span>
            )}
          </div>
          {isCompletedAll && (
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-6 h-6 text-sky-300 animate-spin" />
            </div>
          )}
        </div>

        {/* Headline */}
        <h2 className="font-cinzel text-xl sm:text-3xl font-extrabold text-slate-100 tracking-wider mb-2 drop-shadow-lg">
          ТА АРВАН ГУРАВ ДАХЬ ШӨНИЙН ТӨГСГӨЛД ХҮРЛЭЭ
        </h2>

        {/* Subtitle */}
        <p className="font-cinzel text-xs sm:text-sm text-[#8EA2C6] max-w-lg mb-8 tracking-wide">
          13 хаалга нууцаа дэлгэлээ. Та хэдэн чихэр цуглуулав?
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
          <div className="p-3.5 bg-[#080B13]/85 rounded-lg border border-[#273B63] shadow-md">
            <div className="text-[11px] font-cinzel text-[#526780] tracking-wider mb-1">
              Цуглуулсан чихэр
            </div>
            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-100 flex items-center justify-center gap-1.5 tabular-nums">
              <span>🍬</span>
              <span>{progress.totalCandies}</span>
            </div>
          </div>

          <div className="p-3.5 bg-[#080B13]/85 rounded-lg border border-[#273B63] shadow-md">
            <div className="text-[11px] font-cinzel text-[#526780] tracking-wider mb-1">
              Нээсэн хаалга
            </div>
            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-sky-200 tabular-nums">
              {discoveredDoorsCount} / 13
            </div>
          </div>
        </div>

        {/* Completion Tribute */}
        {isCompletedAll && (
          <div className="w-full max-w-md p-4 mb-8 bg-gradient-to-r from-[#172744] via-[#241B3B] to-[#172744] border-2 border-sky-300/80 rounded-xl shadow-[0_0_35px_rgba(70,145,255,0.35)] animate-pulse">
            <div className="font-cinzel text-base sm:text-lg font-bold text-slate-100 tracking-wide mb-1 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span>ЧИХЭР ЦУГЛУУЛАГЧ</span>
              <Sparkles className="w-4 h-4 text-sky-300" />
            </div>
            <p className="text-xs text-[#C4C9D6]">
              Та бүх 13 хаалгыг амжилттай нээж, нууцлаг чихрийн цуглуулгыг бүрэн дүүргэлээ!
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <button
            onClick={onScrollToTop}
            className="w-full sm:w-auto px-6 py-3 bg-[#101B35] hover:bg-[#172744] text-slate-100 font-cinzel text-xs font-bold tracking-[0.15em] uppercase rounded-md border-2 border-[#A6AAB5] shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <ArrowUp className="w-4 h-4 text-sky-300" />
            <span>ЭХЛЭЛ РҮҮ БУЦАХ</span>
          </button>

          <button
            onClick={onResetProgress}
            className="w-full sm:w-auto px-4 py-3 bg-[#080B13]/70 hover:bg-[#101B35] text-[#777985] hover:text-[#A6AAB5] font-cinzel text-xs rounded-md border border-[#273B63] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Дахин эхлэх</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
