import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  fetchCampaignFromScript, 
  claimCouponFromScript, 
  createWhatsAppUrl, 
  isLocalStorageAvailable, 
  STORAGE_KEYS 
} from '../services/couponService';

const normalizeTitle = (str) => {
  if (!str) return '';
  return String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/["'“”]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export function useCouponOffer() {
  // Inicialización inmediata y síncrona desde caché para evitar parpadeos y demoras de carga
  const [offerData, setOfferData] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(STORAGE_KEYS.OFFER_CACHE);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.titulo) return parsed;
        }
      } catch (e) {}
    }
    return {
      titulo: 'Cortesía de la Casa',
      descripcion: 'Válido en tu consumo en Casa Barbosa',
      cupos_totales: 20,
      cupos_restantes: 20,
    };
  });

  const [loading, setLoading] = useState(false);
  const [dataKey, setDataKey] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  // Inicialización de estado del cupón desde localStorage
  const [claimedCode, setClaimedCode] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_COUPON);
        if (saved) {
          const parsed = JSON.parse(saved);
          return parsed?.code || null;
        }
      } catch (e) {}
    }
    return null;
  });

  const [couponStatus, setCouponStatus] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_COUPON);
        const cachedOfferStr = localStorage.getItem(STORAGE_KEYS.OFFER_CACHE);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.code) {
            let currentTitle = '';
            if (cachedOfferStr) {
              try { currentTitle = JSON.parse(cachedOfferStr)?.titulo || ''; } catch (e) {}
            }
            const savedTitle = normalizeTitle(parsed.promoTitulo || parsed.titulo || '');
            const currentTitleNorm = normalizeTitle(currentTitle);

            // 1. Si la campaña cambió de nombre, el cupón anterior queda automáticamente caducado
            if (savedTitle && currentTitleNorm && savedTitle !== currentTitleNorm) {
              return 'EXPIRED';
            }
            // 2. Si pertenece a la misma campaña y está canjeado
            if (parsed.estado === 'CANJEADO') {
              return 'REDEEMED';
            }
            return 'ACTIVE';
          }
        }
      } catch (e) {}
    }
    return null;
  });

  const [expiredDetails, setExpiredDetails] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_COUPON);
        const cachedOfferStr = localStorage.getItem(STORAGE_KEYS.OFFER_CACHE);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.code) {
            let currentTitle = '';
            if (cachedOfferStr) {
              try { currentTitle = JSON.parse(cachedOfferStr)?.titulo || ''; } catch (e) {}
            }
            const oldTitle = parsed.promoTitulo || parsed.titulo || 'Promoción anterior';
            const savedTitle = normalizeTitle(oldTitle);
            const currentTitleNorm = normalizeTitle(currentTitle);

            // 1. Prioridad: Campaña anterior concluida
            if (savedTitle && currentTitleNorm && savedTitle !== currentTitleNorm) {
              return {
                code: parsed.code,
                promoTitulo: oldTitle,
                currentPromo: currentTitle,
                claimedAt: parsed.claimedAt,
                reason: 'Campaña promocional concluida',
                message: `El cupón era de '${oldTitle}' y la promo actual es '${currentTitle}'`,
              };
            }
            // 2. Misma campaña: Cupón ya canjeado
            if (parsed.estado === 'CANJEADO') {
              return {
                code: parsed.code,
                promoTitulo: oldTitle,
                reason: 'Cupón ya canjeado en restaurante',
                message: 'Este cupón ya fue canjeado. Si tienes dudas, consulta al personal de Casa Barbosa.',
              };
            }
          }
        }
      } catch (e) {}
    }
    return null;
  });

  const [claimUrl, setClaimUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_COUPON);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.code) {
            return parsed.targetUrl || createWhatsAppUrl(parsed.code, parsed.promoTitulo || 'Cortesía Barbosa');
          }
        }
      } catch (e) {}
    }
    return null;
  });

  const [copied, setCopied] = useState(false);
  const [sharedCopied, setSharedCopied] = useState(false);
  const [showPolicies, setShowPolicies] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [claimError, setClaimError] = useState(null);
  const [claimPendingVerification, setClaimPendingVerification] = useState(false);

  const fetchSequenceRef = useRef(0);
  const isFetchingRef = useRef(false);
  const lastFetchTimeRef = useRef(0);
  const retryTimeoutRef = useRef(null);
  const isClaimingRef = useRef(false);
  const hasLoggedNetworkErrorRef = useRef(false);

  const claimedCodeRef = useRef(claimedCode);
  useEffect(() => {
    claimedCodeRef.current = claimedCode;
  }, [claimedCode]);

  const couponStatusRef = useRef(couponStatus);
  useEffect(() => {
    couponStatusRef.current = couponStatus;
  }, [couponStatus]);

  const fetchOfferData = useCallback(async (isForced = false) => {
    // Si se está emitiendo un cupón en este instante, JAMÁS consultar en paralelo
    if (isClaimingRef.current) {
      return;
    }
    // Evitar cualquier solapamiento si ya hay una petición en curso
    if (isFetchingRef.current) {
      return;
    }
    const now = Date.now();
    // Cooldown para peticiones automáticas (mínimo 1.8s entre consultas automáticas)
    if (!isForced && now - lastFetchTimeRef.current < 1800) {
      return;
    }

    isFetchingRef.current = true;
    lastFetchTimeRef.current = now;
    const fetchId = ++fetchSequenceRef.current;

    try {
      let activeCode = claimedCodeRef.current;
      let savedCoupon = null;
      if (isLocalStorageAvailable()) {
        try {
          const savedStr = localStorage.getItem(STORAGE_KEYS.ACTIVE_COUPON);
          if (savedStr) {
            savedCoupon = JSON.parse(savedStr);
            if (savedCoupon && savedCoupon.code) {
              activeCode = savedCoupon.code;
            }
          }
        } catch (e) {}
      }

      const response = await fetchCampaignFromScript(activeCode);

      // Si una petición posterior se disparó o el usuario descartó el cupón, ignorar respuesta obsoleta
      if (fetchId !== fetchSequenceRef.current) {
        return;
      }

      // Proteger ante errores transitorios de Apps Script (404/bloqueo de Google Drive al editar Sheets)
      if (!response.ok) {
        if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = setTimeout(() => {
          fetchOfferData(false);
        }, 4500);
        return;
      }

      const textData = await response.text();
      let data;
      try {
        data = JSON.parse(textData);
      } catch (err) {
        if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = setTimeout(() => {
          fetchOfferData(false);
        }, 4500);
        return;
      }

      // Conexión exitosa confirmada: resetear reintentos y banderas de error
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
      hasLoggedNetworkErrorRef.current = false;

      // Re-verificar si el cupón sigue presente en localStorage después de la espera de red
      let freshSaved = null;
      if (isLocalStorageAvailable()) {
        try {
          const freshStr = localStorage.getItem(STORAGE_KEYS.ACTIVE_COUPON);
          if (freshStr) {
            freshSaved = JSON.parse(freshStr);
          }
        } catch (e) {}
      }

      const incomingTitle = data?.titulo ? data.titulo.trim() : '';
      const incomingTitleNorm = incomingTitle.toLowerCase();

      // Si el cupón ya no existe en localStorage ni en estado (fue descartado), asegurar limpieza completa
      if ((!freshSaved || !freshSaved.code) && !activeCode) {
        setClaimedCode(null);
        setCouponStatus(null);
        setClaimUrl(null);
        setExpiredDetails(null);

        // Limpiar bloqueo de sesión residual si no hay cupón en localStorage
        if (typeof window !== 'undefined' && window.sessionStorage) {
          try {
            sessionStorage.removeItem(STORAGE_KEYS.REDEEMED_SESSION);
            sessionStorage.removeItem(STORAGE_KEYS.CLAIM_PENDING_SESSION);
          } catch (e) {}
        }
      } else {
        const activeCouponCode = freshSaved?.code || activeCode;
        const savedTitle = (freshSaved?.promoTitulo || freshSaved?.titulo || '').trim();
        const savedTitleNorm = normalizeTitle(savedTitle);
        const incomingTitleNorm = normalizeTitle(incomingTitle);

        // 1. REGLA SUPREMA: DETECCIÓN DE CAMBIO DE CAMPAÑA PROMOCIONAL
        // Si el cupón guardado pertenecía a una campaña anterior diferente a la que está activa ahora en Google Sheets
        if (savedTitleNorm && incomingTitleNorm && savedTitleNorm !== incomingTitleNorm) {
          const oldTitle = savedTitle || 'Promoción anterior';
          const newTitle = incomingTitle || 'Nueva Promoción';
          const expiredMsg = `El cupón era de '${oldTitle}' y la promo actual es '${newTitle}'`;

          setCouponStatus(prev => {
            if (prev !== 'EXPIRED') {
              setDataKey(k => k + 1);
            }
            return 'EXPIRED';
          });
          setClaimedCode(activeCouponCode);
          setExpiredDetails({
            code: activeCouponCode,
            promoTitulo: oldTitle,
            currentPromo: newTitle,
            claimedAt: freshSaved?.claimedAt,
            reason: 'Campaña promocional concluida',
            message: expiredMsg,
          });

          // Limpiar bloqueo de sesión para permitir participar en la nueva campaña
          if (typeof window !== 'undefined' && window.sessionStorage) {
            try {
              sessionStorage.removeItem(STORAGE_KEYS.REDEEMED_SESSION);
            } catch (e) {}
          }
          if (isLocalStorageAvailable() && freshSaved) {
            try {
              freshSaved.estado = 'EXPIRED';
              localStorage.setItem(STORAGE_KEYS.ACTIVE_COUPON, JSON.stringify(freshSaved));
            } catch (storageErr) {}
          }
        } else if (
          data?.estado === 'CANJEADO' ||
          data?.status === 'CANJEADO' ||
          freshSaved?.estado === 'CANJEADO'
        ) {
          // 2. MISMA CAMPAÑA: VERIFICACIÓN DE ESTADO CANJEADO EN GOOGLE SHEETS
          setCouponStatus(prev => {
            if (prev !== 'REDEEMED') {
              setDataKey(k => k + 1);
            }
            return 'REDEEMED';
          });
          setClaimedCode(activeCouponCode);
          setExpiredDetails({
            code: activeCouponCode,
            promoTitulo: savedTitle || incomingTitle || 'Cortesía de la Casa',
            reason: 'Cupón ya canjeado en restaurante',
            message: 'Este cupón ya fue canjeado. Si tienes dudas, consulta al personal de Casa Barbosa.',
          });

          // Registrar en sessionStorage con el título de la campaña correspondiente
          if (typeof window !== 'undefined' && window.sessionStorage) {
            try {
              sessionStorage.setItem(STORAGE_KEYS.REDEEMED_SESSION, incomingTitleNorm || savedTitleNorm || 'true');
            } catch (e) {}
          }
          if (isLocalStorageAvailable()) {
            try {
              const toPersist = freshSaved || {
                code: activeCouponCode,
                promoTitulo: savedTitle || incomingTitle,
              };
              if (toPersist.estado !== 'CANJEADO') {
                toPersist.estado = 'CANJEADO';
                localStorage.setItem(STORAGE_KEYS.ACTIVE_COUPON, JSON.stringify(toPersist));
              }
            } catch (storageErr) {}
          }
        } else {
          // 3. MISMA CAMPAÑA: EL CUPÓN SIGUE ACTIVO
          if (incomingTitle !== '') {
            setCouponStatus('ACTIVE');
            setClaimedCode(activeCouponCode);
            setClaimUrl(freshSaved?.targetUrl || createWhatsAppUrl(activeCouponCode, incomingTitle));
            setExpiredDetails(null);
          }
        }
      }

      // Actualizar oferta general en pantalla (cupos restantes y totales)
      if (incomingTitle !== '') {
        setOfferData(prev => {
          const resNum = Number(data.restantes);
          const totNum = Number(data.totales);
          const newRestantes = !isNaN(resNum) ? Math.max(0, resNum) : prev.cupos_restantes;
          const newTotales = !isNaN(totNum) ? Math.max(1, totNum) : prev.cupos_totales;

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
            descripcion: data.descripcion || prev.descripcion,
            cupos_totales: newTotales,
            cupos_restantes: newRestantes,
          };
          if (isLocalStorageAvailable()) {
            try {
              localStorage.setItem(STORAGE_KEYS.OFFER_CACHE, JSON.stringify(updated));
            } catch (storageErr) {}
          }
          return updated;
        });
      }
    } catch (error) {
      if (error?.name === 'AbortError') {
        return;
      }
      if (!hasLoggedNetworkErrorRef.current) {
        console.warn('Conexión con Apps Script en espera:', error.message);
        hasLoggedNetworkErrorRef.current = true;
      }
    } finally {
      isFetchingRef.current = false;
      if (loading) setLoading(false);
    }
  }, [loading]);

  // Ciclo de vida principal: Sincronización inteligente y listeners de foco/visibilidad
  useEffect(() => {
    const hasStorage = isLocalStorageAvailable();
    setStorageAvailable(hasStorage);

    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        if (sessionStorage.getItem(STORAGE_KEYS.CLAIM_PENDING_SESSION) === 'true') {
          setClaimPendingVerification(true);
        }
      } catch (e) {}
    }

    // Polling balanceado: cada 5s si hay cupón activo para canje en tiempo real, 10s para stock general
    const pollInterval = (claimedCode && couponStatus !== 'REDEEMED') ? 5000 : 10000;
    fetchOfferData(true);
    const intervalId = setInterval(() => {
      fetchOfferData(false);
    }, pollInterval);

    // Sincronización inmediata al regresar a la pestaña o ventana del navegador (sin necesitar F5)
    const handleSync = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return;
      fetchOfferData(true);
    };

    document.addEventListener('visibilitychange', handleSync);
    window.addEventListener('focus', handleSync);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleSync);
      window.removeEventListener('focus', handleSync);
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    };
  }, [fetchOfferData, claimedCode, couponStatus]);

  const handleShareFriend = useCallback(() => {
    const shareText = `¡Oye! En Casa Barbosa tienen cupones de cortesía activos hoy para su chancho a la Barbosa y asados al carbón. Quedan pocos cupos (1 cupón por persona). Reclama el tuyo aquí antes de que se agoten: https://casalabarbosa.com/#oportunidad`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'Casa Barbosa - Cupón de Cortesía',
        text: shareText,
        url: 'https://casalabarbosa.com/#oportunidad',
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setSharedCopied(true);
      setTimeout(() => setSharedCopied(false), 2500);
    }
  }, []);

  const handleDiscardExpired = useCallback(() => {
    // Si el cupón tiene estado CANJEADO en la campaña activa, bloqueo permanente
    if (couponStatus === 'REDEEMED' || couponStatus === 'CANJEADO') {
      setClaimError('Este cupón ya fue canjeado. No puedes reclamar otro.');
      return;
    }

    // 1. Invalidar peticiones de red en curso
    fetchSequenceRef.current++;

    // 2. Limpiar de localStorage
    if (isLocalStorageAvailable()) {
      try {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_COUPON);
      } catch (e) {}
    }

    // 3. Limpiar banderas de sesión
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        sessionStorage.removeItem(STORAGE_KEYS.REDEEMED_SESSION);
        sessionStorage.removeItem(STORAGE_KEYS.CLAIM_PENDING_SESSION);
      } catch (e) {}
    }

    // 4. Limpiar estado de React
    setClaimedCode(null);
    setCouponStatus(null);
    setClaimUrl(null);
    setExpiredDetails(null);
    setClaimError(null);
    setClaimPendingVerification(false);
    isClaimingRef.current = false;
    setDataKey(k => k + 1);

    // 5. Consultar de inmediato los datos de la nueva oferta activa
    fetchOfferData(true);
  }, [couponStatus, fetchOfferData]);

  const handleClaim = useCallback(async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    // 1. Candado atómico síncrono: bloquea inmediatamente cualquier clic sucesivo
    if (isClaimingRef.current || isUpdating || claimedCode) {
      return;
    }

    // 2. Verificar estado real en localStorage
    let savedCoupon = null;
    if (isLocalStorageAvailable()) {
      try {
        const savedStr = localStorage.getItem(STORAGE_KEYS.ACTIVE_COUPON);
        if (savedStr) {
          savedCoupon = JSON.parse(savedStr);
        }
      } catch (e) {}
    }

    const currentTitleNorm = normalizeTitle(offerData?.titulo || '');
    const savedTitleNorm = normalizeTitle(savedCoupon?.promoTitulo || savedCoupon?.titulo || '');

    // Si ya existe un cupón guardado para ESTA MISMA campaña activa:
    if (savedCoupon && savedCoupon.code && savedTitleNorm && currentTitleNorm && savedTitleNorm === currentTitleNorm) {
      if (savedCoupon.estado === 'CANJEADO' || couponStatus === 'REDEEMED' || couponStatus === 'CANJEADO') {
        setCouponStatus('REDEEMED');
        setClaimedCode(savedCoupon.code);
        setClaimError('Este cupón ya fue canjeado en restaurante Casa Barbosa.');
        return;
      }
      // Cupón activo aún no canjeado para esta campaña
      setCouponStatus('ACTIVE');
      setClaimedCode(savedCoupon.code);
      return;
    }

    // Si no hay cupón válido en localStorage para la campaña activa, limpiar cualquier residuo en sessionStorage
    if (!savedCoupon || !savedCoupon.code || (savedTitleNorm && currentTitleNorm && savedTitleNorm !== currentTitleNorm)) {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        try {
          sessionStorage.removeItem(STORAGE_KEYS.REDEEMED_SESSION);
          sessionStorage.removeItem(STORAGE_KEYS.CLAIM_PENDING_SESSION);
        } catch (e) {}
      }
    }

    // 3. Verificar si los cupos están agotados
    if (offerData && typeof offerData.cupos_restantes === 'number' && offerData.cupos_restantes <= 0) {
      setClaimError('Los cupos para esta jornada se han agotado.');
      return;
    }

    // Cancelar cualquier reintento automático previo
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }

    isClaimingRef.current = true;
    setIsUpdating(true);
    setClaimError(null);

    let timeoutId = null;
    let successEmitted = false;
    const claimTime = Date.now();

    try {
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      timeoutId = setTimeout(() => {
        if (controller) controller.abort();
      }, 45000);

      const res = await claimCouponFromScript(controller ? controller.signal : undefined);

      if (!res.ok) {
        setClaimError('El sistema de cupones está experimentando alta demanda. Por favor, intenta de nuevo en unos momentos.');
        return;
      }

      const textData = await res.text();
      let data;
      try {
        data = JSON.parse(textData);
      } catch (jsonErr) {
        setClaimError('El servidor devolvió una respuesta no válida. Por favor, intenta de nuevo en unos momentos.');
        return;
      }

      // Si data.success es false o no hay código oficial:
      if (!data || data.success === false || !data.codigo) {
        if (data && typeof data.restantes === 'number' && data.restantes <= 0) {
          setOfferData(prev => ({ ...prev, cupos_restantes: 0 }));
          setClaimError(data?.error || 'Los cupos para esta jornada se han agotado.');
        } else {
          setClaimError(data?.error || 'No se pudo emitir el cupón en este momento.');
        }
        return;
      }

      // Emisión exitosa confirmada por Apps Script:
      const officialCode = data.codigo;
      const officialTitle = (data.titulo && data.titulo.trim() !== '') ? data.titulo.trim() : (offerData?.titulo || 'Cortesía de la Casa');
      const officialDesc = data.descripcion || offerData?.descripcion || '';
      const resNum = Number(data.restantes);
      const totNum = Number(data.totales);
      const newRestantes = !isNaN(resNum) ? Math.max(0, resNum) : Math.max(0, (offerData?.cupos_restantes || 10) - 1);
      const newTotales = !isNaN(totNum) ? Math.max(1, totNum) : (offerData?.cupos_totales || 20);

      const updatedOffer = {
        titulo: officialTitle,
        descripcion: officialDesc || offerData?.descripcion || '',
        cupos_totales: newTotales,
        cupos_restantes: newRestantes,
      };
      setOfferData(updatedOffer);
      setDataKey(k => k + 1);

      const targetUrl = createWhatsAppUrl(officialCode, officialTitle);

      if (isLocalStorageAvailable()) {
        try {
          localStorage.setItem(
            STORAGE_KEYS.ACTIVE_COUPON,
            JSON.stringify({
              code: officialCode,
              promoTitulo: officialTitle,
              promoTotales: newTotales,
              claimedAt: claimTime,
              targetUrl: targetUrl,
              estado: 'ACTIVO',
            })
          );
          localStorage.setItem(STORAGE_KEYS.OFFER_CACHE, JSON.stringify(updatedOffer));
        } catch (storageErr) {
          console.warn('No se pudo guardar en localStorage:', storageErr);
        }
      }

      setClaimPendingVerification(false);
      if (typeof window !== 'undefined' && window.sessionStorage) {
        try {
          sessionStorage.removeItem(STORAGE_KEYS.CLAIM_PENDING_SESSION);
        } catch (e) {}
      }

      setClaimedCode(officialCode);
      setCouponStatus('ACTIVE');
      setClaimUrl(targetUrl);
      setExpiredDetails(null);
      successEmitted = true;

      try {
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
      } catch (openErr) {
        console.warn('Pop-up blocker detectado, botón disponible en pantalla');
      }

    } catch (error) {
      console.error('Error al solicitar cupón al servidor:', error);
      if (error?.name === 'AbortError') {
        setClaimPendingVerification(true);
        if (typeof window !== 'undefined' && window.sessionStorage) {
          try {
            sessionStorage.setItem(STORAGE_KEYS.CLAIM_PENDING_SESSION, 'true');
          } catch (e) {}
        }
        setClaimError(null);
      } else {
        setClaimError('No se pudo conectar con el servidor de cupones. Por favor, inténtalo de nuevo.');
      }
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setIsUpdating(false);
      isClaimingRef.current = false;
    }
  }, [claimPendingVerification, couponStatus, isUpdating, claimedCode, offerData]);

  const handleCopyCode = useCallback(() => {
    if (!claimedCode) return;
    navigator.clipboard.writeText(claimedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [claimedCode]);

  const resetClaimPending = useCallback(() => {
    setClaimPendingVerification(false);
    setClaimError(null);
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        sessionStorage.removeItem(STORAGE_KEYS.CLAIM_PENDING_SESSION);
        sessionStorage.removeItem(STORAGE_KEYS.REDEEMED_SESSION);
      } catch (e) {}
    }
  }, []);

  const refreshOffer = () => {
    setClaimError(null);
    setClaimPendingVerification(false);
    fetchOfferData(true);
  };

  return {
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
    // Acciones
    handleClaim,
    handleDiscardExpired,
    handleCopyCode,
    handleShareFriend,
    togglePolicies: () => setShowPolicies(prev => !prev),
    resetClaimPending,
    refreshOffer,
  };
}
