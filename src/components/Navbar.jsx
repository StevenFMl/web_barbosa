import React from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-[#040504]/80 backdrop-blur-lg border-b border-[#393938]/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24 transition-all duration-300">
          
          {/* Logo with Antigravity */}
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="flex-shrink-0 flex items-center cursor-pointer"
          >
            <span className="text-2xl sm:text-3xl font-black text-white uppercase tracking-[0.15em] drop-shadow-lg font-['Copperplate_Gothic_Bold',_'Cinzel',_serif]">
              CASA<span className="text-[#EFC524] ml-2">BARBOSA</span>
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-10 font-['Crimson_Text',_serif] text-lg sm:text-xl">
            <a href="#inicio" className="text-white/80 hover:text-[#EFC524] px-3 py-2 rounded-md transition-all duration-300 tracking-wide hover:bg-[#EFC524]/5">Inicio</a>
            <a href="#menu" className="text-white/80 hover:text-[#EFC524] px-3 py-2 rounded-md transition-all duration-300 tracking-wide hover:bg-[#EFC524]/5">Menú</a>
            <a href="#ubicacion" className="text-white/80 hover:text-[#EFC524] px-3 py-2 rounded-md transition-all duration-300 tracking-wide hover:bg-[#EFC524]/5">Ubicación</a>
          </div>

          {/* Mobile Menu Icon */}
          <div className="sm:hidden flex items-center">
            <button aria-label="Abrir menú" className="text-[#DE9983] hover:text-[#EFC524] focus:outline-none transition-colors p-2 rounded-md hover:bg-[#EFC524]/10">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
