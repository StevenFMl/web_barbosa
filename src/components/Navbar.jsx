import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl sm:text-3xl font-black text-zinc-100 uppercase tracking-widest drop-shadow-md">
              Casa<span className="text-red-600 ml-1">Barbosa</span>
            </span>
          </div>
          {/* Desktop Menu */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a href="#inicio" className="text-zinc-300 hover:text-red-500 px-3 py-2 rounded-md font-medium transition-colors tracking-wide">Inicio</a>
            <a href="#menu" className="text-zinc-300 hover:text-red-500 px-3 py-2 rounded-md font-medium transition-colors tracking-wide">Menú</a>
            <a href="#ubicacion" className="text-zinc-300 hover:text-red-500 px-3 py-2 rounded-md font-medium transition-colors tracking-wide">Ubicación</a>
          </div>
          {/* Mobile Menu Icon (Static for now) */}
          <div className="sm:hidden flex items-center">
            <button aria-label="Abrir menú" className="text-zinc-300 hover:text-white focus:outline-none">
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
