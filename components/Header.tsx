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
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-3 rounded-full bg-white/80 hover:bg-white shadow-sm border border-slate-200 transition-all hover:scale-105">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </div>
    </nav>
  );
};
