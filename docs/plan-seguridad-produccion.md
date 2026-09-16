# Plan de Seguridad y Hardening en Producción
## Casa Barbosa (`https://casalabarbosa.com`)

> **Estado del Documento**: Plan Estratégico y Diagnóstico Técnico.  
> **Alcance**: No destructivo. Este documento define la hoja de ruta técnica para futuras implementaciones de seguridad de nivel empresarial sin alterar el despliegue actual ni interrumpir la operación del restaurante.

---

## 1. Inventario de Orígenes y Dependencias Externas

Para diseñar políticas de seguridad robustas (como CSP) sin bloquear funcionalidades legítimas, se identificaron los orígenes de red utilizados por la aplicación:

| Recurso / Dominio | Propósito | Directivas CSP Requeridas | Estado Actual |
| :--- | :--- | :--- | :--- |
| `'self'` | Scripts, estilos, favicons e imágenes locales (`/images/hero-bg.webp`, `/logo-barbosa.png`). | `default-src`, `img-src`, `script-src`, `style-src` | Activo |
| `fonts.googleapis.com` | Hojas de estilo de tipografías web (Cinzel, Montserrat, Playfair Display). | `style-src` | Activo |
| `fonts.gstatic.com` | Archivos binarios de fuentes woff2. | `font-src` | Activo |
| `www.google.com` | Incrustación del mapa interactivo de ubicación en Ibarra (`/maps/embed`). | `frame-src` | Activo |
| `script.google.com` | Endpoint de Google Apps Script para consulta y actualización de cupones. | `connect-src` | Activo |
| `script.googleusercontent.com` | Redirecciones HTTP 302 originadas por la ejecución del Apps Script. | `connect-src` | Activo |
| `images.unsplash.com` | Origen previo de imágenes de fondo. | `img-src` | **Innecesario**: La imagen principal fue migrada a local (`/images/hero-bg.webp`, 142KB). Puede ser retirado de las reglas de imagen para reducir la superficie de ataque. |
| `wa.me` / `api.whatsapp.com` | Redirección de enlaces externos para reservas y cupones. | Enlace de navegación externa (`<a>`) | No requiere directiva interna |

---

## 2. Estrategia de Content-Security-Policy (CSP)

### Riesgo de Bloqueo Inmediato
Aplicar una política CSP estricta en modo de bloqueo (`Content-Security-Policy`) en un sitio SSG que combina React 19, Framer Motion e islas interactivas puede causar caídas de estilos en línea (*inline styles*) o llamadas bloqueadas a Apps Script si no se prueba previamente en entorno real.

### Fase Recomendada: CSP en Modo Report-Only
Antes de imponer bloqueos, se recomienda configurar la cabecera en modo **auditoría pasiva**: `Content-Security-Policy-Report-Only`. Esto permite registrar cualquier violación en la consola del desarrollador o en un endpoint de telemetría sin romper la experiencia del cliente.

#### Directiva de Auditoría Propuesta:
```http
Content-Security-Policy-Report-Only: 
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  frame-src https://www.google.com;
  connect-src 'self' https://script.google.com https://script.googleusercontent.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
```

---

## 3. Hoja de Ruta para HTTP Strict Transport Security (HSTS)

1. **Precondición**: Confirmar que todos los subdominios y el dominio raíz operan exclusivamente bajo HTTPS con certificados SSL/TLS automáticos (gestionados por Vercel / Cloudflare).
2. **Cabecera Recomendada**:
   ```http
   Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
   ```
3. **Paso previo en Vercel**: Vercel inyecta HSTS por defecto en despliegues con dominio personalizado. Se debe verificar en herramientas como [hstspreload.org](https://hstspreload.org) antes de solicitar inclusión en la lista de precarga de los navegadores.

---

## 4. Hardening del Backend (Google Apps Script & Sheets)

Actualmente, el frontend interactúa con un endpoint de Apps Script que maneja lectura y descuento de cupos. Para entornos de alta concurrencia o prevención de manipulación masiva:

### 4.1. Concurrencia con `LockService`
Cuando múltiples comensales reclaman cupones de forma simultánea, Google Sheets puede sufrir condiciones de carrera (*race conditions*).
* **Solución técnica recomendada en el Apps Script**:
  ```javascript
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // Espera hasta 10 segundos para acceso exclusivo
    // 1. Leer cupos actuales
    // 2. Descontar cupo si es mayor a 0
    // 3. Escribir resultado
  } finally {
    lock.releaseLock();
  }
  ```

### 4.2. Registro Histórico de Cupones (*Coupon Ledger*)
En lugar de solo reducir un contador numérico, el Apps Script debería registrar cada código emitido en una hoja de historial con marca de tiempo:
* Columnas: `[Código, Fecha/Hora, Campaña, Estado (Emitido / Canjeado)]`.
* Esto permite a la administración y a caja buscar un código en segundos si se sospecha de reutilización.

---

## 5. Arquitectura Futura: Transición a Serverless API Proxy

### Situación Actual
* Astro opera en modo `output: "static"` (SSG puro).
* El navegador del cliente se comunica directamente con la URL pública de Google Apps Script.

### Beneficios de una Capa Intermedia (Serverless Functions)
Si en el futuro se incorpora un adaptador de servidor (como `@astrojs/vercel` en modo híbrido):
1. **Ocultamiento de Endpoint**: La URL del Apps Script y cualquier clave API se mantiene en variables de entorno del servidor (`process.env.APPS_SCRIPT_URL`), invisibles para el cliente.
2. **Rate Limiting Centralizado**: Limitar solicitudes por dirección IP (ej. máximo 5 consultas por minuto por cliente) para evitar sobrecargas al script de Google.
3. **Caché Inteligente en el Edge**: Almacenar en caché el estado de la oferta durante 10–15 segundos en la red perimetral de Vercel/Cloudflare, reduciendo drásticamente las ejecuciones de Google Apps Script.

---

## 6. Checklist de Implementación por Fases

- [x] **Fase 1**: Localización de recursos multimedia críticos (Hero background a WebP local).
- [x] **Fase 2**: Centralización de constantes de contacto, ubicación y horarios en `siteConfig.js`.
- [x] **Fase 3**: Detección defensiva de almacenamiento local y mensajes de experiencia de usuario.
- [x] **Fase 4**: Optimización del componente interactivo de WhatsApp para pantallas táctiles.
- [x] **Fase 5**: Documentación operativa de cupones para el personal (`docs/operacion-cupones.md`).
- [ ] **Fase 6 (Futura)**: Pruebas de cabeceras CSP en modo Report-Only en `vercel.json` o Cloudflare Rules.
- [ ] **Fase 7 (Futura)**: Implementación de `LockService` en el código de Google Apps Script.
