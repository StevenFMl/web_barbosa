import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Instagram, Facebook, Flame } from 'lucide-react';

export default function FooterUbicacion() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <footer id="ubicacion" className="bg-[#040504] border-t border-white/5 relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        >
          
          {/* Info Section */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center relative">
            
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(239,197,36,0.03),transparent_60%)] pointer-events-none"></div>

            <div className="flex items-center gap-3 mb-4 relative z-10">
              <span className="h-[1px] w-8 bg-[#EFC524]"></span>
              <span className="uppercase tracking-[0.2em] font-medium text-xs text-[#EFC524] font-display">Encuéntranos</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight font-display uppercase leading-tight relative z-10">
              El Refugio del <br />
              <span className="text-[#EFC524] drop-shadow-[0_0_15px_rgba(239,197,36,0.2)]">Fuego en Ibarra</span>
            </h2>
            
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed font-light font-serif tracking-wide relative z-10">
              El ambiente perfecto, el fuego exacto y el sabor que te hará volver. No somos solo un restaurante, somos una experiencia en torno a las brasas.
            </p>
            
            <div className="space-y-4 mb-10 w-full relative z-10">
              {/* Location Card */}
              <motion.div 
                whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.03)" }}
                className="flex items-start bg-transparent p-4 sm:p-5 rounded-2xl border border-white/5 transition-colors group"
              >
                <div className="bg-[#393938]/30 p-3 rounded-lg border border-white/5 group-hover:border-[#EFC524]/50 group-hover:bg-[#EFC524]/10 transition-colors duration-300">
                  <MapPin className="w-6 h-6 text-[#EFC524] group-hover:text-white transition-colors" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-bold text-lg mb-1 tracking-wider font-display">Ubicación</h3>
                  <p className="text-zinc-400 font-light font-serif">Av. Mariano Acosta y Gabriela Mistral<br/>Ibarra, Imbabura, EC</p>
                </div>
              </motion.div>
              
              {/* Hours Card */}
              <motion.div 
                whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.03)" }}
                className="flex items-start bg-transparent p-4 sm:p-5 rounded-2xl border border-white/5 transition-colors group"
              >
                <div className="bg-[#393938]/30 p-3 rounded-lg border border-white/5 group-hover:border-[#EFC524]/50 group-hover:bg-[#EFC524]/10 transition-colors duration-300">
                  <Clock className="w-6 h-6 text-[#EFC524] group-hover:text-white transition-colors" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-bold text-lg mb-1 tracking-wider font-display">Horarios de Atención</h3>
                  <p className="text-zinc-400 font-light flex items-center gap-2 font-serif">
                    Jueves a Domingo <span className="text-white/20">|</span> 17:00 - 23:00
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Socials */}
            <div className="relative z-10">
              <h3 className="text-zinc-500 font-bold mb-4 uppercase tracking-[0.25em] text-xs font-display">Síguenos en las redes</h3>
              <div className="flex gap-4">
                <motion.a 
                  href="#" 
                  aria-label="Ir a Facebook de Casa Barbosa"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-12 w-12 bg-[#393938]/30 border border-white/10 rounded-full flex items-center justify-center text-zinc-400 hover:text-[#040504] hover:bg-[#EFC524] hover:border-[#EFC524] transition-all shadow-lg group"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="#" 
                  aria-label="Ir a Instagram de Casa Barbosa"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-12 w-12 bg-[#393938]/30 border border-white/10 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-all shadow-lg group relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] transition-opacity duration-300 pointer-events-none mix-blend-overlay"></div>
                  <Instagram className="w-5 h-5 relative z-10" />
                </motion.a>
              </div>
            </div>
          </motion.div>
          
          {/* Elegant Map embed */}
          <motion.div 
            variants={itemVariants} 
            className="h-96 lg:h-[600px] min-h-[400px] w-full rounded-3xl overflow-hidden relative z-10 shadow-2xl group border border-white/10 hover:border-[#EFC524]/40 transition-all duration-500 bg-[#393938]"
          >
            {/* Elegant glassmorphism floating badge over map */}
            <div className="absolute top-4 left-4 z-20 bg-[#040504]/80 backdrop-blur-md rounded-2xl px-5 py-2.5 flex items-center gap-3 border border-white/10 shadow-[0_0_20px_rgba(239,197,36,0.1)]">
              <Flame className="w-5 h-5 text-[#EFC524] animate-pulse" />
              <span className="font-bold text-white text-sm tracking-widest uppercase font-display">Casa Barbosa</span>
            </div>

            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8055139032607!2d-78.1189467!3d0.3540251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2a3c7c4b4d6aab%3A0x6bba847b2c5890e1!2sIbarra%2C%20Ecuador!5e0!3m2!1sen!2sus!4v1709650000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación mapa Casa Barbosa en Ibarra"
              className="w-full h-full grayscale contrast-125 brightness-75 opacity-70 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-700 object-cover"
            ></iframe>
          </motion.div>
        </motion.div>
        
        {/* Copyright Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm font-serif"
        >
          <p>&copy; {new Date().getFullYear()} Creado por Saturlink. Todos los derechos reservados.</p>
          <p className="mt-4 md:mt-0 font-bold tracking-[0.3em] uppercase text-xs font-display text-zinc-600">Forjados al Fuego</p>
        </motion.div>
      </div>
    </footer>
  );
}
