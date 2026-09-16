import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Loader2, 
  AlertTriangle, 
  MessageCircle, 
  ExternalLink, 
  RefreshCw 
} from 'lucide-react';
import PulseDot, { HEARTBEAT_TRANSITION } from './PulseDot';
import { getWhatsAppUrl } from '../../config/siteConfig';

export default function ClaimActionCard({
  dataKey,
  isSoldOut,
  cupos_restantes,
  cupos_totales,
  progressPercentage,
  paddedRestantes,
  paddedTotales,
  isUpdating,
  claimPendingVerification,
  claimError,
  storageAvailable,
  handleClaim,
  resetClaimPending,
  refreshOffer
}) {
  return (
    <AnimatePresence mode="wait">
      {!isSoldOut ? (
        <motion.div
          key={`active-${dataKey}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-6"
        >
          {/* Live indicator header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PulseDot />
              <span className="font-display font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#ff3d1f]">
                En Vivo
              </span>
            </div>
            {refreshOffer ? (
              <button
                type="button"
                onClick={refreshOffer}
                title="Actualizar datos en vivo"
                className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-orange-200 transition-colors cursor-pointer group py-0.5 px-1 rounded-sm hover:bg-white/5"
              >
                <RefreshCw className="w-2.5 h-2.5 text-[#ff3d1f] group-hover:rotate-180 transition-transform duration-500" />
                <span>Actualizar ahora</span>
              </button>
            ) : (
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                Actualizado ahora
              </span>
            )}
          </div>

          {/* Big Numbers Display */}
          <div className="bg-white/[0.02] border border-white/10 p-5 rounded-sm">
            <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em] block mb-2">
              Cupones disponibles:
            </span>
            <div className="flex items-baseline gap-3">
              <motion.span
                key={paddedRestantes}
                animate={{ scale: [1, 1.03, 1], opacity: [0.95, 1, 0.95] }}
                transition={HEARTBEAT_TRANSITION}
                className="font-mono font-black text-6xl sm:text-7xl lg:text-8xl text-stone-100 tabular-nums leading-none tracking-tighter"
                style={{
                  textShadow: '0 0 25px rgba(255, 61, 31, 0.35)',
                  willChange: 'transform, opacity',
                }}
              >
                {paddedRestantes}
              </motion.span>
              <div className="flex flex-col">
                <span className="font-mono text-zinc-500 text-2xl sm:text-3xl tabular-nums leading-none">
                  / {paddedTotales}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff3d1f] mt-1">
                  cupones restantes
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full h-2 bg-white/10 overflow-hidden relative rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  className="h-full bg-gradient-to-r from-red-700 via-[#ff3d1f] to-amber-400"
                  style={{ willChange: 'width' }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-zinc-400 mt-1.5">
                <span>{cupos_restantes} restantes</span>
                <span>{Math.round(progressPercentage)}% disponible</span>
              </div>
            </div>
          </div>

          {/* Expiration Note */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-amber-200/80 bg-amber-900/10 border border-amber-600/20 px-3 py-2">
            <Clock className="w-3.5 h-3.5 text-[#ff3d1f] shrink-0" />
            <span>Cupones limitados válidos para hoy</span>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            {claimPendingVerification ? (
              <div className="space-y-3">
                <div className="p-4 rounded-sm bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-serif space-y-2 text-left shadow-inner">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-bold">
                    <Clock className="w-4 h-4 animate-pulse shrink-0" />
                    <span>Verificación en curso</span>
                  </div>
                  <p className="leading-relaxed">
                    Estamos verificando la emisión de tu cupón. No presiones nuevamente; revisa el WhatsApp oficial o consulta al personal de Casa Barbosa.
                  </p>
                </div>

                <a
                  href={getWhatsAppUrl('¡Hola Casa Barbosa! Solicité un cupón en la web oficial y deseo consultar el estado de emisión.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-4 px-6 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-display text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold transition-all rounded-sm cursor-pointer active:scale-[0.99] group"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Consultar por WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </a>

                <button
                  type="button"
                  onClick={resetClaimPending}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white font-display text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#ff3d1f]" />
                  <span>Volver a intentar solicitar cupón</span>
                </button>

                <p className="text-center text-[10px] font-mono text-zinc-500">
                  Si hubo una intermitencia de red, puedes reintentar solicitar tu cupón
                </p>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleClaim}
                  disabled={isUpdating || isSoldOut || claimPendingVerification}
                  className="group relative w-full py-4 sm:py-5 px-6 overflow-hidden transition-all duration-300 bg-gradient-to-r from-red-700 via-[#ff3d1f] to-orange-500 hover:brightness-110 text-white shadow-xl shadow-[#ff3d1f]/25 border border-[#ff3d1f]/70 active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 pointer-events-none" />
                  <span className="relative z-10 flex items-center justify-center gap-2.5 font-display text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">
                    {isUpdating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Asegurando tu cupón...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 fill-white shrink-0" />
                        <span>Obtener mi cupón en WhatsApp</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                      </>
                    )}
                  </span>
                </button>

                <p className="text-center text-[10px] font-mono text-zinc-500 mt-2.5">
                  Genera tu código único al instante y abre WhatsApp en una nueva pestaña
                </p>
                {claimError && (
                  <div className="mt-3 p-3 rounded-sm bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-serif flex items-center gap-2 text-left">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{claimError}</span>
                  </div>
                )}
              </>
            )}
            {!storageAvailable && (
              <div className="mt-3 p-2.5 rounded-sm bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-serif flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Activa el almacenamiento de tu navegador para conservar tu cupón en este dispositivo.</span>
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        /* Sold out state con aviso de sincronización en tiempo real */
        <motion.div
          key="soldout"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-8 px-4 text-center border border-white/10 bg-white/[0.02]"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-500/30 rounded-full mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-red-300 font-bold">
              Cupos Agotados por Hoy
            </span>
          </div>

          <h4 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-2">
            Se terminaron los cupos
          </h4>

          <p className="text-zinc-400 font-serif text-sm max-w-sm mb-4 leading-relaxed">
            Todos los cupones para esta jornada han sido reclamados. Si nuestro equipo habilita nuevos cupos, esta sección se actualizará automáticamente en vivo.
          </p>

          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 mb-5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <RefreshCw className="w-3 h-3 text-[#ff3d1f] animate-spin" style={{ animationDuration: '4s' }} />
            <span>Sincronizando en vivo cada 15s</span>
          </div>

          <a
            href={getWhatsAppUrl('Hola Casa Barbosa! Quisiera consultar si habrá nuevos cupones disponibles hoy.')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-white/20 text-xs font-mono text-zinc-300 hover:text-white hover:border-[#ff3d1f] transition-colors rounded-sm"
          >
            Consultar por WhatsApp
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
