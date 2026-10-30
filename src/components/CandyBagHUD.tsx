import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, X } from 'lucide-react';
import { UserProgress } from '../types';

interface CandyBagHUDProps {
  progress: UserProgress;
  onToggleSound: () => void;
  isMuted: boolean;
}

export const CandyBagHUD: React.FC<CandyBagHUDProps> = ({
  progress,
  onToggleSound,
  isMuted,
}) => {
  const [isBagModalOpen, setIsBagModalOpen] = useState(false);

  // Dragging state for the floating pumpkin
  const [position, setPosition] = useState<{ x: number; y: number }>(() => {
    // Initial position on the upper right side
    const initialX = typeof window !== 'undefined' ? Math.max(window.innerWidth - 120, 20) : 20;
    return { x: initialX, y: 85 };
  });

  const isDraggingRef = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const elementStartPos = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  const discoveredDoorsCount = Object.values(progress.openedDoors).filter(Boolean).length;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Don't drag if clicking audio button directly
    if ((e.target as HTMLElement).closest('.sound-btn-prevent-drag')) return;

    isDraggingRef.current = true;
    hasMovedRef.current = false;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    elementStartPos.current = { ...position };

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = moveEvent.clientX - dragStartPos.current.x;
      const dy = moveEvent.clientY - dragStartPos.current.y;

      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        hasMovedRef.current = true;
      }

      const maxX = window.innerWidth - 95;
      const maxY = window.innerHeight - 105;

      const newX = Math.min(Math.max(10, elementStartPos.current.x + dx), maxX);
      const newY = Math.min(Math.max(10, elementStartPos.current.y + dy), maxY);

      setPosition({ x: newX, y: newY });
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handlePumpkinClick = () => {
    // Only open if the user clicked without dragging
    if (!hasMovedRef.current) {
      setIsBagModalOpen(true);
    }
  };

  return (
    <>
      {/* Draggable Floating Pumpkin Widget */}
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
        className="fixed top-0 left-0 z-40 select-none touch-none transition-shadow"
      >
        <div
          onPointerDown={handlePointerDown}
          onClick={handlePumpkinClick}
          role="button"
          tabIndex={0}
          aria-label="Хулуун чихрийн уут (Зөөж байрлуулах боломжтой). Дарж чихрийн цуглуулгыг үзэх."
          title="Чихрийн хулууг чирч зөөнө үү. Дарж үзэх."
          className="relative group cursor-grab active:cursor-grabbing flex flex-col items-center"
        >
          {/* Sound Toggle Button attached directly on top */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSound();
            }}
            aria-label={isMuted ? 'Дууг асаах' : 'Дууг хаах'}
            className="sound-btn-prevent-drag -mb-1 z-10 flex items-center gap-1 px-2 py-0.5 bg-[#080B13]/90 hover:bg-[#172744] text-[#A6AAB5] hover:text-white rounded-full border border-[#526780]/70 text-[10px] font-cinzel shadow-md transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-3 h-3 text-rose-400" />
            ) : (
              <Volume2 className="w-3 h-3 text-sky-300 animate-pulse" />
            )}
            <span className="text-[9px]">{isMuted ? 'Дуугүй' : 'Дуутай'}</span>
          </button>

          {/* Gothic Jack-o'-Lantern Pumpkin SVG Container */}
          <div className="relative w-20 h-20 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-200">
            {/* Pumpkin Wire Handle */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Antique twisted wire bucket handle */}
              <path
                d="M 22 42 C 22 10 78 10 78 42"
                fill="none"
                stroke="#A6AAB5"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="22" cy="42" r="3" fill="#526780" />
              <circle cx="78" cy="42" r="3" fill="#526780" />

              {/* Pumpkin Stem */}
              <path
                d="M 48 30 Q 52 18 60 16 Q 54 26 52 30 Z"
                fill="#3E271D"
                stroke="#172744"
                strokeWidth="1"
              />

              {/* Pumpkin Body (Gothic dark pumpkin with warm amber/blue inner glow) */}
              <g filter="drop-shadow(0 0 6px rgba(220,130,40,0.3))">
                {/* Back segments */}
                <ellipse cx="32" cy="58" rx="18" ry="24" fill="#3A1C0E" stroke="#1F0D06" strokeWidth="1.5" />
                <ellipse cx="68" cy="58" rx="18" ry="24" fill="#3A1C0E" stroke="#1F0D06" strokeWidth="1.5" />
                {/* Middle segments */}
                <ellipse cx="40" cy="60" rx="19" ry="26" fill="#542512" stroke="#2A1107" strokeWidth="1.5" />
                <ellipse cx="60" cy="60" rx="19" ry="26" fill="#542512" stroke="#2A1107" strokeWidth="1.5" />
                {/* Center front segment */}
                <ellipse cx="50" cy="61" rx="17" ry="27" fill="#6B2E15" stroke="#331408" strokeWidth="1.5" />
              </g>

              {/* Carved Gothic Eyes & Mouth (Glowing in warm candlelight) */}
              {/* Left Eye */}
              <polygon points="38,50 44,55 37,56" fill="#FFC857" filter="drop-shadow(0 0 4px #FFAA00)" />
              {/* Right Eye */}
              <polygon points="62,50 56,55 63,56" fill="#FFC857" filter="drop-shadow(0 0 4px #FFAA00)" />
              {/* Nose */}
              <polygon points="50,56 47,60 53,60" fill="#FFC857" />
              {/* Crooked carved smile */}
              <path
                d="M 36 67 L 41 69 L 45 66 L 50 70 L 55 66 L 59 69 L 64 67 Q 50 78 36 67 Z"
                fill="#FFC857"
                filter="drop-shadow(0 0 5px #FFAA00)"
              />
            </svg>

            {/* Total Candies Count Pill Badge */}
            <div className="absolute -bottom-1.5 inset-x-0 flex justify-center">
              <div className="flex items-center gap-1 px-2 py-0.5 bg-[#080B13]/95 border border-[#A6AAB5] rounded-full shadow-lg">
                <span className="text-[10px]">🍬</span>
                <span className="font-cinzel text-[11px] font-extrabold text-white tabular-nums">
                  {progress.totalCandies}
                </span>
              </div>
            </div>

            {/* Small Discovered Door Count Badge */}
            <div className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-[#172744] border border-sky-400/80 rounded-full text-[9px] font-cinzel font-bold text-sky-200 tabular-nums shadow">
              {discoveredDoorsCount}/13
            </div>
          </div>
        </div>
      </div>

      {/* Bag Inspection Modal */}
      {isBagModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg max-h-[85vh] bg-[#0A101D] border-2 border-[#A6AAB5] rounded-xl shadow-2xl p-5 sm:p-6 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#273B63]">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl filter drop-shadow">🎃</span>
                <div>
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-slate-100">
                    Хулуун чихрийн уут
                  </h3>
                  <p className="text-xs text-[#8EA2C6]">
                    Нийт {progress.totalCandies} чихэр цуглуулсан ({discoveredDoorsCount}/13 хаалга)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBagModalOpen(false)}
                className="p-1 text-[#A6AAB5] hover:text-slate-100 hover:bg-[#172744] rounded transition-colors cursor-pointer"
                aria-label="Хаах"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of treats collected */}
            <div className="flex-1 overflow-y-auto my-3 pr-1 space-y-2">
              {progress.collectedCandiesList.length === 0 ? (
                <div className="py-12 text-center text-[#526780] font-cinzel text-sm">
                  Хулуу одоогоор хоосон байна. Хаалгыг 3 удаа тогшиж чихрээ аваарай.
                </div>
              ) : (
                progress.collectedCandiesList.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-[#101B35]/80 border border-[#273B63] rounded-lg flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-[#080B13] border border-[#526780] flex items-center justify-center text-base shrink-0">
                        🍬
                      </div>
                      <div>
                        <div className="font-cinzel text-xs sm:text-sm font-semibold text-slate-100">
                          {item.candyName}
                        </div>
                        <div className="text-[11px] text-[#8EA2C6]">
                          Хаалга № {item.doorNumber}: {item.familyName}
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-sky-300 bg-[#172744] px-2.5 py-0.5 rounded border border-[#526780]">
                        +{item.count} чихэр
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal footer */}
            <div className="pt-3 border-t border-[#273B63] flex justify-end">
              <button
                onClick={() => setIsBagModalOpen(false)}
                className="px-5 py-1.5 bg-[#172744] hover:bg-[#1E335A] text-slate-100 font-cinzel text-xs tracking-wider rounded border border-[#526780] transition-colors cursor-pointer"
              >
                Хаах
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
