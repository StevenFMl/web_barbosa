import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useCouponOffer } from '../hooks/useCouponOffer';
import OfferHeader from './scarcity/OfferHeader';
import TicketLeftDetails from './scarcity/TicketLeftDetails';
import ClaimActionCard from './scarcity/ClaimActionCard';
import ActiveCouponCard from './scarcity/ActiveCouponCard';
import RedeemedCouponCard from './scarcity/RedeemedCouponCard';
import ExpiredCouponCard from './scarcity/ExpiredCouponCard';

export default function ScarcityOffer() {
  const {
    offerData,
    loading,
    dataKey,
    isUpdating,
    claimedCode,
    couponStatus,
    expiredDetails,
    claimUrl,
    copied,
    sharedCopied,
    showPolicies,
    storageAvailable,
    claimError,
    claimPendingVerification,
    handleClaim,
    handleDiscardExpired,
    handleCopyCode,
    handleShareFriend,
    togglePolicies,
    resetClaimPending,
    refreshOffer,
  } = useCouponOffer();

  if (loading) {
    return (
      <section className="w-full bg-[#040504] py-16 sm:py-24 flex justify-center items-center min-h-[260px]">
        <div className="flex items-center gap-3 text-[#ff3d1f]">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            Sincronizando cupones en vivo...
          </span>
        </div>
      </section>
    );
  }

  const { titulo, descripcion, cupos_totales, cupos_restantes } = offerData;
  const isSoldOut = cupos_restantes <= 0 && !claimedCode;
  const progressPercentage = isSoldOut ? 0 : (cupos_restantes / cupos_totales) * 100;
  const paddedRestantes = String(cupos_restantes).padStart(2, '0');
  const paddedTotales = String(cupos_totales).padStart(2, '0');

  return (
    <section id="oportunidad" className="relative w-full bg-[#040504] py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-14 overflow-hidden">
      <OfferHeader isSoldOut={isSoldOut} />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* LUXURY VIP TICKET VOUCHER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full bg-gradient-to-br from-[#120806] via-[#090a09] to-[#040504] border border-[#ff3d1f]/40 rounded-sm shadow-2xl shadow-black overflow-hidden"
        >
          {/* Subtle Background Glow inside ticket */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff3d1f]/[0.04] blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-700/[0.03] blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
            {/* Lado izquierdo: Información de la campaña, beneficios y términos */}
            <TicketLeftDetails
              titulo={titulo}
              descripcion={descripcion}
              showPolicies={showPolicies}
              togglePolicies={togglePolicies}
            />

            {/* Lado derecho: Estado dinámico del cupón (Canjeado, Caducado, Activo o Formulario de Reclamo) */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-black/40 relative">
              {couponStatus === 'REDEEMED' ? (
                <RedeemedCouponCard
                  claimedCode={claimedCode}
                  cupos_restantes={cupos_restantes}
                  cupos_totales={cupos_totales}
                  progressPercentage={progressPercentage}
                  refreshOffer={refreshOffer}
                />
              ) : couponStatus === 'EXPIRED' ? (
                <ExpiredCouponCard
                  claimedCode={claimedCode}
                  expiredDetails={expiredDetails}
                  handleDiscardExpired={handleDiscardExpired}
                />
              ) : couponStatus === 'ACTIVE' && claimedCode ? (
                <ActiveCouponCard
                  claimedCode={claimedCode}
                  titulo={titulo}
                  cupos_restantes={cupos_restantes}
                  cupos_totales={cupos_totales}
                  progressPercentage={progressPercentage}
                  claimUrl={claimUrl}
                  copied={copied}
                  sharedCopied={sharedCopied}
                  storageAvailable={storageAvailable}
                  handleCopyCode={handleCopyCode}
                  handleShareFriend={handleShareFriend}
                  refreshOffer={refreshOffer}
                />
              ) : (
                <ClaimActionCard
                  dataKey={dataKey}
                  isSoldOut={isSoldOut}
                  cupos_restantes={cupos_restantes}
                  cupos_totales={cupos_totales}
                  progressPercentage={progressPercentage}
                  paddedRestantes={paddedRestantes}
                  paddedTotales={paddedTotales}
                  isUpdating={isUpdating}
                  claimPendingVerification={claimPendingVerification}
                  claimError={claimError}
                  storageAvailable={storageAvailable}
                  handleClaim={handleClaim}
                  resetClaimPending={resetClaimPending}
                  refreshOffer={refreshOffer}
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
