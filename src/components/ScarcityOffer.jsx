import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, 
  Ticket, 
  Flame, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Clock, 
  Copy, 
  CheckCircle2, 
  MessageCircle, 
  ExternalLink, 
  Share2, 
  Users, 
  RefreshCw,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyGysZWAkQnlxtkx01JLshZZJvr57wIvJQsfQ-_8fD9y2wB1-xiuCE0U2ynNY4aWgO0/exec';

const HEARTBEAT_TRANSITION = {
  duration: 1.1,
  repeat: Infinity,
  ease: 'easeInOut',
};

const PulseDot = () => (
  <span className="relative flex h-2.5 w-2.5 shrink-0">
    <motion.span
      className="absolute inline-flex h-full w-full rounded-full bg-[#ff3d1f]/60"
      animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
      transition={HEARTBEAT_TRANSITION}
      style={{ willChange: 'transform, opacity' }}
    />
    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff3d1f] shadow-[0_0_10px_rgba(255,61,31,0.85)]" />
  </span>
);

export default function ScarcityOffer() {
  const [offerData, setOfferData] = useState({
    titulo: '1 Vaso de Granizado',
    descripcion: 'Ven por tu vaso de granizado gratis en tu consumo',
    cupos_totales: 50,
    cupos_restantes: 20,
  });
  const [loading, setLoading] = useState(false);
  const [dataKey, setDataKey] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [claimedCode, setClaimedCode] = useState(null);
  const [couponStatus, setCouponStatus] = useState(null); // null | 'ACTIVE' | 'EXPIRED'
  const [expiredDetails, setExpiredDetails] = useState(null);
  const [claimUrl, setClaimUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const [sharedCopied, setSharedCopied] = useState(false);
  const [showPolicies, setShowPolicies] = useState(false);
  const lastClaimTimeRef = useRef(0);

  const formatEcuadorTime = (timestamp) => {
    if (!timestamp) return '';
    try {
      return new Intl.DateTimeFormat('es-EC', {
        timeZone: 'America/Guayaquil',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(new Date(timestamp));
    } catch (e) {
      return new Date(timestamp).toLocaleDateString();
    }
  };

  // El cupón es VÁLIDO mientras la campaña promocional continúe activa.
  // Caduca cuando el administrador cambia la promoción en Google Sheets.
  const evaluateCoupon = (parsed, activeTitle = '') => {
    if (!parsed || !parsed.code) return { status: null };

    const couponPromo = (parsed.promoTitulo || parsed.titulo || '').trim().toLowerCase();
    const currentPromo = (activeTitle || offerData?.titulo || '').trim().toLowerCase();

    // Si ya cargó la promo actual y difiere del cupón que tenía el usuario:
    if (couponPromo && currentPromo && couponPromo !== currentPromo) {
      return {
        status: 'EXPIRED',
        code: parsed.code,
        promoTitulo: parsed.promoTitulo || parsed.titulo || 'Promoción anterior',
        currentPromo: activeTitle || offerData?.titulo || 'Nueva promoción',
        claimedAt: parsed.claimedAt,
        reason: 'Campaña promocional concluida en Casa Barbosa',
      };
    }

    // Mientras la campaña siga siendo la misma, el cupón sigue 100% ACTIVO
    return {
      status: 'ACTIVE',
      code: parsed.code,
      promoTitulo: parsed.promoTitulo || parsed.titulo || 'Cortesía Barbosa',
      claimedAt: parsed.claimedAt,
      targetUrl: parsed.targetUrl || createWhatsAppUrl(parsed.code, parsed.promoTitulo || parsed.titulo || 'Cortesía Barbosa'),
    };
  };

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
        // DETECCIÓN DE CAMBIO DE CAMPAÑA PROMOCIONAL:
        try {
          const savedStr = localStorage.getItem('casa_barbosa_cupon_activo_v1');
          if (savedStr) {
            const saved = JSON.parse(savedStr);
            const savedTitle = (saved.promoTitulo || saved.titulo || '').trim().toLowerCase();
            const incomingTitle = (data.titulo || '').trim().toLowerCase();

            // Si el dueño cambió el título en el Excel a una nueva promo:
            if (savedTitle && incomingTitle && savedTitle !== incomingTitle) {
              console.log(`Campaña finalizada. El cupón era de "${saved.promoTitulo}" y la promo actual es "${data.titulo}".`);
              setCouponStatus('EXPIRED');
              setClaimedCode(saved.code);
              setExpiredDetails({
                code: saved.code,
                promoTitulo: saved.promoTitulo || saved.titulo,
                currentPromo: data.titulo,
                claimedAt: saved.claimedAt,
                reason: 'Campaña promocional concluida',
              });
            } else if (saved.code) {
              // La promoción sigue vigente: se mantiene activo
              setCouponStatus('ACTIVE');
              setClaimedCode(saved.code);
              setClaimUrl(saved.targetUrl || createWhatsAppUrl(saved.code, data.titulo));
            }
          }
        } catch (storageErr) {
          console.warn('Error verificando cupón guardado:', storageErr);
        }

        setOfferData(prev => {
          const newRestantes = Math.max(0, data.restantes);
          const newTotales = Math.max(1, data.totales);
          if (
            !prev || 
            prev.cupos_restantes !== newRestantes || 
            prev.cupos_totales !== newTotales ||
            prev.titulo !== data.titulo ||
            prev.descripcion !== data.descripcion
          ) {
            setDataKey(k => k + 1);
          }
          const updated = {
            titulo: data.titulo,
            descripcion: data.descripcion,
            cupos_totales: newTotales,
            cupos_restantes: newRestantes,
          };
          try {
            localStorage.setItem('casa_barbosa_offer_cache', JSON.stringify(updated));
          } catch (storageErr) {}
          return updated;
        });
      }
    } catch (error) {
      console.warn('Error visual al consultar cupón:', error.message);
      if (!offerData) {
        setOfferData({
          titulo: 'Cupón Especial Barbosa',
          descripcion: 'Cortesía exclusiva en tu consumo o pedido.',
          cupos_totales: 20,
          cupos_restantes: 9,
        });
      }
    } finally {
      if (loading) setLoading(false);
    }
  };

  // Función para generar un código único con fecha incluida (anti-duplicación)
  const generateUniqueCouponCode = () => {
    const months = ['E', 'F', 'M', 'A', 'MY', 'J', 'JL', 'AG', 'S', 'O', 'N', 'D'];
    const now = new Date();
    const day = now.getDate();
    const monthCode = months[now.getMonth()];
    const token = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `BRB-${day}${monthCode}-${token}`;
  };

  const createWhatsAppUrl = (code, promoTitle) => {
    const phone = '593984085851';
    const now = new Date();
    const dateFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const whatsappMsg = encodeURIComponent(
      `¡Hola Casa Barbosa! Vengo de la web oficial y deseo validar mi cupón:\n\n🎟️ Código Único: *${code}*\n🎁 Promoción: *${promoTitle}*\n📅 Reclamado: *${dateFormatted}* (Válido durante esta campaña)\n⚠️ Condición: 1 cupón por mesa en consumo de plato fuerte\n\n¡Por favor confirmar mi cupón para mi visita/pedido!`
    );
    return `https://wa.me/${phone}?text=${whatsappMsg}`;
  };

  // 1. Al cargar, verificar estado del cupón (Vigente o de Campaña Concluida)
  useEffect(() => {
    let currentTitle = '';
    try {
      const cachedOffer = localStorage.getItem('casa_barbosa_offer_cache');
      if (cachedOffer) {
        const parsedOffer = JSON.parse(cachedOffer);
        if (parsedOffer && parsedOffer.titulo) {
          setOfferData(parsedOffer);
          currentTitle = parsedOffer.titulo;
        }
      }
    } catch (e) {}

    try {
      const saved = localStorage.getItem('casa_barbosa_cupon_activo_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        const result = evaluateCoupon(parsed, currentTitle);
        if (result.status === 'EXPIRED') {
          setCouponStatus('EXPIRED');
          setClaimedCode(result.code);
          setExpiredDetails(result);
        } else if (result.status === 'ACTIVE') {
          setCouponStatus('ACTIVE');
          setClaimedCode(result.code);
          setClaimUrl(result.targetUrl);
        }
      }
    } catch (e) {
      console.warn('LocalStorage no disponible:', e);
    }

    fetchOfferData();
    const intervalId = setInterval(() => {
      fetchOfferData();
      // Chequear si el cupón expiró mientras la página estaba abierta
      try {
        const saved = localStorage.getItem('casa_barbosa_cupon_activo_v1');
        if (saved) {
          const parsed = JSON.parse(saved);
          const result = evaluateCoupon(parsed);
          if (result.status === 'EXPIRED' && couponStatus !== 'EXPIRED') {
            setCouponStatus('EXPIRED');
            setClaimedCode(result.code);
            setExpiredDetails(result);
          }
        }
      } catch (err) {}
    }, 10000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchOfferData();
        try {
          const saved = localStorage.getItem('casa_barbosa_cupon_activo_v1');
          if (saved) {
            const parsed = JSON.parse(saved);
            const result = evaluateCoupon(parsed);
            if (result.status === 'EXPIRED' && couponStatus !== 'EXPIRED') {
              setCouponStatus('EXPIRED');
              setClaimedCode(result.code);
              setExpiredDetails(result);
            }
          }
        } catch (err) {}
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', fetchOfferData);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', fetchOfferData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShareFriend = () => {
    const shareText = `¡Oye! En Casa Barbosa tienen cupones de cortesía activos hoy para su chancho a la Barbosa y asados al carbón. Quedan pocos cupos (1 cupón por persona). Reclama el tuyo aquí antes de que se agoten: https://casalabarbosa.com/#oportunidad`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'Casa Barbosa - Cupón de Cortesía',
        text: shareText,
        url: 'https://casalabarbosa.com/#oportunidad',
      }).catch(() => {
        // Fallback a portapapeles si cancela
      });
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setSharedCopied(true);
      setTimeout(() => setSharedCopied(false), 2500);
    }
  };

  const handleDiscardExpired = () => {
    try {
      localStorage.removeItem('casa_barbosa_cupon_activo_v1');
    } catch (e) {}
    setClaimedCode(null);
    setCouponStatus(null);
    setClaimUrl(null);
    setExpiredDetails(null);
    setDataKey(k => k + 1);
    fetchOfferData();
  };

  const handleClaim = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const now = Date.now();
    // Protección anti-spam de clics rápidos (mínimo 4s entre intentos)
    if (now - lastClaimTimeRef.current < 4000) return;
    lastClaimTimeRef.current = now;

    // Bloqueo estricto: no permitir reclamos si ya se tiene código, si está cargando o agotado
    if (claimedCode || isUpdating || (offerData && offerData.cupos_restantes <= 0)) return;

    setIsUpdating(true);

    try {
      // 1. Generar código único irrepetible con fecha de forma instantánea
      const nuevoCodigo = generateUniqueCouponCode();
      const currentTitle = offerData?.titulo || 'Cortesía de la Casa';
      const targetUrl = createWhatsAppUrl(nuevoCodigo, currentTitle);

      // 2. ABRIR EN OTRA PESTAÑA DE INMEDIATO (Síncrono en el gesto de clic para cero bloqueos de navegador)
      let newTab = null;
      try {
        newTab = window.open(targetUrl, '_blank', 'noopener,noreferrer');
      } catch (openErr) {
        console.warn('Pop-up blocker detectado, botón disponible en pantalla');
      }

      // 3. Guardar inmediatamente en localStorage con la firma de la promoción activa
      try {
        localStorage.setItem(
          'casa_barbosa_cupon_activo_v1',
          JSON.stringify({
            code: nuevoCodigo,
            promoTitulo: currentTitle,
            promoTotales: offerData?.cupos_totales || 20,
            claimedAt: now,
            targetUrl: targetUrl,
          })
        );
      } catch (e) {
        console.warn('No se pudo guardar en localStorage:', e);
      }

      // 4. Actualizar estado de la interfaz al instante
      const restantes = Math.max(0, (offerData?.cupos_restantes || 10) - 1);
      setOfferData(prev => ({ ...prev, cupos_restantes: restantes }));
      setClaimedCode(nuevoCodigo);
      setCouponStatus('ACTIVE');
      setClaimUrl(targetUrl);

      // 5. Notificar a Google Apps Script en segundo plano (con timeout de 7s para resiliencia total)
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timeoutId = setTimeout(() => {
        if (controller) controller.abort();
      }, 7000);

      fetch(`${SCRIPT_URL}?action=claim&code=${nuevoCodigo}&t=${Date.now()}`, {
        signal: controller ? controller.signal : undefined,
      })
        .then(res => res.json())
        .then(data => {
          clearTimeout(timeoutId);
          if (data && typeof data.restantes === 'number') {
            setOfferData(prev => ({ ...prev, cupos_restantes: data.restantes }));
          }
        })
        .catch(fetchErr => {
          clearTimeout(timeoutId);
          console.warn('Sincronización en segundo plano completada localmente:', fetchErr.message);
        });

    } catch (error) {
      console.error('Error al reclamar cupón:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCopyCode = () => {
    if (!claimedCode) return;
    navigator.clipboard.writeText(claimedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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
      {/* Chapter side marker for wide screens */}
      <div className="hidden xl:flex absolute top-20 sm:top-24 left-6 2xl:left-10 z-20 flex-col items-center gap-4 pointer-events-none select-none">
        <span className="inline-block text-[11px] 2xl:text-xs font-mono tracking-[0.3em] text-[#ff3d1f] uppercase [writing-mode:vertical-rl] rotate-180 drop-shadow-md">
          CAPÍTULO 02 // LA OPORTUNIDAD
        </span>
        <span className="w-px h-16 2xl:h-20 bg-gradient-to-b from-[#ff3d1f]/60 to-transparent" />
      </div>

      {/* Atmospheric ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,61,31,0.08)_0%,rgba(180,50,15,0.03)_50%,transparent_75%)] pointer-events-none blur-3xl" />
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-amber-900/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-[#ff3d1f]/40 bg-black/60 backdrop-blur-md rounded-full mb-3.5">
            <Ticket className="w-3.5 h-3.5 text-[#ff3d1f] -rotate-12" />
            <span className="font-display text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-orange-200/90 font-bold">
              Cupón Exclusivo · En Vivo
            </span>
            {!isSoldOut && <PulseDot />}
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1] font-display uppercase">
            Cortesía
            <span className="block sm:inline-block text-transparent bg-clip-text bg-gradient-to-br from-orange-300 via-[#ff3d1f] to-red-700 italic font-serif font-light tracking-tight normal-case mt-1 sm:mt-0 sm:ml-3">
              de la Casa
            </span>
          </h2>

          <p className="max-w-xl mx-auto text-zinc-400 font-serif text-sm sm:text-base leading-relaxed mt-2.5">
            Promoción activa por tiempo limitado. Reclama tu cupón antes de que se agoten las unidades de la jornada.
          </p>
        </motion.div>

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
            
            {/* MAIN TICKET SECTION (Left 7 cols on desktop) */}
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
                    <span>Válido en el consumo de platos a la carta / asados al carbón</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-serif text-amber-300 font-semibold">
                    <span className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-amber-400" strokeWidth={3} />
                    </span>
                    <span>Restricción estricta: Máximo 1 cupón de cortesía por mesa o cuenta</span>
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
                    onClick={() => setShowPolicies(!showPolicies)}
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
                            <strong className="text-zinc-200">1 Cupón por Mesa / Cuenta:</strong> Para preservar la equidad de la promoción, se admite únicamente 1 cupón de cortesía por mesa o factura de consumo, independientemente del número de personas.
                          </li>
                          <li>
                            <strong className="text-zinc-200">Consumo Mínimo Requerido:</strong> La cortesía se aplica adjunta al consumo de platos a la carta / plato fuerte. No aplica en compras exclusivas de bebidas sueltas ni guarniciones.
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

            {/* TICKET STUB / LIVE COUNTER & CLAIM ACTION (Right 5 cols on desktop) */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-black/40 relative">
              
              {/* CASO 1: CUPÓN CADUCADO (Campaña finalizada) */}
              {couponStatus === 'EXPIRED' ? (
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
                        <Clock className="w-3.5 h-3.5 text-red-400" />
                        <span>Campaña concluida: "{expiredDetails?.promoTitulo || 'Promoción anterior'}"</span>
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
              ) : couponStatus === 'ACTIVE' && claimedCode ? (
                /* CASO 2: CUPÓN ACTIVO DURANTE ESTA CAMPAÑA */
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
                        <li>• <strong>1 cupón por mesa o cuenta</strong> en consumo de plato fuerte.</li>
                        <li>• Presentar <strong>esta pantalla activa en vivo</strong> al ordenar (no capturas).</li>
                        <li>• Válido <strong>mientras continúe activa</strong> esta promoción ({titulo}).</li>
                      </ul>
                    </div>

                    {/* APARTADO VISIBLE BAJO EL CÓDIGO: Cupos restantes y aviso a amigos/familiares */}
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
                        <span className="text-[10px] font-mono text-zinc-400">
                          {cupos_restantes > 0 ? `${Math.round(progressPercentage)}% disp.` : '0%'}
                        </span>
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
                  </div>
                </div>
              ) : (
                /* Estado normal de conteo y botón de reclamo */
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
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                          Actualizado ahora
                        </span>
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
                        <button
                          type="button"
                          onClick={handleClaim}
                          disabled={isUpdating || isSoldOut}
                          className="group relative w-full py-4 sm:py-5 px-6 overflow-hidden transition-all duration-300 bg-gradient-to-r from-red-700 via-[#ff3d1f] to-orange-500 hover:brightness-110 text-white shadow-xl shadow-[#ff3d1f]/25 border border-[#ff3d1f]/70 active:scale-[0.99] cursor-pointer"
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
                        href="https://wa.me/593984085851?text=Hola%20Casa%20Barbosa!%20Quisiera%20consultar%20si%20habr%C3%A1%20nuevos%20cupones%20disponibles%20hoy."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 border border-white/20 text-xs font-mono text-zinc-300 hover:text-white hover:border-[#ff3d1f] transition-colors rounded-sm"
                      >
                        Consultar por WhatsApp
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
