import React, { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Inicio', target: 'inicio' },
  { name: 'Menú', target: 'menu' },
  { name: 'Ubicación', target: 'ubicacion' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (isOpen) {
      setHidden(false);
      return;
    }
    if (latest > previous && latest > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: '-110%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 bg-[#040504]/55 backdrop-blur-md backdrop-saturate-150 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">

          {/* Identidad */}
          <a
            href="#inicio"
            aria-label="Ir al inicio Casa Barbosa"
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer z-50 group"
          >
            <img
              src="/src/assets/logo barbosa chancho.png"
              alt=""
              aria-hidden="true"
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_2px_10px_rgba(249,115,22,0.15)] transition-transform duration-500 ease-out group-hover:-translate-y-0.5"
              loading="eager"
            />
            <span className="hidden sm:inline-block font-serif text-xl lg:text-2xl text-zinc-100 tracking-[0.18em] uppercase leading-none">
              Casa <span className="italic font-light text-orange-300/90">Barbosa</span>
            </span>
          </a>

          {/* Menú Escritorio con indicador fluido (layoutId) */}
          <ul
            className="hidden md:flex md:items-center md:gap-1 font-display text-sm tracking-[0.22em] uppercase"
            onMouseLeave={() => setHovered(null)}
          >
            {navLinks.map((item) => (
              <li key={item.name} className="relative">
                <a
                  href={`#${item.target}`}
                  onMouseEnter={() => setHovered(item.target)}
                  onFocus={() => setHovered(item.target)}
                  className="relative block px-5 py-3 text-zinc-300/90 hover:text-white focus:text-white transition-colors duration-300"
                >
                  {item.name}
                  {hovered === item.target && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute left-3 right-3 bottom-1 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {hovered === item.target && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute left-1/2 -translate-x-1/2 bottom-[2px] w-1 h-1 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            ))}

            <li className="ml-4">
              <a
                href="https://wa.me/593984180801"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold tracking-[0.3em] uppercase text-orange-200 border border-orange-400/30 hover:border-orange-300/70 hover:text-white transition-all duration-500 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-out" />
                <span className="relative">Reservar</span>
              </a>
            </li>
          </ul>

          {/* Botón Menú Móvil */}
          <div className="md:hidden flex items-center z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              className="text-orange-300 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-orange-400/50 transition-colors p-2 rounded-full bg-white/5 border border-white/10 active:scale-95"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
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
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-[#040504]/80 backdrop-blur-xl"
          >
            <div className="px-6 pt-6 pb-8 space-y-1">
              {navLinks.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={`#${item.target}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.3 }}
                  className="group flex items-center justify-between py-4 border-b border-white/5 text-zinc-200 hover:text-orange-300 transition-colors"
                >
                  <span className="font-serif text-2xl tracking-wide">
                    {item.name}
                  </span>
                  <span className="text-orange-400/70 font-display text-xs tracking-[0.3em]">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}

              <motion.a
                href="https://wa.me/593984180801"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.3 }}
                className="mt-6 block w-full text-center py-4 rounded-full border border-orange-400/40 text-orange-200 font-display text-xs font-semibold tracking-[0.4em] uppercase hover:bg-orange-500/10 transition-colors"
              >
                Reservar mesa
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
