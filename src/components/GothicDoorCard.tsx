import React, { useState } from 'react';
import { DoorData } from '../types';
import { DoorVisual } from './DoorVisual';
import { CandyRewardItem } from './CandyRewardItem';
import { Sparkles, Check } from 'lucide-react';

interface GothicDoorCardProps {
  door: DoorData;
  knockCount: number;
  isOpen: boolean;
  isCollected: boolean;
  earnedCandies: number;
  knockRating?: string;
  onKnock: (doorId: string) => void;
  onCollect: (doorId: string, candyCount: number, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const GothicDoorCard: React.FC<GothicDoorCardProps> = ({
  door,
  knockCount,
  isOpen,
  isCollected,
  earnedCandies,
  knockRating,
  onKnock,
  onCollect,
}) => {
  const [isKnockingAnim, setIsKnockingAnim] = useState(false);

  const handleDoorClick = () => {
    if (isOpen) return;

    setIsKnockingAnim(true);
    setTimeout(() => setIsKnockingAnim(false), 380);

    onKnock(door.id);
  };

  const handleCollectClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCollect(door.id, earnedCandies, e);
  };

  return (
    <div
      id={`door-${door.number}`}
      className="relative w-full max-w-xl mx-auto flex flex-col items-center my-14 sm:my-20 scroll-mt-24"
    >
      {/* Crooked Victorian Gaslight Streetlamp on alternating flanks */}
      <div
        className={`hidden md:block absolute top-12 ${
          door.number % 2 === 1 ? '-left-20' : '-right-20'
        } pointer-events-none select-none z-10`}
      >
        <div className="relative w-16 h-40">
          <svg viewBox="0 0 60 160" className="w-full h-full fill-none stroke-[#080B13] stroke-[3]">
            <path d="M 30 160 Q 25 90 32 40 Q 35 15 45 10" />
            <polygon points="35,15 55,10 50,45 30,50" fill="#101B35" stroke="#526780" strokeWidth="2" />
            <polygon points="37,20 53,16 48,42 32,46" fill="#FFF2B2" opacity="0.8" className="animate-gaslight" />
          </svg>
          <div className="absolute top-2 left-6 w-12 h-12 rounded-full bg-amber-200/20 blur-md animate-gaslight pointer-events-none" />
        </div>
      </div>

      {/* Header: Clean Number & Family Name */}
      <div className="text-center mb-3 z-10 px-4">
        <div className="text-[11px] tracking-[0.25em] font-medium text-[#526780] uppercase mb-1">
          Хаалга № {String(door.number).padStart(2, '0')}
        </div>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-wider drop-shadow-lg">
          {door.familyName}
        </h2>
      </div>

      {/* The Physical Gothic Door Frame */}
      <div className="relative w-64 sm:w-80 h-96 sm:h-[450px] flex items-center justify-center">
        <div
          role="button"
          tabIndex={0}
          aria-label={`${door.familyName} хаалгыг тогших. Тогшилт: ${knockCount}/3.`}
          onClick={handleDoorClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleDoorClick();
            }
          }}
          className={`w-full h-full relative cursor-pointer group focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-t-[70px] sm:rounded-t-[90px] transition-transform duration-200 ${
            !isOpen ? 'hover:scale-[1.01]' : 'cursor-default'
          }`}
        >
          {/* Bespoke Door Visual */}
          <DoorVisual
            door={door}
            isOpen={isOpen}
            isKnocking={isKnockingAnim}
            knockCount={knockCount}
          />

          {/* Opened Door Interior: Revealed Candy Reward */}
          {isOpen && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4">
              <CandyRewardItem
                candy={door.candyReward}
                earnedCount={earnedCandies}
                knockRating={knockRating}
              />

              <div className="mt-3">
                {!isCollected ? (
                  <button
                    onClick={handleCollectClick}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#172744] via-[#2A3859] to-[#172744] hover:from-[#1E335A] hover:to-[#1E335A] text-slate-100 font-cinzel text-xs sm:text-sm tracking-widest font-bold uppercase rounded-md border border-sky-300 shadow-[0_0_18px_rgba(142,162,198,0.5)] hover:shadow-[0_0_25px_rgba(142,162,198,0.8)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-sky-300 animate-spin" />
                    <span>ЧИХЭР АВАХ</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#080B13]/90 border border-[#526780]/70 rounded text-xs text-sky-200 font-cinzel tracking-wider">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>АВСАН</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stone Steps Beneath Door */}
      <div className="w-72 sm:w-96 flex flex-col items-center -mt-2 z-0 select-none">
        <div className="w-full h-3 bg-[#101B35] border-t border-[#273B63] rounded-t-sm shadow-md" />
        <div className="w-[108%] h-3 bg-[#0D152B] border-t border-[#172744] rounded-t-sm shadow-lg" />
        <div className="w-[116%] h-3.5 bg-[#080B13] border-t border-[#101B35] rounded-t-sm shadow-xl" />
      </div>

      {/* Clean Knock Status Indicator */}
      <div className="mt-3 flex flex-col items-center gap-1 z-10 text-center">
        {!isOpen ? (
          <div className="flex items-center gap-2 bg-[#080B13]/90 px-4 py-1.5 rounded-full border border-[#273B63]">
            <span className="text-xs text-[#A6AAB5] font-medium">
              Тогшилт:
            </span>
            <span className="font-cinzel text-xs font-bold text-sky-200">
              {knockCount} / 3
            </span>
            <div className="flex items-center gap-1.5 ml-1">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    step <= knockCount
                      ? 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)] scale-110'
                      : 'bg-[#273B63]'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-xs text-[#8EA2C6] font-medium font-cinzel">
            {door.familyName} хаалга нээгдлээ
          </div>
        )}
      </div>
    </div>
  );
};
