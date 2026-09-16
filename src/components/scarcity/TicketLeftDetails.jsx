import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Check, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck 
} from 'lucide-react';

export default function TicketLeftDetails({
  titulo,
  descripcion,
  showPolicies,
  togglePolicies
}) {
  return (
    <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-dashed border-white/15 relative">
      {/* Notches for Ticket Perforation Effect */}
      <div className="hidden lg:block absolute -top-4 -right-4 w-8 h-8 rounded-full bg-[#040504] border border-[#ff3d1f]/40 z-20 shadow-inner" />
      <div className="hidden lg:block absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-[#040504] border border-[#ff3d1f]/40 z-20 shadow-inner" />

      <div className="lg:hidden absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-[#040504] border border-[#ff3d1f]/40 z-20 shadow-inner" />
      <div className="lg:hidden absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-[#040504] border border-[#ff3d1f]/40 z-20 shadow-inner" />

      <div>
        {/* Ticket Header Bar */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#ff3d1f]" />
            <span className="font-display font-black text-xs uppercase tracking-[0.25em] text-white">
              Casa Barbosa <span className="text-[#ff3d1f]">//</span> Cupón Oficial
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff3d1f] bg-[#ff3d1f]/10 border border-[#ff3d1f]/30 px-2.5 py-0.5">
            Activo Hoy
          </span>
        </div>

        {/* Offer Title */}
        <div className="mb-4">
          <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em] block mb-1">
            Beneficio promocional:
          </span>
          <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight uppercase leading-[1.05]">
            {titulo}
          </h3>
        </div>

        {/* Offer Description */}
        <p className="font-serif text-base sm:text-lg text-amber-200/90 leading-relaxed italic mb-6">
          "{descripcion}"
        </p>

        {/* Perks Checklist con Restricciones Reales de Restaurante */}
        <div className="space-y-2.5 mb-5">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-serif text-zinc-300">
            <span className="w-4 h-4 rounded-full bg-[#ff3d1f]/20 border border-[#ff3d1f]/50 flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 text-[#ff3d1f]" strokeWidth={3} />
            </span>
            <span>Válido para canje en restaurante Casa Barbosa</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-serif text-amber-300 font-semibold">
            <span className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 text-amber-400" strokeWidth={3} />
            </span>
            <span>Condición: La cantidad de cupones y condiciones dependen de la campaña vigente.</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-serif text-zinc-300">
            <span className="w-4 h-4 rounded-full bg-[#ff3d1f]/20 border border-[#ff3d1f]/50 flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 text-[#ff3d1f]" strokeWidth={3} />
            </span>
            <span>Validación en vivo: Presentar pantalla activa o WhatsApp (no capturas)</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-serif text-zinc-300">
            <span className="w-4 h-4 rounded-full bg-[#ff3d1f]/20 border border-[#ff3d1f]/50 flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 text-[#ff3d1f]" strokeWidth={3} />
            </span>
            <span>Vigencia por campaña: Válido mientras continúe activa esta promoción en la web</span>
          </div>
        </div>

        {/* Botón Desplegable: Políticas Completas y Términos Antifraude */}
        <div className="mb-6">
          <button
            type="button"
            onClick={togglePolicies}
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-orange-200 transition-colors py-1.5 cursor-pointer group"
          >
            <FileText className="w-3.5 h-3.5 text-[#ff3d1f]" />
            <span className="underline underline-offset-4 decoration-white/20 group-hover:decoration-[#ff3d1f]">
              {showPolicies ? 'Ocultar términos y condiciones' : 'Ver políticas completas y términos antifraude'}
            </span>
            {showPolicies ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <AnimatePresence>
            {showPolicies && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden mt-3 bg-white/[0.03] border border-white/10 rounded-sm p-4 text-xs font-serif text-zinc-300 space-y-2.5 leading-relaxed"
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-orange-200 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                  <span>Reglamento Oficial de Cupones Casa Barbosa</span>
                </div>
                <ol className="list-decimal pl-4 space-y-2 text-zinc-400">
                  <li>
                    <strong className="text-zinc-200">Cantidad y Condiciones por Campaña:</strong> La cantidad de cupones admitidos y las condiciones particulares (por persona, por cuenta o por familia/mesa) dependen de la campaña vigente publicada en Casa Barbosa.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Condiciones de Canje por Campaña:</strong> Cada cortesía se rige por la descripción y condiciones específicas de la campaña activa en Casa Barbosa (sea cortesía directa o según lo anunciado en la promoción).
                  </li>
                  <li>
                    <strong className="text-zinc-200">Pantalla en Vivo (Prohibido Capturas):</strong> El comensal debe mostrar esta página web abierta con el código en pantalla o el chat de WhatsApp oficial verificado. No se aceptan capturas de pantalla, fotos reenviadas ni cupones de terceros.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Vigencia por Campaña:</strong> El cupón permanece activo durante todos los días que esta promoción siga vigente en Casa Barbosa. Si la administración finaliza la campaña o la sustituye por una nueva oferta en la web, los cupones anteriores caducan automáticamente.
                  </li>
                  <li>
                    <strong className="text-zinc-200">No Acumulable:</strong> No es canjeable por dinero en efectivo ni acumulable con otros descuentos, promociones o eventos especiales.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Disponibilidad:</strong> Promoción sujeta a los cupos asignados en el sistema de Casa Barbosa.
                  </li>
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Voucher Monogram & Barcode Aesthetic */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-zinc-500">
        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase">
          CUPÓN OFICIAL // BARBOSA-2026
        </span>
        <div className="flex items-center gap-0.5 h-3.5 opacity-60">
          {[3, 5, 2, 6, 4, 2, 7, 3, 5, 2, 6, 4].map((h, i) => (
            <span key={i} className="w-[1.5px] bg-zinc-500 inline-block" style={{ height: `${h * 2}px` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
