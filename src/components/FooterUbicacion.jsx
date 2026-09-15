import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Instagram, 
  Facebook, 
  CreditCard, 
  Copy, 
  Check, 
  Flame, 
  MessageCircle,
  Navigation
} from 'lucide-react';

function getEcuadorHour() {
  try {
    const formatter = new Intl.DateTimeFormat('es-EC', {
      timeZone: 'America/Guayaquil',
      hour: 'numeric',
      hour12: false,
    });
    const parts = formatter.formatToParts(new Date());
    const hourPart = parts.find((p) => p.type === 'hour');
    return hourPart ? parseInt(hourPart.value, 10) : new Date().getHours();
  } catch (e) {
    return new Date().getHours();
  }
}

function useIsOpenNow() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const check = () => {
      const hour = getEcuadorHour();
      setIsOpen(hour >= 11 && hour < 23);
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  return isOpen;
}

const QUICK_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'La Carta', href: '#menu' },
  { label: 'Cupón VIP', href: '#oportunidad' },
  { label: 'Nuestra Historia', href: '/nosotros' },
  { label: 'El Veredicto', href: '#resenas' },
  { label: 'Ubicación', href: '#ubicacion' },
];

export default function FooterUbicacion() {
  const isOpen = useIsOpenNow();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(
        'Panamericana Norte E35 1 C3 y Luis Fernando Madera, sector El Olivo, Ibarra, Ecuador'
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (err) {
      console.error('Error al copiar dirección', err);
    }
  };

  return (
    <footer
      id="ubicacion"
      aria-labelledby="ubicacion-heading"
      className="relative overflow-hidden bg-[#040504] border-t border-white/10 font-sans text-stone-200"
    >
      {/* Chapter side marker for wide screens: situado en el encabezado para no montarse sobre las tarjetas ni colisionar */}
      <div className="hidden xl:flex absolute top-20 sm:top-24 left-6 2xl:left-10 z-20 flex-col items-center gap-4 pointer-events-none select-none">
        <span className="inline-block text-[11px] 2xl:text-xs font-mono tracking-[0.3em] text-[#ff3d1f] uppercase [writing-mode:vertical-rl] rotate-180 drop-shadow-md">
          CAPÍTULO 06 // EL DESTINO
        </span>
        <span className="w-px h-16 2xl:h-20 bg-gradient-to-b from-[#ff3d1f]/60 to-transparent" />
      </div>

      {/* Atmospheric ambient glows */}
      <div className="pointer-events-none absolute -top-32 right-0 h-[450px] w-[450px] rounded-full bg-[#ff3d1f]/[0.06] blur-[150px]" />
      <div className="pointer-events-none absolute bottom-12 left-0 h-[380px] w-[380px] rounded-full bg-amber-700/[0.04] blur-[130px]" />

      {/* Background Watermark */}
      <div
        aria-hidden="true"
        className="hidden md:flex pointer-events-none select-none absolute inset-0 items-center justify-center overflow-hidden"
      >
        <span
          className="font-display font-black uppercase text-white opacity-[0.025] leading-none tracking-[-0.05em] whitespace-nowrap"
          style={{ fontSize: 'clamp(10rem, 24vw, 24rem)' }}
        >
          BARBOSA
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20 pb-12">

        {/* Section Header: In-flow so it NEVER overlaps */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-4 text-[#ff3d1f]">
            <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-[#ff3d1f] to-transparent" />
            <MapPin className="w-3.5 h-3.5 fill-[#ff3d1f]" />
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase font-bold">
              Capítulo 06 // Encuéntranos
            </span>
            <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-[#ff3d1f] to-transparent" />
          </div>

          <h2
            id="ubicacion-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[0.98] font-display uppercase mb-4"
          >
            El Destino
            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-orange-300 via-[#ff3d1f] to-red-700 italic font-serif font-light tracking-tight normal-case mt-1">
              del fuego.
            </span>
          </h2>

          <p className="text-zinc-300 font-serif text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Sector El Olivo, frente a la gasolinera. Te esperamos en la entrada norte de Ibarra con la leña encendida y la mesa lista.
          </p>
        </div>

        {/* 4 CARDS BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12 sm:mb-14">

          {/* CARD 1: DIRECCIÓN & CÓMO LLEGAR */}
          <article className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-sm bg-[#0a0b0a] border border-white/10 hover:border-[#ff3d1f]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,61,31,0.1)]">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#ff3d1f] group-hover:bg-[#ff3d1f]/10 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff3d1f] bg-[#ff3d1f]/10 border border-[#ff3d1f]/30 px-2 py-0.5 rounded-sm">
                  El Olivo · Ibarra
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide mb-2.5">
                Ubicación Exacta
              </h3>

              <p className="text-zinc-300 font-serif text-sm sm:text-base leading-relaxed mb-1">
                Panamericana Norte E35 1 C3 y Luis Fernando Madera.
              </p>
              <p className="text-zinc-400 text-xs font-sans tracking-wide leading-relaxed mb-4">
                Sector El Olivo (frente a la gasolinera) · Ibarra, Imbabura, Ecuador.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-4 border-t border-white/10 mt-2">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=0.3617300704558116,-78.11191105673959"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-sm bg-white/5 hover:bg-[#ff3d1f] text-white hover:text-black font-display text-[11px] font-bold uppercase tracking-wider transition-all border border-white/10 hover:border-[#ff3d1f]"
              >
                <Navigation className="w-3.5 h-3.5" />
                Cómo llegar en Maps
              </a>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-sm bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white font-mono text-[11px] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">¡Dirección copiada!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Copiar dirección</span>
                  </>
                )}
              </button>
            </div>
          </article>

          {/* CARD 2: HORARIOS & ESTADO EN VIVO */}
          <article className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-sm bg-[#0a0b0a] border border-white/10 hover:border-[#ff3d1f]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,61,31,0.1)]">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#ff3d1f] group-hover:bg-[#ff3d1f]/10 transition-colors">
                  <Clock className="w-5 h-5" />
                </div>
                {/* Live Status Badge */}
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-black/60 border border-white/15">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-500'
                    }`}
                  />
                  <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                    isOpen ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {isOpen ? 'Abierto Ahora' : 'Cerrado Ahora'}
                  </span>
                </div>
              </div>

              <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide mb-2.5">
                Horario de Fuego
              </h3>

              <div className="space-y-1 mb-3">
                <span className="block text-zinc-400 text-xs uppercase tracking-wider font-mono">
                  Lunes a Domingo
                </span>
                <span className="block text-2xl font-black font-display text-[#ff3d1f] tracking-tight">
                  11:00 — 23:00
                </span>
              </div>

              <p className="text-zinc-300 font-serif text-sm leading-relaxed">
                Atención continua todos los días. Almuerzos ejecutivos, cenas familiares y brasas encendidas sin interrupción.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 mt-4 flex items-center gap-2 text-xs font-serif text-zinc-400 italic">
              <Flame className="w-3.5 h-3.5 text-[#ff3d1f] shrink-0" />
              <span>Chimenea de leña y braseros de mesa.</span>
            </div>
          </article>

          {/* CARD 3: RESERVAS & CONTACTO */}
          <article className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-sm bg-[#0a0b0a] border border-white/10 hover:border-[#ff3d1f]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,61,31,0.1)]">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#ff3d1f] group-hover:bg-[#ff3d1f]/10 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff3d1f] bg-[#ff3d1f]/10 border border-[#ff3d1f]/30 px-2 py-0.5 rounded-sm">
                  Atención Directa
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide mb-2.5">
                Reservas & Pedidos
              </h3>

              <a
                href="tel:+593984085851"
                className="block text-xl font-bold font-mono text-white hover:text-[#ff3d1f] transition-colors mb-2 tracking-wide"
              >
                +593 98 408 5851
              </a>

              <p className="text-zinc-300 font-serif text-sm leading-relaxed mb-4">
                Reserva mesa para celebraciones o pide con anticipación para retirar en local sin esperas.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-4 border-t border-white/10 mt-2">
              <a
                href="https://wa.me/593984085851?text=Hola%20Casa%20Barbosa,%20deseo%20hacer%20una%20reserva%20o%20pedido"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-sm bg-[#ff3d1f] hover:bg-white text-black font-display text-[11px] font-bold uppercase tracking-wider transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Escribir al WhatsApp
              </a>
              <a
                href="tel:+593984085851"
                className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-sm bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white font-mono text-[11px] transition-colors"
              >
                <Phone className="w-3 h-3 text-[#ff3d1f]" />
                Llamar directo
              </a>
            </div>
          </article>

          {/* CARD 4: MÉTODOS DE PAGO (OFICIAL DE LA CARTA PÁG 5) */}
          <article className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-sm bg-[#0a0b0a] border border-white/10 hover:border-[#ff3d1f]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,61,31,0.1)]">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#ff3d1f] group-hover:bg-[#ff3d1f]/10 transition-colors">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-sm">
                  Sin Recargo
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide mb-2.5">
                Formas de Pago
              </h3>

              <p className="text-zinc-400 text-xs font-serif mb-3 italic">
                Aceptamos los principales métodos de pago del país:
              </p>

              {/* Badges list */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-4">
                <div className="p-2 rounded-sm bg-white/[0.03] border border-white/10 flex items-center gap-1.5 text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Efectivo ($)</span>
                </div>
                <div className="p-2 rounded-sm bg-white/[0.03] border border-white/10 flex items-center gap-1.5 text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff3d1f]" />
                  <span>Deuna! QR</span>
                </div>
                <div className="p-2 rounded-sm bg-white/[0.03] border border-white/10 flex items-center gap-1.5 text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Transf. Pichincha</span>
                </div>
                <div className="p-2 rounded-sm bg-white/[0.03] border border-white/10 flex items-center gap-1.5 text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>Tarjetas C/D</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] text-zinc-400 font-serif italic flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Paga cómodo en mesa o caja al finalizar.</span>
            </div>
          </article>

        </div>

        {/* INTERACTIVE MAP CONTAINER */}
        <div className="relative w-full h-72 sm:h-80 lg:h-96 rounded-sm overflow-hidden border border-white/15 group shadow-2xl mb-14">
          {/* Top Floating Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2.5 bg-black/85 backdrop-blur-md px-4 py-2 border border-white/20 rounded-sm">
            <span
              aria-hidden="true"
              className={`w-2 h-2 rounded-full ${isOpen ? 'bg-[#ff3d1f] animate-pulse' : 'bg-zinc-500'}`}
            />
            <span className="font-display text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-white font-bold">
              Casa Barbosa · El Olivo
            </span>
          </div>

          {/* Bottom Route Shortcut */}
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=0.3617300704558116,-78.11191105673959"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir ruta a Casa Barbosa en Google Maps"
            className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/85 hover:bg-[#ff3d1f] text-white hover:text-black backdrop-blur-md px-4 py-2.5 border border-white/25 hover:border-[#ff3d1f] font-display text-[11px] tracking-[0.25em] uppercase font-bold transition-all duration-200 shadow-xl"
          >
            <Navigation className="w-3.5 h-3.5 shrink-0" />
            <span>Ver ruta en Google Maps</span>
          </a>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d498.71735074616873!2d-78.11191105673959!3d0.3617300704558116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2a3d8443549e5f%3A0x44b531f91e465e6f!2sChancho%20a%20la%20Barbosa!5e0!3m2!1ses!2sec!4v1780275616896!5m2!1ses!2sec"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación mapa Casa Barbosa en Ibarra"
            className="w-full h-full grayscale-[40%] contrast-110 opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-[opacity,filter] duration-700"
          />
        </div>

        {/* QUICK NAVIGATION LINKS & SOCIALS */}
        <div className="py-8 border-y border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Quick Nav */}
          <nav aria-label="Navegación del pie de página">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-display text-xs uppercase tracking-[0.2em] text-zinc-300">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-[#ff3d1f] transition-colors py-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/sitiolabarbosa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram oficial @sitiolabarbosa"
              className="w-10 h-10 rounded-full border border-white/20 hover:border-[#ff3d1f] flex items-center justify-center text-zinc-300 hover:text-white hover:bg-[#ff3d1f]/10 transition-all group"
            >
              <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
            </a>
            <a
              href="https://wa.me/593984085851"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp oficial Casa Barbosa"
              className="w-10 h-10 rounded-full border border-white/20 hover:border-[#ff3d1f] flex items-center justify-center text-zinc-300 hover:text-white hover:bg-[#ff3d1f]/10 transition-all group"
            >
              <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
            </a>
            <a
              href="https://www.facebook.com/casabarbosaibarra"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Casa Barbosa"
              className="w-10 h-10 rounded-full border border-white/20 hover:border-[#ff3d1f] flex items-center justify-center text-zinc-300 hover:text-white hover:bg-[#ff3d1f]/10 transition-all group"
            >
              <Facebook className="w-4 h-4 transition-transform group-hover:scale-110" />
            </a>
            <a
              href="https://www.tiktok.com/@casabarbosaibarra"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok Casa Barbosa"
              className="w-10 h-10 rounded-full border border-white/20 hover:border-[#ff3d1f] flex items-center justify-center text-zinc-300 hover:text-white hover:bg-[#ff3d1f]/10 transition-all group"
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & SATURLINK CREDIT */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-serif text-zinc-400 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Casa Barbosa · Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-2">
            <span>Diseñado y desarrollado por</span>
            <a
              href="https://saturlink.net"
              target="_blank"
              rel="noopener noreferrer"
              className="relative font-bold text-white hover:text-[#ff3d1f] underline underline-offset-4 decoration-white/30 hover:decoration-[#ff3d1f] transition-colors cursor-pointer"
            >
              Saturlink
            </a>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff3d1f]" />
            <span>Ibarra · Imbabura · Ecuador</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
