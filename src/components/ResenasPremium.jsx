import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Alejandro V.",
    role: "Comió el Chancho",
    content: "El Chancho a la Barbosa es lo mejor que he probado en Ibarra. Punto.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sofía R.",
    role: "Volvió por las costillas",
    content: "Pedí las costillas. Volví a la semana siguiente. Y volveré otra vez.",
    rating: 5,
  },
  {
    id: 3,
    name: "Diego M.",
    role: "Cliente desde la apertura",
    content: "Aquí saben lo que es tratar la carne con respeto. Eso se nota desde el primer bocado.",
    rating: 5,
  },
  {
    id: 4,
    name: "Carlos T.",
    role: "Devoto del Sartenazo",
    content: "El Sartenazo Campesino es para compartir. Yo no lo compartí. Pidan dos.",
    rating: 5,
  },
  {
    id: 5,
    name: "María F.",
    role: "Ya es de la casa",
    content: "Ambiente, atención y un fuego que se siente desde la entrada. Me llevé el sabor a casa.",
    rating: 5,
  }
];

const GALLERY_IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80",
    alt: "Corte de carne premium a la parrilla",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    alt: "Bistec sellado al fuego",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    alt: "Restaurante de ambiente oscuro",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80",
    alt: "Llamas sobre la parrilla",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    alt: "Costillas ahumadas",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    alt: "Mesa de restaurante con luz tenue",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=1200&q=80",
    alt: "Brasas encendidas",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    alt: "Plato servido en restaurante",
  },
];

export default function ResenasPremium() {
  return (
    <section className="relative w-full overflow-hidden bg-[#040504] py-16 sm:py-20">
      <div className="hidden lg:block absolute top-8 left-4 sm:top-12 sm:left-8 z-40 pointer-events-none">
        <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#ff3d1f] uppercase [writing-mode:vertical-rl] rotate-180 drop-shadow-md">
          CAPÍTULO 04 // EL VEREDICTO
        </span>
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 text-center md:mb-16 flex flex-col items-center will-change-transform"
        >
          <div className="flex items-center gap-4 mb-5 text-[#ff3d1f]">
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-[#ff3d1f] to-transparent"></span>
            <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            <span className="uppercase tracking-[0.4em] font-bold text-[11px] sm:text-xs font-display leading-none">El Veredicto</span>
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-[#ff3d1f] to-transparent"></span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none mb-5 font-display uppercase">
            Lo dicen ellos.
            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-orange-300 via-[#ff3d1f] to-red-700 italic font-serif font-light tracking-tight normal-case mt-1">no nosotros.</span>
          </h2>
          <p className="max-w-xl text-zinc-400 text-base sm:text-lg font-light font-serif leading-relaxed">
            Cinco mesas, cinco veredictos. Sin maquillaje.
          </p>
        </motion.div>
      </div>

      <div className="relative flex w-full flex-col overflow-hidden py-4 z-10">
        <div className="absolute left-0 top-0 bottom-0 z-20 w-16 sm:w-32 bg-gradient-to-r from-[#040504] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 z-20 w-16 sm:w-32 bg-gradient-to-l from-[#040504] to-transparent pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 40,
            repeat: Infinity,
          }}
          className="flex w-max gap-6 sm:gap-8 px-4 will-change-transform"
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="group relative flex w-[280px] sm:w-[360px] flex-col justify-between overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 transition-transform duration-300 hover:border-[#ff3d1f]/50 flex-shrink-0 hover:-translate-y-2 hover:scale-[1.02] will-change-transform"
            >
              <Quote className="absolute right-4 top-4 h-10 w-10 text-white/5 group-hover:text-[#ff3d1f]/15 transition-colors duration-500" />

              <div>
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[#ff3d1f] text-[#ff3d1f]"
                    />
                  ))}
                </div>

                <p className="mb-6 text-base leading-relaxed text-zinc-400 font-serif italic group-hover:text-zinc-300 transition-colors duration-300">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="mt-auto flex flex-col pt-5 border-t border-white/10 group-hover:border-[#ff3d1f]/30 transition-colors duration-300">
                <h4 className="font-bold text-white font-display tracking-wide text-sm sm:text-base">
                  {testimonial.name}
                </h4>
                <p className="mt-1 text-xs sm:text-sm tracking-widest text-[#ff3d1f] uppercase">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative mt-12 flex w-full flex-col overflow-hidden sm:mt-16 z-10">
        <div className="absolute left-0 top-0 bottom-0 z-20 w-16 sm:w-32 bg-gradient-to-r from-[#040504] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 z-20 w-16 sm:w-32 bg-gradient-to-l from-[#040504] to-transparent pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 30,
            repeat: Infinity,
          }}
          className="flex w-max gap-4 px-2 will-change-transform"
        >
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="group relative aspect-video w-[280px] sm:w-[420px] md:w-[480px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[50%] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
