import { SITE_CONFIG } from '../config/siteConfig';

// Endpoint oficial de Google Apps Script (Sincronizado con Sheets de Casa Barbosa)
export const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyGysZWAkQnlxtkx01JLshZZJvr57wIvJQsfQ-_8fD9y2wB1-xiuCE0U2ynNY4aWgO0/exec';

export const STORAGE_KEYS = {
  ACTIVE_COUPON: 'casa_barbosa_cupon_activo_v1',
  OFFER_CACHE: 'casa_barbosa_offer_cache',
  REDEEMED_SESSION: 'casa_barbosa_coupon_redeemed',
  CLAIM_PENDING_SESSION: 'casa_barbosa_claim_pending',
};

/**
 * Detección defensiva de disponibilidad de localStorage (navegación privada, cuotas, restricciones).
 */
export const isLocalStorageAvailable = () => {
  if (typeof window === 'undefined') return false;
  try {
    const testKey = '__cb_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Formateo de fecha y hora para Ecuador
 */
export const formatEcuadorTime = (timestamp) => {
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

/**
 * Construye la URL oficial de validación de WhatsApp con el mensaje preformateado
 */
export const createWhatsAppUrl = (code, promoTitle) => {
  const phone = SITE_CONFIG.contact.phoneRaw;
  const now = new Date();
  const dateFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  const whatsappMsg = encodeURIComponent(
    `¡Hola Casa Barbosa! Vengo de la web oficial y deseo validar mi cupón:\n\n🎟️ Código Único: *${code}*\n🎁 Promoción: *${promoTitle}*\n📅 Reclamado: *${dateFormatted}* (Válido durante esta campaña)\n⚠️ Validez: sujeta a las condiciones visibles de la campaña activa.\n\n¡Por favor confirmar mi cupón para mi visita/pedido!`
  );
  return `https://wa.me/${phone}?text=${whatsappMsg}`;
};

/**
 * Consulta los datos de la campaña activa y opcionalmente verifica un código
 */
export const fetchCampaignFromScript = async (activeCode = null, signal = null) => {
  const url = activeCode
    ? `${SCRIPT_URL}?action=verify&codigo=${encodeURIComponent(activeCode)}&t=${Date.now()}`
    : `${SCRIPT_URL}?t=${Date.now()}`;

  let timeoutId = null;
  let effectiveSignal = signal;

  if (!effectiveSignal && typeof AbortController !== 'undefined') {
    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), 30000);
    effectiveSignal = controller.signal;
  }

  try {
    const response = await fetch(url, { signal: effectiveSignal, redirect: 'follow' });
    return response;
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
};

/**
 * Solicita la emisión de un cupón único al endpoint de Apps Script
 */
export const claimCouponFromScript = async (signal = null) => {
  const url = `${SCRIPT_URL}?action=claim&t=${Date.now()}`;
  const response = await fetch(url, { signal });
  return response;
};
