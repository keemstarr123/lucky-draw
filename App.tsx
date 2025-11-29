import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { SpinWheel } from './components/SpinWheel';
import { Prize } from './types';
import { Trophy, ArrowRight, Loader2, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<Prize | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleStartSpin = () => {
    if (isSpinning || winner) return;
    setIsSpinning(true);
  };

  const handleSpinEnd = (prize: Prize) => {
    setIsSpinning(false);
    setWinner(prize);
    setTimeout(() => {
      setShowResult(true);
    }, 500);
  };

  return (
    <div className="h-[100vh] w-full bg-white relative overflow-hidden font-sans text-slate-900 flex flex-col">
      
      {/* Background Ambience */}
      <div className="absolute top-[-30%] left-[-10%] w-[70%] h-[70%] bg-gradient-to-br from-orange-200/30 to-pink-200/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-30%] right-[-10%] w-[70%] h-[70%] bg-gradient-to-tl from-purple-200/30 to-pink-200/30 rounded-full blur-[100px] pointer-events-none" />
      
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative pt-[80px]">
        
        {/* Hero Section */}
        <div className="z-20 flex flex-col items-center justify-center px-4 text-center shrink-0 mb-2 md:mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 drop-shadow-sm max-w-4xl">
              Spin the Lucky Draw
            </h1>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartSpin}
              disabled={isSpinning || !!winner}
              className={`
                relative group overflow-hidden px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-orange-500/20 transition-all
                ${isSpinning || winner 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:shadow-orange-500/40'
                }
              `}
            >
               <span className="relative z-10 flex items-center gap-3">
                 {isSpinning ? (
                   <>
                     <Loader2 className="animate-spin w-5 h-5" /> Spinning...
                   </>
                 ) : winner ? (
                   <>
                     Winner! <Sparkles className="w-5 h-5" />
                   </>
                 ) : (
                   <>
                     Start Spinning <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                   </>
                 )}
               </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Wheel Container - Fills the rest of the height */}
        <div className="flex-1 w-full relative overflow-visible flex items-start justify-center pt-8">
          <div className="w-full h-[150%] relative top-0">
             <SpinWheel 
                isSpinning={isSpinning} 
                onSpinStart={handleStartSpin} 
                onSpinEnd={handleSpinEnd} 
              />
          </div>
        </div>

      </main>

      {/* Winner Overlay Modal */}
      <AnimatePresence>
        {showResult && winner && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-white rounded-[40px] p-8 max-w-sm w-full shadow-2xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-orange-100 to-pink-100 z-0" />
              
              <div className="relative z-10 -mt-2">
                <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 text-yellow-500 ring-4 ring-white">
                  <Trophy className="w-10 h-10" strokeWidth={1.5} />
                </div>
                
                <h2 className="text-2xl font-display font-bold text-slate-900">You Won!</h2>
                <p className="text-slate-500 text-sm mb-6">Enjoy your new reward</p>
                
                <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100 mb-6 shadow-sm">
                   <div className="relative w-full h-32 rounded-2xl overflow-hidden mb-3">
                      <img src={winner.image} alt={winner.name} className="w-full h-full object-cover" />
                   </div>
                   <div className="text-left">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{winner.rarity}</p>
                      <p className="text-lg font-bold text-slate-800 leading-tight">{winner.name}</p>
                   </div>
                </div>

                <button 
                  onClick={() => window.location.reload()} 
                  className="w-full py-3.5 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
                >
                  Claim Reward
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;