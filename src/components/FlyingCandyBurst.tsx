import React from 'react';

export interface BurstParticle {
  id: string;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
}

interface FlyingCandyBurstProps {
  bursts: BurstParticle[];
  onComplete: (id: string) => void;
}

export const FlyingCandyBurst: React.FC<FlyingCandyBurstProps> = ({ bursts, onComplete }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {bursts.map((b) => (
        <div
          key={b.id}
          onAnimationEnd={() => onComplete(b.id)}
          className="absolute text-xl sm:text-2xl animate-candy-fly select-none"
          style={
            {
              left: `${b.startX}px`,
              top: `${b.startY}px`,
              '--target-x': `${b.targetX - b.startX}px`,
              '--target-y': `${b.targetY - b.startY}px`,
            } as React.CSSProperties
          }
        >
          🍬
        </div>
      ))}
    </div>
  );
};
