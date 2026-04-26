import React from 'react';
import { MapPin, Clock, Instagram, Facebook, Flame, Phone } from 'lucide-react';

export default function FooterUbicacion() {
  return (
    <footer id="ubicacion" className="bg-[#040504] border-t border-white/5 relative overflow-hidden font-sans">
      {/* Glows ambientales sutiles optimizados */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-600/5 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-10">
        
        {/* Cabecera del Footer (Elegante y minimalista) */}
        <div className="flex flex-col items-center justify-center mb-16 sm:mb-20 text-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-orange-500"></span>
            <Flame className="w-6 h-6 text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-orange-500"></span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-display uppercase leading-none drop-shadow-md">
            Casa <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Barbosa</span>
          </h2>
          <p className="mt-6 max-w-2xl text-zinc-400 text-lg font-serif italic tracking-wide">
            "Donde el fuego lento esculpe sabores inolvidables y la carne alcanza su máxima expresión."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          
          {/* Información de Contacto y Ubicación */}
          <div className="flex flex-col justify-center gap-8">
            
            <div className="group flex items-start p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:bg-white/[0.07] hover:-translate-y-1 will-change-transform shadow-lg">
              <div className="bg-black/50 p-4 rounded-xl border border-white/5 group-hover:border-orange-500/50 transition-colors shrink-0 shadow-inner">
                <MapPin className="w-7 h-7 text-orange-500 group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all" />
              </div>
              <div className="ml-5">
                <h3 className="text-white font-bold text-xl mb-2 tracking-widest font-display uppercase">Nuestra Casa</h3>
                <p className="text-zinc-400 font-serif leading-relaxed text-lg">
                  Av. Mariano Acosta y Gabriela Mistral<br/>
                  <span className="text-zinc-500">Ibarra, Imbabura, Ecuador</span>
                </p>
              </div>
            </div>

            <div className="group flex items-start p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:bg-white/[0.07] hover:-translate-y-1 will-change-transform shadow-lg">
              <div className="bg-black/50 p-4 rounded-xl border border-white/5 group-hover:border-orange-500/50 transition-colors shrink-0 shadow-inner">
                <Clock className="w-7 h-7 text-orange-500 group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all" />
              </div>
              <div className="ml-5">
                <h3 className="text-white font-bold text-xl mb-2 tracking-widest font-display uppercase">Horario de Fuegos</h3>
                <p className="text-zinc-400 font-serif leading-relaxed text-lg">
                  Jueves a Domingo<br/>
                  <span className="text-orange-400 font-medium tracking-widest font-display text-sm">17:00 HRS — 23:00 HRS</span>
                </p>
              </div>
            </div>

            {/* Redes Sociales y Teléfono en Layout Compacto */}
            <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 mt-2">
              <a 
                href="https://wa.me/593984180801" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-600 to-yellow-600 text-black p-4 rounded-xl font-black font-display tracking-widest uppercase hover:opacity-90 transition-opacity shadow-[0_4px_20px_rgba(249,115,22,0.25)] hover:shadow-[0_4px_25px_rgba(249,115,22,0.4)]"
              >
                <Phone className="w-5 h-5 fill-current" /> Reservar Mesa
              </a>

              <div className="flex gap-4">
                <a 
                  href="#" 
                  aria-label="Facebook"
                  className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300 group"
                >
                  <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="#" 
                  aria-label="Instagram"
                  className="relative w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 overflow-hidden group hover:border-transparent"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] transition-opacity duration-300" />
                  <Instagram className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

          </div>
          
          {/* Mapa Elevado e Integrado (Sin animaciones pesadas de filtro constante) */}
          <div className="h-96 lg:h-full min-h-[450px] w-full rounded-2xl overflow-hidden relative z-10 shadow-2xl border border-white/10 group bg-zinc-900 transition-colors hover:border-orange-500/40">
            {/* Etiqueta flotante elegante */}
            <div className="absolute top-5 right-5 z-20 bg-black/80 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="font-bold text-white text-xs tracking-[0.2em] font-display uppercase">Abierto Hoy</span>
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
              className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500 object-cover filter contrast-[1.1]"
            ></iframe>
          </div>
        </div>
        
        {/* Copyright y Firma Final */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm font-serif">
          <p>&copy; {new Date().getFullYear()} Creado por Saturlink. Todos los derechos reservados.</p>
          <div className="mt-4 md:mt-0 flex items-center gap-2 opacity-80">
            <span className="h-[1px] w-8 bg-zinc-700"></span>
            <span className="font-black tracking-[0.3em] uppercase text-[10px] sm:text-xs font-display text-zinc-600">Premium Steakhouse</span>
            <span className="h-[1px] w-8 bg-zinc-700"></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
