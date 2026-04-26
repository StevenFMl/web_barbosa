import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Alejandro V.",
    role: "Cliente Exclusivo",
    content: "El ahumado perfecto, una costra crujiente y una jugosidad que se deshace en la boca. Casa Barbosa ha redefinido verdaderamente la palabra premium.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sofía R.",
    role: "Entusiasta Culinaria",
    content: "No es solo ir a comer, es vivir una experiencia de lujo. El servicio es impecable y los sabores, definitivamente inolvidables.",
    rating: 5,
  },
  {
    id: 3,
    name: "Diego M.",
    role: "Crítico Gastronómico",
    content: "Casa Barbosa eleva la técnica a un arte exquisito. Imposible pedir algo que no esté ejecutado a la total perfección. Es mi santuario.",
    rating: 5,
  },
  {
    id: 4,
    name: "Carlos T.",
    role: "Amante de la Carne",
    content: "El Tomahawk es de otro mundo. La atención al detalle y el ambiente elegante te transportan a una verdadera steakhouse de clase mundial.",
    rating: 5,
  },
  {
    id: 5,
    name: "María F.",
    role: "Cliente Frecuente",
    content: "Siempre vuelvo por las costillas. Esa costra y el ahumado en leña de manzano son la prueba de un verdadero maestro parrillero.",
    rating: 5,
  }
];

export default function ResenasPremium() {
  return (
    <section className="relative w-full overflow-hidden bg-[#040504] py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section alineado con los otros componentes */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center md:mb-20 flex flex-col items-center will-change-transform"
        >
          <div className="flex items-center gap-4 mb-5 text-orange-500">
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-orange-500 to-transparent"></span>
            <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            <span className="uppercase tracking-[0.3em] font-bold text-xs sm:text-sm font-display leading-none">Testimonios</span>
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-orange-500 to-transparent"></span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none mb-6 font-display uppercase">
            El Veredicto
          </h2>
          <p className="max-w-2xl text-zinc-400 text-lg sm:text-xl font-light font-serif leading-relaxed tracking-wide">
            Lo que dicen quienes ya vivieron la experiencia Barbosa. Nuestra dedicación se refleja en cada palabra.
          </p>
        </motion.div>
      </div>

      {/* Infinite Carousel Container Optimized */}
      <div className="relative flex w-full flex-col overflow-hidden py-4 z-10">
        {/* Degradados en los bordes para un look fluido y elegante */}
        <div className="absolute left-0 top-0 bottom-0 z-20 w-16 sm:w-32 bg-gradient-to-r from-[#040504] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 z-20 w-16 sm:w-32 bg-gradient-to-l from-[#040504] to-transparent pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 40,
            repeat: Infinity,
          }}
          className="flex w-max gap-6 sm:gap-8 px-4 will-change-transform" // Crucial fix for infinite GPU lag
        >
          {/* Duplicamos el array para lograr el efecto de scroll infinito continuo */}
          {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="group relative flex w-[280px] sm:w-[360px] flex-col justify-between overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 transition-transform duration-300 hover:border-orange-500/50 flex-shrink-0 hover:-translate-y-2 hover:scale-[1.02] will-change-transform"
            >
              {/* Ícono de Comillas */}
              <Quote className="absolute right-4 top-4 h-10 w-10 text-white/5 group-hover:text-orange-500/10 transition-colors duration-500" />

              <div>
                {/* Estrellas */}
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-4 w-4 fill-orange-500 text-orange-500"
                    />
                  ))}
                </div>

                {/* Texto de la Reseña */}
                <p className="mb-6 text-base leading-relaxed text-zinc-400 font-serif italic group-hover:text-zinc-300 transition-colors duration-300">
                  "{testimonial.content}"
                </p>
              </div>

              {/* Autor */}
              <div className="mt-auto flex flex-col pt-5 border-t border-white/10 group-hover:border-orange-500/30 transition-colors duration-300">
                <h4 className="font-bold text-white font-display tracking-wide text-sm sm:text-base">
                  {testimonial.name}
                </h4>
                <p className="mt-1 text-xs sm:text-sm tracking-widest text-orange-500 uppercase">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
