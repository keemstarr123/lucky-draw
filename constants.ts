import { Prize } from './types';

// Using consistent placeholder images but treating them as products
export const PRIZES: Prize[] = [
  {
    id: '1',
    name: 'PlayStation 5',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=600',
    color: 'from-blue-600 to-indigo-900',
    rarity: 'Legendary'
  },
  {
    id: '2',
    name: 'Nintendo Switch',
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&q=80&w=600',
    color: 'from-red-500 to-red-800',
    rarity: 'Epic'
  },
  {
    id: '3',
    name: 'Xbox Series X',
    image: 'https://images.unsplash.com/photo-1621259182902-885f1c2a01e5?auto=format&fit=crop&q=80&w=600',
    color: 'from-green-500 to-green-900',
    rarity: 'Epic'
  },
  {
    id: '4',
    name: 'iPhone 15 Pro',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=600',
    color: 'from-gray-700 to-black',
    rarity: 'Legendary'
  },
  {
    id: '5',
    name: '$500 Voucher',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=600',
    color: 'from-yellow-400 to-orange-600',
    rarity: 'Rare'
  },
  {
    id: '6',
    name: 'Gaming Headset',
    image: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&q=80&w=600',
    color: 'from-purple-500 to-purple-900',
    rarity: 'Common'
  },
];

// Helper to generate a large list of prizes for the wheel
const generateRepeatedPrizes = (base: Prize[], count: number) => {
  const result: Prize[] = [];
  for (let i = 0; i < count; i++) {
    result.push(...base);
  }
  return result;
};

// Generate enough copies for several full spins
export const REPEATED_PRIZES = generateRepeatedPrizes(PRIZES, 300);

// Configuration for the Radial Wheel
// Significantly reduced radius for a tight, pronounced curve
export const WHEEL_RADIUS = 500; 
// Increased gap to account for the tighter circle (prevents overlap)
export const CARD_DEGREE_GAP = 22; 
export const START_INDEX = 1500;