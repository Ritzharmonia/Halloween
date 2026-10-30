/**
 * АРВАН ГУРАВ ДАХЬ ШӨНӨ — Хэлхээт хаалга
 * Corpse Bride, Alice in Wonderland, Тим Бертон маягийн готик хэв маягтай чихэр цуглуулах веб.
 */

import React, { useState, useEffect, useRef } from 'react';
import { DOORS_DATA } from './data/doors';
import { UserProgress } from './types';
import { soundManager } from './utils/audio';
import { HalloweenVillageSky } from './components/HalloweenVillageSky';
import { GothicDoorCard } from './components/GothicDoorCard';
import { CandyBagHUD } from './components/CandyBagHUD';
import { EndingSection } from './components/EndingSection';
import { FlyingCandyBurst, BurstParticle } from './components/FlyingCandyBurst';
import { ChevronDown } from 'lucide-react';

const STORAGE_KEY = 'the_thirteenth_night_progress_mn_v2';

const getInitialProgress = (): UserProgress => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        knocks: parsed.knocks || {},
        openedDoors: parsed.openedDoors || {},
        collectedDoors: parsed.collectedDoors || {},
        earnedCandies: parsed.earnedCandies || {},
        knockRatings: parsed.knockRatings || {},
        totalCandies: typeof parsed.totalCandies === 'number' ? parsed.totalCandies : 0,
        collectedCandiesList: Array.isArray(parsed.collectedCandiesList) ? parsed.collectedCandiesList : [],
      };
    }
  } catch (err) {
    console.error('Failed to parse saved progress from localStorage', err);
  }
  return {
    knocks: {},
    openedDoors: {},
    collectedDoors: {},
    earnedCandies: {},
    knockRatings: {},
    totalCandies: 0,
    collectedCandiesList: [],
  };
};

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [flyingCandies, setFlyingCandies] = useState<BurstParticle[]>([]);

  // Track knock timestamps to evaluate how well the user knocks (2 to 10 candies)
  const knockTimesRef = useRef<Record<string, number[]>>({});

  // Save progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (err) {
      console.error('Failed to save progress to localStorage', err);
    }
  }, [progress]);

  // Handle knocking on a door with timing / rhythm evaluation
  const handleKnock = (doorId: string) => {
    soundManager.startAtmosphere();

    const now = Date.now();
    if (!knockTimesRef.current[doorId]) {
      knockTimesRef.current[doorId] = [];
    }
    const timestamps = knockTimesRef.current[doorId];
    timestamps.push(now);

    const currentKnocks = progress.knocks[doorId] || 0;
    const nextKnocks = currentKnocks + 1;

    if (nextKnocks === 1) {
      soundManager.playKnock(1);
      setProgress((prev) => ({
        ...prev,
        knocks: { ...prev.knocks, [doorId]: 1 },
      }));
    } else if (nextKnocks === 2) {
      soundManager.playKnock(2);
      setProgress((prev) => ({
        ...prev,
        knocks: { ...prev.knocks, [doorId]: 2 },
      }));
    } else if (nextKnocks >= 3) {
      soundManager.playKnock(3);
      setTimeout(() => soundManager.playDoorCreak(), 180);
      setTimeout(() => soundManager.playMagicReveal(), 500);

      // Evaluate knock rhythm quality based on timing intervals (5 to 15 candies)
      let earned = 9;
      let rating = 'Сайн тогшилт! (+9)';

      if (timestamps.length >= 3) {
        const t1 = timestamps[timestamps.length - 3];
        const t2 = timestamps[timestamps.length - 2];
        const t3 = timestamps[timestamps.length - 1];

        const int1 = t2 - t1;
        const int2 = t3 - t2;
        const avgInt = (int1 + int2) / 2;
        const diff = Math.abs(int1 - int2);

        // Sweet spot: 400ms - 950ms cadence with consistent rhythm
        if (avgInt >= 400 && avgInt <= 950 && diff < 280) {
          earned = 15;
          rating = 'Төгс хэмнэл! (+15)';
        } else if (avgInt >= 300 && avgInt <= 1200 && diff < 450) {
          earned = diff < 300 ? 14 : 13;
          rating = `Маш сайн тогшилт! (+${earned})`;
        } else if (avgInt >= 200 && avgInt <= 1800) {
          earned = diff < 600 ? 11 : 10;
          rating = `Сайн тогшилт! (+${earned})`;
        } else if (avgInt < 200) {
          // Fast mash / spamming
          earned = 6;
          rating = 'Түргэн тогшилт (+6)';
        } else {
          // Slow cadence
          earned = 5;
          rating = 'Удаан тогшилт (+5)';
        }
      } else {
        earned = 10;
        rating = 'Сайн тогшилт! (+10)';
      }

      setProgress((prev) => ({
        ...prev,
        knocks: { ...prev.knocks, [doorId]: 3 },
        openedDoors: { ...prev.openedDoors, [doorId]: true },
        earnedCandies: { ...prev.earnedCandies, [doorId]: earned },
        knockRatings: { ...prev.knockRatings, [doorId]: rating },
      }));
    }
  };

  // Handle collecting candies from an opened door
  const handleCollect = (
    doorId: string,
    candyCount: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (progress.collectedDoors[doorId]) return;

    soundManager.playCandyCollect();

    // Trigger visual flying candies animation towards top right HUD
    const rect = event.currentTarget.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    const targetX = window.innerWidth - 60;
    const targetY = 120;

    const newParticles: BurstParticle[] = [];
    for (let i = 0; i < Math.min(candyCount, 6); i++) {
      newParticles.push({
        id: `${doorId}-${Date.now()}-${i}`,
        startX: startX + (Math.random() - 0.5) * 30,
        startY: startY + (Math.random() - 0.5) * 30,
        targetX,
        targetY,
      });
    }
    setFlyingCandies((prev) => [...prev, ...newParticles]);

    const door = DOORS_DATA.find((d) => d.id === doorId);
    if (!door) return;

    setProgress((prev) => ({
      ...prev,
      collectedDoors: { ...prev.collectedDoors, [doorId]: true },
      totalCandies: prev.totalCandies + candyCount,
      collectedCandiesList: [
        ...prev.collectedCandiesList,
        {
          doorNumber: door.number,
          familyName: door.familyName,
          candyName: door.candyReward.name,
          count: candyCount,
          collectedAt: new Date().toLocaleTimeString(),
        },
      ],
    }));
  };

  const handleParticleComplete = (id: string) => {
    setFlyingCandies((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToFirstDoor = () => {
    const el = document.getElementById('door-1');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetProgress = () => {
    if (
      window.confirm(
        'Та аяллаа дахин эхлүүлэхдээ итгэлтэй байна уу? Цуглуулсан чихэр болон онгойлгосон хаалгууд анхны төлөвтөө шилжинэ.'
      )
    ) {
      knockTimesRef.current = {};
      const resetState: UserProgress = {
        knocks: {},
        openedDoors: {},
        collectedDoors: {},
        earnedCandies: {},
        knockRatings: {},
        totalCandies: 0,
        collectedCandiesList: [],
      };
      setProgress(resetState);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error(e);
      }
      scrollToTop();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080B13] text-[#A6AAB5] selection:bg-[#51465F] selection:text-white">
      {/* Ambient Gothic Background Sky & Particle Canvas */}
      <HalloweenVillageSky />

      {/* Floating Right HUD: Candy Bag & Audio Toggle */}
      <CandyBagHUD
        progress={progress}
        onToggleSound={handleToggleSound}
        isMuted={isMuted}
      />

      {/* Flying Candies Animation Overlay */}
      <FlyingCandyBurst
        bursts={flyingCandies}
        onComplete={handleParticleComplete}
      />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* ========================================================
            HERO / OPENING SCENE
            ======================================================== */}
        <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center px-4 pt-14 pb-14 text-center">
          {/* Top Center Title */}
          <h1 className="font-cinzel-decorative text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-wide max-w-3xl leading-snug drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]">
            Хэллоуины өмнөх хар дарсан зүүд
          </h1>

          {/* Clean Subtitle */}
          <p className="font-cinzel text-sm sm:text-lg md:text-xl text-[#8EA2C6] max-w-xl mt-3 font-semibold tracking-wide drop-shadow-md">
            13 хаалга. 13 нууц. Хэлхээт чихрийн цуглуулга.
          </p>

          {/* Simple Instruction */}
          <p className="text-xs sm:text-sm text-[#A6AAB5] max-w-lg mt-2 italic font-light tracking-wider">
            "Хаалгаа сонго. Гурван удаа тогш. Нууцыг нээ."
          </p>

          {/* Call to Begin Scroll Button */}
          <button
            onClick={scrollToFirstDoor}
            className="group mt-8 px-6 py-3 bg-[#101B35]/90 hover:bg-[#172744] text-slate-100 font-cinzel text-xs tracking-[0.2em] uppercase rounded-full border border-sky-400/40 shadow-lg transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Хаалга руу очих</span>
            <ChevronDown className="w-4 h-4 text-sky-300 group-hover:translate-y-1 transition-transform" />
          </button>
        </section>

        {/* Winding stone pathway guide */}
        <div className="w-full max-w-4xl px-4 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#273B63]/40 via-[#172744]/30 to-[#273B63]/40 pointer-events-none" />

          {/* ========================================================
              THE THIRTEEN DOORS
              Arranged vertically TOP TO BOTTOM in the EXACT required order:
              1. Montaque
              2. Charmiell
              3. Obelia
              4. Agriche
              5. Dunkelheit
              6. Castiglione
              7. Avrevielle
              8. Vensanting
              9. Morvathier
              10. Pedelian
              11. Dimitri Sergeyev
              12. Larivier
              13. Glorytic
              ======================================================== */}
          <div className="flex flex-col items-center w-full">
            {DOORS_DATA.map((door) => {
              const currentKnocks = progress.knocks[door.id] || 0;
              const isOpen = Boolean(progress.openedDoors[door.id]);
              const isCollected = Boolean(progress.collectedDoors[door.id]);
              const earnedCandies = progress.earnedCandies[door.id] || 9;
              const knockRating = progress.knockRatings[door.id];

              return (
                <GothicDoorCard
                  key={door.id}
                  door={door}
                  knockCount={currentKnocks}
                  isOpen={isOpen}
                  isCollected={isCollected}
                  earnedCandies={earnedCandies}
                  knockRating={knockRating}
                  onKnock={handleKnock}
                  onCollect={handleCollect}
                />
              );
            })}
          </div>
        </div>

        {/* ========================================================
            ENDING SECTION
            ======================================================== */}
        <EndingSection
          progress={progress}
          onScrollToTop={scrollToTop}
          onResetProgress={handleResetProgress}
        />
      </div>
    </div>
  );
}
