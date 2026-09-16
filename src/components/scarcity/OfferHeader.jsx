import { motion } from 'framer-motion';
import { Ticket } from 'lucide-react';
import PulseDot from './PulseDot';

export default function OfferHeader({ isSoldOut }) {
  return (
    <>
      {/* Chapter side marker for wide screens */}
      <div className="hidden xl:flex absolute top-20 sm:top-24 left-6 2xl:left-10 z-20 flex-col items-center gap-4 pointer-events-none select-none">
        <span className="inline-block text-[11px] 2xl:text-xs font-mono tracking-[0.3em] text-[#ff3d1f] uppercase [writing-mode:vertical-rl] rotate-180 drop-shadow-md">
          CAPÍTULO 02 // LA OPORTUNIDAD
        </span>
        <span className="w-px h-16 2xl:h-20 bg-gradient-to-b from-[#ff3d1f]/60 to-transparent" />
      </div>

      {/* Atmospheric ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,61,31,0.08)_0%,rgba(180,50,15,0.03)_50%,transparent_75%)] pointer-events-none blur-3xl" />
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-amber-900/[0.05] rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-8 sm:mb-12"
      >
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-[#ff3d1f]/40 bg-black/60 backdrop-blur-md rounded-full mb-3.5">
          <Ticket className="w-3.5 h-3.5 text-[#ff3d1f] -rotate-12" />
          <span className="font-display text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-orange-200/90 font-bold">
            Cupón Exclusivo · En Vivo
          </span>
          {!isSoldOut && <PulseDot />}
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1] font-display uppercase">
          Cortesía
          <span className="block sm:inline-block text-transparent bg-clip-text bg-gradient-to-br from-orange-300 via-[#ff3d1f] to-red-700 italic font-serif font-light tracking-tight normal-case mt-1 sm:mt-0 sm:ml-3">
            de la Casa
          </span>
        </h2>

        <p className="max-w-xl mx-auto text-zinc-400 font-serif text-sm sm:text-base leading-relaxed mt-2.5">
          Promoción activa por tiempo limitado. Reclama tu cupón antes de que se agoten las unidades de la jornada.
        </p>
      </motion.div>
    </>
  );
}
