import React from 'react';
import { MapPin, Clock, Instagram, Facebook, Phone, Mail } from 'lucide-react';

export default function FooterUbicacion() {
  return (
    <footer
      id="ubicacion"
      className="relative overflow-hidden bg-[#040504] border-t border-white/5 font-sans"
    >
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-orange-600/[0.04] blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 left-0 h-[420px] w-[420px] rounded-full bg-yellow-600/[0.03] blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-12">

        <div className="flex items-center gap-4 mb-20">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/20" />
          <span className="text-[10px] font-display tracking-[0.5em] uppercase text-zinc-500">
            Visítanos
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/20" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <span className="block text-[10px] font-display tracking-[0.4em] uppercase text-orange-500/80 mb-4">
                — Casa Barbosa
              </span>
              <p className="text-zinc-400 text-base leading-relaxed font-serif italic max-w-md">
                Donde el fuego lento esculpe sabores inolvidables y la carne
                alcanza su máxima expresión.
              </p>
            </div>

            <a
              href="https://wa.me/593984180801"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 self-start text-white border-b border-white/20 pb-2 hover:border-orange-500 transition-colors"
            >
              <Phone className="w-4 h-4 text-orange-500 transition-transform group-hover:translate-x-0.5" />
              <span className="font-display tracking-[0.25em] uppercase text-sm">
                Reservar Mesa
              </span>
            </a>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-display tracking-[0.4em] uppercase text-zinc-500 mb-6">
              Ubicación
            </h4>
            <ul className="space-y-3 text-zinc-300 font-serif text-[15px] leading-relaxed">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-500/70 mt-1 shrink-0" />
                <span>
                  Av. Mariano Acosta y Gabriela Mistral
                  <span className="block text-zinc-500 text-sm mt-1">
                    Ibarra · Imbabura
                  </span>
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-display tracking-[0.4em] uppercase text-zinc-500 mb-6">
              Horario
            </h4>
            <ul className="space-y-2 text-zinc-300 font-serif text-[15px] leading-relaxed">
              <li>Jueves — Domingo</li>
              <li className="text-orange-400/90 font-display tracking-[0.2em] text-xs pt-1">
                17:00 — 23:00
              </li>
              <li className="text-zinc-600 text-sm pt-2 border-t border-white/5 mt-3">
                Lun — Mié · Cerrado
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-display tracking-[0.4em] uppercase text-zinc-500 mb-6">
              Contacto
            </h4>
            <ul className="space-y-3 text-zinc-300 font-serif text-[15px]">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-500/70" />
                <a href="tel:+593984180801" className="hover:text-white transition-colors">
                  +593 98 418 0801
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-500/70" />
                <a href="mailto:reservas@casabarbosa.ec" className="hover:text-white transition-colors">
                  reservas@casabarbosa.ec
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-orange-500/70" />
                <span className="text-zinc-500 text-sm">Abierto ahora</span>
              </li>
            </ul>

            <div className="flex gap-3 mt-8">
              <a
                href="#"
                aria-label="Instagram"
                className="group w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/40 transition-all"
              >
                <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="group w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/40 transition-all"
              >
                <Facebook className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 h-72 lg:h-80 w-full rounded-sm overflow-hidden relative border border-white/5 group">
          <div className="absolute top-5 left-5 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md px-4 py-2 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-display text-[10px] tracking-[0.35em] uppercase text-white">
              Abierto Hoy
            </span>
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
            className="w-full h-full grayscale opacity-60 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-700"
          />
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-xs font-serif">
          <p>© {new Date().getFullYear()} Casa Barbosa · Creado por Saturlink</p>
          <div className="flex items-center gap-3 opacity-70">
            <span className="h-px w-6 bg-zinc-700" />
            <span className="font-display tracking-[0.4em] uppercase text-[9px] text-zinc-600">
              Premium Steakhouse
            </span>
            <span className="h-px w-6 bg-zinc-700" />
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="relative overflow-hidden select-none pointer-events-none"
      >
        <h1
          className="font-display font-black uppercase text-white/[0.04] leading-[0.85] tracking-[-0.04em] whitespace-nowrap text-center"
          style={{
            fontSize: 'clamp(8rem, 28vw, 26rem)',
            transform: 'translateY(15%)',
          }}
        >
          BARBOSA
        </h1>
      </div>
    </footer>
  );
}
