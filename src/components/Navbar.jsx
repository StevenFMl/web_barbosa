import React from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-[#040504]/90 backdrop-blur-md border-b border-[#393938]/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="flex-shrink-0 flex items-center"
          >
            <span className="text-2xl sm:text-3xl font-black text-white uppercase tracking-widest drop-shadow-md font-['Copperplate_Gothic_Bold',_'Cinzel',_serif]">
              CASA<span className="text-[#EFC524] ml-2">BARBOSA</span>
            </span>
          </motion.div>
          {/* Desktop Menu */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8 font-['Crimson_Text',_serif] text-lg">
            <a href="#inicio" className="text-zinc-300 hover:text-[#EFC524] px-3 py-2 rounded-md transition-colors tracking-wide">Inicio</a>
            <a href="#menu" className="text-zinc-300 hover:text-[#EFC524] px-3 py-2 rounded-md transition-colors tracking-wide">Menú</a>
            <a href="#ubicacion" className="text-zinc-300 hover:text-[#EFC524] px-3 py-2 rounded-md transition-colors tracking-wide">Ubicación</a>
          </div>
          {/* Mobile Menu Icon */}
          <div className="sm:hidden flex items-center">
            <button aria-label="Abrir menú" className="text-[#EFC524] hover:text-white focus:outline-none transition-colors">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
