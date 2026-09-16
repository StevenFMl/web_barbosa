import { AlertTriangle, Clock, ShieldAlert, RefreshCw } from 'lucide-react';

export default function ExpiredCouponCard({
  claimedCode,
  expiredDetails,
  handleDiscardExpired
}) {
  return (
    <div className="flex flex-col justify-between h-full py-2 space-y-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
            <span className="font-display font-black text-xs uppercase tracking-[0.25em] text-red-400">
              Cupón Caducado
            </span>
          </div>
          <span className="text-[10px] font-mono text-red-300 bg-red-950/80 border border-red-500/40 px-2.5 py-0.5 rounded-full font-bold">
            Campaña Finalizada
          </span>
        </div>

        <div className="bg-gradient-to-b from-red-950/40 via-black/80 to-black/60 border border-red-500/40 p-5 rounded-sm text-center shadow-inner relative overflow-hidden">
          <span className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest block mb-1">
            Código fuera de vigencia:
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-black text-red-400/60 tracking-widest line-through my-2 select-all">
            {claimedCode}
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/60 border border-red-500/30 text-[11px] font-mono text-red-300 rounded-sm">
            <Clock className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span>{expiredDetails?.message || `El cupón era de '${expiredDetails?.promoTitulo}' y la promo actual es '${expiredDetails?.currentPromo}'`}</span>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-sm p-3.5 text-left space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-semibold">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Motivo de Caducidad</span>
          </div>
          <p className="text-zinc-300 font-serif text-xs leading-relaxed">
            Esta campaña promocional ha finalizado en Casa Barbosa y fue sustituida por una nueva oferta. Los cupones de promociones concluidas ya no son válidos para canje.
          </p>
          <p className="text-red-300/90 font-serif text-xs leading-relaxed border-t border-white/5 pt-2 italic">
            ⚠️ Por política del restaurante, el personal no aceptará cupones de promociones finalizadas ni capturas de campañas pasadas.
          </p>
        </div>
      </div>

      <div className="pt-4 space-y-2">
        <button
          type="button"
          onClick={handleDiscardExpired}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-display text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-sm cursor-pointer active:scale-[0.99]"
        >
          <RefreshCw className="w-4 h-4 text-[#ff3d1f]" />
          <span>Descartar y ver nueva promoción</span>
        </button>
        <p className="text-center text-[10px] font-mono text-zinc-500">
          Podrás obtener tu cupón para la promoción actualmente activa
        </p>
      </div>
    </div>
  );
}
