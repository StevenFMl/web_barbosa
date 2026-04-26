import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function WhatsAppButton() {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 18, mass: 0.4 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const tooltipOpacity = useTransform(x, [-30, 0, 30], [0.6, 1, 0.6]);

  const MAGNETIC_RADIUS = 110;
  const MAGNETIC_STRENGTH = 0.35;

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);

    if (dist < MAGNETIC_RADIUS) {
      mouseX.set(dx * MAGNETIC_STRENGTH);
      mouseY.set(dy * MAGNETIC_STRENGTH);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
      style={{ width: 200, height: 200, justifyContent: 'flex-end', alignItems: 'flex-end', display: 'flex', pointerEvents: 'none' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ x, y, opacity: tooltipOpacity, pointerEvents: 'none' }}
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 8,
        }}
        transition={{ duration: 0.25 }}
        className="mb-3 mr-1 hidden sm:block"
      >
        <span className="inline-block bg-white/[0.06] backdrop-blur-xl text-white text-[10px] uppercase tracking-[0.3em] font-display py-2.5 px-4 rounded-full border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] whitespace-nowrap">
          Haz tu pedido
        </span>
      </motion.div>

      <motion.a
        ref={ref}
        href="https://wa.me/593999999999"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        style={{ x, y, pointerEvents: 'auto' }}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.06 }}
        onMouseEnter={() => setHovered(true)}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-white/[0.06] backdrop-blur-2xl border border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#040504] transition-colors duration-300"
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
        <span className="pointer-events-none absolute -inset-px rounded-full bg-gradient-to-br from-white/10 via-transparent to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/5" />

        <svg
          className="relative z-10 w-7 h-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>

        <span className="pointer-events-none absolute inset-0 rounded-full animate-ping bg-white/10 opacity-30" />
      </motion.a>
    </div>
  );
}
