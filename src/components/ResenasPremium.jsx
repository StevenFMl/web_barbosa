import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Cliente habitual",
    role: "Chancho a la Barbosa",
    quote: "El Chancho a la Barbosa es lo mejor que he probado en Ibarra. Punto.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mesa de pareja",
    role: "Costillas ST. Louis",
    quote: "Pedí las costillas. Volví a la semana siguiente. Y volveré otra vez.",
    rating: 5,
  },
  {
    id: 3,
    name: "Cliente frecuente",
    role: "Ibarra, Ecuador",
    quote: "Aquí saben lo que es tratar la carne con respeto. Eso se nota desde el primer bocado.",
    rating: 5,
  },
  {
    id: 4,
    name: "Mesa familiar",
    role: "Sartenazo Campesino",
    quote: "El Sartenazo Campesino es para compartir. Yo no lo compartí. Pidan dos.",
    rating: 5,
  },
  {
    id: 5,
    name: "Visita recurrente",
    role: "Ibarra, Ecuador",
    quote: "Ambiente, atención y un fuego que se siente desde la entrada. Me llevé el sabor a casa.",
    rating: 5,
  },
];

const GALLERY_IMAGES = [
  {
    id: 1,
    src: "/Fotos%20carrucel/WhatsApp-Image-2026-05-15-at-9.37.23-PM.webp",
    alt: "Ambiente del restaurante Barbos",
  },
  {
    id: 2,
    src: "/Fotos%20carrucel/WhatsApp-Image-2026-05-15-at-9.38.24-PM.webp",
    alt: "Plato estrella de Barbos",
  },
  {
    id: 3,
    src: "/Fotos%20carrucel/WhatsApp-Image-2026-05-15-at-9.41.05-PM.webp",
    alt: "Corte a la parrilla Barbos",
  },
  {
    id: 4,
    src: "/Fotos%20carrucel/WhatsApp-Image-2026-05-15-at-9.41.09-PM.webp",
    alt: "Experiencia gastronómica Barbos",
  },
  {
    id: 5,
    src: "/Fotos%20carrucel/WhatsApp-Image-2026-05-15-at-9.41.11-PM.webp",
    alt: "Sabor y fuego en Barbos",
  },
];

export default function ResenasPremium() {
  return (
    <section
      id="resenas"
      aria-labelledby="veredicto-heading"
      className="relative w-full overflow-hidden bg-[#040504] py-16 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="absolute top-6 left-0 right-0 text-center 2xl:top-12 2xl:left-8 2xl:right-auto 2xl:text-left z-40 pointer-events-none flex justify-center 2xl:block"
      >
        <span className="inline-block text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#ff3d1f] uppercase 2xl:[writing-mode:vertical-rl] 2xl:rotate-180">
          CAPÍTULO 05 // EL VEREDICTO
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 text-center md:mb-16 flex flex-col items-center"
        >
          <div aria-hidden="true" className="flex items-center gap-4 mb-5 text-[#ff3d1f]">
            <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-[#ff3d1f] to-transparent" />
            <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            <span className="uppercase tracking-[0.4em] font-bold text-[11px] sm:text-xs font-display leading-none">
              El Veredicto
            </span>
            <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-[#ff3d1f] to-transparent" />
          </div>

          <h2
            id="veredicto-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none mb-5 font-display uppercase"
          >
            Lo dicen ellos.
            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-orange-300 via-[#ff3d1f] to-red-700 italic font-serif font-light tracking-tight normal-case mt-1">
              no nosotros.
            </span>
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
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          className="flex w-max gap-6 sm:gap-8 px-4 will-change-transform"
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, index) => (
            <article
              key={`t-${t.id}-${index}`}
              className="group relative flex w-[280px] sm:w-[360px] flex-col justify-between overflow-hidden rounded-xl bg-white/5 border border-white/10 p-6 sm:p-8 flex-shrink-0 transition-[transform,border-color] duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-[#ff3d1f]/50"
            >
              <Quote
                aria-hidden="true"
                className="absolute right-4 top-4 h-10 w-10 text-white/5 group-hover:text-[#ff3d1f]/15 transition-colors duration-500"
              />

              <div>
                <div
                  aria-label={`${t.rating} de 5 estrellas`}
                  className="mb-4 flex gap-1"
                >
                  {Array.from({ length: t.rating }, (_, i) => (
                    <Star
                      key={i}
                      aria-hidden="true"
                      className="h-4 w-4 fill-[#ff3d1f] text-[#ff3d1f]"
                    />
                  ))}
                </div>

                <p className="mb-6 text-base leading-relaxed text-zinc-400 font-serif italic group-hover:text-zinc-300 transition-colors duration-300">
                  "{t.quote}"
                </p>
              </div>

              <footer className="mt-auto flex flex-col pt-5 border-t border-white/10 group-hover:border-[#ff3d1f]/30 transition-colors duration-300">
                <span className="font-bold text-white font-display tracking-wide text-sm sm:text-base">
                  {t.name}
                </span>
                <span className="mt-1 text-xs sm:text-sm tracking-widest text-[#ff3d1f] uppercase">
                  {t.role}
                </span>
              </footer>
            </article>
          ))}
        </motion.div>
      </div>

      <div className="relative mt-12 flex w-full flex-col overflow-hidden sm:mt-16 z-10">
        <div className="absolute left-0 top-0 bottom-0 z-20 w-16 sm:w-32 bg-gradient-to-r from-[#040504] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 z-20 w-16 sm:w-32 bg-gradient-to-l from-[#040504] to-transparent pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex w-max gap-4 px-2 will-change-transform"
        >
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, index) => (
            <div
              key={`img-${img.id}-${index}`}
              className="group relative aspect-video w-[280px] sm:w-[420px] md:w-[480px] flex-shrink-0 overflow-hidden rounded border border-white/10"
            >
              <img
                src={img.src}
                alt={img.alt}
                draggable="false"
                className="h-full w-full object-cover object-center select-none grayscale-[50%] transition-[transform,filter] duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
