import { useState } from 'react';
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
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 8);
  });

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: scrolled ? 'rgba(4, 5, 4, 0.72)' : 'rgba(4, 5, 4, 0)',
        backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'blur(0px) saturate(100%)',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'blur(0px) saturate(100%)',
        borderBottomColor: scrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0)',
        boxShadow: scrolled
          ? '0 8px 32px -12px rgba(0,0,0,0.55)'
          : '0 0 0 0 rgba(0,0,0,0)',
      }}
      transition={{ type: 'spring', stiffness: 600, damping: 40, mass: 0.4 }}
      className="fixed top-0 inset-x-0 z-50 border-b border-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">

          <a
            href="#inicio"
            aria-label="Ir al inicio Casa Barbosa"
            className="flex-shrink-0 flex items-center cursor-pointer z-50 group"
          >
            <img
              src="/src/assets/logo barbosa chancho.png"
              alt="Casa Barbosa"
              className="h-14 sm:h-16 lg:h-20 w-auto object-contain drop-shadow-[0_4px_16px_rgba(255,61,31,0.30)] transition-transform duration-150 ease-out group-hover:scale-[1.04]"
              loading="eager"
            />
          </a>

          <ul
            className="hidden md:flex md:items-center font-display text-lg tracking-wide"
            onMouseLeave={() => setHovered(null)}
          >
            {navLinks.map((item) => (
              <li key={item.name} className="relative">
                <a
                  href={`#${item.target}`}
                  onMouseEnter={() => setHovered(item.target)}
                  onFocus={() => setHovered(item.target)}
                  className="relative block px-4 py-2 text-zinc-200 hover:text-white focus:text-white transition-colors duration-100"
                >
                  {item.name}
                  {hovered === item.target && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute left-3 right-3 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff3d1f] to-transparent"
                      transition={{ type: 'spring', stiffness: 700, damping: 35 }}
                    />
                  )}
                  {hovered === item.target && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute left-1/2 -translate-x-1/2 -bottom-[3px] w-1.5 h-1.5 rounded-full bg-[#ff3d1f] shadow-[0_0_10px_rgba(255,61,31,0.9)]"
                      transition={{ type: 'spring', stiffness: 700, damping: 35 }}
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
                className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold tracking-[0.25em] uppercase text-orange-100 border border-[#ff3d1f]/50 hover:border-[#ff3d1f] hover:text-white hover:bg-[#ff3d1f]/15 transition-all duration-150 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#ff3d1f]/0 via-[#ff3d1f]/30 to-[#ff3d1f]/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-300 ease-out" />
                <span className="relative">Reservar</span>
              </a>
            </li>
          </ul>

          <div className="md:hidden flex items-center z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              className="text-[#ff3d1f] hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ff3d1f]/50 transition-colors duration-100 p-2 rounded-full bg-white/5 border border-white/10 active:scale-95"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-[#040504]/95 backdrop-blur-xl"
          >
            <div className="px-6 pt-6 pb-8 space-y-1">
              {navLinks.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={`#${item.target}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.2 }}
                  className="group flex items-center justify-between py-4 border-b border-white/5 text-zinc-200 hover:text-[#ff3d1f] transition-colors duration-100"
                >
                  <span className="font-serif text-2xl tracking-wide">
                    {item.name}
                  </span>
                  <span className="text-[#ff3d1f]/80 font-display text-xs tracking-[0.3em]">
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
                transition={{ delay: 0.2, duration: 0.2 }}
                className="mt-6 block w-full text-center py-4 rounded-full border border-[#ff3d1f]/50 text-orange-100 font-display text-sm font-semibold tracking-[0.4em] uppercase hover:bg-[#ff3d1f]/15 hover:text-white transition-colors duration-100"
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
