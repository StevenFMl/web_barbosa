import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldAlert, Loader2, Ban, Tag } from 'lucide-react';

const GOOGLE_SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTqbnYf-m2aRL60Ud8FYxkd_EMhu6_clpXtzRug_oLquYcBWhr7MfcdN9r6whFJWOdhpALXzLRO2L5f/pub?output=csv';
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwWCQoMdryEgjN0Pv8yE0wSnaLpiaxlprudPEONmuHpcZb7Af9HGr5c7QVuapDHTUuO/exec';

export default function ScarcityOffer() {
  const [offerData, setOfferData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataKey, setDataKey] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOfferData = async () => {
    try {
      // CORRECCIÓN: Ahora el fetch apunta a GOOGLE_SHEETS_CSV_URL para leer los datos visuales
      const response = await fetch(`${GOOGLE_SHEETS_CSV_URL}&t=${new Date().getTime()}`);
      if (!response.ok) throw new Error('Error al conectar con Google Sheets CSV');

      const textData = await response.text();
      const rows = textData.split(/\r?\n/);

      if (rows.length > 1) {
        const cells = rows[1].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

        if (cells.length >= 4) {
          const totales = Math.max(1, parseInt(cells[2], 10));
          const restantes = Math.max(0, parseInt(cells[3], 10));
          const newRestantes = restantes > totales ? totales : restantes;

          setOfferData(prev => {
            if (!prev || prev.cupos_restantes !== newRestantes || prev.cupos_totales !== totales) {
              setDataKey(k => k + 1);
            }
            return {
              titulo: cells[0]?.replace(/"/g, '').trim() || 'Oferta Exclusiva',
              descripcion: cells[1]?.replace(/"/g, '').trim() || 'Aprovecha esta promoción especial.',
              cupos_totales: totales,
              cupos_restantes: newRestantes
            };
          });
          return;
        }
      }
      throw new Error('Formato de datos inválido desde el CSV');
    } catch (error) {
      console.warn('Cargando Fallback Data por error:', error.message);
      setOfferData(prev => prev || {
        titulo: 'Oferta no disponible',
        descripcion: 'Por favor intenta más tarde.',
        cupos_totales: 1,
        cupos_restantes: 0
      });
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
      // Primero disparamos la orden al Script y ESPERAMOS a que salga del navegador sin importar qué responda
      fetch(SCRIPT_URL, { 
        method: 'POST', 
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' }
      }).catch(err => console.log("Señal enviada", err));

      // Esperamos medio segundo solo por seguridad de red
      await new Promise(resolve => setTimeout(resolve, 500));

      // Luego abrimos WhatsApp
      window.open(whatsappUrl, '_blank');

      // Finalmente forzamos la recarga de datos pasada la ventana de respuesta normal
      setTimeout(() => {
        fetchOfferData();
        setIsUpdating(false);
      }, 2000);
    } catch (error) {
      console.error("Error en flujo de reclamo:", error);
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-zinc-950 py-8 flex justify-center items-center min-h-[150px]">
        <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
      </div>
    );
  }

  const { titulo, descripcion, cupos_totales, cupos_restantes } = offerData;
  const isSoldOut = cupos_restantes <= 0;

  const progressPercentage = isSoldOut ? 0 : (cupos_restantes / cupos_totales) * 100;

  const phone = '593984180801';
  const whatsappMsg = encodeURIComponent(`Hola Casa Barbosa! Vi la oferta web y quiero reclamar el cupón de: ${titulo}`);
  const whatsappUrl = `https://wa.me/${phone}?text=${whatsappMsg}`;

  return (
    <section className="w-full bg-black py-10 px-4 sm:px-6 flex justify-center items-center relative z-20 overflow-hidden border-y border-white/5 font-sans">
      <div className="absolute inset-0 bg-red-600/5 blur-[80px] rounded-full pointer-events-none w-full h-full scale-150"></div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-5xl w-full relative z-10 bg-zinc-900/60 backdrop-blur-md border border-red-500/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 shadow-xl"
      >
        {/* Left Info Group */}
        <div className="flex-1 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 text-center md:text-left">

          <div className="hidden sm:flex shrink-0 w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 items-center justify-center">
            <Tag className={`w-7 h-7 ${isSoldOut ? 'text-zinc-500' : 'text-red-500'}`} />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Star className={`w-4 h-4 ${isSoldOut ? 'text-zinc-500' : 'text-yellow-500 fill-yellow-500'}`} />
              <span className={`${isSoldOut ? 'text-zinc-500' : 'text-yellow-500'} font-bold uppercase tracking-widest text-xs`}>
                {isSoldOut ? 'Oferta Finalizada' : 'Cupón Especial'}
              </span>
            </div>

            <h2 className={`text-2xl sm:text-3xl font-black mb-2 leading-tight ${isSoldOut ? 'text-zinc-500' : 'text-stone-100'}`}>
              {isSoldOut ? 'Cupos Agotados' : titulo}
            </h2>

            <p className="text-stone-400 text-sm sm:text-base mb-0 max-w-lg leading-snug">
              {isSoldOut ? 'Mantente atento a nuestras redes sociales para la próxima promoción exclusiva.' : descripcion}
            </p>
          </div>
        </div>

        {/* Right Status & CTA Group */}
        <div className="w-full md:w-[320px] shrink-0 flex flex-col gap-4">

          <AnimatePresence mode="wait">
            {!isSoldOut ? (
              <motion.div
                key={`active-${dataKey}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full bg-zinc-950/50 border border-white/5 rounded-xl p-4 flex flex-col gap-3"
              >
                <div className="flex justify-between items-end">
                  <span className="text-stone-300 font-medium flex items-center gap-1.5 text-xs sm:text-sm">
                    <ShieldAlert className="w-4 h-4 text-red-500" />
                    Cupos Restantes
                  </span>
                  <motion.span
                    key={cupos_restantes}
                    initial={{ scale: 1.5, color: '#ef4444' }}
                    animate={{ scale: 1, color: '#f87171' }}
                    className="font-black text-xl leading-none text-red-400"
                  >
                    {cupos_restantes} <span className="text-zinc-500 text-sm font-normal">/ {cupos_totales}</span>
                  </motion.span>
                </div>

                <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full relative"
                  >
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-white/20 w-1/2 blur-[2px] -skew-x-12"
                    ></motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="soldout"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-3 text-zinc-500"
              >
                <Ban className="w-8 h-8 opacity-50 shrink-0" />
                <span className="font-bold text-sm tracking-wide leading-tight">La promoción ya no está disponible.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {!isSoldOut && (
            <motion.button
              onClick={handleClaim}
              disabled={isUpdating}
              whileHover={!isUpdating ? { scale: 1.02 } : {}}
              whileTap={!isUpdating ? { scale: 0.98 } : {}}
              className="group relative flex items-center justify-center overflow-hidden w-full py-4 text-sm sm:text-base font-black text-white bg-red-600 rounded-xl shadow-lg transition-transform disabled:opacity-75 disabled:cursor-wait"
            >
              <span className="relative z-10 tracking-wide">
                {isUpdating ? 'PROCESANDO...' : 'RECLAMAR CUPÓN'}
              </span>
              {!isUpdating && (
                <motion.div
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full"
                ></motion.div>
              )}
            </motion.button>
          )}

        </div>
      </motion.div>
    </section>
  );
}