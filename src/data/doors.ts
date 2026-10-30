import { DoorData } from '../types';

export const DOORS_DATA: DoorData[] = [
  {
    id: 'montaque',
    number: 1,
    familyName: 'Montaque',
    colors: {
      doorBg: '#2E0A1E', // Plum / Dark cherry
      doorBorder: '#471030',
      panelBg: '#1A0411',
      metalwork: '#D8DFEB', // Silver
      accentGlow: 'rgba(216, 223, 235, 0.45)',
      highlight: '#F0F4F8',
    },
    architecture: {
      style: 'Викториан сарны сийлбэрт давхар хаалга',
      archType: 'victorian_double',
    },
    candyReward: {
      id: 'montaque-candy',
      name: 'Мөнгөн саран трюфель',
      type: 'truffle',
      colors: {
        primary: '#2E0A1E',
        accent: '#D8DFEB',
        glow: '#E8ECF5',
      },
    },
  },
  {
    id: 'charmiell',
    number: 2,
    familyName: 'Charmiell',
    colors: {
      doorBg: '#4A0A10', // Dark red
      doorBorder: '#661019',
      panelBg: '#2D0509',
      metalwork: '#D4AF37', // Gold
      accentGlow: 'rgba(212, 175, 55, 0.45)',
      highlight: '#F3E5AB',
    },
    architecture: {
      style: 'Алтан эрвээхэй, өргөст сарнайн хаалга',
      archType: 'pointed',
    },
    candyReward: {
      id: 'charmiell-candy',
      name: 'Улаан бөөрөлзгөний алтан ирис',
      type: 'toffee',
      colors: {
        primary: '#4A0A10',
        accent: '#D4AF37',
        glow: '#F3E5AB',
      },
    },
  },
  {
    id: 'obelia',
    number: 3,
    familyName: 'Obelia',
    colors: {
      doorBg: '#10254C', // Blue
      doorBorder: '#1C3D7A',
      panelBg: '#09162E',
      metalwork: '#FFFFFF', // White
      accentGlow: 'rgba(255, 255, 255, 0.55)',
      highlight: '#E8EFF8',
    },
    architecture: {
      style: 'Цагаан цэцэгт хээтэй шиллэг хаалга',
      archType: 'round',
    },
    candyReward: {
      id: 'obelia-candy',
      name: 'Цасан цагаан мөсөн чихэр',
      type: 'bonbon',
      colors: {
        primary: '#10254C',
        accent: '#FFFFFF',
        glow: '#C8D7EE',
      },
    },
  },
  {
    id: 'agriche',
    number: 4,
    familyName: 'Agriche',
    colors: {
      doorBg: '#33103F', // Purple
      doorBorder: '#4B1B5C',
      panelBg: '#1F0826',
      metalwork: '#D6DAE4', // Silver
      accentGlow: 'rgba(214, 218, 228, 0.5)',
      highlight: '#EDE8F5',
    },
    architecture: {
      style: 'Мөнгөн сарнай, хатуу төмөрлөг хаалга',
      archType: 'pointed',
    },
    candyReward: {
      id: 'agriche-candy',
      name: 'Нил ягаан мөнгөлөг шоколад',
      type: 'chocolate',
      colors: {
        primary: '#33103F',
        accent: '#D6DAE4',
        glow: '#EDE8F5',
      },
    },
  },
  {
    id: 'dunkelheit',
    number: 5,
    familyName: 'Dunkelheit',
    colors: {
      doorBg: '#0B0B0E', // Black
      doorBorder: '#1C1C22',
      panelBg: '#050507',
      metalwork: '#3D3D47', // Deep Charcoal / Black iron
      accentGlow: 'rgba(70, 70, 85, 0.4)',
      highlight: '#606070',
    },
    architecture: {
      style: 'Харанхуйн геометр сийлбэрт хар хаалга',
      archType: 'monolith',
    },
    candyReward: {
      id: 'dunkelheit-candy',
      name: 'Сүүдрийн хар чихэр',
      type: 'pastille',
      colors: {
        primary: '#0B0B0E',
        accent: '#3D3D47',
        glow: '#505060',
      },
    },
  },
  {
    id: 'castiglione',
    number: 6,
    familyName: 'Castiglione',
    colors: {
      doorBg: '#0A1329', // Dark blue
      doorBorder: '#14254D',
      panelBg: '#050B17',
      metalwork: '#E0B863', // Golden astronomy theme
      accentGlow: 'rgba(224, 184, 99, 0.5)',
      highlight: '#A2C2EC',
    },
    architecture: {
      style: 'Од эрхэс, сансар огторгуйн хээт хаалга',
      archType: 'round',
    },
    candyReward: {
      id: 'castiglione-candy',
      name: 'Одон орны алтан карамель',
      type: 'toffee',
      colors: {
        primary: '#0A1329',
        accent: '#E0B863',
        glow: '#A2C2EC',
      },
    },
  },
  {
    id: 'avrevielle',
    number: 7,
    familyName: 'Avrevielle',
    colors: {
      doorBg: '#542537', // Pink, rosy
      doorBorder: '#73364D',
      panelBg: '#3A1825',
      metalwork: '#E8A7BC', // Soft rosy pink
      accentGlow: 'rgba(232, 167, 188, 0.45)',
      highlight: '#F5D2DD',
    },
    architecture: {
      style: 'Ягаан сарнайн гоёмсог нуман хаалга',
      archType: 'ogee',
    },
    candyReward: {
      id: 'avrevielle-candy',
      name: 'Ягаан сарнайн пастил',
      type: 'bonbon',
      colors: {
        primary: '#542537',
        accent: '#E8A7BC',
        glow: '#F5D2DD',
      },
    },
  },
  {
    id: 'vensanting',
    number: 8,
    familyName: 'Vensanting',
    colors: {
      doorBg: '#3E271D', // Brown
      doorBorder: '#4E3326',
      panelBg: '#D8CBB5', // Beige
      metalwork: '#E5E8EC', // Platinum
      accentGlow: 'rgba(229, 232, 236, 0.45)',
      highlight: '#C2C8D2',
    },
    architecture: {
      style: 'Цагаан алт, модон сийлбэрт давлагаат хаалга',
      archType: 'round',
    },
    candyReward: {
      id: 'vensanting-candy',
      name: 'Цөцгийт бор ирис',
      type: 'toffee',
      colors: {
        primary: '#3E271D',
        accent: '#E5E8EC',
        glow: '#D8CBB5',
      },
    },
  },
  {
    id: 'morvathier',
    number: 9,
    familyName: 'Morvathier',
    colors: {
      doorBg: '#0A0A0C', // Black
      doorBorder: '#1A1A20',
      panelBg: '#050506',
      metalwork: '#F0F0F2', // White
      accentGlow: 'rgba(240, 240, 242, 0.55)',
      highlight: '#FFFFFF',
    },
    architecture: {
      style: 'Цагаан хэрээтэй хар модон хаалга',
      archType: 'pointed',
    },
    candyReward: {
      id: 'morvathier-candy',
      name: 'Хар цагаан давхаргат вафли',
      type: 'wafer',
      colors: {
        primary: '#0A0A0C',
        accent: '#F0F0F2',
        glow: '#D8D8DC',
      },
    },
  },
  {
    id: 'pedelian',
    number: 10,
    familyName: 'Pedelian',
    colors: {
      doorBg: '#173459', // Blue
      doorBorder: '#234C80',
      panelBg: '#7BA4D0', // Light blue
      metalwork: '#E2E6EF', // Silver
      accentGlow: 'rgba(226, 230, 239, 0.5)',
      highlight: '#FFFFFF',
    },
    architecture: {
      style: 'Цайвар цэнхэр, мөнгөн хүрээт давхар хаалга',
      archType: 'victorian_double',
    },
    candyReward: {
      id: 'pedelian-candy',
      name: 'Цэнхэр сапфир мөнгөн чихэр',
      type: 'bonbon',
      colors: {
        primary: '#173459',
        accent: '#E2E6EF',
        glow: '#7BA4D0',
      },
    },
  },
  {
    id: 'dimitri-sergeyev',
    number: 11,
    familyName: 'Dimitri Sergeyev',
    colors: {
      doorBg: '#2C1A12', // Brown
      doorBorder: '#3D251A',
      panelBg: '#1F120C',
      metalwork: '#0A0A0C', // Black iron
      accentGlow: 'rgba(50, 40, 35, 0.6)',
      highlight: '#523425',
    },
    architecture: {
      style: 'Бор модон, хар төмөр тоноглолт давхар хаалга',
      archType: 'victorian_double',
    },
    candyReward: {
      id: 'sergeyev-candy',
      name: 'Бор модон шокладтай пастил',
      type: 'chocolate',
      colors: {
        primary: '#2C1A12',
        accent: '#0A0A0C',
        glow: '#523425',
      },
    },
  },
  {
    id: 'larivier',
    number: 12,
    familyName: 'Larivier',
    colors: {
      doorBg: '#122E1F', // Green
      doorBorder: '#1B442E',
      panelBg: '#0B1E14',
      metalwork: '#D4AF37', // Gold
      accentGlow: 'rgba(212, 175, 55, 0.5)',
      highlight: '#F3E5AB',
    },
    architecture: {
      style: 'Ногоон модон, алтан сарнайн франц хаалга',
      archType: 'ogee',
    },
    candyReward: {
      id: 'larivier-candy',
      name: 'Ногоон пистачио алтан макарон',
      type: 'macaron',
      colors: {
        primary: '#122E1F',
        accent: '#D4AF37',
        glow: '#88C090',
      },
    },
  },
  {
    id: 'glorytic',
    number: 13,
    familyName: 'Glorytic',
    colors: {
      doorBg: '#EFECE6', // White
      doorBorder: '#C8BEAF', // Beige
      panelBg: '#DFDAD0', // Warm beige
      metalwork: '#C89B3C', // Gold
      accentGlow: 'rgba(200, 155, 60, 0.55)',
      highlight: '#FFFFFF',
    },
    architecture: {
      style: 'Цагаан гантиг, алтан тамгат сүрлэг хаалга',
      archType: 'monolith',
    },
    candyReward: {
      id: 'glorytic-candy',
      name: 'Алтан хүрээт цагаан гантиг амттан',
      type: 'truffle',
      colors: {
        primary: '#EFECE6',
        accent: '#C89B3C',
        glow: '#DFDAD0',
      },
    },
  },
];
