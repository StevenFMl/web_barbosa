import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Instagram, Facebook, Flame } from 'lucide-react';

export default function FooterUbicacion() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2, delayChildren: 0.3 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <footer id="ubicacion" className="bg-black border-t border-white/5 relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-[0.03] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        >
          
          {/* Info Section */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-8 bg-red-600"></span>
              <span className="uppercase tracking-[0.2em] font-medium text-xs text-red-500">Encuéntranos</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-stone-100 mb-6 tracking-tight">
              El Refugio del <br />
              <span className="text-red-600 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">Fuego en Ibarra</span>
            </h2>
            
            <p className="text-stone-400 text-lg mb-10 leading-relaxed font-light">
              El ambiente perfecto, el fuego exacto y el sabor que te hará volver. No somos solo un restaurante, somos una experiencia en torno a las brasas.
            </p>
            
            <div className="space-y-4 mb-10 w-full">
              {/* Location Card */}
              <motion.div 
                whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
                className="flex items-start bg-transparent p-4 sm:p-5 rounded-2xl border border-white/5 transition-colors group"
              >
                <div className="bg-zinc-900/50 p-3 rounded-lg border border-white/5 group-hover:border-red-500/50 transition-colors">
                  <MapPin className="w-6 h-6 text-red-500 group-hover:text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <h3 className="text-stone-200 font-bold text-lg mb-1 tracking-wide">Ubicación</h3>
                  <p className="text-stone-400 font-light">Av. Mariano Acosta y Gabriela Mistral<br/>Ibarra, Imbabura, EC</p>
                </div>
              </motion.div>
              
              {/* Hours Card */}
              <motion.div 
                whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
                className="flex items-start bg-transparent p-4 sm:p-5 rounded-2xl border border-white/5 transition-colors group"
              >
                <div className="bg-zinc-900/50 p-3 rounded-lg border border-white/5 group-hover:border-red-500/50 transition-colors">
                  <Clock className="w-6 h-6 text-red-500 group-hover:text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <h3 className="text-stone-200 font-bold text-lg mb-1 tracking-wide">Horarios de Atención</h3>
                  <p className="text-stone-400 font-light flex items-center gap-2">
                    Jueves a Domingo <span className="text-zinc-600">|</span> 17:00 - 23:00
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-stone-300 font-bold mb-4 uppercase tracking-[0.2em] text-xs">Síguenos en las redes</h3>
              <div className="flex gap-4">
                <motion.a 
                  href="#" 
                  aria-label="Ir a Facebook de Casa Barbosa"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-12 w-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:bg-zinc-800 hover:border-[#1877F2]/50 transition-colors shadow-lg"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="#" 
                  aria-label="Ir a Instagram de Casa Barbosa"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-12 w-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:bg-zinc-800 hover:border-[#E1306C]/50 transition-colors shadow-lg group relative overflow-hidden"
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
            className="h-96 lg:h-[600px] min-h-[400px] w-full rounded-3xl overflow-hidden relative z-10 shadow-2xl group border border-white/10 group-hover:border-white/20 transition-all duration-500 bg-zinc-900"
          >
            {/* Elegant glassmorphism floating badge over map */}
            <div className="absolute top-4 left-4 z-20 bg-black/70 backdrop-blur-md rounded-2xl px-4 py-2 flex items-center gap-2 border border-white/10 shadow-xl">
              <Flame className="w-4 h-4 text-red-500" />
              <span className="font-bold text-stone-100 text-sm tracking-widest uppercase">Casa Barbosa</span>
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
              className="w-full h-full grayscale contrast-125 brightness-75 opacity-80 group-hover:grayscale-[50%] group-hover:brightness-100 group-hover:opacity-100 transition-all duration-[1s] object-cover"
            ></iframe>
          </motion.div>
        </motion.div>
        
        {/* Copyright Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-sm"
        >
          <p>&copy; {new Date().getFullYear()} Casa Barbosa. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0 font-medium tracking-widest uppercase text-xs">Forjados al Fuego</p>
        </motion.div>
      </div>
    </footer>
  );
}
