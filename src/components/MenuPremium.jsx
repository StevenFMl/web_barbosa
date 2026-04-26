import React from 'react';
import { motion } from 'framer-motion';
import { Beef, Flame } from 'lucide-react';

const menuItems = [
  {
    id: 1,
    name: 'Parrillada Barbosa',
    description: 'La especialidad de la casa. Cuidada selección de res premium, cerdo ahumado a leña y embutidos artesanales de la región con nuestro chimichurri exclusivo.',
    image: 'https://images.unsplash.com/photo-1544025162-8315ea07fc7a?q=80&w=800&auto=format&fit=crop',
    price: '$25.00',
    popular: true
  },
  {
    id: 2,
    name: 'Costillas Ahumadas ST. Louis',
    description: 'Slow-smoked por 10 horas en leña de manzano, glaseadas en nuestra salsa BBQ secreta. Tan suaves que se desprenden del hueso.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=800&auto=format&fit=crop',
    price: '$18.00',
    popular: false
  },
  {
    id: 3,
    name: 'Pinchos de Lomo Fino',
    description: 'Generosas piezas de lomo fino marinadas por 24 horas, intercaladas con vegetales frescos de temporada a la parrilla y servidos con papas rústicas al romero.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
    price: '$8.00',
    popular: false
  },
  {
    id: 4,
    name: 'Sartenazo Campesino',
    description: 'Fusión jugosa de cortes selectos picados a cuchillo, chorizo ahumado, plátano maduro meloso, papas amarillas y abundante queso provolone gratinado al carbón.',
    image: 'https://images.unsplash.com/photo-1628863148117-9c9dc7d10f2c?q=80&w=800&auto=format&fit=crop',
    price: '$15.00',
    popular: false
  },
  {
    id: 5,
    name: 'Chancho a la Barbosa',
    description: 'Nuestra receta insignia. Corte supremo de cerdo asado lentamente al carbón con cama de hierbas andinas, logrando una corteza cristalina ultra crocante y un interior jugoso.',
    image: 'https://images.unsplash.com/photo-1594041680534-f8b1a53e6065?q=80&w=800&auto=format&fit=crop',
    price: '$14.00',
    popular: true
  }
];

export default function MenuPremium() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.22, delayChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="menu" className="py-32 sm:py-48 bg-[#040504] relative overflow-hidden">
      {/* Ambient atmospheric glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-800/5 blur-[140px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Editorial Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-28 sm:mb-40"
        >
          <div className="flex items-center gap-6 mb-10 text-orange-500">
            <span className="h-px w-16 sm:w-24 bg-orange-500/60"></span>
            <Beef className="w-5 h-5" strokeWidth={1.5} />
            <span className="uppercase tracking-[0.4em] font-bold text-[11px] sm:text-xs font-display">El Compendio</span>
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black text-white tracking-tighter leading-[0.85] font-display uppercase mb-12">
            Cortes
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 italic font-serif font-light tracking-tight normal-case">de autor</span>
          </h2>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-white/5 pt-10">
            <p className="max-w-xl text-zinc-400 text-lg sm:text-xl font-light font-serif leading-relaxed">
              Cada plato es una declaración. Una conversación silenciosa entre el fuego, el tiempo y la materia prima escogida con obsesión.
            </p>
            <span className="text-zinc-600 text-xs uppercase tracking-[0.4em] font-display whitespace-nowrap">
              {String(menuItems.length).padStart(2, '0')} / Especialidades
            </span>
          </div>
        </motion.div>

        {/* Editorial Menu List — staggered scroll reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="border-t border-white/5"
        >
          {menuItems.map((item, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <motion.article
                key={item.id}
                variants={itemVariants}
                className="group border-b border-white/5 py-16 sm:py-24 lg:py-32 will-change-transform"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">

                  {/* Image — slow infinite organic zoom */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative overflow-hidden aspect-[4/5] sm:aspect-[5/6] bg-[#0a0a0a]">
                      <motion.img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        width="800"
                        height="1000"
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-[filter] duration-[1200ms] ease-out will-change-transform"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{
                          duration: 22,
                          ease: 'easeInOut',
                          repeat: Infinity,
                          repeatType: 'loop'
                        }}
                      />
                      {/* Index marker */}
                      <div className="absolute top-6 left-6 text-white/70 text-[11px] uppercase tracking-[0.4em] font-display mix-blend-difference">
                        № {String(idx + 1).padStart(2, '0')}
                      </div>
                      {/* Subtle vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#040504]/40 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-7 ${isReversed ? 'lg:order-1 lg:pr-4' : 'lg:order-2 lg:pl-4'}`}>

                    {/* Meta row */}
                    <div className="flex items-center gap-4 mb-8">
                      <span className="h-px w-10 bg-white/20"></span>
                      {item.popular ? (
                        <span className="flex items-center gap-2 text-orange-400 uppercase tracking-[0.4em] text-[11px] font-display font-bold">
                          <Flame className="w-3.5 h-3.5" strokeWidth={2} />
                          Insignia de la casa
                        </span>
                      ) : (
                        <span className="text-zinc-500 uppercase tracking-[0.4em] text-[11px] font-display">
                          Especialidad
                        </span>
                      )}
                    </div>

                    {/* Title — silky color transition on hover */}
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[0.95] font-display uppercase mb-8 transition-colors duration-[900ms] ease-out group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-300 group-hover:via-amber-200 group-hover:to-yellow-300">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 text-base sm:text-lg font-light font-serif leading-relaxed max-w-xl mb-12">
                      {item.description}
                    </p>

                    {/* Price row — brutalist baseline */}
                    <div className="flex items-baseline justify-between gap-6 pt-8 border-t border-white/5">
                      <span className="text-zinc-600 text-[11px] uppercase tracking-[0.4em] font-display">
                        Desde
                      </span>
                      <span className="text-4xl sm:text-5xl font-black text-white font-display tracking-tight transition-colors duration-[900ms] ease-out group-hover:text-orange-400">
                        {item.price}
                      </span>
                    </div>

                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Editorial Footer mark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-32 sm:mt-40 text-center"
        >
          <div className="inline-flex items-center gap-5 text-zinc-600">
            <span className="h-px w-16 bg-white/10"></span>
            <span className="uppercase tracking-[0.5em] text-[11px] font-display">Fin del compendio</span>
            <span className="h-px w-16 bg-white/10"></span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
