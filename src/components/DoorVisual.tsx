import React from 'react';
import { DoorData } from '../types';

interface DoorVisualProps {
  door: DoorData;
  isOpen: boolean;
  isKnocking: boolean;
  knockCount: number;
}

export const DoorVisual: React.FC<DoorVisualProps> = ({ door, isOpen, isKnocking, knockCount }) => {
  const isDoubleDoor = door.architecture.archType === 'victorian_double';

  // Individual door SVG artwork based on door id and new custom colors
  const renderDoorArtwork = () => {
    const metal = door.colors.metalwork;
    const highlight = door.colors.highlight;
    const panel = door.colors.panelBg;
    const border = door.colors.doorBorder;

    switch (door.id) {
      case 'montaque':
        // Plum / Dark cherry, Silver: Victorian double door, crescent moon ornament, silver filigree
        return (
          <g>
            {/* Top crescent moon ornament in Silver */}
            <path
              d="M 92 35 A 12 12 0 1 0 108 35 A 9 9 0 1 1 92 35 Z"
              fill={metal}
              filter="drop-shadow(0 0 5px rgba(216,223,235,0.6))"
            />
            {/* Filigree scrolls on left door in Silver */}
            <path
              d="M 30 70 Q 55 85 45 110 T 30 140 M 30 85 Q 70 85 70 120"
              fill="none"
              stroke={metal}
              strokeWidth="1.8"
              opacity="0.85"
            />
            {/* Filigree scrolls on right door in Silver */}
            <path
              d="M 170 70 Q 145 85 155 110 T 170 140 M 170 85 Q 130 85 130 120"
              fill="none"
              stroke={metal}
              strokeWidth="1.8"
              opacity="0.85"
            />
            {/* Silver lion ring knockers */}
            <circle cx="65" cy="165" r="9" fill="none" stroke={metal} strokeWidth="2.5" />
            <circle cx="65" cy="160" r="5" fill={metal} />
            <circle cx="135" cy="165" r="9" fill="none" stroke={metal} strokeWidth="2.5" />
            <circle cx="135" cy="160" r="5" fill={metal} />
            {/* Lower panel moldings in Maroon & Silver */}
            <rect x="25" y="210" width="60" height="90" fill={panel} stroke={border} strokeWidth="2" rx="3" />
            <rect x="115" y="210" width="60" height="90" fill={panel} stroke={border} strokeWidth="2" rx="3" />
            <path d="M 55 235 L 55 275 M 35 255 L 75 255" stroke={metal} strokeWidth="1" opacity="0.6" />
            <path d="M 145 235 L 145 275 M 125 255 L 165 255" stroke={metal} strokeWidth="1" opacity="0.6" />
          </g>
        );

      case 'charmiell':
        // Dark red and Gold: delicate floral carvings, thorny vines, butterflies
        return (
          <g>
            {/* Thorny vines on arch */}
            <path
              d="M 15 320 Q 10 180 20 100 Q 40 40 100 25 Q 160 40 180 100 Q 190 180 185 320"
              fill="none"
              stroke={border}
              strokeWidth="4"
            />
            {/* Thorns in Gold */}
            <path
              d="M 18 180 L 8 175 M 15 130 L 5 135 M 26 80 L 18 70 M 60 40 L 55 30 M 140 40 L 145 30 M 174 80 L 182 70 M 185 130 L 195 135 M 182 180 L 192 175"
              stroke={metal}
              strokeWidth="2.5"
            />
            {/* Carved Gold roses */}
            <circle cx="100" cy="50" r="11" fill={panel} stroke={metal} strokeWidth="2" />
            <path d="M 95 50 Q 100 44 105 50 Q 100 56 95 50" fill="none" stroke={highlight} strokeWidth="1.5" />
            {/* Decorative Gold butterflies */}
            <g transform="translate(45, 95) scale(0.7)">
              <path d="M 0 0 C -15 -15 -25 0 0 10 C 25 0 15 -15 0 0 Z" fill={metal} opacity="0.9" />
              <path d="M 0 0 C -12 15 -20 5 0 10 C 20 5 12 15 0 0 Z" fill={metal} opacity="0.9" />
            </g>
            <g transform="translate(155, 120) scale(0.6) rotate(15)">
              <path d="M 0 0 C -15 -15 -25 0 0 10 C 25 0 15 -15 0 0 Z" fill={metal} opacity="0.9" />
            </g>
            {/* Gold handle */}
            <path d="M 140 150 Q 155 170 140 190" fill="none" stroke={metal} strokeWidth="3" strokeLinecap="round" />
          </g>
        );

      case 'obelia':
        // Blue and White: floral glass panels, antique white handles
        return (
          <g>
            {/* Floral leaded glass panes in Blue & White */}
            <path
              d="M 35 120 L 35 100 A 65 65 0 0 1 165 100 L 165 120 Z"
              fill={panel}
              stroke={border}
              strokeWidth="2"
            />
            {/* Glass stained petals in White */}
            <circle cx="100" cy="85" r="16" fill={door.colors.doorBg} stroke={metal} strokeWidth="1.8" opacity="0.95" />
            <path d="M 100 70 L 100 100 M 85 85 L 115 85 M 90 74 L 110 96 M 90 96 L 110 74" stroke={metal} strokeWidth="1.5" opacity="0.85" />
            {/* Lower panel leaded grids */}
            <rect x="35" y="135" width="130" height="75" fill={panel} stroke={border} strokeWidth="1.5" />
            <path d="M 78 135 L 78 210 M 122 135 L 122 210" stroke={metal} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            <rect x="35" y="225" width="130" height="85" fill={panel} stroke={border} strokeWidth="1.5" />
            {/* Twin antique White handles */}
            <path d="M 90 185 Q 80 200 90 215" fill="none" stroke={metal} strokeWidth="3" />
            <path d="M 110 185 Q 120 200 110 215" fill="none" stroke={metal} strokeWidth="3" />
          </g>
        );

      case 'agriche':
        // Purple and Silver: heavy gothic iron decorations, silver roses and straps
        return (
          <g>
            {/* Heavy Silver strap hinges */}
            <path d="M 20 80 L 180 80 L 170 95 L 20 95 Z" fill={panel} stroke={metal} strokeWidth="2" />
            <circle cx="40" cy="87" r="4" fill={highlight} />
            <circle cx="100" cy="87" r="4" fill={highlight} />
            <circle cx="160" cy="87" r="4" fill={highlight} />

            <path d="M 20 230 L 180 230 L 170 245 L 20 245 Z" fill={panel} stroke={metal} strokeWidth="2" />
            <circle cx="40" cy="237" r="4" fill={highlight} />
            <circle cx="100" cy="237" r="4" fill={highlight} />
            <circle cx="160" cy="237" r="4" fill={highlight} />

            {/* Silver Gothic Roses on Purple timber */}
            <g transform="translate(100, 140)">
              <circle cx="0" cy="0" r="14" fill={door.colors.doorBg} stroke={metal} strokeWidth="2" />
              <path d="M -8 -5 C -2 -12 8 -8 7 0 C 6 8 -6 8 -8 -5 Z" fill={border} />
              <circle cx="0" cy="0" r="5" fill={metal} />
            </g>
            {/* Heavy Silver drop ring knocker */}
            <circle cx="100" cy="180" r="14" fill="none" stroke={metal} strokeWidth="3.5" />
            <rect x="94" y="160" width="12" height="10" fill={metal} />
          </g>
        );

      case 'dunkelheit':
        // Black: almost entirely black, strange geometric carvings
        return (
          <g>
            {/* Hexagonal occult runes in matte black and charcoal */}
            <polygon points="100,60 135,80 135,120 100,140 65,120 65,80" fill={panel} stroke={metal} strokeWidth="2" />
            <polygon points="100,75 120,87 120,113 100,125 80,113 80,87" fill="none" stroke={highlight} strokeWidth="1.2" />
            <circle cx="100" cy="100" r="6" fill={metal} opacity="0.8" />
            {/* Angular etched lines */}
            <line x1="40" y1="160" x2="160" y2="160" stroke={metal} strokeWidth="2" />
            <line x1="40" y1="160" x2="100" y2="200" stroke={metal} strokeWidth="1.5" />
            <line x1="160" y1="160" x2="100" y2="200" stroke={metal} strokeWidth="1.5" />
            <line x1="100" y1="200" x2="100" y2="260" stroke={metal} strokeWidth="2" />
            <polygon points="100,260 80,285 120,285" fill={panel} stroke={metal} strokeWidth="1.5" />
            <rect x="145" y="175" width="10" height="26" fill={metal} rx="2" />
          </g>
        );

      case 'castiglione':
        // Dark blue with ASTROLOGY THEME: celestial dark blue, golden stars, constellations, armillary rings, astrolabe
        return (
          <g>
            {/* Astrological ring & celestial orb */}
            <circle cx="100" cy="85" r="32" fill="none" stroke={metal} strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="100" cy="85" r="22" fill={panel} stroke={metal} strokeWidth="2" />
            {/* Golden Sun & Moon alignment */}
            <circle cx="100" cy="85" r="8" fill={metal} filter="drop-shadow(0 0 6px rgba(224,184,99,0.7))" />
            <path d="M 94 77 A 10 10 0 1 0 106 77 A 8 8 0 1 1 94 77 Z" fill={highlight} />
            {/* Constellation star chart etchings */}
            {/* Ursa Major / Star lines */}
            <line x1="45" y1="50" x2="65" y2="65" stroke={metal} strokeWidth="1" opacity="0.8" />
            <line x1="65" y1="65" x2="55" y2="85" stroke={metal} strokeWidth="1" opacity="0.8" />
            <line x1="55" y1="85" x2="40" y2="100" stroke={metal} strokeWidth="1" opacity="0.8" />
            <circle cx="45" cy="50" r="2.5" fill={highlight} />
            <circle cx="65" cy="65" r="2" fill={highlight} />
            <circle cx="55" cy="85" r="2" fill={highlight} />
            <circle cx="40" cy="100" r="2.5" fill={highlight} />

            {/* Right celestial constellation */}
            <line x1="155" y1="50" x2="135" y2="65" stroke={metal} strokeWidth="1" opacity="0.8" />
            <line x1="135" y1="65" x2="145" y2="85" stroke={metal} strokeWidth="1" opacity="0.8" />
            <line x1="145" y1="85" x2="160" y2="100" stroke={metal} strokeWidth="1" opacity="0.8" />
            <circle cx="155" cy="50" r="2.5" fill={highlight} />
            <circle cx="135" cy="65" r="2" fill={highlight} />
            <circle cx="145" cy="85" r="2" fill={highlight} />
            <circle cx="160" cy="100" r="2.5" fill={highlight} />

            {/* Astrology Knocker: Astrolabe Ring */}
            <circle cx="100" cy="165" r="16" fill={panel} stroke={metal} strokeWidth="2.5" />
            <circle cx="100" cy="180" r="12" fill="none" stroke={metal} strokeWidth="3" />
            {/* Astrological compass cross */}
            <line x1="100" y1="152" x2="100" y2="178" stroke={highlight} strokeWidth="1.5" />
            <line x1="87" y1="165" x2="113" y2="165" stroke={highlight} strokeWidth="1.5" />

            {/* Lower panel: Zodiac/Planetary orbital ellipses */}
            <rect x="35" y="215" width="130" height="90" fill={panel} stroke={border} strokeWidth="2" rx="2" />
            <ellipse cx="100" cy="260" rx="45" ry="22" fill="none" stroke={metal} strokeWidth="1.5" strokeDasharray="4 2" />
            <circle cx="100" cy="260" r="6" fill={metal} />
            <circle cx="65" cy="254" r="3" fill={highlight} />
            <circle cx="135" cy="266" r="3.5" fill={metal} />
          </g>
        );

      case 'avrevielle':
        // Pink, rosy: tall narrow elegant door, rosy stained glass, celestial carvings
        return (
          <g>
            {/* Rosy stained glass celestial transom */}
            <path
              d="M 50 110 L 50 70 Q 100 15 150 70 L 150 110 Z"
              fill={panel}
              stroke={border}
              strokeWidth="2"
            />
            {/* Crescent moon in Rosy Pink */}
            <path
              d="M 95 65 A 10 10 0 1 0 108 65 A 7 7 0 1 1 95 65 Z"
              fill={metal}
            />
            {/* Stars in Rose Gold */}
            <circle cx="75" cy="80" r="2" fill={highlight} />
            <circle cx="125" cy="80" r="2" fill={highlight} />
            <circle cx="100" cy="40" r="2.5" fill={highlight} />
            {/* Rosy door panels */}
            <rect x="50" y="125" width="100" height="80" fill={panel} stroke={border} strokeWidth="1.5" />
            <rect x="50" y="215" width="100" height="95" fill={panel} stroke={border} strokeWidth="1.5" />
            {/* Slender Rosy Pink handle */}
            <line x1="135" y1="160" x2="135" y2="195" stroke={metal} strokeWidth="3" strokeLinecap="round" />
            <circle cx="135" cy="160" r="3.5" fill={metal} />
            <circle cx="135" cy="195" r="3.5" fill={metal} />
          </g>
        );

      case 'vensanting':
        // Beige, Brown, Platinum: weathered wood, beige panels, platinum nautical accents
        return (
          <g>
            {/* Weathered timber plank lines */}
            <line x1="60" y1="40" x2="60" y2="320" stroke={border} strokeWidth="2" strokeDasharray="6 2" />
            <line x1="100" y1="30" x2="100" y2="320" stroke={border} strokeWidth="2" />
            <line x1="140" y1="40" x2="140" y2="320" stroke={border} strokeWidth="2" strokeDasharray="6 2" />
            {/* Wave patterns on lintel in Platinum */}
            <path
              d="M 30 70 Q 45 55 60 70 Q 75 85 90 70 Q 105 55 120 70 Q 135 85 150 70 Q 165 55 170 70"
              fill="none"
              stroke={metal}
              strokeWidth="2.5"
            />
            {/* Platinum compass / Seafarer anchor knocker */}
            <g transform="translate(100, 140)">
              <circle cx="0" cy="0" r="16" fill={door.colors.doorBg} stroke={metal} strokeWidth="2" />
              <polygon points="0,-12 4,0 0,12 -4,0" fill={metal} />
              <polygon points="-12,0 0,4 12,0 0,-4" fill={metal} />
            </g>
            {/* Beige & Platinum lower wave cartouche */}
            <path
              d="M 50 240 C 70 230 80 250 100 240 C 120 230 130 250 150 240"
              fill="none"
              stroke={metal}
              strokeWidth="2"
            />
          </g>
        );

      case 'morvathier':
        // Black White: stark deep black wood, eerie white ravens and pointed arch tracery
        return (
          <g>
            {/* Stark White Pointed gothic arch framing */}
            <path
              d="M 25 140 L 25 100 Q 100 5 175 100 L 175 140"
              fill="none"
              stroke={metal}
              strokeWidth="3.5"
            />
            {/* White Ravens perched on corbels */}
            {/* Left Raven */}
            <g transform="translate(40, 85) scale(0.7)">
              <path d="M 0 0 C 5 -10 15 -10 20 -2 C 22 5 15 15 5 18 C -5 20 -15 10 -10 2 Z" fill={metal} stroke="#0A0A0C" strokeWidth="1.5" />
              <polygon points="20,-2 28,0 20,4" fill={highlight} />
              <circle cx="15" cy="-2" r="1.5" fill="#0A0A0C" />
            </g>
            {/* Right Raven */}
            <g transform="translate(140, 85) scale(-0.7, 0.7)">
              <path d="M 0 0 C 5 -10 15 -10 20 -2 C 22 5 15 15 5 18 C -5 20 -15 10 -10 2 Z" fill={metal} stroke="#0A0A0C" strokeWidth="1.5" />
              <polygon points="20,-2 28,0 20,4" fill={highlight} />
              <circle cx="15" cy="-2" r="1.5" fill="#0A0A0C" />
            </g>
            {/* White twisted gnarled branch carvings */}
            <path
              d="M 30 160 Q 60 180 50 210 Q 70 240 60 280"
              fill="none"
              stroke={metal}
              strokeWidth="2"
            />
            <path
              d="M 170 160 Q 140 180 150 210 Q 130 240 140 280"
              fill="none"
              stroke={metal}
              strokeWidth="2"
            />
            {/* Stark White pointed iron knocker */}
            <polygon points="100,160 110,185 90,185" fill={panel} stroke={metal} strokeWidth="2.5" />
          </g>
        );

      case 'pedelian':
        // Light blue, blue, silver: Blue door, light blue panels, silver moldings
        return (
          <g>
            {/* Classical pediment in Silver */}
            <rect x="25" y="45" width="150" height="12" fill={door.colors.doorBg} stroke={metal} strokeWidth="2" />
            <circle cx="50" cy="51" r="3" fill={metal} />
            <circle cx="100" cy="51" r="3" fill={metal} />
            <circle cx="150" cy="51" r="3" fill={metal} />
            {/* Light Blue Panels with Symmetrical Relief Medallions */}
            <circle cx="65" cy="100" r="18" fill={panel} stroke={metal} strokeWidth="2" />
            <circle cx="65" cy="100" r="10" fill="none" stroke={metal} strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="135" cy="100" r="18" fill={panel} stroke={metal} strokeWidth="2" />
            <circle cx="135" cy="100" r="10" fill="none" stroke={metal} strokeWidth="1" strokeDasharray="2 2" />
            {/* Silver handles */}
            <line x1="100" y1="57" x2="100" y2="320" stroke={metal} strokeWidth="1.5" />
            <rect x="90" y="160" width="8" height="24" fill={metal} rx="2" />
            <rect x="102" y="160" width="8" height="24" fill={metal} rx="2" />
            {/* Lower raised Light Blue panels */}
            <rect x="35" y="195" width="55" height="105" fill={panel} stroke={metal} strokeWidth="1.5" />
            <rect x="110" y="195" width="55" height="105" fill={panel} stroke={metal} strokeWidth="1.5" />
          </g>
        );

      case 'dimitri-sergeyev':
        // Brown, Black: Russian imperial double doors, brown timber, heavy black ironwork
        return (
          <g>
            {/* Black iron double crest at top */}
            <path
              d="M 85 45 L 100 35 L 115 45 L 100 65 Z"
              fill={metal}
              stroke={border}
              strokeWidth="2"
            />
            <circle cx="100" cy="48" r="4" fill={door.colors.doorBg} />
            {/* Black iron lattice on Brown timber */}
            <rect x="30" y="75" width="60" height="90" fill={panel} stroke={metal} strokeWidth="2" />
            <line x1="30" y1="75" x2="90" y2="165" stroke={metal} strokeWidth="1.8" />
            <line x1="90" y1="75" x2="30" y2="165" stroke={metal} strokeWidth="1.8" />

            <rect x="110" y="75" width="60" height="90" fill={panel} stroke={metal} strokeWidth="2" />
            <line x1="110" y1="75" x2="170" y2="165" stroke={metal} strokeWidth="1.8" />
            <line x1="170" y1="75" x2="110" y2="165" stroke={metal} strokeWidth="1.8" />

            {/* Heavy Black iron ring handles */}
            <circle cx="85" cy="185" r="10" fill="none" stroke={metal} strokeWidth="3" />
            <circle cx="115" cy="185" r="10" fill="none" stroke={metal} strokeWidth="3" />
            {/* Lower armor plating in Brown & Black */}
            <rect x="30" y="210" width="60" height="95" fill={panel} stroke={metal} strokeWidth="2.5" />
            <rect x="110" y="210" width="60" height="95" fill={panel} stroke={metal} strokeWidth="2.5" />
          </g>
        );

      case 'larivier':
        // Green, Gold: French flamboyant gothic, deep emerald green wood, radiant gold roses & scrolls
        return (
          <g>
            {/* Gold French flamboyant trefoil arch */}
            <path
              d="M 40 100 C 40 60 70 45 100 25 C 130 45 160 60 160 100"
              fill="none"
              stroke={metal}
              strokeWidth="3"
            />
            {/* Gold floral scrolls */}
            <path
              d="M 50 65 Q 80 80 100 65 Q 120 80 150 65"
              fill="none"
              stroke={highlight}
              strokeWidth="2"
            />
            {/* Gold French iron roses */}
            <circle cx="100" cy="85" r="10" fill={panel} stroke={metal} strokeWidth="2" />
            <path d="M 96 85 A 4 4 0 1 0 104 85" fill="none" stroke={highlight} strokeWidth="1.5" />
            {/* Emerald green panels with Gold tracery */}
            <rect x="40" y="115" width="120" height="70" fill={panel} stroke={metal} strokeWidth="1.5" rx="3" />
            <line x1="80" y1="115" x2="80" y2="185" stroke={metal} strokeWidth="1" />
            <line x1="120" y1="115" x2="120" y2="185" stroke={metal} strokeWidth="1" />
            {/* Gold French latch */}
            <path d="M 140 180 Q 150 195 140 210" fill="none" stroke={metal} strokeWidth="3.5" />
            <rect x="40" y="200" width="120" height="105" fill={panel} stroke={metal} strokeWidth="1.5" rx="3" />
          </g>
        );

      case 'glorytic':
      default:
        // White, Beige, Gold: White marble door, beige panels, radiant gold occult ocular sigil
        return (
          <g>
            {/* Imposing high pointed portal in Gold */}
            <path
              d="M 20 120 L 20 80 Q 100 0 180 80 L 180 120"
              fill="none"
              stroke={metal}
              strokeWidth="4"
            />
            {/* Warding occult rune rings in Gold & Beige */}
            <circle cx="100" cy="110" r="32" fill={panel} stroke={metal} strokeWidth="2.5" />
            <circle cx="100" cy="110" r="24" fill="none" stroke={door.colors.doorBorder} strokeWidth="1.5" strokeDasharray="4 3" />
            {/* Central Ocular Sigil in shimmering Gold */}
            <path
              d="M 76 110 Q 100 85 124 110 Q 100 135 76 110 Z"
              fill={door.colors.doorBg}
              stroke={metal}
              strokeWidth="2.5"
              className={isOpen ? 'animate-pulse' : ''}
            />
            <circle cx="100" cy="110" r="8" fill={metal} filter="drop-shadow(0 0 8px rgba(200,155,60,0.8))" />
            <circle cx="100" cy="110" r="3" fill="#FFFFFF" />

            {/* Vertical ancient grooves in Gold */}
            <line x1="60" y1="165" x2="60" y2="310" stroke={door.colors.doorBorder} strokeWidth="2" />
            <line x1="100" y1="165" x2="100" y2="310" stroke={metal} strokeWidth="3" />
            <line x1="140" y1="165" x2="140" y2="310" stroke={door.colors.doorBorder} strokeWidth="2" />

            {/* Gold Runes */}
            <path d="M 55 200 L 65 205 L 55 210" stroke={metal} strokeWidth="2" fill="none" />
            <path d="M 145 200 L 135 205 L 145 210" stroke={metal} strokeWidth="2" fill="none" />
            <path d="M 55 260 L 65 265 L 55 270" stroke={metal} strokeWidth="2" fill="none" />
            <path d="M 145 260 L 135 265 L 145 270" stroke={metal} strokeWidth="2" fill="none" />
          </g>
        );
    }
  };

  return (
    <div
      className={`relative w-full h-full [perspective:1000px] select-none transition-transform duration-200 ${
        isKnocking ? 'animate-knock-shake' : ''
      }`}
    >
      {/* Outer Doorframe */}
      <div
        className="relative w-full h-full rounded-t-[70px] sm:rounded-t-[90px] border-4 p-2.5 sm:p-3 shadow-2xl transition-all duration-300"
        style={{
          borderColor: door.colors.doorBorder,
          backgroundColor: '#090D18',
          boxShadow: `0 20px 50px rgba(0,0,0,0.85), 0 0 28px ${door.colors.accentGlow}`,
        }}
      >
        {/* Inner Chamber (visible when door opens) */}
        <div
          className={`absolute inset-3 rounded-t-[60px] sm:rounded-t-[80px] overflow-hidden flex flex-col items-center justify-center transition-opacity duration-700 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(ellipse at center, #10264D 0%, #080D1A 65%, #030508 100%)',
          }}
        >
          {/* Blue magical portal light and floating mist */}
          <div className="absolute inset-0 animate-portal-blue" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(80,160,255,0.35)_0%,_transparent_75%)]" />
          <div className="absolute -bottom-6 inset-x-0 h-28 bg-[radial-gradient(ellipse_at_bottom,_rgba(120,180,255,0.4)_0%,_transparent_70%)] animate-fog-1" />
        </div>

        {/* The 3D Swinging Door Leaf */}
        {isDoubleDoor ? (
          <div className="relative w-full h-full flex overflow-hidden rounded-t-[60px] sm:rounded-t-[80px]">
            {/* Left Door Wing */}
            <div
              className="w-1/2 h-full origin-left transition-transform duration-1000 ease-out"
              style={{
                transform: isOpen ? 'rotateY(-80deg)' : 'rotateY(0deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              <svg viewBox="0 0 100 320" preserveAspectRatio="none" className="w-full h-full">
                <rect width="100" height="320" fill={door.colors.doorBg} />
                <rect x="5" y="10" width="90" height="300" fill={door.colors.panelBg} stroke={door.colors.doorBorder} strokeWidth="1.5" />
              </svg>
            </div>

            {/* Right Door Wing */}
            <div
              className="w-1/2 h-full origin-right transition-transform duration-1000 ease-out"
              style={{
                transform: isOpen ? 'rotateY(80deg)' : 'rotateY(0deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              <svg viewBox="100 0 100 320" preserveAspectRatio="none" className="w-full h-full">
                <rect x="100" width="100" height="320" fill={door.colors.doorBg} />
                <rect x="105" y="10" width="90" height="300" fill={door.colors.panelBg} stroke={door.colors.doorBorder} strokeWidth="1.5" />
              </svg>
            </div>

            {/* Full SVG overlay for details */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                isOpen ? 'opacity-0 scale-95' : 'opacity-100'
              }`}
            >
              <svg viewBox="0 0 200 320" className="w-full h-full">
                {renderDoorArtwork()}
              </svg>
            </div>
          </div>
        ) : (
          <div
            className="relative w-full h-full origin-left transition-transform duration-1000 ease-out rounded-t-[60px] sm:rounded-t-[80px] overflow-hidden"
            style={{
              transform: isOpen ? 'rotateY(-85deg)' : 'rotateY(0deg)',
              transformStyle: 'preserve-3d',
              backgroundColor: door.colors.doorBg,
            }}
          >
            <svg viewBox="0 0 200 320" className="w-full h-full">
              <rect width="200" height="320" fill={door.colors.doorBg} />
              <rect x="12" y="12" width="176" height="296" fill={door.colors.panelBg} stroke={door.colors.doorBorder} strokeWidth="2" rx="4" />
              {renderDoorArtwork()}
            </svg>
          </div>
        )}

        {/* Knock ripples overlay when clicked */}
        {isKnocking && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-full border-2 border-sky-300 animate-ping opacity-80" />
          </div>
        )}
      </div>
    </div>
  );
};
