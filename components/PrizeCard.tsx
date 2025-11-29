import React from 'react';
import { motion } from 'framer-motion';
import { Prize } from '../types';
import { Crown, Sparkles } from 'lucide-react';

interface PrizeCardProps {
  prize: Prize;
  isActive: boolean;
  isWinning?: boolean;
}

export const PrizeCard: React.FC<PrizeCardProps> = ({ prize, isActive, isWinning }) => {
  return (
    <motion.div
      layout
      className={`relative rounded-[32px] overflow-hidden cursor-pointer select-none transition-all duration-300 ease-out`}
      style={{
        width: 220, 
        height: 320,
        boxShadow: isActive 
          ? '0 30px 60px -12px rgba(0, 0, 0, 0.6)' 
          : '0 10px 20px -5px rgba(0, 0, 0, 0.2)',
        zIndex: isActive ? 10 : 1,
      }}
    >
      {/* Active Gloss Effect */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent z-20 pointer-events-none mix-blend-overlay" />
      )}
      
      {/* Background Image & Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${prize.color} z-0`} />
      <img 
        src={prize.image} 
        alt={prize.name} 
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
      />
      
      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
        <div className="absolute top-4 right-4">
           {prize.rarity === 'Legendary' && (
             <div className="bg-yellow-400/20 backdrop-blur-md border border-yellow-400/50 p-2 rounded-full shadow-lg">
               <Crown className="w-5 h-5 text-yellow-300" fill="currentColor" />
             </div>
           )}
           {prize.rarity === 'Epic' && (
             <div className="bg-purple-400/20 backdrop-blur-md border border-purple-400/50 p-2 rounded-full shadow-lg">
               <Sparkles className="w-5 h-5 text-purple-300" />
             </div>
           )}
        </div>

        <motion.div 
          animate={{ y: isActive ? 0 : 5, opacity: isActive ? 1 : 0.9 }}
        >
          <div className="flex items-center gap-2 mb-2">
             <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-white/10 text-white backdrop-blur-md border border-white/10">
                {prize.rarity || 'Prize'}
             </span>
          </div>
          <h3 className="text-2xl font-display font-bold text-white leading-tight drop-shadow-md">
            {prize.name}
          </h3>
        </motion.div>
      </div>
      
      {/* Winning Border */}
      {isWinning && isActive && (
        <motion.div
          className="absolute inset-0 border-[6px] border-yellow-400 rounded-[32px] z-30"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        />
      )}
    </motion.div>
  );
};