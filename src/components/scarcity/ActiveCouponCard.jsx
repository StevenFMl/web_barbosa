import { 
  CheckCircle2, 
  Check, 
  Copy, 
  ShieldAlert, 
  Share2, 
  MessageCircle, 
  ExternalLink, 
  AlertTriangle,
  RefreshCw 
} from 'lucide-react';
import PulseDot from './PulseDot';

export default function ActiveCouponCard({
  claimedCode,
  titulo,
  cupos_restantes,
  cupos_totales,
  progressPercentage,
  claimUrl,
  copied,
  sharedCopied,
  storageAvailable,
  handleCopyCode,
  handleShareFriend,
  refreshOffer
}) {
  return (
    <div className="flex flex-col justify-between h-full py-2 space-y-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-display font-black text-xs uppercase tracking-[0.25em] text-emerald-400">
              Cupón Activo
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-bold">
            Promoción Vigente
          </span>
        </div>

        <div className="bg-gradient-to-b from-emerald-950/40 to-black/60 border border-emerald-500/40 p-5 rounded-sm text-center shadow-inner">
          <span className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest block mb-1.5">
            Tu código único intransferible:
          </span>
          <div className="text-3xl sm:text-4xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-white to-orange-100 tracking-widest my-2 select-all drop-shadow-[0_2px_12px_rgba(255,61,31,0.5)]">
            {claimedCode}
          </div>
          <button
            type="button"
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-zinc-200 mt-1 transition-colors rounded-sm cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{copied ? '¡Copiado al portapapeles!' : 'Copiar código'}</span>
          </button>
        </div>

        {/* Aviso Anti-Abuso y Condiciones en Pantalla */}
        <div className="bg-amber-950/30 border border-amber-500/30 rounded-sm p-3 text-left">
          <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold mb-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Reglas de Canje en Restaurante</span>
          </div>
          <ul className="text-stone-300 font-serif text-xs space-y-1 pl-1">
            <li>• La cantidad de cupones y condiciones dependen de la campaña vigente.</li>
            <li>• Presentar <strong>esta pantalla activa en vivo</strong> al ordenar (no capturas).</li>
            <li>• Válido <strong>mientras continúe activa</strong> esta promoción ({titulo}).</li>
          </ul>
        </div>

        {/* Cupos restantes y aviso a amigos/familiares */}
        <div className="bg-white/[0.03] border border-white/10 rounded-sm p-3.5 text-left space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PulseDot />
              <span className="font-mono text-[11px] uppercase tracking-wider text-orange-200 font-bold">
                {cupos_restantes > 0 
                  ? `Quedan ${cupos_restantes} de ${cupos_totales} cupones hoy` 
                  : 'Cupos de hoy agotados'}
              </span>
            </div>
            {refreshOffer ? (
              <button
                type="button"
                onClick={refreshOffer}
                title="Actualizar datos en vivo"
                className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 hover:text-orange-200 transition-colors cursor-pointer group py-0.5 px-1 rounded-sm hover:bg-white/5"
              >
                <RefreshCw className="w-2.5 h-2.5 text-[#ff3d1f] group-hover:rotate-180 transition-transform duration-500" />
                <span>{cupos_restantes > 0 ? `${Math.round(progressPercentage)}% disp.` : '0%'}</span>
              </button>
            ) : (
              <span className="text-[10px] font-mono text-zinc-400">
                {cupos_restantes > 0 ? `${Math.round(progressPercentage)}% disp.` : '0%'}
              </span>
            )}
          </div>

          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 via-[#ff3d1f] to-amber-400 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {cupos_restantes > 0 && (
            <button
              type="button"
              onClick={handleShareFriend}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#ff3d1f]/10 hover:bg-[#ff3d1f]/20 border border-[#ff3d1f]/35 text-orange-200 text-xs font-mono transition-colors rounded-sm cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#ff3d1f]" />
              <span>{sharedCopied ? '¡Enlace copiado para compartir!' : 'Avisar a amigos o familiares (Copiar link)'}</span>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2.5 pt-4">
        <a
          href={claimUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full py-4 px-6 bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-600 text-white font-display text-xs sm:text-sm font-bold uppercase tracking-[0.2em] shadow-xl shadow-emerald-900/40 hover:brightness-110 active:scale-[0.99] transition-all rounded-sm group"
        >
          <MessageCircle className="w-4 h-4 fill-white shrink-0" />
          <span>Validar en WhatsApp (Nueva Pestaña)</span>
          <ExternalLink className="w-3.5 h-3.5 text-emerald-200 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </a>
        <p className="text-center text-[10px] font-mono text-zinc-500">
          La página web permanece abierta con tu código guardado
        </p>
        {!storageAvailable && (
          <div className="p-2.5 rounded-sm bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-serif flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Activa el almacenamiento de tu navegador para conservar tu cupón en este dispositivo.</span>
          </div>
        )}
      </div>
    </div>
  );
}
