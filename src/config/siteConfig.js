/**
 * Configuración centralizada del sitio Casa Barbosa
 * Todas las constantes comerciales y enlaces se definen en este archivo
 * para facilitar el mantenimiento sin duplicar datos en componentes.
 */

export const SITE_CONFIG = {
  name: 'Casa Barbosa',
  fullName: 'Casa Barbosa | Steakhouse & Chancho a la Barbosa',
  domain: 'https://casalabarbosa.com',
  location: {
    city: 'Ibarra',
    province: 'Imbabura',
    country: 'Ecuador',
    sector: 'El Olivo',
    address: 'Panamericana Norte E35 1 C3 y Luis Fernando Madera, sector El Olivo',
    coordinates: {
      lat: 0.3617300704558116,
      lng: -78.11191105673959,
    },
    googleMapsDirUrl: 'https://www.google.com/maps/dir/?api=1&destination=0.3617300704558116,-78.11191105673959',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d498.71735074616873!2d-78.11191105673959!3d0.3617300704558116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2a3d8443549e5f%3A0x44b531f91e465e6f!2sChancho%20a%20la%20Barbosa!5e0!3m2!1ses!2sec!4v1780275616896!5m2!1ses!2sec',
  },
  contact: {
    phoneRaw: '593984085851',
    phoneFormatted: '+593 984 085 851',
    phoneDisplay: '+593 984085851',
    phoneLocal: '098 408 5851',
    email: 'contacto@casalabarbosa.com',
  },
  social: {
    instagram: 'https://www.instagram.com/casalabarbosa/',
    facebook: 'https://www.facebook.com/chanchobarbosaibarra',
    tiktok: 'https://www.tiktok.com/@casaalabarbosa',
    whatsapp: 'https://wa.me/593984085851',
  },
  hours: {
    regular: '11:00 – 23:00',
    schedule: 'Lunes a Domingo: 11:00 AM – 11:00 PM',
    openHour: 11,
    closeHour: 23,
    timezone: 'America/Guayaquil',
  },
};

/**
 * Generador de enlaces de WhatsApp con mensajes predefinidos
 */
export const getWhatsAppUrl = (customText = '') => {
  if (!customText) {
    return `https://wa.me/${SITE_CONFIG.contact.phoneRaw}`;
  }
  return `https://wa.me/${SITE_CONFIG.contact.phoneRaw}?text=${encodeURIComponent(customText)}`;
};
