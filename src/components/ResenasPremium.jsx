import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Quote, 
  Flame, 
  Sparkles, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2
} from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Andrés M.",
    initials: "AM",
    role: "Cliente Verificado · Google",
    plato: "Chancho a la Barbosa",
    quote: "El Chancho a la Barbosa es lo mejor que he probado en Ibarra. La corteza truena crocante, la carne es súper suave y los llapingachos con el mote sucio son de otro nivel.",
    rating: 5,
    date: "Hace 2 semanas"
  },
  {
    id: 2,
    name: "Sofía R.",
    initials: "SR",
    role: "Comensal Frecuente",
    plato: "Parrillada Jumbo",
    quote: "Pedimos la Parrillada Barbos Jumbo para la familia en el brasero de mesa. Llegó caliente hasta el último bocado y el sabor a leña y carbón es 100% auténtico.",
    rating: 5,
    date: "Hace 1 mes"
  },
  {
    id: 3,
    name: "Diego C.",
    initials: "DC",
    role: "Comensal en Ibarra",
    plato: "Chuleta de Borrego Asado",
    quote: "Aquí saben lo que es tratar la carne con respeto. La chuleta de borrego a fuego lento tiene una jugosidad y un toque ahumado que no encuentras en ningún otro asadero.",
    rating: 5,
    date: "Hace 3 semanas"
  },
  {
    id: 4,
    name: "Carlos T.",
    initials: "CT",
    role: "Cliente Habitual · Ibarra",
    plato: "Pinchos Completos",
    quote: "Los pinchos mixtos con la menestra casera y arroz caliente están insuperables. La atención es rápida y el ambiente junto a la chimenea encendida es espectacular.",
    rating: 5,
    date: "Hace 1 mes"
  },
  {
    id: 5,
    name: "María E.",
    initials: "ME",
    role: "Comensal Verificada",
    plato: "Chancho a la Barbosa",
    quote: "Ambiente cálido, porciones muy generosas y un fuego que se siente desde que entras al local. El chancho con aguacate y tostado es una adicción total. Recomendadísimo.",
    rating: 5,
    date: "Hace 2 semanas"
  },
];

const GALLERY_IMAGES = [
  {
    id: 1,
    src: "/images/galeria/cliente-fuego.jpeg",
    alt: "Cliente disfrutando Chancho a la Barbosa junto al fuego de leña",
    title: "El Fuego Que Nos Define",
    subtitle: "Chancho a la Barbosa crujiente y jugoso junto a nuestra chimenea de leña viva",
    isPortrait: true,
    tag: "Experiencia en Mesa"
  },
  {
    id: 2,
    src: "/images/galeria/cortes-tabla.webp",
    alt: "Cortes de carne a la parrilla servidos en tabla con papas rústicas",
    title: "Cortes al Carbón en Tabla",
    subtitle: "Carne jugosa al término exacto, sal en grano, chorizos y papas doradas",
    isPortrait: true,
    tag: "De Nuestra Parrilla"
  },
  {
    id: 3,
    src: "/images/galeria/parrilla-asado.webp",
    alt: "Parrilla con cortes y embutidos artesanales asándose a fuego vivo",
    title: "Parrilla a Fuego Vivo",
    subtitle: "Chorizos artesanales y chuletas selladas lentamente sobre brasas encendidas",
    isPortrait: true,
    tag: "Fuego & Carbón"
  },
  {
    id: 4,
    src: "/images/galeria/fachada-equipo.webp",
    alt: "Fachada de Casa Barbosa y equipo de trabajo en El Olivo, Ibarra",
    title: "Nuestra Casa en Ibarra",
    subtitle: "Panamericana Norte, sector El Olivo. Todo el equipo listo para recibirte",
    isPortrait: false,
    tag: "El Olivo, Ibarra"
  },
  {
    id: 5,
    src: "/images/galeria/festival-equipo.webp",
    alt: "Equipo maestro de Casa Barbosa en el Festival de Brasas",
    title: "Pasión por el Asado",
    subtitle: "Llevando el auténtico chancho a la barbosa a los grandes festivales del país",
    isPortrait: false,
    tag: "Festival de Brasas"
  }
];

export default function ResenasPremium() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActivePhoto(null);
      if (activePhoto !== null) {
        if (e.key === 'ArrowRight') {
          setPhotoIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
        } else if (e.key === 'ArrowLeft') {
          setPhotoIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (activePhoto !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activePhoto]);

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setActivePhoto(GALLERY_IMAGES[index]);
  };

  return (
    <section
      id="resenas"
      aria-labelledby="veredicto-heading"
      className="relative w-full overflow-hidden bg-[#040504] pt-20 sm:pt-28 pb-16 sm:pb-24"
    >
      {/* Chapter side marker for wide screens: situado en la parte alta con margen amplio sobre el carrusel */}
      <div className="hidden xl:flex absolute top-10 sm:top-12 left-6 2xl:left-10 z-20 flex-col items-center gap-3 pointer-events-none select-none">
        <span className="inline-block text-[10px] 2xl:text-[11px] font-mono tracking-[0.25em] text-[#ff3d1f] uppercase [writing-mode:vertical-rl] rotate-180 drop-shadow-md">
          CAPÍTULO 05 // EL VEREDICTO
        </span>
        <span className="w-px h-8 2xl:h-10 bg-gradient-to-b from-[#ff3d1f]/60 to-transparent" />
      </div>

      {/* Watermark in background: centrado en la mitad inferior para no chocar con el encabezado ni con el marcador */}
      <div
        aria-hidden="true"
        className="hidden md:flex pointer-events-none select-none absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden w-full"
      >
        <span
          className="font-display font-black uppercase text-white opacity-[0.025] leading-none tracking-[-0.05em] whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem, 20vw, 20rem)' }}
        >
          VEREDICTO
        </span>
      </div>

      {/* Atmospheric ambient glows */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-[#ff3d1f]/[0.05] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-amber-800/[0.04] blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full">

        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {/* Tag Badge: Capítulo 05 en flujo natural para que jamás se monte */}
            <div className="flex items-center gap-3 mb-4 text-[#ff3d1f]">
              <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-[#ff3d1f] to-transparent" />
              <Star className="w-3.5 h-3.5 fill-[#ff3d1f]" />
              <span className="uppercase tracking-[0.35em] font-bold text-[10px] sm:text-[11px] font-mono">
                Capítulo 05 // El Veredicto
              </span>
              <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-[#ff3d1f] to-transparent" />
            </div>

            {/* Title */}
            <h2
              id="veredicto-heading"
              className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[0.98] font-display uppercase mb-3"
            >
              Lo dicen ellos.
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-orange-300 via-[#ff3d1f] to-red-700 italic font-serif font-light tracking-tight normal-case mt-1">
                no nosotros.
              </span>
            </h2>

            {/* Rating Summary Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-3 text-xs font-mono text-zinc-300">
              <div className="flex items-center gap-2 px-3.5 py-1 bg-white/[0.04] border border-white/10 rounded-full">
                <span className="text-[#ff3d1f] font-bold text-sm">4.9 / 5.0</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#ff3d1f] text-[#ff3d1f]" />
                  ))}
                </div>
              </div>
              <span className="text-zinc-400 font-serif italic text-sm">
                Más de 200+ opiniones de clientes en Ibarra
              </span>
            </div>
          </motion.div>
        </div>

        {/* 1. TESTIMONIALS TICKER CAROUSEL (RESEÑAS) */}
        <div className="relative flex w-full flex-col overflow-hidden py-2 z-10 group/marquee">
          {/* Side Fades for desktop */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 z-20 w-20 sm:w-32 bg-gradient-to-r from-[#040504] to-transparent pointer-events-none" />
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 z-20 w-20 sm:w-32 bg-gradient-to-l from-[#040504] to-transparent pointer-events-none" />

          {/* Marquee Track with CSS hardware-accelerated pause on hover */}
          <div className="flex w-max gap-4 sm:gap-6 px-4 animate-marquee group-hover/marquee:[animation-play-state:paused] will-change-transform">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, index) => (
              <article
                key={`t-${t.id}-${index}`}
                className="group relative flex w-[300px] sm:w-[380px] flex-col justify-between overflow-hidden rounded-sm bg-[#0a0b0a] border border-white/10 p-5 sm:p-7 flex-shrink-0 transition-all duration-300 hover:border-[#ff3d1f]/60 hover:shadow-[0_0_25px_rgba(255,61,31,0.12)] hover:-translate-y-1"
              >
                {/* Background Watermark Quote */}
                <Quote
                  aria-hidden="true"
                  className="absolute right-4 top-4 h-12 w-12 text-white/[0.03] group-hover:text-[#ff3d1f]/10 transition-colors duration-500 pointer-events-none"
                />

                <div>
                  {/* Rating Stars & Recommended Dish */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className="flex gap-1">
                      {Array.from({ length: t.rating }, (_, i) => (
                        <Star
                          key={i}
                          aria-hidden="true"
                          className="h-3.5 w-3.5 fill-[#ff3d1f] text-[#ff3d1f]"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-[#ff3d1f] bg-[#ff3d1f]/10 border border-[#ff3d1f]/30 px-2 py-0.5 rounded-sm">
                      {t.plato}
                    </span>
                  </div>

                  {/* Quote Body */}
                  <p className="mb-5 text-sm sm:text-base leading-relaxed text-zinc-300 font-serif italic group-hover:text-white transition-colors duration-300">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Footer */}
                <footer className="mt-auto flex items-center gap-3 pt-4 border-t border-white/10 group-hover:border-[#ff3d1f]/30 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-full bg-[#160a08] border border-[#ff3d1f]/50 flex items-center justify-center text-xs font-mono font-bold text-orange-200">
                    {t.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-white font-display text-sm tracking-wide">
                      {t.name}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">
                      {t.role}
                    </span>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>

        {/* 2. GALLERY SUBSECTION HEADER (LA EXPERIENCIA & EL FUEGO) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-[#ff3d1f]">
              <Flame className="w-3.5 h-3.5 text-[#ff3d1f]" />
              <span className="uppercase tracking-[0.25em] text-[10px] sm:text-xs font-mono text-[#ff3d1f]">
                Galería en Vivo // Casa Barbosa
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight">
              El Fuego, La Carne y Nuestra Gente
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="hidden sm:inline">Pasa el cursor para pausar ·</span>
            <span className="text-[#ff3d1f]">Toca una foto para verla completa</span>
          </div>
        </div>

        {/* 3. VISUAL CAROUSEL / GALLERY STRIP (FOTOS REALES CON NUEVA FOTO) */}
        <div className="relative flex w-full flex-col overflow-hidden py-2 z-10 group/gallery">
          {/* Side Fades */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 z-20 w-20 sm:w-32 bg-gradient-to-r from-[#040504] to-transparent pointer-events-none" />
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 z-20 w-20 sm:w-32 bg-gradient-to-l from-[#040504] to-transparent pointer-events-none" />

          {/* Gallery Marquee Track with Mixed Natural Proportions */}
          <div className="flex w-max gap-4 sm:gap-5 px-4 animate-marquee-slow group-hover/gallery:[animation-play-state:paused] will-change-transform">
            {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, index) => {
              const realIndex = index % GALLERY_IMAGES.length;
              return (
                <div
                  key={`gallery-${img.id}-${index}`}
                  onClick={() => openLightbox(realIndex)}
                  className={`group/card relative h-[320px] sm:h-[400px] lg:h-[440px] ${
                    img.isPortrait 
                      ? 'w-[240px] sm:w-[300px] lg:w-[320px]' 
                      : 'w-[320px] sm:w-[440px] lg:w-[500px]'
                  } flex-shrink-0 overflow-hidden rounded-sm border border-white/10 bg-[#0a0a0a] cursor-pointer hover:border-[#ff3d1f]/70 hover:shadow-[0_0_30px_rgba(255,61,31,0.22)] transition-all duration-300`}
                >
                  {/* Photo Display */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    draggable="false"
                    className="h-full w-full object-cover object-center select-none brightness-[0.95] group-hover/card:brightness-105 group-hover/card:scale-[1.04] transition-all duration-700 ease-out will-change-transform"
                  />

                  {/* Top Subtle Vignette */}
                  <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 via-transparent to-transparent pointer-events-none" />

                  {/* Bottom Vignette for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 via-35% to-transparent pointer-events-none" />

                  {/* Hover Orange Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#ff3d1f]/20 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/80 border border-[#ff3d1f]/60 text-white font-display text-[9px] sm:text-[10px] uppercase tracking-wider backdrop-blur-md">
                      <Flame className="w-2.5 h-2.5 text-[#ff3d1f]" />
                      {img.tag}
                    </span>
                  </div>

                  {/* Top Right Zoom Hint */}
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                    <span className="p-2 bg-black/80 border border-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md">
                      <Maximize2 className="w-3.5 h-3.5 text-[#ff3d1f]" />
                    </span>
                  </div>

                  {/* Bottom Caption */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10">
                    <h4 className="font-display font-black text-white text-base sm:text-lg uppercase tracking-tight mb-1 group-hover/card:text-amber-100 transition-colors">
                      {img.title}
                    </h4>
                    <p className="text-zinc-300 font-serif text-xs sm:text-sm leading-snug line-clamp-2">
                      {img.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL FOR GALLERY PHOTOS */}
      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 select-none"
          >
            {/* Top Lightbox Bar */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between py-2 border-b border-white/10 z-20"
            >
              <div className="flex items-center gap-2.5">
                <Flame className="w-4 h-4 text-[#ff3d1f]" />
                <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-widest text-white">
                  Casa Barbosa <span className="text-[#ff3d1f]">//</span> Galería ({photoIndex + 1} de {GALLERY_IMAGES.length})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="p-2 bg-white/10 hover:bg-[#ff3d1f] text-white border border-white/20 hover:border-[#ff3d1f] transition-all rounded-full"
                aria-label="Cerrar imagen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Lightbox Display Area with Navigation */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative flex-1 flex items-center justify-center p-2 sm:p-4 overflow-hidden"
            >
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => {
                  const newIdx = (photoIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
                  setPhotoIndex(newIdx);
                  setActivePhoto(GALLERY_IMAGES[newIdx]);
                }}
                aria-label="Foto anterior"
                className="absolute left-2 sm:left-6 z-30 p-3 sm:p-4 rounded-full bg-black/80 hover:bg-[#ff3d1f] text-white border border-white/20 hover:border-[#ff3d1f] transition-all shadow-xl hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => {
                  const newIdx = (photoIndex + 1) % GALLERY_IMAGES.length;
                  setPhotoIndex(newIdx);
                  setActivePhoto(GALLERY_IMAGES[newIdx]);
                }}
                aria-label="Foto siguiente"
                className="absolute right-2 sm:right-6 z-30 p-3 sm:p-4 rounded-full bg-black/80 hover:bg-[#ff3d1f] text-white border border-white/20 hover:border-[#ff3d1f] transition-all shadow-xl hover:scale-105"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* High-Resolution Uncropped Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={photoIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-[75vh] sm:max-h-[80vh] max-w-full flex items-center justify-center"
                >
                  <img
                    src={GALLERY_IMAGES[photoIndex].src}
                    alt={GALLERY_IMAGES[photoIndex].alt}
                    className="max-h-[75vh] sm:max-h-[80vh] w-auto max-w-full object-contain border border-white/10 shadow-2xl shadow-black rounded-sm bg-black"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Lightbox Caption Bar */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="py-3 px-4 bg-[#080908] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left z-20"
            >
              <div>
                <h4 className="font-display font-black text-white text-sm sm:text-base uppercase tracking-tight">
                  {GALLERY_IMAGES[photoIndex].title}
                </h4>
                <p className="text-zinc-400 font-serif text-xs sm:text-sm">
                  {GALLERY_IMAGES[photoIndex].subtitle}
                </p>
              </div>

              {/* Thumbnail navigation */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {GALLERY_IMAGES.map((thumb, tIdx) => (
                  <button
                    key={thumb.id}
                    onClick={() => {
                      setPhotoIndex(tIdx);
                      setActivePhoto(GALLERY_IMAGES[tIdx]);
                    }}
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-sm overflow-hidden border transition-all ${
                      photoIndex === tIdx 
                        ? 'border-[#ff3d1f] scale-105 shadow-md shadow-[#ff3d1f]/40' 
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={thumb.src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
