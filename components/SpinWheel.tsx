import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { motion, useMotionValue, animate } from "framer-motion";
import { Prize } from "../types";
import { PRIZES } from "../constants";
import { PrizeCard } from "./PrizeCard";

interface SpinWheelProps {
  isSpinning: boolean;
  onSpinStart: () => void;
  onSpinEnd: (prize: Prize) => void;
}

export const SpinWheel: React.FC<SpinWheelProps> = ({
  isSpinning,
  onSpinStart,
  onSpinEnd,
}) => {
  // floating index for smooth interpolation
  const indexMv = useMotionValue(0);
  const [indexValue, setIndexValue] = useState(0);
  const [localSpinning, setLocalSpinning] = useState(false);

  // keep a React state mirror just for render
  useEffect(() => {
    const unsub = indexMv.on("change", (v) => setIndexValue(v));
    return () => unsub();
  }, [indexMv]);

  // start spin when parent toggles
  useEffect(() => {
    if (isSpinning && !localSpinning) {
      startSpin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSpinning]);

  const startSpin = () => {
    onSpinStart?.();
    setLocalSpinning(true);

    const total = PRIZES.length;
    const current = indexMv.get();
    const extraLoops = 3; // full rounds
    const randomOffset = Math.floor(Math.random() * total);
    const target = current + extraLoops * total + randomOffset;

    // Smooth animated spin
    const controls = animate(indexMv, target, {
      duration: 4, // overall spin time
      ease: [0.16, 0.84, 0.23, 1], // nice ease-out curve
    });

    controls.then(() => {
      setLocalSpinning(false);

      // decide final winning index
      const final = indexMv.get();
      const winningIndex =
        ((Math.round(final) % total) + total) % total;

      triggerConfetti();
      onSpinEnd(PRIZES[winningIndex]);
    });
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const visibleRange = 4; // cards around center

  return (
    <div className="relative w-full h-[320px] md:h-[360px] flex items-center justify-center perspective-[1600px] overflow-visible">
      <div className="relative w-full flex items-center justify-center">
        {PRIZES.map((prize, i) => {
          const total = PRIZES.length;

          // floating center index
          const centerFloat =
            ((indexValue % total) + total) % total;

          let diff = i - centerFloat;

          // wrap to nearest distance
          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;

          if (Math.abs(diff) > visibleRange) return null;

          const translateX = diff * 220;
          const rotateY = diff * -22;
          const scale = 1 - Math.abs(diff) * 0.12;
          const opacity = 1 - Math.abs(diff) * 0.35;
          const isCenter = Math.abs(diff) < 0.001;

          return (
            <motion.div
              key={prize.id}
              className="absolute"
              style={{ transformOrigin: "center bottom" }}
              animate={{
                transform: `
                  translateX(${translateX}px)
                  translateY(10px)
                  rotateY(${rotateY}deg)
                  scale(${scale})
                `,
                opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 26,
              }}
            >
              <PrizeCard prize={prize} isActive={isCenter} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
