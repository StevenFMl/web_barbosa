import { CheckCircle2, Check, ShieldAlert, MessageCircle, RefreshCw } from 'lucide-react';
import PulseDot from './PulseDot';
import { getWhatsAppUrl } from '../../config/siteConfig';

export default function RedeemedCouponCard({
  claimedCode,
  cupos_restantes,
  cupos_totales,
  progressPercentage,
  refreshOffer
}) {
  return (
    <div className="flex flex-col justify-between h-full py-2 space-y-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400">
            <CheckCircle2 className="w-5 h-5 text-zinc-400 shrink-0" />
            <span className="font-display font-black text-xs uppercase tracking-[0.25em] text-zinc-300">
              Cupón Canjeado
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-300 bg-zinc-800/80 border border-zinc-600/40 px-2.5 py-0.5 rounded-full font-bold">
            Uso Registrado
          </span>
        </div>

        <div className="bg-gradient-to-b from-zinc-900/60 via-black/80 to-black/60 border border-zinc-700/50 p-5 rounded-sm text-center shadow-inner relative overflow-hidden">
          <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest block mb-1">
            Código de cupón utilizado:
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-black text-zinc-500 tracking-widest line-through my-2 select-all">
            {claimedCode}
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-800/60 border border-zinc-600/40 text-[11px] font-mono text-zinc-300 rounded-sm">
            <Check className="w-3.5 h-3.5 text-zinc-400" />
            <span>Este cupón ya fue canjeado en restaurante Casa Barbosa.</span>
          </div>
        </div>

        {/* Indicador pequeño de cupos restantes en vivo */}
        <div className="bg-white/[0.03] border border-white/10 rounded-sm p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PulseDot />
            <span className="font-mono text-[11px] uppercase tracking-wider text-orange-200/90 font-bold">
              {cupos_restantes > 0 
                ? `Quedan ${cupos_restantes} de ${cupos_totales} cupones hoy` 
                : 'Cupos de hoy agotados'}
            </span>
          </div>
          {refreshOffer && (
            <button
              type="button"
              onClick={refreshOffer}
              title="Actualizar datos en vivo"
              className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 hover:text-orange-200 transition-colors cursor-pointer group py-0.5 px-1 rounded-sm hover:bg-white/5"
            >
              <RefreshCw className="w-2.5 h-2.5 text-[#ff3d1f] group-hover:rotate-180 transition-transform duration-500" />
              <span>{cupos_restantes > 0 ? `${Math.round(progressPercentage)}% disp.` : '0%'}</span>
            </button>
          )}
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-sm p-3.5 text-left space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-semibold">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Estado de Canje</span>
          </div>
          <p className="text-zinc-300 font-serif text-xs leading-relaxed">
            Este cupón ya fue utilizado. Si tienes alguna inquietud sobre tu cuenta o pedido, consulta directamente con el personal.
          </p>
          <p className="text-zinc-400 font-serif text-xs leading-relaxed border-t border-white/5 pt-2 italic">
            Por política del restaurante, cada beneficio canjeado es definitivo para la campaña vigente.
          </p>
        </div>
      </div>

      <div className="pt-2">
        <a
          href={getWhatsAppUrl(`¡Hola Casa Barbosa! Tengo una consulta sobre mi cupón ${claimedCode} que figura como canjeado.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 text-center text-xs font-mono text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Consultar con el personal por WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
