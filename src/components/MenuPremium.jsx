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
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="menu" className="py-24 sm:py-32 bg-[#040504] relative">
      {/* Subtle Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-24 flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-5 text-[#EFC524]">
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-[#EFC524] to-transparent"></span>
            <Beef className="w-6 h-6" />
            <span className="uppercase tracking-[0.3em] font-bold text-sm sm:text-base font-['Copperplate_Gothic_Bold',_'Cinzel',_serif]">Cortes Magistrales</span>
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-[#EFC524] to-transparent"></span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-8 font-['Copperplate_Gothic_Bold',_'Cinzel',_serif] uppercase drop-shadow-lg">
            Menú de Autor
          </h2>
          <p className="max-w-3xl text-[#DE9983]/80 text-lg sm:text-xl font-light font-['Crimson_Text',_serif] leading-relaxed">
            Cada plato es una obra de arte concebida sobre las brasas. Exigimos la máxima calidad en nuestros cortes para garantizar una experiencia rotunda e inolvidable.
          </p>
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "-50px" }}
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group relative"
            >
              <motion.div
                animate={{ y: [0, index % 2 === 0 ? -12 : 12, 0] }}
                transition={{ repeat: Infinity, duration: 5 + (index % 3), ease: 'easeInOut' }}
                whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.3 } }}
                className="h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#393938]/10 backdrop-blur-md border border-[#393938]/40 hover:border-[#EFC524]/60 hover:shadow-[0_0_30px_rgba(239,197,36,0.15)] transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div className="h-64 sm:h-72 w-full relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="600"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000 ease-out opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040504] via-[#040504]/30 to-transparent"></div>

                  {item.popular && (
                    <div className="absolute top-5 left-5 bg-[#EFC524] text-[#040504] font-bold py-1.5 px-4 rounded-full text-xs uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_20px_rgba(239,197,36,0.5)] font-['Copperplate_Gothic_Bold',_'Cinzel',_serif]">
                      <Flame className="w-4 h-4" /> Favorito
                    </div>
                  )}

                  <div className="absolute top-5 right-5 bg-[#040504]/80 backdrop-blur-md border border-[#EFC524]/30 text-[#EFC524] font-bold py-1.5 px-5 rounded-full shadow-lg text-lg group-hover:border-[#EFC524] transition-colors font-['Copperplate_Gothic_Bold',_'Cinzel',_serif] tracking-wider">
                    {item.price}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between relative bg-gradient-to-b from-transparent to-[#040504]/50">
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#EFC524]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  <div className="relative z-10">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-[#EFC524] transition-colors flex items-center justify-between font-['Copperplate_Gothic_Bold',_'Cinzel',_serif]">
                      {item.name}
                      <BadgeCheck className="w-6 h-6 text-[#393938] group-hover:text-[#EFC524] transition-colors duration-300" />
                    </h3>
                    
                    <div className="h-[2px] w-12 bg-[#393938] mb-5 group-hover:w-full group-hover:bg-[#EFC524]/40 transition-all duration-700 ease-in-out"></div>
                    
                    <p className="text-[#DE9983]/90 text-base leading-relaxed font-light font-['Crimson_Text',_serif]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
