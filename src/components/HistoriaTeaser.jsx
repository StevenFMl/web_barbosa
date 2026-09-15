import { ArrowRight, Flame } from 'lucide-react';

export default function HistoriaTeaser() {
  return (
    <section className="relative w-full bg-[#040504] py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-y border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-sm bg-gradient-to-r from-[#140805] via-[#0a0c0a] to-[#040504] border border-white/10 hover:border-[#ff3d1f]/40 transition-all duration-300 p-4 sm:p-5 lg:p-6 shadow-xl">
          {/* Sutil resplandor cálido de fondo */}
          <div className="absolute top-0 right-0 w-64 h-32 bg-[#ff3d1f]/[0.05] blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            
            {/* Lado izquierdo: Insignia de Capítulo 04 y pregunta concisa */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-center sm:text-left">
              <div className="inline-flex items-center justify-center gap-2 self-center sm:self-auto px-3 py-1 rounded-full bg-[#ff3d1f]/10 border border-[#ff3d1f]/30 shrink-0">
                <Flame className="w-3.5 h-3.5 text-[#ff3d1f]" />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#ff3d1f] font-bold">
                  Capítulo 04
                </span>
              </div>

              <p className="font-serif text-sm sm:text-base text-stone-200 leading-snug">
                ¿Quieres conocer la historia y la tradición del fuego detrás de Casa Barbosa?
              </p>
            </div>

            {/* Lado derecho: Botón directo hacia /nosotros */}
            <a
              href="/nosotros"
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#ff3d1f]/50 hover:border-[#ff3d1f] bg-white/[0.03] hover:bg-[#ff3d1f]/15 text-white font-display text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 shrink-0 shadow-md active:scale-95"
            >
              <span>Conocer Historia</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#ff3d1f] group-hover:translate-x-1 transition-transform" />
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}
