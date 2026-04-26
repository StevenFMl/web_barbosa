import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Beef, Flame } from 'lucide-react';

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
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="menu" className="py-24 sm:py-32 bg-[#040504] relative overflow-hidden">
      {/* Ambient static glow directly optimized avoiding blur overlapping UI elements unnecessarily */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-600/5 blur-[100px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-800/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-24 flex flex-col items-center will-change-transform"
        >
          <div className="flex items-center gap-4 mb-5 text-orange-500">
            <span className="h-[2px] w-12 sm:w-20 bg-gradient-to-l from-orange-500 to-transparent"></span>
            <Beef className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="uppercase tracking-[0.3em] font-bold text-xs sm:text-sm font-display leading-none">Cortes Magistrales</span>
            <span className="h-[2px] w-12 sm:w-20 bg-gradient-to-r from-orange-500 to-transparent"></span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none mb-6 font-display uppercase drop-shadow-md">
            Menú de <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Autor</span>
          </h2>
          <p className="max-w-2xl text-zinc-400 text-lg sm:text-xl font-light font-serif leading-relaxed tracking-wide">
            Cada plato es una obra de arte concebida sobre las brasas. Exigimos la máxima calidad en nuestros cortes.
          </p>
        </motion.div>

        {/* Menu Grid - Staggered Entrance */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "-50px" }}
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group h-full will-change-transform"
            >
              {/* Refactored to pure CSS transition instead of Framer Motion hover states = MASSIVE performance gain */}
              <div
                className="h-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-orange-500/50 hover:shadow-[0_10px_30px_rgba(249,115,22,0.1)] transition-all duration-300 flex flex-col will-change-transform relative hover:-translate-y-2 hover:scale-[1.01]"
              >
                {/* Image Container */}
                <div className="h-64 sm:h-72 w-full relative overflow-hidden bg-[#040504]">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="600"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040504] via-[#040504]/20 to-transparent"></div>

                  {item.popular && (
                    <div className="absolute top-5 left-5 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-black py-1.5 px-4 rounded-full text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-1.5 shadow-md font-display">
                      <Flame className="w-3 h-3 sm:w-4 sm:h-4" /> Favorito
                    </div>
                  )}

                  <div className="absolute top-5 right-5 bg-[#040504]/80 backdrop-blur-sm border border-orange-500/30 text-orange-400 font-bold py-1.5 px-4 sm:px-5 rounded-full shadow-md text-sm sm:text-base group-hover:border-orange-500 group-hover:text-orange-300 transition-colors font-display tracking-wider">
                    {item.price}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between relative bg-transparent">
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-yellow-300 transition-colors flex items-center justify-between font-display leading-tight">
                      {item.name}
                      <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-600 group-hover:text-orange-400 transition-colors duration-300 flex-shrink-0 ml-2" />
                    </h3>

                    <div className="h-[2px] w-12 bg-white/10 mb-5 group-hover:w-20 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-yellow-500 transition-all duration-500 ease-out"></div>

                    <p className="text-zinc-400 text-base leading-relaxed font-light font-serif">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
