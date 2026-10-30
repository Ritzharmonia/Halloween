/**
 * The Thirteenth Night - Core Data Types & Door Definitions
 */

export interface CandyReward {
  id: string;
  name: string;
  type: 'truffle' | 'chocolate' | 'lollipop' | 'candycorn' | 'pastille' | 'macaron' | 'toffee' | 'wafer' | 'bonbon';
  colors: {
    primary: string;
    accent: string;
    glow: string;
  };
}

export interface DoorData {
  id: string;
  number: number;
  familyName: string;
  colors: {
    doorBg: string;
    doorBorder: string;
    panelBg: string;
    metalwork: string;
    accentGlow: string;
    highlight: string;
  };
  architecture: {
    style: string;
    archType: 'pointed' | 'round' | 'ogee' | 'victorian_double' | 'monolith';
  };
  candyReward: CandyReward;
}

export interface UserProgress {
  knocks: Record<string, number>;
  openedDoors: Record<string, boolean>;
  collectedDoors: Record<string, boolean>;
  earnedCandies: Record<string, number>; // 2 to 10 based on knock accuracy
  knockRatings: Record<string, string>; // e.g. "Төгс хэмнэл!"
  totalCandies: number;
  collectedCandiesList: Array<{
    doorNumber: number;
    familyName: string;
    candyName: string;
    count: number;
    collectedAt: string;
  }>;
}
