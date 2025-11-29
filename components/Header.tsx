import React from 'react';
import { Gamepad2, ShoppingBag, Search, Bell } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12">
      {/* Left: Logo */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="bg-gradient-to-tr from-pink-500 to-orange-500 p-2 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
            <Gamepad2 className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-600">
            Xplode
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-slate-600 font-bold text-sm">
          <a href="#" className="hover:text-pink-600 transition-colors flex items-center gap-2">
            <Gamepad2 className="w-4 h-4" /> Games
          </a>
          <a href="#" className="hover:text-pink-600 transition-colors flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" /> Store
          </a>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 px-4 py-2 w-64 shadow-sm focus-within:ring-2 ring-pink-400 transition-all">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent border-none outline-none text-sm text-slate-700 w-full placeholder-slate-400"
          />
        </div>
        
        <button className="relative p-3 rounded-full bg-white/80 hover:bg-white shadow-sm border border-slate-200 transition-all hover:scale-105">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 p-[2px] cursor-pointer hover:scale-105 transition-transform shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover border-2 border-white"
          />
        </div>
      </div>
    </nav>
  );
};
