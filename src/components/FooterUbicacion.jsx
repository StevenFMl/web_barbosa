import { useState, useEffect } from 'react';
import { MapPin, Clock, Instagram, Facebook, Phone, Mail } from 'lucide-react';

function useIsOpenNow() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    setIsOpen([0, 4, 5, 6].includes(day) && hour >= 17 && hour < 23);
  }, []);
  return isOpen;
}

export default function FooterUbicacion() {
  const isOpen = useIsOpenNow();

  return (
    <footer
      id="ubicacion"
      className="relative overflow-hidden bg-[#040504] border-t border-white/15 font-sans"
    >
      <div className="absolute top-6 left-0 right-0 text-center 2xl:top-12 2xl:left-8 2xl:right-auto 2xl:text-left z-40 pointer-events-none flex justify-center 2xl:block">
        <span className="inline-block text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#ff3d1f] uppercase 2xl:[writing-mode:vertical-rl] 2xl:rotate-180">
          CAPÍTULO 05 // EL DESTINO
        </span>
      </div>
      <div className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-[#ff3d1f]/[0.07] blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-[360px] w-[360px] rounded-full bg-red-700/[0.05] blur-[120px]" />

      <div
        aria-hidden="true"
        className="hidden md:flex pointer-events-none select-none absolute inset-0 items-center justify-center overflow-hidden"
      >
        <span
          className="font-display font-black uppercase text-white opacity-[0.04] leading-none tracking-[-0.05em] whitespace-nowrap"
          style={{ fontSize: 'clamp(10rem, 22vw, 22rem)' }}
        >
          BARBOSA
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-10">

        <div className="flex items-center gap-4 mb-12">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-white/60" />
          <span className="text-xs font-display tracking-[0.5em] uppercase text-white">
            Visítanos
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/30 to-white/60" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">

          <div className="lg:col-span-3 flex flex-col gap-6">
            <div>
              <span className="block text-xs font-display tracking-[0.4em] uppercase text-[#ff3d1f] mb-3">
                — Casa Barbosa
              </span>
              <p className="text-white text-lg leading-relaxed font-serif italic">
                Carbón, leña y paciencia. Así nace cada plato.
              </p>
            </div>

            <a
              href="https://wa.me/593984180801"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 self-start text-white border-b border-white/50 pb-2 hover:border-[#ff3d1f] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#ff3d1f] transition-transform group-hover:translate-x-0.5" />
              <span className="font-display tracking-[0.25em] uppercase text-sm">
                Reservar Mesa
              </span>
            </a>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xl font-display tracking-[0.15em] uppercase text-white mb-5 pb-3 border-b border-white/20">
              Ubicación
            </h4>
            <ul className="space-y-3 text-white font-serif text-lg leading-snug">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#ff3d1f] mt-1 shrink-0" />
                <span>
                  Panamericana Norte, El Olivo
                  <span className="block text-white/75 text-sm mt-1 not-italic font-sans tracking-wide">
                    Frente a la gasolinera · Ibarra, Ecuador
                  </span>
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xl font-display tracking-[0.15em] uppercase text-white mb-5 pb-3 border-b border-white/20">
              Horario
            </h4>
            <ul className="space-y-2 text-white font-serif text-lg leading-snug">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#ff3d1f] mt-1 shrink-0" />
                <span>
                  Jueves — Domingo
                  <span className="block text-[#ff3d1f] font-display tracking-[0.2em] text-lg mt-1">
                    17:00 — 23:00
                  </span>
                  <span className="block text-white/70 text-lg mt-2 font-sans not-italic">
                    Lun — Mié · Cerrado
                  </span>
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xl font-display tracking-[0.15em] uppercase text-white mb-5 pb-3 border-b border-white/20">
              Contacto
            </h4>
            <ul className="space-y-3 text-white font-serif text-lg">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#ff3d1f] shrink-0" />
                <a href="tel:+593984180801" className="hover:text-[#ff3d1f] transition-colors">
                  +593 98 418 0801
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#ff3d1f] shrink-0" />
                <a href="mailto:reservas@casabarbosa.ec" className="hover:text-[#ff3d1f] transition-colors">
                  reservas@casabarbosa.ec
                </a>
              </li>
            </ul>

            <div className="flex gap-3 mt-6">
              <a
                href="#"
                aria-label="Instagram"
                className="group w-11 h-11 border border-white/40 rounded-full flex items-center justify-center text-white hover:text-black hover:bg-white hover:border-white transition-all"
              >
                <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="group w-11 h-11 border border-white/40 rounded-full flex items-center justify-center text-white hover:text-black hover:bg-white hover:border-white transition-all"
              >
                <Facebook className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 h-64 lg:h-72 w-full rounded-sm overflow-hidden relative border border-white/15 group">
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-2 border border-white/25">
            <span
              aria-hidden="true"
              className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-[#ff3d1f] animate-pulse' : 'bg-zinc-500'}`}
            />
            <span className="font-display text-[10px] tracking-[0.35em] uppercase text-white">
              {isOpen ? 'Abierto Ahora' : 'Cerrado Ahora'}
            </span>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d498.71735074616873!2d-78.11191105673959!3d0.3617300704558116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2a3d8443549e5f%3A0x44b531f91e465e6f!2sChancho%20a%20la%20Barbosa!5e0!3m2!1ses!2sec!4v1780275616896!5m2!1ses!2sec"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación mapa Casa Barbosa en Ibarra"
            className="w-full h-full grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-[opacity,filter] duration-700"
          />
        </div>

        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-4 text-white text-sm font-serif">
          <p>© {new Date().getFullYear()} Casa Barbosa · Creado por <a href="https://saturlink.net" target="_blank" rel="noopener noreferrer" className="relative z-50 inline-block hover:text-[#ff3d1f] transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-[#ff3d1f] cursor-pointer pointer-events-auto">Saturlink</a></p>
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-white/40" />
            <span className="font-display tracking-[0.4em] uppercase text-[10px] text-white">
              Premium Steakhouse
            </span>
            <span className="h-px w-6 bg-white/40" />
          </div>
        </div>
      </div>
    </footer>
  );
}
