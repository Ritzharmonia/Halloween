import React, { useEffect, useRef } from 'react';

export const HalloweenVillageSky: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particles: Magical dust + decaying autumn leaves
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      type: 'dust' | 'leaf';
      rotation: number;
      rotationSpeed: number;
      color: string;
    }> = [];

    // Create 45 magical dust motes
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.6 + 0.2,
        type: 'dust',
        rotation: 0,
        rotationSpeed: 0,
        color: Math.random() > 0.4 ? '#8EA2C6' : '#C4C9D6',
      });
    }

    // Create 20 falling gothic leaves
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 5 + 3,
        speedX: Math.sin(Math.random() * Math.PI) * 0.6 - 0.2,
        speedY: Math.random() * 0.7 + 0.35,
        opacity: Math.random() * 0.45 + 0.35,
        type: 'leaf',
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        color: Math.random() > 0.5 ? '#3D354A' : '#2A3042',
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.type === 'leaf') {
          p.rotation += p.rotationSpeed;
          // Sway slightly
          p.x += Math.sin(p.y * 0.015) * 0.4;
        }

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;

        if (p.type === 'dust') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw jagged gothic leaf silhouette
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size * 0.8, -p.size * 0.2, p.size * 0.5, p.size);
          ctx.quadraticCurveTo(0, p.size * 0.7, -p.size * 0.5, p.size);
          ctx.quadraticCurveTo(-p.size * 0.8, -p.size * 0.2, 0, -p.size);
          ctx.fill();
        }
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dark night sky gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080B13] via-[#0F182B] to-[#080B13]" />

      {/* Cloud & mist layers */}
      <div className="absolute inset-0 opacity-25 mix-blend-screen animate-fog-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#172744] via-transparent to-transparent" />
      <div className="absolute -inset-x-20 top-0 h-[600px] opacity-15 animate-fog-2 bg-[radial-gradient(circle_at_70%_20%,_#526780_0%,_transparent_60%)]" />

      {/* Large Glowing Crescent Moon */}
      <div className="absolute top-10 right-[8%] sm:right-[15%] w-36 h-36 sm:w-52 sm:h-52 select-none">
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_40px_rgba(166,170,181,0.35)]">
          <defs>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E2E5EE" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#A6AAB5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#526780" stopOpacity="0.3" />
            </radialGradient>
            <mask id="crescentMask">
              <rect width="100" height="100" fill="white" />
              <circle cx="58" cy="40" r="38" fill="black" />
            </mask>
          </defs>
          {/* Eerie halo glow */}
          <circle cx="48" cy="50" r="45" fill="url(#moonGlow)" opacity="0.25" filter="blur(6px)" />
          {/* Moon crescent with crater texture */}
          <circle cx="48" cy="50" r="39" fill="url(#moonGlow)" mask="url(#crescentMask)" />
          {/* Subtle craters in the crescent */}
          <circle cx="28" cy="36" r="3.2" fill="#526780" opacity="0.3" mask="url(#crescentMask)" />
          <circle cx="24" cy="52" r="4.5" fill="#526780" opacity="0.25" mask="url(#crescentMask)" />
          <circle cx="34" cy="68" r="3" fill="#526780" opacity="0.2" mask="url(#crescentMask)" />
        </svg>
      </div>

      {/* Distant silhouettes of gothic rooftops and spires (Fixed backdrop) */}
      <div className="absolute bottom-0 inset-x-0 h-96 opacity-35 select-none">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full text-[#080B13] fill-current"
        >
          {/* Spire and crooked roofline silhouette */}
          <path d="M0,320 L0,240 L35,210 L50,140 L55,210 L90,230 L130,195 L160,250 L200,160 L205,110 L212,160 L240,245 L320,260 L360,180 L380,130 L385,180 L440,230 L510,210 L540,165 L570,225 L650,260 L710,190 L730,120 L735,90 L742,120 L770,230 L850,245 L910,170 L935,130 L942,170 L990,255 L1060,220 L1100,150 L1108,100 L1116,150 L1160,240 L1240,220 L1290,175 L1320,130 L1350,220 L1440,240 L1440,320 Z" />
        </svg>
      </div>

      {/* Twisted Leafless Tim Burton Trees on Left and Right flanks */}
      {/* Left crooked tree */}
      <div className="absolute top-24 -left-12 sm:left-0 w-64 sm:w-96 h-[680px] opacity-45 select-none pointer-events-none">
        <svg viewBox="0 0 300 700" className="w-full h-full fill-none stroke-[#0A0E18] stroke-[6]">
          <path
            d="M-20,700 Q40,550 50,420 Q65,260 90,160 Q110,90 140,20 M50,420 Q-20,350 -60,330 M65,260 Q130,220 190,200 Q230,180 270,140 M190,200 Q200,150 240,90 M75,320 Q120,310 160,350 M90,160 Q60,110 30,80 Q10,60 -20,60"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Right crooked tree with spiraling branches */}
      <div className="absolute top-48 -right-12 sm:right-0 w-64 sm:w-96 h-[720px] opacity-45 select-none pointer-events-none">
        <svg viewBox="0 0 300 700" className="w-full h-full fill-none stroke-[#0A0E18] stroke-[6]">
          <path
            d="M320,700 Q250,530 230,390 Q210,240 180,140 Q150,60 120,10 M230,390 Q290,320 340,300 M210,240 Q130,200 80,180 Q30,160 -10,120 M80,180 Q70,130 30,70 M220,310 Q160,290 130,330 M180,140 Q210,90 240,70 Q270,50 300,50"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Rolling Low Ground Fog layers */}
      <div className="absolute bottom-0 inset-x-0 h-44 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B13] via-[#080B13]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-4 h-28 bg-[radial-gradient(ellipse_at_bottom,_rgba(82,103,128,0.18)_0%,_transparent_70%)] animate-fog-1" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-[radial-gradient(ellipse_at_bottom,_rgba(23,39,68,0.25)_0%,_transparent_80%)] animate-fog-2" />
      </div>

      {/* Dynamic Canvas Particles (Dust + Leaves) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
