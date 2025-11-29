import React, { useEffect, useState } from 'react';
import { motion, useAnimate, useMotionValue } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Prize } from '../types';
import { PRIZES, REPEATED_PRIZES, WHEEL_RADIUS, CARD_DEGREE_GAP, START_INDEX } from '../constants';
import { PrizeCard } from './PrizeCard';

interface SpinWheelProps {
  isSpinning: boolean;
  onSpinStart: () => void;
  onSpinEnd: (prize: Prize) => void;
}

export const SpinWheel: React.FC<SpinWheelProps> = ({ isSpinning, onSpinStart, onSpinEnd }) => {
  const [scope, animate] = useAnimate();
  const rotation = useMotionValue(-1 * START_INDEX * CARD_DEGREE_GAP);
  const [highlightIndex, setHighlightIndex] = useState(START_INDEX);
  
  // Track the highlighted index for visual effects
  useEffect(() => {
    const unsubscribe = rotation.on('change', (latest) => {
      // Logic: rotation = -1 * index * GAP
      // index = rotation / -GAP
      const index = Math.round(latest / -CARD_DEGREE_GAP);
      setHighlightIndex(index);
    });
    return () => unsubscribe();
  }, [rotation]);

  useEffect(() => {
    if (isSpinning) {
      handleSpin();
    }
  }, [isSpinning]);

  const handleSpin = async () => {
    // 1. Pick a random winner
    const randomPrizeIndex = Math.floor(Math.random() * PRIZES.length);
    const winningPrize = PRIZES[randomPrizeIndex];

    // 2. Calculate Target Index
    // To animate "Left to Right", items must move visually >>>
    // This implies the wheel rotates Clockwise (Rotation value Increases).
    // Rotation = -Index * Gap.
    // For Rotation to Increase, Index must DECREASE.
    
    const MIN_SPIN_ITEMS = 50; // How many items pass by
    let targetIndex = highlightIndex - MIN_SPIN_ITEMS;

    // Adjust targetIndex to match the winning prize ID
    // We walk backwards until we find the prize
    while (REPEATED_PRIZES[targetIndex % REPEATED_PRIZES.length]?.id !== winningPrize.id) {
      targetIndex--;
    }

    // 3. Calculate target rotation
    const targetRotation = -1 * targetIndex * CARD_DEGREE_GAP;

    // 4. Animate
    await animate(rotation, targetRotation, {
      duration: 5.5,
      ease: [0.2, 0.8, 0.2, 1], // Standard Ease-out for a wheel
      onUpdate: (latest) => {
        // Optional: Trigger click sounds here based on index change
      }
    });

    // 5. Trigger Win
    triggerConfetti();
    onSpinEnd(winningPrize);
  };

  const triggerConfetti = () => {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  return (
    <div className="relative w-full h-full flex justify-center items-center perspective-1000">
      {/* 
        The Wheel Container
        We translate the Center of Rotation DOWN by WHEEL_RADIUS.
        This puts the "Rim" of the wheel at the center of this container.
      */}
      <motion.div
        ref={scope}
        style={{ rotate: rotation }}
        className="absolute z-10 will-change-transform"
        initial={{ rotate: -1 * START_INDEX * CARD_DEGREE_GAP }}
      >
        <div 
           className="relative flex justify-center"
           style={{
             width: '0px',
             height: '0px',
             transform: `translateY(${WHEEL_RADIUS}px)` 
           }}
        >
          {REPEATED_PRIZES.map((prize, i) => {
            // Optimization: Only render items within visual range
            // With a tighter radius (R=500), items disappear faster down the curve.
            // 9 items is approx +/- 100 degrees, which is plenty.
            const distance = Math.abs(i - highlightIndex);
            if (distance > 9) return null;

            const isWinner = !isSpinning && i === highlightIndex;
            
            return (
              <WheelItem 
                key={`${prize.id}-${i}`}
                prize={prize}
                index={i}
                isActive={i === highlightIndex}
                isWinning={isWinner}
              />
            );
          })}
        </div>
      </motion.div>
      
      {/* Sides Fading - Stronger to hide the sharp drop-off */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white via-white/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white via-white/90 to-transparent z-20 pointer-events-none" />

      {/* Pointer */}
      <div className="absolute top-[40%] md:top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 drop-shadow-xl pointer-events-none">
        <div className="w-8 h-8 bg-pink-500 rotate-45 rounded-sm border-4 border-white shadow-lg transform translate-y-2" />
      </div>
    </div>
  );
};

const WheelItem: React.FC<{
  prize: Prize;
  index: number;
  isActive: boolean;
  isWinning?: boolean;
}> = ({ prize, index, isActive, isWinning }) => {
  return (
    <div
      className="absolute top-0 left-0 flex justify-center items-end"
      style={{
        // Rotate around the center (which is far below)
        transform: `rotate(${index * CARD_DEGREE_GAP}deg) translateY(-${WHEEL_RADIUS}px)`,
        height: '0px',
        transformOrigin: 'bottom center',
      }}
    >
      <div 
        className="transform origin-bottom transition-all duration-300 will-change-transform"
        style={{
          // Lift the active card slightly out of the circle radius for emphasis
          transform: `translateY(-50%) ${isActive ? 'scale(1.15) translateY(-30px)' : 'scale(0.95)'}`,
          opacity: isActive ? 1 : 0.6,
          // Add blur to side items for speed effect and depth
          filter: isActive ? 'none' : 'blur(1px)',
        }}
      >
        <PrizeCard 
           prize={prize} 
           isActive={isActive} 
           isWinning={isWinning} 
        />
      </div>
    </div>
  );
};