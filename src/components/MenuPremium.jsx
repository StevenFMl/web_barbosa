import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

const menuItems = [
  {
    id: 1,
    name: 'Parrillada Barbosa',
    description: 'Carne elegida con obsesión. Cerdo ahumado a leña, embutidos de la zona y chimichurri de la casa. Sin atajos.',
    image: 'https://images.unsplash.com/photo-1544025162-8315ea07fc7a?q=80&w=800&auto=format&fit=crop',
    price: '$25.00',
    popular: true
  },
  {
    id: 2,
    name: 'Costillas ST. Louis',
    description: 'Ahumado lento, diez horas sobre leña de manzano. Glaseadas con nuestra salsa de la casa. Se caen del hueso.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=800&auto=format&fit=crop',
    price: '$18.00',
    popular: false
  },
  {
    id: 3,
    name: 'Pinchos de Lomo Fino',
    description: 'Lomo macerado veinticuatro horas. Vegetales de temporada y papa rústica al romero. Punto.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
    price: '$8.00',
    popular: false
  },
  {
    id: 4,
    name: 'Sartenazo Campesino',
    description: 'Cortes picados a cuchillo, chorizo ahumado, plátano maduro, papa amarilla y provolone fundido al carbón.',
    image: 'https://images.unsplash.com/photo-1628863148117-9c9dc7d10f2c?q=80&w=800&auto=format&fit=crop',
    price: '$15.00',
    popular: false
  },
  {
    id: 5,
    name: 'Chancho a la Barbosa',
    description: 'Receta insignia. Cerdo al carbón sobre hierbas andinas. Corteza que truena, dentro jugoso.',
    image: 'https://images.unsplash.com/photo-1594041680534-f8b1a53e6065?q=80&w=800&auto=format&fit=crop',
    price: '$14.00',
    popular: true
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.04 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="menu" className="py-16 sm:py-20 bg-[#040504] relative overflow-hidden">
      <div className="absolute top-8 left-4 sm:top-12 sm:left-8 z-40 pointer-events-none">
        <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#ff3d1f] uppercase [writing-mode:vertical-rl] rotate-180 drop-shadow-md">
          CAPÍTULO 03 // LA CARTA
        </span>
      </div>
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#ff3d1f]/[0.05] blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-700/[0.04] blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-14">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 sm:mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4 text-[#ff3d1f]">
              <span className="h-px w-10 bg-[#ff3d1f]"></span>
              <span className="uppercase tracking-[0.4em] font-bold text-[11px] font-display">La Carta</span>
            </div>

            <h2 className="text-[clamp(2.25rem,7vw,5.25rem)] font-black text-white tracking-tighter leading-[0.95] font-display uppercase">
              Cortes
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-300 via-[#ff3d1f] to-red-700 italic font-serif font-light tracking-tight normal-case ml-3">de autor</span>
            </h2>
          </div>

          <p className="max-w-md text-zinc-400 text-base font-light font-serif leading-relaxed lg:text-right">
            Cinco platos. Cero atajos. La carne manda, el carbón decide.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-3 md:auto-rows-[280px]"
        >
          {menuItems.map((item, idx) => {
            const isHero = idx === 0;
            return (
              <motion.article
                key={item.id}
                variants={itemVariants}
                className={`group relative overflow-hidden border border-white/5 bg-[#0a0a0a] cursor-pointer h-[420px] md:h-auto hover:border-[#ff3d1f]/40 transition-colors duration-200 ${layouts[idx]}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="600"
                  className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.04] transition-[transform,filter] duration-500 ease-out will-change-transform"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#ff3d1f]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {item.popular && (
                  <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 border border-[#ff3d1f]/50 bg-black/50 backdrop-blur-sm">
                    <Flame className="w-3 h-3 text-[#ff3d1f]" strokeWidth={2.5} />
                    <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-white font-display">Insignia</span>
                  </div>
                )}

                <div className={`relative h-full flex flex-col justify-end p-6 ${isHero ? 'sm:p-8 lg:p-10' : ''}`}>
                  <h3 className={`font-black text-white tracking-tight leading-[1] font-display uppercase mb-3 ${isHero ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl sm:text-3xl'}`}>
                    {item.name}
                  </h3>

                  <p className={`text-zinc-300 font-light font-serif leading-relaxed mb-4 ${isHero ? 'text-base sm:text-lg max-w-xl' : 'text-sm sm:text-base line-clamp-2'}`}>
                    {item.description}
                  </p>

                  <div className="flex items-baseline justify-between gap-4 pt-3 border-t border-white/10">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-display">
                      Desde
                    </span>
                    <span className={`font-black font-display tracking-tight text-[#ff3d1f] ${isHero ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`}>
                      {item.price}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#ff3d1f] group-hover:w-full transition-[width] duration-300 ease-out"></div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mt-16 sm:mt-24 flex justify-center relative z-20"
        >
          <a
            href="/menu-barbosa.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-transparent border border-[#ff3d1f]/50 text-stone-200 font-mono tracking-widest uppercase text-sm hover:bg-[#ff3d1f] hover:text-white transition-all duration-300"
          >
            <span>Ver Carta Completa</span>
            <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
