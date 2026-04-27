import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Ticket } from 'lucide-react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyGysZWAkQnlxtkx01JLshZZJvr57wIvJQsfQ-_8fD9y2wB1-xiuCE0U2ynNY4aWgO0/exec';

const HEARTBEAT_TRANSITION = {
  duration: 1.1,
  repeat: Infinity,
  ease: 'easeInOut',
};

const PulseDot = () => (
  <span className="relative flex h-2 w-2 shrink-0">
    <motion.span
      className="absolute inline-flex h-full w-full rounded-full bg-[#ff3d1f]/50"
      animate={{ scale: [1, 2.2, 1], opacity: [0.55, 0, 0.55] }}
      transition={HEARTBEAT_TRANSITION}
      style={{ willChange: 'transform, opacity' }}
    />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff3d1f] shadow-[0_0_8px_rgba(255,61,31,0.65)]" />
  </span>
);

export default function ScarcityOffer() {
  const [offerData, setOfferData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataKey, setDataKey] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOfferData = async () => {
    try {
      const response = await fetch(`${SCRIPT_URL}?t=${new Date().getTime()}`);
      const textData = await response.text();

      let data;
      try {
        data = JSON.parse(textData);
      } catch (err) {
        throw new Error('El script no devolvió un formato válido.');
      }

      if (data && data.titulo) {
        setOfferData(prev => {
          if (!prev || prev.cupos_restantes !== data.restantes || prev.cupos_totales !== data.totales) {
            setDataKey(k => k + 1);
          }
          return {
            titulo: data.titulo,
            descripcion: data.descripcion,
            cupos_totales: Math.max(1, data.totales),
            cupos_restantes: Math.max(0, data.restantes),
          };
        });
      }
    } catch (error) {
      console.warn('Error visual:', error.message);
      if (!offerData) {
        setOfferData({
          titulo: 'Mesa Premium',
          descripcion: 'Por favor intenta más tarde.',
          cupos_totales: 1,
          cupos_restantes: 0,
        });
      }
    } finally {
      if (loading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfferData();
    const intervalId = setInterval(fetchOfferData, 30000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClaim = async (e) => {
    e.preventDefault();
    if (offerData.cupos_restantes <= 0 || isUpdating) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`${SCRIPT_URL}?action=claim&t=${new Date().getTime()}`);
      const textResponse = await response.text();

      let result;
      try {
        result = JSON.parse(textResponse);
      } catch (err) {
        throw new Error('Google no devolvió un JSON válido al intentar reclamar.');
      }

      if (result.success) {
        const phone = '593984180801';
        const codigo = result.codigo;

        const whatsappMsg = encodeURIComponent(
          `¡Hola Casa Barbosa! Vengo de la web y quiero reservar la promoción de: ${offerData.titulo}.\n\n🎟️ Mi código único de cupón es: *${codigo}*`
        );
        const whatsappUrl = `https://wa.me/${phone}?text=${whatsappMsg}`;

        setOfferData(prev => ({ ...prev, cupos_restantes: result.restantes }));
        window.open(whatsappUrl, '_blank');
      } else {
        alert('Lo sentimos, los cupones se acaban de agotar.');
        fetchOfferData();
      }
    } catch (error) {
      console.error('Error detallado en flujo de reclamo:', error);
      alert('Hubo un error al generar tu cupón único. Por favor, intenta de nuevo.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <section className="w-full bg-[#040504] py-16 sm:py-20 flex justify-center items-center min-h-[240px]">
        <Loader2 className="w-6 h-6 text-[#ff3d1f]/70 animate-spin" />
      </section>
    );
  }

  const { titulo, descripcion, cupos_totales, cupos_restantes } = offerData;
  const isSoldOut = cupos_restantes <= 0;
  const progressPercentage = isSoldOut ? 0 : (cupos_restantes / cupos_totales) * 100;
  const paddedRestantes = String(cupos_restantes).padStart(2, '0');
  const paddedTotales = String(cupos_totales).padStart(2, '0');

  return (
    <section className="relative w-full bg-[#040504] py-16 sm:py-20 px-6 sm:px-10 lg:px-14 flex justify-center items-center overflow-hidden">
      <div className="absolute top-8 left-4 sm:top-12 sm:left-8 z-40 pointer-events-none">
        <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#ff3d1f] uppercase [writing-mode:vertical-rl] rotate-180 drop-shadow-md">
          CAPÍTULO 02 // LA OPORTUNIDAD
        </span>
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 55%, rgba(160, 50, 18, 0.12) 0%, rgba(90, 25, 8, 0.05) 40%, transparent 72%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 28% 22% at 50% 60%, rgba(255, 61, 31, 0.07) 0%, transparent 65%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="relative z-10 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center"
      >
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-2.5 mb-7">
            <Ticket className="w-3.5 h-3.5 text-[#ff3d1f] -rotate-12" strokeWidth={2} />
            <span className="font-display text-[10px] sm:text-[11px] uppercase tracking-widest text-[#ff3d1f]/90">
              Cupón de reserva
            </span>
            {!isSoldOut && (
              <span className="ml-1">
                <PulseDot />
              </span>
            )}
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl leading-[1.1] tracking-tight text-white mb-6 uppercase">
            {titulo}
          </h2>

          <p className="font-serif text-lg text-stone-300 leading-relaxed max-w-md">
            {descripcion}
          </p>
        </div>

        <div className="w-full flex flex-col gap-7">
          <AnimatePresence mode="wait">
            {!isSoldOut ? (
              <motion.div
                key={`active-${dataKey}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-5"
              >
                <div className="flex items-center justify-between font-display text-[10px] uppercase tracking-[0.3em] text-stone-100/40">
                  <span>Mesas&nbsp;libres</span>
                  <span className="text-stone-100/30">en&nbsp;vivo</span>
                </div>

                <div className="flex items-baseline gap-3 border-b border-white/[0.06] pb-5">
                  <motion.span
                    key={paddedRestantes}
                    animate={{ scale: [1, 1.025, 1], opacity: [0.92, 1, 0.92] }}
                    transition={HEARTBEAT_TRANSITION}
                    className="font-mono font-light text-5xl sm:text-6xl lg:text-7xl text-stone-100 tabular-nums leading-none tracking-tighter origin-left"
                    style={{
                      textShadow: '0 0 22px rgba(255, 61, 31, 0.28)',
                      willChange: 'transform, opacity',
                    }}
                  >
                    {paddedRestantes}
                  </motion.span>
                  <span className="font-mono text-stone-100/30 text-2xl sm:text-3xl tabular-nums">
                    /&nbsp;{paddedTotales}
                  </span>
                </div>

                <div className="w-full h-[2px] bg-white/[0.06] overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="h-full bg-gradient-to-r from-red-700/80 via-[#ff3d1f] to-orange-300/80"
                    style={{ willChange: 'width' }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="soldout"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center justify-center px-6 py-10 border border-stone-100/15 bg-gradient-to-b from-stone-100/[0.02] to-transparent"
              >
                <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#ff3d1f]/45" />
                <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#ff3d1f]/45" />
                <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#ff3d1f]/45" />
                <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#ff3d1f]/45" />

                <span className="font-display text-[10px] uppercase tracking-[0.4em] text-stone-100/35 mb-3">
                  Estado
                </span>
                <span className="font-display font-black text-2xl sm:text-3xl uppercase tracking-[0.18em] text-stone-100/85">
                  Velada&nbsp;llena
                </span>
                <div className="w-10 h-px bg-[#ff3d1f]/40 mt-4" />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={handleClaim}
            disabled={isUpdating || isSoldOut}
            className={`group relative w-full py-5 overflow-hidden border transition-all duration-500 ${
              isSoldOut
                ? 'border-stone-100/10 bg-black/40 cursor-not-allowed'
                : 'border-[#ff3d1f]/35 hover:border-[#ff3d1f]/80 bg-gradient-to-b from-[#1a0805]/40 to-black/40 hover:from-[#260a06]/55 hover:to-black/40 disabled:opacity-60 disabled:cursor-wait'
            }`}
          >
            {!isSoldOut && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(255, 61, 31, 0.18) 0%, transparent 70%)',
                }}
              />
            )}
            <span
              className={`relative z-10 flex items-center justify-center gap-3 font-display text-[11px] sm:text-xs uppercase tracking-[0.4em] ${
                isSoldOut ? 'text-stone-100/30' : 'text-stone-100'
              }`}
            >
              {isSoldOut ? (
                'Reserva no disponible'
              ) : isUpdating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Asegurando tu mesa
                </>
              ) : (
                <>
                  Quiero&nbsp;mi&nbsp;mesa
                  <span className="text-[#ff3d1f] group-hover:translate-x-1 transition-transform duration-500">
                    →
                  </span>
                </>
              )}
            </span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
