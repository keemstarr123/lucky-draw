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
    name: 'Limited-edition Pickeball Paddle',
    image: '/paddle.jpg',
    color: 'from-red-500 to-red-800',
    rarity: 'Epic'
  },
  {
    id: '3',
    name: 'RM500 SportsDirect Gift Card',
    image: '/sports.jpg',
    color: 'from-green-500 to-green-900',
    rarity: 'Epic'
  },
  {
    id: '4',
    name: 'RM50 Grab Gift Card',
    image: '/grab.png',
    color: 'from-gray-700 to-black',
    rarity: 'Common'
  },
  {
    id: '5',
    name: 'Vip Court Exclusive Experience With Pros',
    image: '/court.png',
    color: 'from-yellow-400 to-orange-600',
    rarity: 'Rare'
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
