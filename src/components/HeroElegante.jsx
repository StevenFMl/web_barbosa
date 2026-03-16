import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Flame } from 'lucide-react';

export default function HeroElegante() {
  return (
    <section className="relative w-full min-h-[90vh] bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1920&auto=format&fit=crop"
          alt="Carnes premium ahumándose"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-950/40 to-black"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2 mb-6 bg-white/5 border border-white/10 rounded-full px-5 py-2 backdrop-blur-sm"
        >
          <Flame className="w-5 h-5 text-red-500 animate-pulse" aria-hidden="true" />
          <span className="text-stone-300 font-medium tracking-[0.2em] uppercase text-xs sm:text-sm">
            Premium Steakhouse en Ibarra
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-stone-100 tracking-tight leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Donde hay humo, <span className="text-red-500">hay sabor</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-2xl text-lg sm:text-xl text-stone-400 mx-auto mb-10 font-light"
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
            className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-white transition-all duration-300 bg-zinc-900 border border-red-500/50 rounded-full hover:bg-zinc-800 hover:border-red-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-500/20 group-hover:bg-red-500/30 blur-xl transition-all duration-300"></div>
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
