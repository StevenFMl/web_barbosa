import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Flame } from 'lucide-react';

export default function HeroElegante() {
  return (
    <section className="relative w-full min-h-[100vh] bg-[#040504] flex flex-col items-center justify-center overflow-hidden">
      {/* Immersive Background with slow, dynamic pulse */}
      <div className="absolute inset-0 z-0 bg-[#040504]">
        <img
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1920&auto=format&fit=crop"
          alt="Carnes premium ahumándose"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-20 grayscale brightness-75 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040504] via-[#040504]/80 to-[#040504]/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#040504]/70 via-transparent to-[#040504]/70"></div>
        
        {/* Dynamic ambient glow */}
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,197,36,0.1)_0%,transparent_60%)] pointer-events-none"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center mt-16 sm:mt-0">
        
        {/* Antigravity Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center space-x-3 bg-zinc-900/40 border border-[#EFC524]/20 rounded-full px-6 py-2.5 backdrop-blur-md shadow-[0_0_20px_rgba(239,197,36,0.05)] transition-all duration-500 hover:border-[#EFC524]/50 hover:bg-[#EFC524]/5">
            <Flame className="w-5 h-5 text-[#EFC524] animate-pulse" aria-hidden="true" />
            <span className="text-zinc-300 font-medium tracking-[0.3em] uppercase text-xs sm:text-sm font-display">
              Premium Steakhouse en Ibarra
            </span>
          </div>
        </motion.div>

        {/* Majestic Antigravity Title (Refined float) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
          className="relative will-change-transform"
        >
          <motion.h1
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="text-[4rem] sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tight leading-[1.1] mb-6 font-display uppercase drop-shadow-2xl text-white will-change-transform"
          >
            CASA <span className="text-[#EFC524] relative inline-block">
              BARBOSA
              <div className="absolute inset-0 blur-[40px] bg-[#EFC524]/20 -z-10"></div>
            </span>
          </motion.h1>
        </motion.div>

        {/* Elegant Subtitle - Cleaned Typography */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl text-lg sm:text-xl md:text-2xl text-zinc-300 mx-auto mb-12 font-serif leading-relaxed tracking-wide"
        >
          Cortes premium seleccionados, fuego lento a la leña y una atmósfera inigualable. La auténtica experiencia.
        </motion.p>

        {/* Magnetic CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.a
            href="https://wa.me/593999999999"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Reservar mesa o pedir por WhatsApp"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center justify-center px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-xl font-bold text-[#040504] transition-all duration-300 bg-[#EFC524] border border-[#EFC524] rounded-full hover:bg-white hover:text-[#040504] hover:shadow-[0_0_40px_rgba(239,197,36,0.4)] overflow-hidden font-display tracking-widest will-change-transform"
          >
            <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-all duration-300"></div>
            <span className="relative flex items-center gap-3">
              Reserva tu Mesa
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
