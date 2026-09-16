import { motion } from 'framer-motion';
import { 
  Flame, 
  ArrowUpRight, 
  Award, 
  Sparkles, 
  UtensilsCrossed, 
  Clock, 
  MapPin, 
  Users, 
  HeartHandshake,
  BookOpen
} from 'lucide-react';
import { getWhatsAppUrl } from '../config/siteConfig';

const METRICS = [
  {
    number: '4+',
    label: 'Años de Trayectoria',
    desc: 'Encendiendo las brasas en El Olivo desde 2022.',
    icon: Clock,
  },
  {
    number: '100%',
    label: 'Leña & Carbón Real',
    desc: 'Sin gas ni atajos. Solo fuego de madera viva.',
    icon: Flame,
  },
  {
    number: '11:00 — 23:00',
    label: 'Atención Continua',
    desc: 'Fuego encendido todos los días del año.',
    icon: Sparkles,
  },
  {
    number: '+200',
    label: 'Familias por Semana',
    desc: 'Comensales que nos eligen en Ibarra e Imbabura.',
    icon: Users,
  },
];

const PILARES = [
  {
    icon: Flame,
    tag: 'Técnica & Paciencia',
    title: 'La Brasa Viva',
    text: 'No usamos gas ni planchas industriales. Solo carbón vegetal y leña seleccionada que ahúman lentamente la carne durante horas hasta impregnar cada fibra de un aroma rústico inconfundible.',
  },
  {
    icon: Award,
    tag: 'Sabor de Autor',
    title: 'El Secreto del Chancho',
    text: 'Wilson Andrés Cárdenas perfeccionó un marinado propio con especias locales. El resultado: una corteza dorada que truena al primer mordisco y una carne tierna que se deshace con el tenedor.',
  },
  {
    icon: UtensilsCrossed,
    tag: 'Tradición Ecuatoriana',
    title: 'Guarniciones de la Tierra',
    text: 'Cada plato se acompaña con llapingachos dorados en manteca, mote sucio cocido en el jugo de la carne, ensalada fresca con aguacate y ají de piedra recién elaborado.',
  },
  {
    icon: HeartHandshake,
    tag: 'Ambiente Acogedor',
    title: 'La Chimenea & El Hogar',
    text: 'En nuestro local de El Olivo, la chimenea encendida recibe a familias y viajeros de la Panamericana. Comer en Casa Barbosa es una pausa reconfortante alrededor del fuego.',
  },
];

export default function NosotrosSection() {
  return (
    <section
      id="nosotros"
      aria-labelledby="nosotros-heading"
      className="relative overflow-hidden bg-[#040504] pt-24 sm:pt-32 pb-20 sm:pb-28 text-stone-200"
    >
      {/* Chapter side marker for wide screens: situado en el encabezado para no montarse */}
      <div className="hidden xl:flex absolute top-28 sm:top-32 left-6 2xl:left-10 z-20 flex-col items-center gap-4 pointer-events-none select-none">
        <span className="inline-block text-[11px] 2xl:text-xs font-mono tracking-[0.3em] text-[#ff3d1f] uppercase [writing-mode:vertical-rl] rotate-180 drop-shadow-md">
          CAPÍTULO 04 // NUESTRA HISTORIA
        </span>
        <span className="w-px h-16 2xl:h-20 bg-gradient-to-b from-[#ff3d1f]/60 to-transparent" />
      </div>

      {/* Atmospheric ambient glows */}
      <div className="pointer-events-none absolute -top-24 right-0 h-[500px] w-[500px] rounded-full bg-[#ff3d1f]/[0.06] blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-16 left-0 h-[400px] w-[400px] rounded-full bg-amber-800/[0.05] blur-[140px]" />

      {/* Background Watermark */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-4 sm:pt-6">

        {/* SECTION HEADER: In-flow so it NEVER overlaps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-14 sm:mb-20 flex flex-col items-center text-center"
        >
          {/* Tag Badge */}
          <div className="flex items-center gap-3 mb-4 text-[#ff3d1f]">
            <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-[#ff3d1f] to-transparent" />
            <Flame className="w-4 h-4 fill-current" />
            <span className="uppercase tracking-[0.35em] font-bold text-[10px] sm:text-xs font-mono leading-none">
              Capítulo 04 // Nuestra Historia
            </span>
            <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-[#ff3d1f] to-transparent" />
          </div>

          <h1
            id="nosotros-heading"
            className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[0.92] mb-4 font-display uppercase"
          >
            Aquí el fuego
            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-orange-300 via-[#ff3d1f] to-red-700 italic font-serif font-light tracking-tight normal-case mt-1.5">
              no tiene prisa.
            </span>
          </h1>

          <p className="max-w-xl text-zinc-300 text-base sm:text-lg font-serif leading-relaxed italic">
            Cuatro años manteniendo viva la llama del auténtico asado al carbón en El Olivo, Ibarra.
          </p>
        </motion.div>

        {/* STORY SPLIT: NARRATIVE + VISUAL COLLAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-24">

          {/* Left Narrative Column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <div className="border-l-2 border-[#ff3d1f] pl-5 sm:pl-6 py-1">
              <span className="block text-xs font-mono uppercase tracking-[0.3em] text-[#ff3d1f] mb-2 font-bold">
                El Origen · 2022
              </span>
              <p className="font-serif text-xl sm:text-2xl text-white leading-snug">
                "Hay cosas que no se improvisan: la leña se elige, la brasa se cuida y el chancho se respeta."
              </p>
            </div>

            <p className="font-serif text-base sm:text-lg text-zinc-300 leading-relaxed">
              En el año 2022, en la Panamericana Norte frente a la gasolinera de El Olivo, nació <span className="text-white font-semibold">Casa Barbosa</span>. No surgió de una franquicia ni de una receta heredada; fue construida día a día por <span className="text-white font-semibold">Wilson Andrés Cárdenas</span> frente a las brasas calientes.
            </p>

            <p className="font-serif text-base sm:text-lg text-zinc-400 leading-relaxed">
              Mientras muchos asaderos optan por cocciones rápidas o planchas a gas, en Casa Barbosa se tomó el camino difícil pero gratificante: encender la leña de eucalipto desde temprano, marinar con fórmula de autor y dejar que el calor constante haga su trabajo sin apuros.
            </p>

            <div className="p-4 sm:p-5 rounded-sm bg-[#0a0b0a] border border-white/10 flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[#ff3d1f] shrink-0 mt-1" />
              <div>
                <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-1">
                  Punto de Encuentro en Ibarra
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                  Sector El Olivo, Panamericana Norte E35. Entrada norte a la Ciudad Blanca, parada obligada para comensales locales y viajeros del norte del país.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Composition */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
            className="lg:col-span-6 relative"
          >
            {/* Primary Main Photo */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-sm border border-white/15 group shadow-2xl">
              <img
                src="/images/galeria/festival-equipo.webp"
                alt="Equipo de Casa Barbosa con el asado al carbón en Ibarra"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040504] via-transparent to-transparent opacity-80" />

              {/* Brass Corner Accents */}
              <span className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#ff3d1f]" />
              <span className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#ff3d1f]" />
              <span className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#ff3d1f]" />
              <span className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#ff3d1f]" />

              {/* Image Floating Caption */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs">
                <span className="font-display uppercase tracking-widest text-white font-bold bg-black/70 px-3 py-1 border border-white/20 backdrop-blur-md">
                  Pasión por la Brasa
                </span>
                <span className="font-mono text-[#ff3d1f] bg-black/70 px-2 py-1 border border-white/20 backdrop-blur-md">
                  El Olivo · Ibarra
                </span>
              </div>
            </div>

            {/* Floating Secondary Milestone Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-4 sm:mt-0 sm:absolute sm:-bottom-8 sm:-left-6 z-20 bg-[#0a0b0a] border border-white/20 p-5 sm:p-6 shadow-2xl rounded-sm flex items-center gap-4 sm:max-w-xs"
            >
              <div className="w-12 h-12 rounded-full bg-[#ff3d1f]/15 border border-[#ff3d1f]/40 flex items-center justify-center text-[#ff3d1f] shrink-0">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-display font-black text-2xl text-white tracking-tight leading-none">
                  4 Años
                </span>
                <span className="block text-[10px] font-mono tracking-widest uppercase text-[#ff3d1f] mt-1 font-semibold">
                  Al Mismo Fuego · 2022-2026
                </span>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* MILESTONE STATS RIBBON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-24"
        >
          {METRICS.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="p-6 rounded-sm bg-[#0a0b0a] border border-white/10 hover:border-[#ff3d1f]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,61,31,0.08)] group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-black text-3xl sm:text-4xl text-white group-hover:text-[#ff3d1f] transition-colors tracking-tight">
                    {m.number}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#ff3d1f]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-zinc-200 mb-1">
                  {m.label}
                </h3>
                <p className="text-xs text-zinc-400 font-serif leading-relaxed">
                  {m.desc}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* 4 PILARES DEL ASADO ARTESANAL */}
        <div className="mb-16 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.35em] text-[#ff3d1f] mb-3 font-bold">
              — Nuestra Filosofía —
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase font-display tracking-tight leading-tight">
              Los Pilares que sostienen nuestro fogón
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILARES.map((pilar, i) => {
              const Icon = pilar.icon;
              return (
                <motion.article
                  key={pilar.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative p-7 sm:p-8 rounded-sm bg-[#0a0b0a] border border-white/10 hover:border-[#ff3d1f]/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,61,31,0.08)] group"
                >
                  <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#ff3d1f]/40 group-hover:border-[#ff3d1f] transition-colors" />
                  <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#ff3d1f]/40 group-hover:border-[#ff3d1f] transition-colors" />

                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#ff3d1f] group-hover:bg-[#ff3d1f]/10 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff3d1f] bg-[#ff3d1f]/10 border border-[#ff3d1f]/30 px-2.5 py-0.5 rounded-sm">
                      {pilar.tag}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-xl text-white uppercase tracking-wide mb-2.5 group-hover:text-amber-100 transition-colors">
                    {pilar.title}
                  </h3>

                  <p className="font-serif text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {pilar.text}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* CALLOUT EDITORIAL — EL NOMBRE BARBOSA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative border-y border-white/10 py-10 sm:py-14 mb-16 sm:mb-20 overflow-hidden bg-white/[0.01]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -top-8 left-4 font-display font-black text-white opacity-[0.03] leading-none"
            style={{ fontSize: 'clamp(6rem, 16vw, 14rem)' }}
          >
            "
          </span>
          <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
            <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.4em] uppercase text-[#ff3d1f] mb-4 font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              El Origen del Nombre
            </span>
            <p className="font-serif italic text-base sm:text-xl text-zinc-300 leading-relaxed mb-4">
              "El término 'Barbosa' rinde homenaje a una tradición arraigada en el Austro y la serranía ecuatoriana: el chancho asado lentamente con especias del campo. En Casa Barbosa tomamos esa herencia ancestral con respeto, pero escribimos nuestra propia historia desde Ibarra, perfeccionando una sazón inconfundible que honra la mesa de nuestra gente."
            </p>
            <span className="font-mono text-xs uppercase tracking-widest text-[#ff3d1f]">
              — Casa Barbosa · El Olivo, Ibarra
            </span>
          </div>
        </motion.div>

        {/* MISIÓN Y VISIÓN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="relative border border-white/10 bg-[#0a0b0a] p-8 rounded-sm hover:border-[#ff3d1f]/40 transition-colors"
          >
            <span className="block text-[10px] font-mono tracking-[0.35em] uppercase text-[#ff3d1f] mb-3 font-bold">
              — Misión
            </span>
            <h3 className="font-display font-bold text-xl text-white uppercase tracking-wide mb-3">
              Cocinar con Verdad
            </h3>
            <p className="font-serif text-base sm:text-lg text-zinc-300 leading-relaxed mb-2">
              Cocinar chancho a la Barbosa y carnes a la parrilla con fuego real de carbón y leña, ingredientes seleccionados de nuestra tierra y la abundancia que cada familia merece.
            </p>
            <p className="font-serif text-sm text-zinc-400 italic">
              Que quien cruza nuestra puerta en El Olivo se sienta en casa y siempre tenga motivos para volver.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative border border-white/10 bg-[#0a0b0a] p-8 rounded-sm hover:border-[#ff3d1f]/40 transition-colors"
          >
            <span className="block text-[10px] font-mono tracking-[0.35em] uppercase text-[#ff3d1f] mb-3 font-bold">
              — Visión
            </span>
            <h3 className="font-display font-bold text-xl text-white uppercase tracking-wide mb-3">
              Referente del Buen Asado
            </h3>
            <p className="font-serif text-base sm:text-lg text-zinc-300 leading-relaxed mb-2">
              Consolidarnos como el asadero artesanal de referencia en Ibarra y todo el norte del Ecuador, demostrando que la cocina tradicional hecha con respeto y paciencia nunca pasa de moda.
            </p>
            <p className="font-serif text-sm text-zinc-400 italic">
              Crecer y compartir este fuego en más mesas sin renunciar jamás a nuestra esencia rústica.
            </p>
          </motion.div>
        </div>

        {/* CTA SECTION: VIVE LA EXPERIENCIA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center py-6"
        >
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-3">
            Ven a probar la historia tú mismo
          </h3>
          <p className="text-zinc-400 font-serif text-base mb-6 max-w-lg mx-auto">
            Te esperamos en El Olivo con la chimenea encendida, el chancho crocante y la mesa lista.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl('Hola Casa Barbosa! Deseo hacer una reserva de mesa.')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reservar mesa por WhatsApp"
              className="group relative inline-flex items-center gap-4 pl-7 pr-3 py-3 rounded-full bg-white text-black font-display font-bold tracking-[0.2em] uppercase text-xs sm:text-sm overflow-hidden transition-all duration-300 hover:pl-8 active:scale-[0.98] shadow-xl"
            >
              <span className="relative z-10">Reserva tu mesa</span>
              <span className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black text-white transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-[#ff3d1f] to-red-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
              />
            </a>

            <a
              href="/#menu"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 hover:border-[#ff3d1f] text-white hover:text-[#ff3d1f] font-display text-xs uppercase tracking-widest transition-all bg-white/[0.03]"
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              Explorar la Carta
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
