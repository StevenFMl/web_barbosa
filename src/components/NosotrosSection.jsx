import { motion } from 'framer-motion';
import { Flame, ArrowUpRight } from 'lucide-react';

const cards = [
  {
    label: '— Misión',
    main: 'Cocinar chancho a la Barbosa con fuego real, ingredientes propios y el cuidado que cada pieza merece.',
    sub: 'Que quien llega a Casa Barbosa se vaya con ganas de volver.',
  },
  {
    label: '— Visión',
    main: 'Ser la referencia del chancho a la Barbosa en Ecuador.',
    sub: 'Crecer, expandirse y llevar esta sazón a más mesas, sin perder el fuego que nos define.',
  },
];

export default function NosotrosSection() {
  return (
    <section
      id="nosotros"
      className="relative overflow-hidden bg-[#040504] pt-32 sm:pt-40 pb-20 sm:pb-28"
    >
      <div className="absolute top-6 left-0 right-0 text-center 2xl:top-12 2xl:left-8 2xl:right-auto 2xl:text-left z-40 pointer-events-none flex justify-center 2xl:block">
        <span className="inline-block text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#ff3d1f] uppercase 2xl:[writing-mode:vertical-rl] 2xl:rotate-180">
          CAPÍTULO 04 // NUESTRA HISTORIA
        </span>
      </div>

      <div className="pointer-events-none absolute -top-24 right-0 h-[500px] w-[500px] rounded-full bg-[#ff3d1f]/[0.06] blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-16 left-0 h-[380px] w-[380px] rounded-full bg-red-900/[0.07] blur-[130px]" />

      <div
        aria-hidden="true"
        className="hidden md:flex pointer-events-none select-none absolute inset-0 items-center justify-center overflow-hidden"
      >
        <span
          className="font-display font-black uppercase text-white opacity-[0.025] leading-none tracking-[-0.05em] whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem, 20vw, 20rem)' }}
        >
          HISTORIA
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16 sm:mb-20 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-4 mb-5 text-[#ff3d1f]">
            <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-[#ff3d1f] to-transparent" />
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            <span className="uppercase tracking-[0.4em] font-bold text-[11px] sm:text-xs font-display leading-none">
              Nuestra Historia
            </span>
            <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-[#ff3d1f] to-transparent" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[0.9] mb-5 font-display uppercase">
            Aquí el fuego
            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-orange-300 via-[#ff3d1f] to-red-700 italic font-serif font-light tracking-tight normal-case mt-2">
              no tiene prisa.
            </span>
          </h2>

          <p className="max-w-md text-zinc-400 text-base sm:text-lg font-light font-serif leading-relaxed italic">
            Cuatro años cocinando como siempre debió hacerse.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16 sm:mb-20">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col gap-7"
          >
            <p className="font-serif text-lg sm:text-xl text-zinc-200 leading-relaxed">
              Hay cosas que no se improvisan.
              <br />
              La leña se elige. El carbón se prepara. El chancho se respeta.
              <br />
              En Casa Barbosa, así ha sido desde el primer día.
            </p>

            <span className="h-px w-16 bg-[#ff3d1f]/40" />

            <div className="flex flex-col gap-4">
              <p className="font-serif text-base sm:text-lg text-zinc-400 leading-relaxed">
                Wilson Andrés Cárdenas no heredó una receta.{' '}
                <span className="text-white">La construyó.</span>
              </p>
              <p className="font-serif text-base sm:text-lg text-zinc-400 leading-relaxed">
                Con fuego, con tiempo y con la convicción de que el chancho a la Barbosa merece hacerse bien.
              </p>
              <p className="font-sans text-sm sm:text-base tracking-[0.12em] uppercase text-zinc-300 mt-1">
                Cuatro años en la Panamericana Norte, sector El Olivo, Ibarra.
              </p>
              <p className="font-display text-sm tracking-[0.2em] uppercase text-[#ff3d1f]">
                Mismo fuego. Misma dedicación.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.12 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src="/Fotos%20carrucel/WhatsApp-Image-2026-05-15-at-9.37.23-PM.webp"
                alt="Casa Barbosa — preparación artesanal al fuego"
                className="w-full h-full object-cover grayscale-[25%] brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040504]/75 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#ff3d1f]/60" />
              <span className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#ff3d1f]/60" />
              <span className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#ff3d1f]/60" />
              <span className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#ff3d1f]/60" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="absolute -bottom-5 left-0 sm:-left-6 bg-[#040504] border border-white/15 px-6 py-5 shadow-2xl"
            >
              <span className="block font-display font-black text-4xl text-white tracking-tight leading-none">4</span>
              <span className="block text-[10px] font-display tracking-[0.35em] uppercase text-[#ff3d1f] mt-1">
                Años de fuego
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Callout editorial — contexto del nombre */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative border-y border-white/10 py-10 sm:py-12 mb-14 sm:mb-16 overflow-hidden"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -top-6 left-0 font-display font-black text-white opacity-[0.035] leading-none"
            style={{ fontSize: 'clamp(6rem, 16vw, 14rem)' }}
          >
            "
          </span>
          <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
            <span className="block text-[10px] font-display tracking-[0.45em] uppercase text-[#ff3d1f] mb-5">
              — El nombre
            </span>
            <p className="font-serif italic text-base sm:text-lg text-zinc-400 leading-relaxed">
              El nombre "Barbosa" se asocia a una preparación reconocida dentro de la gastronomía ecuatoriana y, según la tradición, a un relato que remite a un cura uruguayo en el Austro. Casa Barbosa toma esa referencia con respeto, pero escribe su propia historia desde Ibarra.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
              className="relative border border-white/10 bg-white/[0.025] p-7 sm:p-8 group hover:border-[#ff3d1f]/35 transition-colors duration-500"
            >
              <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#ff3d1f]/40" />
              <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#ff3d1f]/40" />
              <span className="block text-[10px] font-display tracking-[0.45em] uppercase text-[#ff3d1f] mb-4">
                {card.label}
              </span>
              <p className="font-serif text-lg sm:text-xl text-white leading-relaxed mb-3">
                {card.main}
              </p>
              <p className="font-serif text-sm sm:text-base text-zinc-500 italic leading-relaxed">
                {card.sub}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="flex justify-center pb-4"
        >
          <a
            href="https://wa.me/593984180801?text=Hola%20Casa%20Barbosa!%20Quiero%20hacer%20una%20reserva."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Reservar mesa por WhatsApp"
            className="group relative inline-flex items-center gap-5 pl-7 pr-3 py-3 rounded-full bg-white text-black font-display font-bold tracking-[0.25em] uppercase text-xs sm:text-sm overflow-hidden transition-[padding,transform] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:pl-9 active:scale-[0.98]"
          >
            <span className="relative z-10">Reserva tu mesa</span>
            <span className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black text-white transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:rotate-45">
              <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#ff3d1f] to-red-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
            />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
