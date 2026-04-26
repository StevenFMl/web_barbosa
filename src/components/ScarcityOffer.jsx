import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Ban } from 'lucide-react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyGysZWAkQnlxtkx01JLshZZJvr57wIvJQsfQ-_8fD9y2wB1-xiuCE0U2ynNY4aWgO0/exec';

// Brasas mínimas: pocas partículas, ámbar tenue, movimiento lento
const Embers = () => {
  const [embers, setEmbers] = useState([]);

  useEffect(() => {
    setEmbers(Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1.5,
      left: `${15 + Math.random() * 70}%`,
      duration: Math.random() * 4 + 5,
      delay: Math.random() * 4,
      drift: (Math.random() - 0.5) * 25,
    })));
  }, []);

  if (embers.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          className="absolute -bottom-4 rounded-full bg-amber-500/60"
          style={{
            width: ember.size,
            height: ember.size,
            left: ember.left,
            filter: 'blur(0.5px)',
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -180],
            x: [0, ember.drift],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: ember.duration,
            delay: ember.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

// Indicador de pulso intermitente (ping suave) — color brasa
const PulseDot = () => (
  <span className="relative flex h-2 w-2 shrink-0">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500/70 opacity-75" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
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
      <div className="w-full bg-[#070707] py-20 flex justify-center items-center min-h-[300px]">
        <Loader2 className="w-6 h-6 text-amber-500/70 animate-spin" />
      </div>
    );
  }

  const { titulo, descripcion, cupos_totales, cupos_restantes } = offerData;
  const isSoldOut = cupos_restantes <= 0;
  const progressPercentage = isSoldOut ? 0 : (cupos_restantes / cupos_totales) * 100;
  const paddedRestantes = String(cupos_restantes).padStart(2, '0');
  const paddedTotales = String(cupos_totales).padStart(2, '0');

  return (
    <section className="relative w-full bg-[#070707] py-20 sm:py-28 px-4 sm:px-6 flex justify-center items-center overflow-hidden border-y border-white/[0.04]">
      {/* Resplandor radial de brasas — capa cálida oscura */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(180, 60, 20, 0.18) 0%, rgba(120, 30, 10, 0.08) 35%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 30% 25% at 50% 60%, rgba(251, 146, 60, 0.10) 0%, transparent 60%)',
        }}
      />

      {/* Brasas suspendidas */}
      {!isSoldOut && <Embers />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-center"
      >
        {/* Columna izquierda — mensaje */}
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-3 mb-8">
            {!isSoldOut && <PulseDot />}
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-amber-200/70">
              {isSoldOut ? '// Reserva completada' : '// Disponibilidad limitada'}
            </span>
          </div>

          <h2 className="font-sans font-extralight text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-white/95 mb-6">
            {isSoldOut ? (
              <span className="text-zinc-500">Cupones agotados</span>
            ) : (
              <>
                {titulo}
                <span className="block mt-2 text-amber-200/40 font-extralight italic text-2xl sm:text-3xl lg:text-4xl">
                  para esta velada.
                </span>
              </>
            )}
          </h2>

          <p className="font-sans font-light text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md">
            {isSoldOut
              ? 'Mantente atento a nuestras redes sociales para la próxima velada exclusiva.'
              : descripcion}
          </p>
        </div>

        {/* Columna derecha — datos técnicos + acción */}
        <div className="w-full flex flex-col gap-8">
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
                {/* Etiqueta técnica */}
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                  <span>Mesas&nbsp;disponibles</span>
                  <span className="text-zinc-600">en&nbsp;tiempo&nbsp;real</span>
                </div>

                {/* Contador monoespaciado masivo */}
                <div className="flex items-baseline gap-3 border-b border-white/[0.06] pb-5">
                  <motion.span
                    key={paddedRestantes}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: [0.4, 1, 0.92, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="font-mono font-light text-6xl sm:text-7xl text-amber-100 tabular-nums leading-none tracking-tighter"
                    style={{ textShadow: '0 0 24px rgba(251, 191, 36, 0.25)' }}
                  >
                    {paddedRestantes}
                  </motion.span>
                  <span className="font-mono text-zinc-600 text-2xl sm:text-3xl tabular-nums">
                    /&nbsp;{paddedTotales}
                  </span>
                </div>

                {/* Barra de progreso fina y técnica */}
                <div className="w-full h-[2px] bg-white/[0.06] overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-300"
                    style={{ willChange: 'width' }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="soldout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-4 border border-zinc-800/60 px-6 py-8 text-zinc-500"
              >
                <Ban className="w-5 h-5 opacity-60 shrink-0" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em]">
                  Experiencia&nbsp;no&nbsp;disponible
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {!isSoldOut && (
            <button
              onClick={handleClaim}
              disabled={isUpdating}
              className="group relative w-full py-5 overflow-hidden border border-amber-500/30 hover:border-amber-400/70 bg-gradient-to-b from-amber-950/20 to-black/40 hover:from-amber-900/30 hover:to-amber-950/40 transition-all duration-500 disabled:opacity-60 disabled:cursor-wait"
            >
              {/* Resplandor interior */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(251, 191, 36, 0.15) 0%, transparent 70%)',
                }}
              />
              <span className="relative z-10 flex items-center justify-center gap-3 font-mono text-[11px] sm:text-xs uppercase tracking-[0.4em] text-amber-100">
                {isUpdating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Procesando
                  </>
                ) : (
                  <>
                    Reclamar&nbsp;cupón
                    <span className="text-amber-400/60 group-hover:translate-x-1 transition-transform duration-500">→</span>
                  </>
                )}
              </span>
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
