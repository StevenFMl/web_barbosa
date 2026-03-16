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
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="menu" className="py-24 sm:py-32 bg-zinc-950 relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-24 flex flex-col items-center"
        >
          <div className="flex items-center gap-3 mb-4 text-red-600">
            <span className="h-[1px] w-12 bg-red-600/50"></span>
            <Beef className="w-5 h-5" />
            <span className="uppercase tracking-[0.3em] font-bold text-sm">Cortes Magistrales</span>
            <span className="h-[1px] w-12 bg-red-600/50"></span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-stone-100 tracking-tight leading-none mb-6">
            Menú de Autor
          </h2>
          <p className="max-w-2xl text-stone-400 text-base sm:text-xl font-light">
            Cada plato es una obra de arte concebida sobre las brasas. Exigimos la máxima calidad en nuestros cortes para garantizar una experiencia rotunda.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "-50px" }}
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] transition-all duration-300 flex flex-col"
            >
              <div className="h-64 sm:h-72 w-full relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="600"
                  className="w-full h-full object-cover object-center group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent"></div>

                {item.popular && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white font-bold py-1.5 px-4 rounded-full text-xs uppercase tracking-wider flex items-center gap-1 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                    <Flame className="w-3 h-3" /> Favorito
                  </div>
                )}

                <div className="absolute top-4 right-4 bg-zinc-950/60 backdrop-blur-lg border border-white/10 text-stone-100 font-bold py-1.5 px-4 rounded-full shadow-lg text-lg group-hover:border-red-500/50 transition-colors">
                  {item.price}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between relative">
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-bold text-stone-100 mb-4 group-hover:text-red-500 transition-colors flex items-center justify-between">
                    {item.name}
                    <BadgeCheck className="w-5 h-5 text-zinc-600 group-hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100" />
                  </h3>
                  <div className="h-[1px] w-12 bg-white/10 mb-5 group-hover:w-full group-hover:bg-red-500/30 transition-all duration-500 ease-in-out"></div>
                  <p className="text-stone-400 text-base leading-relaxed font-light">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
