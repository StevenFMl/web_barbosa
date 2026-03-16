import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Flame } from 'lucide-react';

export default function HeroElegante() {
  return (
    <section className="relative w-full min-h-[90vh] bg-[#040504] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1920&auto=format&fit=crop" 
          alt="Carnes premium ahumándose" 
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-10 grayscale mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040504] via-[#040504]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#040504]/40 to-black"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, amount: 0.2 }}
           transition={{ duration: 0.5 }}
           className="mb-6"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="flex items-center space-x-2 bg-[#393938]/30 border border-[#EFC524]/30 rounded-full px-5 py-2 backdrop-blur-md"
          >
            <Flame className="w-5 h-5 text-[#EFC524] animate-pulse" aria-hidden="true" />
            <span className="text-[#DE9983] font-medium tracking-[0.2em] uppercase text-xs sm:text-sm font-['Copperplate_Gothic_Bold',_'Cinzel',_serif]">
              Premium Steakhouse en Ibarra
            </span>
          </motion.div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, amount: 0.2 }}
           transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.h1 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-tight mb-6 font-['Copperplate_Gothic_Bold',_'Cinzel',_serif] uppercase drop-shadow-xl"
          >
            CASA <span className="text-[#EFC524]">BARBOSA</span>
          </motion.h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-2xl text-lg sm:text-xl text-[#DE9983]/80 mx-auto mb-10 font-light font-['Crimson_Text',_serif]"
        >
          Cortes premium seleccionados, fuego lento a la leña y una atmósfera inigualable. La auténtica experiencia Barbosa.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, amount: 0.2 }}
           transition={{ duration: 0.7, delay: 0.6 }}
        >
          <motion.a
            href="https://wa.me/593999999999"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Reservar mesa o pedir por WhatsApp"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-[#040504] transition-all duration-300 bg-[#EFC524] border border-[#EFC524] rounded-full hover:bg-white hover:text-[#040504] overflow-hidden font-['Copperplate_Gothic_Bold',_'Cinzel',_serif]"
          >
            <div className="absolute inset-0 bg-[#DE9983]/20 group-hover:bg-[#EFC524]/30 blur-xl transition-all duration-300"></div>
            <span className="relative flex items-center gap-3">
              Reserva tu Mesa
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
