import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Mapeo seguro para los enlaces evitando problemas con tildes en el ID
  const navLinks = [
    { name: 'Inicio', target: 'inicio' },
    { name: 'Menú', target: 'menu' },
    { name: 'Ubicación', target: 'ubicacion' }
  ];

  // Optimización: cambio de estilo según scroll general
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 will-change-auto ${scrolled ? 'bg-[#040504]/95 backdrop-blur-lg border-b border-white/5 shadow-md py-2' : 'bg-gradient-to-b from-[#040504]/90 to-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16 sm:h-20 transition-all duration-300">
          
          {/* Logo optimizado: Solo transición en hover, sin animación JS infinita */}
          <a
            href="#inicio"
            aria-label="Ir al inicio"
            className="flex-shrink-0 flex items-center cursor-pointer z-50 pt-2 transition-transform duration-300 hover:scale-105 will-change-transform group block"
          >
            <img
              src="/src/assets/logo barbosa chancho.png"
              alt="Casa Barbosa"
              className="h-14 sm:h-20 w-auto object-contain drop-shadow-[0_2px_10px_rgba(249,115,22,0.2)] transition-transform duration-500 group-hover:-translate-y-1"
              loading="eager"
            />
          </a>

          {/* Menú Escritorio */}
          <div className="hidden md:flex md:items-center md:space-x-8 font-serif text-lg">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={`#${item.target}`}
                className="relative group text-zinc-300 hover:text-orange-400 px-3 py-2 rounded-md transition-all duration-300 tracking-wider font-medium font-display hover:-translate-y-0.5 inline-block will-change-transform"
              >
                {item.name}
                <span
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out will-change-transform"
                />
              </a>
            ))}

            <a
              href="https://wa.me/593984180801"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-orange-500/50 hover:bg-orange-500/10 text-orange-400 px-6 py-2 rounded-full text-sm font-bold tracking-widest font-display transition-all duration-300 shadow-[0_0_10px_rgba(249,115,22,0.1)] hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] ml-4 hover:scale-105 active:scale-95 inline-block will-change-transform"
            >
              RESERVAR
            </a>
          </div>

          {/* Botón Menú Móvil */}
          <div className="md:hidden flex items-center z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Abrir menú"
              className="text-orange-400 hover:text-orange-300 focus:outline-none transition-colors p-2 rounded-md bg-white/5 border border-white/10 active:scale-95 will-change-transform"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full md:hidden border-b border-white/10 shadow-2xl overflow-hidden origin-top bg-[#040504]/98 backdrop-blur-xl will-change-transform"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {navLinks.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={`#${item.target}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  className="block text-zinc-300 hover:text-orange-400 px-4 py-3.5 rounded-xl hover:bg-white/5 transition-colors text-xl font-display font-medium tracking-wide shadow-sm border border-transparent"
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="pt-5 px-2"
              >
                <a href="https://wa.me/593984180801" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="w-full block text-center bg-gradient-to-r from-orange-600 to-yellow-500 text-black font-black font-display tracking-widest py-4 rounded-xl shadow-[0_4px_15px_rgba(249,115,22,0.3)] active:scale-95 transition-transform will-change-transform">
                  RESERVAR AHORA
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
