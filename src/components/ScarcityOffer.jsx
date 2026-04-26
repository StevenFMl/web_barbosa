import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldAlert, Loader2, Ban, Flame } from 'lucide-react';

// URL ÚNICA para todo: leer datos en tiempo real y reclamar el cupón
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyGysZWAkQnlxtkx01JLshZZJvr57wIvJQsfQ-_8fD9y2wB1-xiuCE0U2ynNY4aWgO0/exec';

// Particles for "brasas" effect (sparks/embers) - EXTREMELY OPTIMIZED
const Sparks = () => {
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    // Fewer sparks (6), much less JS animation overhead
    setSparks(Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 2,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 3, // slightly slower
      delay: Math.random() * 3,
      initialX: (Math.random() - 0.5) * 20,
      targetY: -200 - Math.random() * 150, // shorter travel distance
    })));
  }, []);

  if (sparks.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 mt-10">
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="absolute -bottom-10 rounded-full bg-orange-400"
          style={{
            width: spark.size,
            height: spark.size,
            left: spark.left,
            willChange: 'transform, opacity' // strict GPU pass
          }}
          animate={{
            y: [0, spark.targetY],
            x: [
              spark.initialX,
              spark.initialX + (Math.random() * 30 - 15),
              spark.initialX + (Math.random() * 30 - 15)
            ],
            opacity: [0, 0.6, 0] // reduced opacity for subtle effect
          }}
          transition={{
            duration: spark.duration,
            delay: spark.delay,
            repeat: Infinity,
            ease: "linear" // linear is cheaper than easeOut on JS loops
          }}
        />
      ))}
    </div>
  );
};

export default function ScarcityOffer() {
  const [offerData, setOfferData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataKey, setDataKey] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  // Cargamos la información en TIEMPO REAL directamente desde el Script
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
            cupos_restantes: Math.max(0, data.restantes)
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
          cupos_restantes: 0
        });
      }
    } finally {
      if (loading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfferData();
    // Actualiza los datos cada 30 segundos
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
        throw new Error("Google no devolvió un JSON válido al intentar reclamar.");
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
        alert("Lo sentimos, los cupones se acaban de agotar.");
        fetchOfferData();
      }
    } catch (error) {
      console.error("Error detallado en flujo de reclamo:", error);
      alert("Hubo un error al generar tu cupón único. Por favor, intenta de nuevo.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-[#040504] py-16 flex justify-center items-center min-h-[250px] will-change-transform">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}>
          <Loader2 className="w-10 h-10 text-orange-500" />
        </motion.div>
      </div>
    );
  }

  const { titulo, descripcion, cupos_totales, cupos_restantes } = offerData;
  const isSoldOut = cupos_restantes <= 0;
  const progressPercentage = isSoldOut ? 0 : (cupos_restantes / cupos_totales) * 100;

  return (
    <section className="w-full bg-[#040504] py-16 px-4 sm:px-6 flex justify-center items-center relative overflow-hidden border-y border-white/5 font-sans">
      {/* Background glow & embers */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-orange-600/5 blur-[120px] pointer-events-none rounded-full"></div>
      {!isSoldOut && <Sparks />}

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl w-full relative z-10 bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 shadow-xl overflow-hidden group will-change-transform"
      >
        <div className="flex-1 flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-7 text-center md:text-left z-10">
          <div className={`hidden sm:flex shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${isSoldOut ? 'from-zinc-800 to-zinc-900 border-zinc-700' : 'from-orange-600/20 to-red-900/40 border-orange-500/30'} border items-center justify-center shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 will-change-transform`}>
            <Flame className={`w-8 h-8 sm:w-10 sm:h-10 ${isSoldOut ? 'text-zinc-600' : 'text-orange-500'}`} />
          </div>

          <div className="flex-1 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <Star className={`w-3.5 h-3.5 ${isSoldOut ? 'text-zinc-500' : 'text-orange-400 fill-orange-400'}`} />
              <span className={`font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs font-display ${isSoldOut ? 'text-zinc-500' : 'text-orange-400'}`}>
                {isSoldOut ? 'Reserva Completada' : 'Experiencia Exclusiva'}
              </span>
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight font-display tracking-wide uppercase ${isSoldOut ? 'text-zinc-600' : 'text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-orange-200'}`}>
              {isSoldOut ? 'Cupones Agotados' : titulo}
            </h2>

            <p className={`text-base sm:text-lg max-w-lg leading-relaxed font-serif ${isSoldOut ? 'text-zinc-600' : 'text-zinc-300'}`}>
              {isSoldOut ? 'Mantente atento a nuestras redes sociales para la próxima velada exclusiva.' : descripcion}
            </p>
          </div>
        </div>

        <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-6 z-10">
          <AnimatePresence mode="wait">
            {!isSoldOut ? (
              <motion.div
                key={`active-${dataKey}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-black/60 border border-white/10 rounded-xl p-6 sm:p-7 flex flex-col gap-5 shadow-inner relative overflow-hidden will-change-transform"
              >
                {/* Reflejo superior estático */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"></div>

                <div className="flex justify-between items-end">
                  <span className="text-zinc-400 font-medium flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-display">
                    <ShieldAlert className="w-4 h-4 text-orange-500" />
                    Cupos Restantes
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-black text-4xl leading-none font-display text-orange-500 drop-shadow-sm">
                      {cupos_restantes}
                    </span>
                    <span className="text-zinc-500 text-sm font-medium font-display uppercase tracking-widest">/ {cupos_totales}</span>
                  </div>
                </div>

                <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden shadow-inner relative border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full rounded-full relative bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400"
                    style={{ willChange: "width" }}
                  >
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="soldout"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="w-full bg-black/40 border border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center gap-4 text-zinc-600 text-center will-change-transform"
              >
                <Ban className="w-12 h-12 opacity-50 shrink-0" />
                <span className="font-bold text-sm tracking-widest uppercase font-display leading-tight">La experiencia ya no está disponible.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {!isSoldOut && (
            <button
              onClick={handleClaim}
              disabled={isUpdating}
              className="group relative flex items-center justify-center overflow-hidden w-full py-4 sm:py-5 text-sm sm:text-base font-black text-black bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl shadow-[0_4px_15px_rgba(249,115,22,0.3)] hover:shadow-[0_8px_25px_rgba(249,115,22,0.5)] transition-all duration-300 disabled:opacity-75 disabled:cursor-wait font-display tracking-widest z-20 hover:scale-[1.02] active:scale-95 will-change-transform"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              <span className="relative z-10 flex items-center gap-2">
                {isUpdating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> PROCESANDO...
                  </>
                ) : 'RECLAMAR CUPÓN AHORA'}
              </span>
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}