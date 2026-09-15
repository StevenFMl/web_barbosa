import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Flame } from 'lucide-react';

function getEcuadorHour() {
  try {
    const formatter = new Intl.DateTimeFormat('es-EC', {
      timeZone: 'America/Guayaquil',
      hour: 'numeric',
      hour12: false,
    });
    const parts = formatter.formatToParts(new Date());
    const hourPart = parts.find((p) => p.type === 'hour');
    return hourPart ? parseInt(hourPart.value, 10) : new Date().getHours();
  } catch (e) {
    return new Date().getHours();
  }
}

function useIsOpenNow() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const check = () => {
      const hour = getEcuadorHour();
      setIsOpen(hour >= 11 && hour < 23);
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  return isOpen;
}

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.25,
    },
  },
};

const reveal = {
  hidden: {
    opacity: 0,
    y: 48,
    filter: 'blur(10px)',
    clipPath: 'inset(0 0 100% 0)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      duration: 1.2,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const spring = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
};

const lineGrow = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function HeroElegante() {
  const isOpen = useIsOpenNow();

  return (
    <section
      id="inicio"
      className="relative w-full min-h-[100svh] bg-[#040504] overflow-hidden flex items-center"
    >
      <div className="absolute inset-0 z-0">
        <motion.img
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1920&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{
            scale: [1.15, 1.3, 1.15],
            opacity: 0.42,
          }}
          transition={{
            opacity: { duration: 2.2, ease: [0.25, 1, 0.5, 1] },
            scale: {
              duration: 28,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'mirror',
            },
          }}
          className="w-full h-full object-cover object-center grayscale-[35%] brightness-[0.6] mix-blend-luminosity"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#040504] via-[#040504]/55 to-[#040504]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040504] via-transparent to-[#040504]/70" />

        <div className="absolute top-1/3 -left-[10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(255,61,31,0.20)_0%,transparent_55%)] pointer-events-none blur-[100px]" />

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 1, ease: [0.25, 1, 0.5, 1] }}
        className="hidden xl:flex absolute top-28 sm:top-32 left-6 2xl:left-10 z-20 flex-col items-center gap-4 pointer-events-none select-none"
      >
        <span className="text-[10px] 2xl:text-[11px] font-mono tracking-[0.3em] text-[#ff3d1f] uppercase [writing-mode:vertical-rl] rotate-180 drop-shadow-md">
          CAPÍTULO 01 // EL ORIGEN
        </span>
        <span className="w-px h-16 2xl:h-20 bg-gradient-to-b from-[#ff3d1f]/60 to-transparent" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
        className="hidden md:flex absolute top-28 right-8 lg:right-16 z-20 items-center gap-4 text-zinc-400"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase font-display">Capítulo</span>
        <span className="text-xs tracking-[0.3em] font-display text-[#ff3d1f]">01 / 06</span>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-24 pt-28 pb-12 sm:pt-32 sm:pb-16"
      >
        <motion.div variants={spring} className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-3 border border-[#ff3d1f]/30 bg-white/[0.03] backdrop-blur-md rounded-full pl-3 pr-5 py-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ff3d1f]/15">
              <Flame aria-hidden="true" className="w-3.5 h-3.5 text-[#ff3d1f]" />
            </span>
            <span className="text-[10px] sm:text-[11px] tracking-[0.4em] text-orange-200/90 uppercase font-display">
              Chancho a la Barbosa · Ibarra, Ecuador
            </span>
          </div>
        </motion.div>

        <motion.h1
          variants={reveal}
          className="font-display font-black uppercase text-white leading-[0.86] tracking-[-0.045em] text-[clamp(2.75rem,11vw,12rem)] max-w-[14ch]"
        >
          <span className="block">Donde hay</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-br from-orange-300 via-[#ff3d1f] to-red-700 italic font-serif tracking-[-0.02em]">
            humo,
          </span>
          <span className="block">hay sabor.</span>
        </motion.h1>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
          <motion.div variants={lineGrow} className="hidden md:block md:col-span-2 origin-left">
            <span className="block h-px w-full bg-gradient-to-r from-[#ff3d1f] to-transparent" />
          </motion.div>

          <motion.p
            variants={reveal}
            className="md:col-span-6 text-stone-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed tracking-normal font-sans max-w-xl"
          >
            Carbón, leña y paciencia. Cada pieza se elige, se cocina sin prisa y se sirve sin adornos. En{' '}
            <span className="text-white font-semibold">Casa Barbosa</span> el chancho no necesita más.
          </motion.p>

          <motion.div variants={spring} className="md:col-span-4 flex md:justify-end items-center gap-3 sm:gap-4 flex-wrap">
            <a
              href="https://wa.me/593984085851?text=Hola%20Casa%20Barbosa!%20Quiero%20hacer%20una%20reserva."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reservar mesa por WhatsApp"
              className="group relative inline-flex items-center gap-4 sm:gap-5 pl-6 sm:pl-7 pr-3 py-3 rounded-full bg-white text-black font-display font-bold tracking-[0.2em] uppercase text-xs sm:text-sm overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:pl-8 active:scale-[0.98] shadow-xl"
            >
              <span className="relative z-10">Reserva tu mesa</span>
              <span className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black text-white transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:rotate-45">
                <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-[#ff3d1f] to-red-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              />
            </a>

            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 hover:border-[#ff3d1f] text-white hover:text-[#ff3d1f] font-display text-xs uppercase tracking-widest transition-all bg-white/[0.04] backdrop-blur-md"
            >
              Ver la Carta
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={spring}
          className="mt-14 sm:mt-20 flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-2.5 text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-zinc-400 font-mono"
        >
          <span className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-500'}`}
            />
            <span className={isOpen ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
              {isOpen ? 'Mesas Abiertas Ahora' : 'Abre hoy a las 11:00 AM'}
            </span>
          </span>
          <span className="hidden sm:inline text-zinc-600">·</span>
          <span>Lunes a Domingo · 11:00 a 23:00</span>
          <span className="hidden sm:inline text-zinc-600">·</span>
          <span className="hidden sm:inline">El Olivo · Ibarra</span>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
        className="hidden md:flex absolute bottom-10 right-8 lg:right-20 z-20 items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 font-display">Scroll</span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="block w-px h-8 bg-gradient-to-b from-[#ff3d1f] to-transparent"
        />
      </motion.div>
    </section>
  );
}
