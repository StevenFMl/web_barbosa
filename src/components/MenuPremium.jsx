import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  X, 
  MessageCircle, 
  Utensils, 
  Check, 
  BookOpen, 
  Download, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight,
  Layers
} from 'lucide-react';
import { getWhatsAppUrl } from '../config/siteConfig';

const menuItems = [
  {
    id: 1,
    name: 'Parrillada Barbos Jumbo',
    subtitle: 'Al carbón en brasero tradicional de mesa',
    description: '300g de nuestro Chancho a la Barbosa, filete de pollo, lomo de res, chuleta de cerdo y una selección de tres embutidos. Servida en brasero de mesa con papas y ensalada fresca.',
    details: [
      '300g de Chancho a la Barbosa',
      'Filete de pollo a la brasa',
      'Lomo de res seleccionado',
      'Chuleta de cerdo parrillera',
      'Selección de 3 embutidos artesanales',
      'Papas fritas o papas cocinadas',
      'Ensalada fresca de la huerta'
    ],
    chips: ['300g Chancho', 'Lomo de res', 'Filete pollo', '3 embutidos', 'Brasero en mesa'],
    image: '/images/platos/plato-1.jpeg',
    price: '$20.00',
    tag: 'Especialidad Jumbo',
    popular: true,
    portion: 'Para compartir (2-3 personas)'
  },
  {
    id: 2,
    name: 'Chancho a la Barbosa',
    subtitle: 'Nuestra especialidad insignia al fuego lento',
    description: 'Nuestra receta insignia cocinada con leña y carbón: corteza crocante y carne suave y jugosa. Servido con tradicionales llapingachos dorados, mote sucio con chicharrón, tostado andino, aguacate y ensalada.',
    details: [
      'Cortes de chancho al carbón y leña',
      'Corteza dorada y crujiente',
      'Llapingachos tradicionales de papa',
      'Mote sucio tradicional (o mote pillo)',
      'Tostado andino y aguacate cremoso',
      'Ensalada fresca de la casa'
    ],
    chips: ['Corteza crocante', 'Llapingachos', 'Mote sucio', 'Aguacate'],
    image: '/images/platos/plato-2.jpeg',
    price: '$5.00',
    tag: 'Insignia de la Casa',
    popular: true,
    portion: 'Especialidad de la casa'
  },
  {
    id: 3,
    name: 'Pinchos Completos',
    subtitle: 'Trío al carbón con guarniciones tradicionales',
    description: 'Brochetas asadas a la brasa: carne de res, pollo y chorizo cuencano. Acompañadas con arroz blanco caliente, menestra tradicional de fréjol, papas fritas y ensalada fresca.',
    details: [
      'Brocheta de carne de res al carbón',
      'Brocheta de pollo a la brasa',
      'Chorizo cuencano artesanal',
      'Arroz blanco caliente',
      'Menestra casera de fréjol',
      'Papas fritas y ensalada fresca'
    ],
    chips: ['Brocheta carne', 'Brocheta pollo', 'Chorizo cuencano', 'Arroz y menestra'],
    image: '/images/platos/plato-3.jpeg',
    price: '$4.00',
    tag: 'Al Carbón',
    popular: false,
    portion: 'Plato completo'
  },
  {
    id: 4,
    name: 'Chuleta de Borrego Asado',
    subtitle: 'Corte seleccionado de borrego a fuego lento',
    description: 'Corte seleccionado de borrego, asado a fuego lento para resaltar su jugosidad y auténtico sabor ahumado. Acompañado de chorizo parrillero dorado, papas campesinas cocinadas, abundante mote, tostado andino y ensalada fresca de la casa.',
    details: [
      'Corte seleccionado de borrego al carbón',
      'Asado a fuego lento con sabor ahumado',
      'Chorizo parrillero a las brasas',
      'Papas cocinadas campesinas',
      'Mote tierno y tostado andino',
      'Ensalada fresca con vinagreta de la casa'
    ],
    chips: ['Chuleta de borrego', 'Sabor ahumado', 'Chorizo parrillero', 'Mote y papas'],
    image: '/images/platos/plato-4.jpeg',
    price: '$6.00',
    tag: 'Borrego Asado',
    popular: false,
    portion: 'Corte selecto al fuego'
  },
  {
    id: 5,
    name: 'Filete de Pollo a la Brasa',
    subtitle: 'Pechuga marinada con auténtico toque ahumado',
    description: 'Generoso filete de pechuga seleccionado marinado en finas hierbas aromáticas y asado a las brasas. Servido con arroz blanco, menestra casera de fréjol, papas fritas y ensalada.',
    details: [
      'Filete de pechuga a la brasa',
      'Marinado especial de hierbas de la casa',
      'Arroz blanco caliente',
      'Menestra tradicional de fréjol',
      'Papas fritas doradas',
      'Ensalada fresca de la huerta'
    ],
    chips: ['Filete de pechuga', 'Hierbas finas', 'Arroz y menestra', 'Papas fritas'],
    image: '/images/platos/plato-5.jpeg',
    price: '$4.00',
    tag: 'De Nuestra Parrilla',
    popular: false,
    portion: 'Plato personal'
  }
];

const menuPages = [
  {
    page: 1,
    title: 'Portada',
    category: 'La Barbosa Menú',
    image: '/images/menu-paginas/pagina-1.jpg'
  },
  {
    page: 2,
    title: 'Especialidades & Asados',
    category: 'Chancho, Chuletas, Pollo, Pinchos',
    image: '/images/menu-paginas/pagina-2.jpg'
  },
  {
    page: 3,
    title: 'Parrilladas & Aperitivos',
    category: 'Parrillada Jumbo, Borrego, Sartenazo, Extras',
    image: '/images/menu-paginas/pagina-3.jpg'
  },
  {
    page: 4,
    title: 'Bebidas & Refrescos',
    category: 'Jarras, Cervezas, Jugos Naturales',
    image: '/images/menu-paginas/pagina-4.jpg'
  },
  {
    page: 5,
    title: 'Métodos de Pago & Ubicación',
    category: 'Deuna, Transferencias, Dirección',
    image: '/images/menu-paginas/pagina-5.jpg'
  }
];

const layouts = [
  'md:col-span-7 md:row-span-2',
  'md:col-span-5',
  'md:col-span-5',
  'md:col-span-6',
  'md:col-span-6'
];

export default function MenuPremium() {
  const [selectedDish, setSelectedDish] = useState(null);
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [currentMenuPage, setCurrentMenuPage] = useState(1);
  const [viewAllPages, setViewAllPages] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedDish(null);
        setIsFullMenuOpen(false);
      }
      if (isFullMenuOpen && !viewAllPages) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          setCurrentMenuPage((p) => (p < 5 ? p + 1 : 1));
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          setCurrentMenuPage((p) => (p > 1 ? p - 1 : 5));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullMenuOpen, viewAllPages]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedDish || isFullMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedDish, isFullMenuOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="menu" className="py-14 sm:py-20 lg:py-24 bg-[#040504] relative overflow-hidden">
      {/* Chapter side marker for wide screens */}
      <div className="hidden xl:flex absolute top-20 sm:top-24 left-6 2xl:left-10 z-30 flex-col items-center gap-4 pointer-events-none select-none">
        <span className="inline-block text-[11px] 2xl:text-xs font-mono tracking-[0.3em] text-[#ff3d1f] uppercase [writing-mode:vertical-rl] rotate-180 drop-shadow-md">
          CAPÍTULO 03 // LA CARTA
        </span>
        <span className="w-px h-16 2xl:h-20 bg-gradient-to-b from-[#ff3d1f]/60 to-transparent" />
      </div>

      {/* Atmospheric background glows */}
      <div className="absolute top-1/4 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#ff3d1f]/[0.05] blur-[100px] sm:blur-[140px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-amber-700/[0.04] blur-[100px] sm:blur-[130px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-14">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6"
        >
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 text-[#ff3d1f]">
              <span className="h-px w-8 sm:w-10 bg-[#ff3d1f]"></span>
              <span className="uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold text-[10px] sm:text-[11px] font-display">
                La Carta · Casa Barbosa
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[0.98] font-display uppercase">
              Cortes
              <span className="block sm:inline-block text-transparent bg-clip-text bg-gradient-to-br from-orange-300 via-[#ff3d1f] to-red-700 italic font-serif font-light tracking-tight normal-case mt-1.5 sm:mt-0 sm:ml-3">
                a la Barbosa
              </span>
            </h2>
          </div>

          <div className="lg:text-right">
            <p className="max-w-md text-zinc-300 text-sm sm:text-base lg:text-lg font-light font-serif leading-relaxed">
              Cinco platos destacados. Todos al fuego. La carne manda, el carbón decide.
            </p>
            <div className="mt-2 flex items-center lg:justify-end gap-2 text-[11px] font-mono text-[#ff3d1f]/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3d1f] animate-pulse"></span>
              <span>Toca un plato para ver detalle o revisa la carta completa abajo</span>
            </div>
          </div>
        </motion.div>

        {/* Responsive Hybrid Dishes Grid */}
        {/* Mobile: Clean, uncropped high-impact cards */}
        {/* Desktop: Luxury Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 md:auto-rows-[310px] lg:auto-rows-[330px]"
        >
          {menuItems.map((item, idx) => {
            const isHero = idx === 0;
            return (
              <motion.article
                key={item.id}
                variants={itemVariants}
                onClick={() => setSelectedDish(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedDish(item);
                  }
                }}
                className={`group relative overflow-hidden border border-white/10 bg-[#080908] cursor-pointer rounded-sm hover:border-[#ff3d1f]/60 hover:shadow-[0_0_35px_rgba(255,61,31,0.18)] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#ff3d1f] flex flex-col md:block ${layouts[idx]}`}
              >
                {/* Image Media Container */}
                {/* Mobile: dedicated 16:10 landscape aspect ratio so NO plate is cropped */}
                {/* Desktop: absolute inset-0 full bleed cover inside bento tile */}
                <div className="relative w-full aspect-[16/10] md:aspect-auto md:absolute md:inset-0 overflow-hidden bg-black shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    width="1280"
                    height="960"
                    className="w-full h-full object-cover object-center brightness-[0.96] md:brightness-[0.92] group-hover:brightness-100 group-hover:scale-[1.04] transition-all duration-700 ease-out will-change-transform"
                  />

                  {/* Top Vignette (both mobile & desktop) */}
                  <div className="absolute inset-x-0 top-0 h-20 sm:h-28 bg-gradient-to-b from-black/80 via-black/25 to-transparent pointer-events-none z-10" />

                  {/* Desktop Bottom Gradient (hidden on mobile so food is 100% visible) */}
                  <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black via-black/85 via-45% to-transparent pointer-events-none z-10" />

                  {/* Warm Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#ff3d1f]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

                  {/* Badges Top Left */}
                  <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 border border-[#ff3d1f]/60 bg-black/80 backdrop-blur-md">
                      <Flame className="w-3 h-3 text-[#ff3d1f] fill-[#ff3d1f]/30" strokeWidth={2.5} />
                      <span className="uppercase tracking-[0.2em] text-[9px] sm:text-[10px] font-bold text-white font-display">
                        {item.tag}
                      </span>
                    </div>
                    {item.portion && (
                      <span className="hidden sm:inline-block px-2.5 py-1 text-[9px] sm:text-[10px] tracking-wider font-mono text-zinc-300 bg-black/70 backdrop-blur-md border border-white/15">
                        {item.portion}
                      </span>
                    )}
                  </div>

                  {/* Desktop Quick Hint Top Right */}
                  <div className="hidden md:block absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-black/80 text-zinc-200 text-[10px] font-mono tracking-wider border border-[#ff3d1f]/40 backdrop-blur-md">
                      <Utensils className="w-3 h-3 text-[#ff3d1f]" />
                      Ver detalle
                    </span>
                  </div>

                  {/* Mobile Floating Price Badge on Image */}
                  <div className="md:hidden absolute bottom-2.5 right-2.5 z-20">
                    <span className="px-3 py-1 bg-black/90 border border-[#ff3d1f]/70 text-[#ff3d1f] font-display font-black text-lg backdrop-blur-md shadow-lg">
                      {item.price}
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                {/* Mobile: clean integrated card body below the photo */}
                {/* Desktop: absolute overlay at the bottom of the bento card */}
                <div className={`relative z-20 flex-1 p-4 sm:p-5 md:p-6 flex flex-col justify-between md:h-full md:justify-end md:bg-transparent ${isHero ? 'md:p-8 lg:p-10' : ''}`}>
                  <div>
                    <h3 className={`font-black text-white tracking-tight leading-[1.08] font-display uppercase mb-1.5 group-hover:text-amber-100 transition-colors ${isHero ? 'text-xl sm:text-2xl md:text-3xl lg:text-4xl' : 'text-lg sm:text-xl lg:text-[1.45rem]'}`}>
                      {item.name}
                    </h3>

                    <p className={`text-zinc-300 font-light font-serif leading-relaxed mb-3 text-xs sm:text-sm lg:text-[14px] ${isHero ? 'md:text-base md:max-w-xl' : 'line-clamp-2 sm:line-clamp-3'}`}>
                      {item.description}
                    </p>

                    {/* Quick Ingredient Chips on Mobile */}
                    <div className="md:hidden flex flex-wrap gap-1.5 mb-3">
                      {item.chips.map((chip, cIdx) => (
                        <span key={cIdx} className="text-[10px] font-mono text-zinc-300 bg-white/[0.04] border border-white/10 px-2 py-0.5">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                    <div>
                      <span className="hidden md:inline-block text-zinc-400 text-[10px] uppercase tracking-[0.3em] font-display">
                        Precio oficial
                      </span>
                      <span className="md:hidden text-zinc-400 text-[11px] font-serif italic">
                        Guarniciones incluidas
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`font-black font-display tracking-tight text-[#ff3d1f] ${isHero ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-xl sm:text-2xl'}`}>
                        {item.price}
                      </span>
                      <span className="md:hidden flex items-center gap-1 text-[11px] font-mono text-white/90 bg-[#ff3d1f]/20 border border-[#ff3d1f]/50 px-2.5 py-1">
                        <Utensils className="w-3 h-3 text-[#ff3d1f]" />
                        <span>Ver más</span>
                      </span>
                    </div>
                  </div>

                  {/* Animated Accent Line Desktop */}
                  <div className="hidden md:block absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-red-600 via-[#ff3d1f] to-amber-400 group-hover:w-full transition-[width] duration-500 ease-out z-30"></div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom Actions - VER CARTA COMPLETA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="mt-10 sm:mt-16 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 relative z-20"
        >
          {/* Main Button: Opens Interactive Full Menu Viewer */}
          <button
            type="button"
            onClick={() => {
              setCurrentMenuPage(1);
              setIsFullMenuOpen(true);
            }}
            className="group relative flex items-center justify-center gap-3 px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#220a06] via-[#2f0e09] to-[#1a0704] border border-[#ff3d1f]/70 text-stone-100 font-mono tracking-widest uppercase text-xs sm:text-sm hover:border-[#ff3d1f] hover:shadow-[0_0_30px_rgba(255,61,31,0.35)] transition-all duration-300 shadow-xl overflow-hidden active:scale-[0.99]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff3d1f]/0 via-[#ff3d1f]/20 to-[#ff3d1f]/0 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 pointer-events-none" />
            <BookOpen className="w-5 h-5 text-[#ff3d1f] group-hover:scale-110 transition-transform shrink-0" />
            <span className="font-bold tracking-[0.2em] sm:tracking-[0.25em]">Ver Carta Completa (5 Páginas)</span>
          </button>

          {/* Secondary Button: Direct PDF Download */}
          <a
            href="/menu-barbosa.pdf"
            download="Menu-Casa-Barbosa.pdf"
            className="group flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 sm:py-4 bg-transparent border border-white/15 text-stone-300 font-mono tracking-widest uppercase text-xs hover:border-[#ff3d1f]/50 hover:text-white hover:bg-white/[0.04] transition-all duration-300"
          >
            <Download className="w-4 h-4 text-zinc-400 group-hover:text-[#ff3d1f] transition-colors shrink-0" />
            <span>Descargar PDF (15 MB)</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors shrink-0 ml-0.5" />
          </a>
        </motion.div>

      </div>

      {/* LIGHTBOX / DETAIL MODAL FOR SINGLE DISH (100% RESPONSIVE) */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedDish(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#0b0c0b] border-t sm:border border-[#ff3d1f]/40 rounded-t-xl sm:rounded-none overflow-hidden shadow-2xl shadow-black"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDish(null)}
                aria-label="Cerrar detalle del plato"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 sm:p-2.5 bg-black/80 hover:bg-[#ff3d1f] text-white/80 hover:text-white border border-white/20 hover:border-[#ff3d1f] transition-all duration-200 rounded-full sm:rounded-none"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Modal Image Header */}
              <div className="relative w-full aspect-[16/10] sm:aspect-auto sm:h-72 overflow-hidden bg-black shrink-0">
                <img
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0b] via-transparent to-black/50" />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 bg-black/80 border border-[#ff3d1f]/60 text-white font-display text-[10px] sm:text-[11px] uppercase tracking-widest backdrop-blur-md">
                    <Flame className="w-3.5 h-3.5 text-[#ff3d1f] fill-[#ff3d1f]/30" />
                    {selectedDish.tag}
                  </span>
                  {selectedDish.portion && (
                    <span className="hidden sm:inline-block px-2.5 py-1 bg-black/80 border border-white/20 text-zinc-300 font-mono text-[10px] sm:text-[11px] tracking-wider backdrop-blur-md">
                      {selectedDish.portion}
                    </span>
                  )}
                </div>
              </div>

              {/* Modal Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-4">
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/10">
                  <div>
                    <h3 className="text-xl sm:text-3xl font-black text-white font-display uppercase tracking-tight">
                      {selectedDish.name}
                    </h3>
                    <p className="text-[#ff3d1f] text-[11px] sm:text-xs font-mono tracking-widest uppercase mt-0.5">
                      {selectedDish.subtitle}
                    </p>
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-[#ff3d1f] font-display shrink-0">
                    {selectedDish.price}
                  </span>
                </div>

                <p className="text-zinc-300 font-serif text-sm sm:text-base leading-relaxed">
                  {selectedDish.description}
                </p>

                {selectedDish.details && (
                  <div className="bg-white/[0.03] border border-white/5 p-3.5 sm:p-4 rounded-sm">
                    <h4 className="text-zinc-400 font-display text-[11px] sm:text-xs uppercase tracking-[0.25em] mb-2.5 flex items-center gap-2">
                      <Utensils className="w-3.5 h-3.5 text-[#ff3d1f]" />
                      Incluye en esta orden
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-serif text-zinc-200">
                      {selectedDish.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#ff3d1f] shrink-0" strokeWidth={2.5} />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Modal Sticky Bottom Action Footer */}
              <div className="shrink-0 p-3 sm:p-5 bg-[#070807] border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={getWhatsAppUrl(`¡Hola Casa Barbosa! Me interesa ordenar o reservar el plato: *${selectedDish.name}* (${selectedDish.price}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 sm:py-4 px-6 bg-gradient-to-r from-red-700 via-[#ff3d1f] to-orange-500 hover:brightness-110 text-white font-display text-xs uppercase tracking-[0.25em] font-bold transition-all shadow-lg shadow-[#ff3d1f]/20 active:scale-[0.99]"
                >
                  <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                  <span>Pedir por WhatsApp</span>
                </a>
                <button
                  onClick={() => setSelectedDish(null)}
                  className="py-3 sm:py-4 px-5 border border-white/15 hover:border-white/40 text-zinc-300 hover:text-white font-display text-xs uppercase tracking-[0.2em] transition-colors"
                >
                  Volver al Menú
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL RESPONSIVE INTERACTIVE MENU VIEWER (100% LEGIBLE EN CELULAR Y PC) */}
      <AnimatePresence>
        {isFullMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsFullMenuOpen(false)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between overflow-hidden"
          >
            {/* Top Toolbar */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 z-20 flex items-center justify-between px-3.5 sm:px-8 py-3 sm:py-4 bg-[#070807] border-b border-white/10"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Flame className="w-4 h-4 text-[#ff3d1f] shrink-0" />
                <div>
                  <h3 className="text-xs sm:text-sm font-display font-black tracking-widest text-white uppercase leading-none">
                    Casa Barbosa <span className="text-[#ff3d1f]">//</span> Carta
                  </h3>
                  <p className="text-[10px] sm:text-xs font-mono text-zinc-400 mt-0.5">
                    {viewAllPages ? 'Mostrando todas las páginas' : `Página ${currentMenuPage} de 5 · ${menuPages[currentMenuPage - 1].title}`}
                  </p>
                </div>
              </div>

              {/* Toolbar Actions */}
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                {/* Toggle View Mode */}
                <button
                  type="button"
                  onClick={() => setViewAllPages(!viewAllPages)}
                  className="flex items-center gap-1 px-2.5 py-1.5 border border-white/15 hover:border-[#ff3d1f]/60 text-zinc-300 hover:text-white text-[11px] font-mono transition-colors"
                  title="Alternar entre ver por página o ver todas las páginas en scroll continuo"
                >
                  <Layers className="w-3.5 h-3.5 text-[#ff3d1f]" />
                  <span className="hidden sm:inline">{viewAllPages ? 'Página por página' : 'Ver todo en lista'}</span>
                </button>

                <a
                  href="/menu-barbosa.pdf"
                  download="Menu-Casa-Barbosa.pdf"
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 border border-white/15 hover:border-[#ff3d1f]/60 text-zinc-300 hover:text-white text-xs font-mono transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#ff3d1f]" />
                  <span>PDF</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsFullMenuOpen(false)}
                  className="p-1.5 sm:p-2 bg-white/10 hover:bg-[#ff3d1f] text-zinc-200 hover:text-white border border-white/20 hover:border-[#ff3d1f] transition-all ml-1 rounded-full sm:rounded-none"
                  aria-label="Cerrar carta completa"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Quick Category Navigation Bar (Single Page Mode) */}
            {!viewAllPages && (
              <div 
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 z-20 flex items-center justify-start sm:justify-center gap-1.5 px-3 py-2 bg-black/80 border-b border-white/5 overflow-x-auto scrollbar-none"
              >
                {menuPages.map((page) => (
                  <button
                    key={page.page}
                    onClick={() => setCurrentMenuPage(page.page)}
                    className={`shrink-0 px-2.5 sm:px-4 py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                      currentMenuPage === page.page
                        ? 'bg-[#ff3d1f] text-white font-bold shadow-md shadow-[#ff3d1f]/30'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span className="opacity-75 mr-1">{page.page}.</span>
                    {page.title}
                  </button>
                ))}
              </div>
            )}

            {/* Main Interactive Viewer Display (Mobile-First Scrolling) */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative flex-1 overflow-y-auto p-2 sm:p-6 flex flex-col items-center justify-start select-none"
            >
              {viewAllPages ? (
                /* Continuous Scroll Mode (All 5 Pages Stacked vertically for effortless reading on mobile) */
                <div className="w-full max-w-2xl mx-auto space-y-4 pb-8">
                  {menuPages.map((page) => (
                    <div key={page.page} className="flex flex-col items-center">
                      <div className="w-full flex items-center justify-between text-zinc-400 text-xs font-mono py-1 px-2">
                        <span>PÁGINA {page.page} // {page.title}</span>
                        <span className="text-[#ff3d1f]">{page.category}</span>
                      </div>
                      <img
                        src={page.image}
                        alt={`Página ${page.page} - ${page.title}`}
                        loading="lazy"
                        className="w-full h-auto object-contain border border-white/10 shadow-2xl shadow-black rounded-sm bg-black"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                /* Single Page Mode with Prev/Next Controls */
                <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center my-auto">
                  {/* Previous Button Floating */}
                  <button
                    type="button"
                    onClick={() => setCurrentMenuPage((p) => (p > 1 ? p - 1 : 5))}
                    aria-label="Página anterior"
                    className="fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-4 rounded-full bg-black/85 hover:bg-[#ff3d1f] text-white border border-white/20 hover:border-[#ff3d1f] transition-all shadow-xl shadow-black/80 hover:scale-105 active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                  </button>

                  {/* Next Button Floating */}
                  <button
                    type="button"
                    onClick={() => setCurrentMenuPage((p) => (p < 5 ? p + 1 : 1))}
                    aria-label="Página siguiente"
                    className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-4 rounded-full bg-black/85 hover:bg-[#ff3d1f] text-white border border-white/20 hover:border-[#ff3d1f] transition-all shadow-xl shadow-black/80 hover:scale-105 active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                  </button>

                  {/* High Resolution Current Page Image */}
                  <div className="w-full flex items-center justify-center pb-2">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentMenuPage}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className="w-full flex items-center justify-center"
                      >
                        <img
                          src={menuPages[currentMenuPage - 1].image}
                          alt={`Página ${currentMenuPage} - ${menuPages[currentMenuPage - 1].title}`}
                          className="w-full h-auto max-h-[75vh] object-contain border border-white/10 shadow-2xl shadow-black bg-black rounded-sm"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Bar: Mobile Quick Controls & Action */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-2.5 px-4 sm:px-8 py-2.5 sm:py-3 bg-[#070807] border-t border-white/10"
            >
              {/* Pagination indicators */}
              <div className="flex items-center gap-2">
                {!viewAllPages && (
                  <>
                    <button
                      onClick={() => setCurrentMenuPage((p) => (p > 1 ? p - 1 : 5))}
                      className="px-2.5 py-1 text-xs font-mono text-zinc-300 bg-white/5 border border-white/10 hover:border-[#ff3d1f]"
                    >
                      ← Ant.
                    </button>
                    {menuPages.map((page) => (
                      <button
                        key={page.page}
                        onClick={() => setCurrentMenuPage(page.page)}
                        className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                          currentMenuPage === page.page
                            ? 'w-6 sm:w-8 bg-[#ff3d1f]'
                            : 'w-2 sm:w-2.5 bg-white/20 hover:bg-white/40'
                        }`}
                        aria-label={`Ir a página ${page.page}`}
                      />
                    ))}
                    <button
                      onClick={() => setCurrentMenuPage((p) => (p < 5 ? p + 1 : 1))}
                      className="px-2.5 py-1 text-xs font-mono text-zinc-300 bg-white/5 border border-white/10 hover:border-[#ff3d1f]"
                    >
                      Sig. →
                    </button>
                  </>
                )}
                <span className="text-[11px] font-mono text-zinc-400 ml-1">
                  {viewAllPages ? '5 páginas' : `Pág ${currentMenuPage} / 5`}
                </span>
              </div>

              {/* Bottom Quick Order or Download info */}
              <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <a
                  href="/menu-barbosa.pdf"
                  download="Menu-Casa-Barbosa.pdf"
                  className="sm:hidden flex-1 flex items-center justify-center gap-1.5 py-2 px-3 border border-white/15 text-zinc-300 text-xs font-mono"
                >
                  <Download className="w-3.5 h-3.5 text-[#ff3d1f]" />
                  <span>PDF</span>
                </a>
                <a
                  href={getWhatsAppUrl(`¡Hola Casa Barbosa! Estuve revisando la carta completa y deseo realizar un pedido o consulta.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-700 to-[#ff3d1f] text-white font-display text-[11px] uppercase tracking-wider font-bold hover:brightness-110 transition-all shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
                  <span>Pedir por WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
