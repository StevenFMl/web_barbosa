import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Flame } from 'lucide-react';

export default function HeroElegante() {
  return (
    <section className="relative w-full min-h-[100vh] bg-[#040504] flex flex-col items-center justify-center overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1920&auto=format&fit=crop"
          alt="Carnes premium ahumándose"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-15 grayscale mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040504] via-[#040504]/80 to-[#040504]/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#040504]/60 via-transparent to-[#040504]/60"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center mt-16 sm:mt-0">
        
        {/* Antigravity Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="inline-flex items-center space-x-3 bg-[#393938]/30 border border-[#EFC524]/20 rounded-full px-6 py-2.5 backdrop-blur-md shadow-[0_0_20px_rgba(239,197,36,0.05)]"
          >
            <Flame className="w-5 h-5 text-[#EFC524] animate-pulse" aria-hidden="true" />
            <span className="text-[#DE9983] font-semibold tracking-[0.25em] uppercase text-xs sm:text-sm font-['Copperplate_Gothic_Bold',_'Cinzel',_serif]">
              Premium Steakhouse en Ibarra
            </span>
          </motion.div>
        </motion.div>

        {/* Majestic Antigravity Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <motion.h1
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black text-white tracking-tight leading-[1.1] mb-6 font-['Copperplate_Gothic_Bold',_'Cinzel',_serif] uppercase drop-shadow-2xl"
          >
            CASA <span className="text-[#EFC524] relative inline-block">
              BARBOSA
              <div className="absolute inset-0 blur-2xl bg-[#EFC524]/10 -z-10"></div>
            </span>
          </motion.h1>
        </motion.div>

        {/* Elegant Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl text-xl sm:text-2xl md:text-3xl text-white/70 mx-auto mb-12 font-light font-['Crimson_Text',_serif] leading-relaxed"
        >
          Cortes premium seleccionados, fuego lento a la leña y una atmósfera inigualable. La auténtica experiencia.
        </motion.p>

        {/* Magnetic CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.a
            href="https://wa.me/593999999999"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Reservar mesa o pedir por WhatsApp"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center justify-center px-10 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-bold text-[#040504] transition-all duration-300 bg-[#EFC524] border border-[#EFC524] rounded-full hover:bg-white hover:text-[#040504] hover:border-white hover:shadow-[0_0_40px_rgba(239,197,36,0.4)] overflow-hidden font-['Copperplate_Gothic_Bold',_'Cinzel',_serif] tracking-wider"
          >
            <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-all duration-300"></div>
            <span className="relative flex items-center gap-3">
              Reserva tu Mesa
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
