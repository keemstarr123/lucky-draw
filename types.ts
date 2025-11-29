export interface Prize {
  id: string;
  name: string;
  image: string;
  color: string;
  rarity?: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface WheelState {
  isSpinning: boolean;
  hasSpun: boolean;
  winner: Prize | null;
}
