# Manual de Operación y Validación de Cupones
## Casa Barbosa — Restaurante & Steakhouse (El Olivo, Ibarra)

Este documento es una guía operativa y práctica para el equipo de servicio (meseros), cajeros y administración. Establece los criterios para la verificación, atención y redención manual de los cupones promocionales emitidos desde el sitio web oficial [casalabarbosa.com](https://casalabarbosa.com).

---

## 1. Criterios Operativos en Salón y Caja

El equipo de atención debe aplicar los siguientes criterios durante la recepción de comensales:

### Regla 1: Cantidad de cupones según la campaña vigente
* La cantidad de cupones admitidos **no es fija**; depende exclusivamente de las condiciones de la promoción activa configurada por la administración.
* Cada campaña promocional publicada debe especificar con claridad si autoriza:
  - **Un (1) cupón por persona**;
  - **Un (1) cupón por cuenta / factura**; o
  - **Varios cupones por familia o mesa** (por ejemplo, si una promoción entrega una cortesía individual y varios integrantes de una misma familia disponen de códigos válidos, la campaña puede autorizar la redención de múltiples cupones).
* Si una campaña no define una restricción expresa de grupo, se aplican los términos detallados en la oferta activa de la web.

### Regla 2: Consumo mínimo según la campaña activa
* La exigencia de consumo mínimo (por ejemplo, compra de plato fuerte o consumo general) **depende de cada campaña**.
* No todas las promociones exigen obligatoriamente plato fuerte; algunas campañas especiales pueden ser de cortesía directa o asociadas a montos específicos, según lo publicado por la administración.
* El personal debe verificar si la oferta activa contempla productos incluidos o excluidos (ej. no acumulable con bebidas sueltas, o exclusivo en salón).

### Regla 3: Validación obligatoria en pantalla en vivo
* **Permitido**: El comensal debe mostrar la página web [casalabarbosa.com](https://casalabarbosa.com) abierta en el navegador de su teléfono al momento de ordenar, con el estado verde **"Cupón Activo"** y su código único visible (ej. `BRB-16S-XXXX`).
* **Prohibido**: No se aceptan capturas de pantalla (*screenshots*), fotografías tomadas a pantallas de otros teléfonos, impresiones en papel ni mensajes reenviados.

### Regla 4: Vigencia sujeta a la campaña activa
* Cada cupón emitido permanece activo mientras la campaña promocional correspondiente siga vigente en el restaurante y en la web.
* Cuando la administración concluye la campaña en el sistema o la sustituye por una nueva oferta, los cupones de la campaña concluida caducan de forma automática, mostrándose en pantalla con el estado rojo "Campaña Concluida".

---

## 2. Flujo de Validación y Redención en Salón

Actualmente el restaurante opera con un **proceso de recepción y registro manual**. WhatsApp actúa como un canal ágil de recepción y comunicación directa entre el comensal y el restaurante, por lo que el personal debe seguir este paso a paso:

```
[Cliente muestra web en vivo] ──> [Revisar condiciones de campaña] ──> [Verificar mensaje en WhatsApp oficial] ──> [Anotar en Registro Manual] ──> [Marcar como CANJEADO]
```

### Paso 1: Verificación en pantalla en vivo
* El mesero solicita amablemente ver la pantalla del teléfono del comensal en [casalabarbosa.com](https://casalabarbosa.com).
* Comprueba que la tarjeta indique **"Cupón Activo"** y coincida con la promoción vigente.

### Paso 2: Revisión de condiciones de la campaña
* Confirma si la campaña permite 1 cupón por mesa, varios por familia o si requiere consumo mínimo de plato fuerte.

### Paso 3: Confirmación en el WhatsApp oficial (+593 984 085 851)
* El cliente presiona en su web el botón que envía el código preformateado al chat de WhatsApp oficial de Casa Barbosa.
* El personal de recepción/caja confirma que el mensaje con dicho código único haya ingresado al chat del restaurante.
* *Nota operativa*: WhatsApp es una herramienta de soporte y registro operativo; actualmente no existe un panel automático de canje en línea, por lo que la confirmación depende del registro del personal.

### Paso 4: Registro manual y marcado como CANJEADO
* Cada cupón aplicado debe registrarse de inmediato en la hoja de control físico o digital de caja, asentando el código y marcando el estado **CANJEADO**.
* Se informa a cocina/comanda la cortesía autorizada.

---

## 3. Registro Manual Temporal

Dado que el restaurante no dispone aún de un sistema de canje automatizado, cada cupón canjeado debe asentarse en el siguiente formato diario:

| Fecha / Hora | Código | Campaña | Mesa / Cuenta | Beneficio | Estado | Responsable | Observación |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `16/09 13:40` | `BRB-16S-A82F` | Vaso de Granizado | Mesa 4 | 1 Granizado cortesía | **CANJEADO** | Carlos M. | Familia de 4 (2 cupones autorizados) |
| `16/09 14:15` | `BRB-16S-K91B` | Vaso de Granizado | Mesa 7 | 1 Granizado cortesía | **CANJEADO** | Andrea P. | Con consumo de parrillada |
| `16/09 15:00` | `BRB-16S-X34T` | Vaso de Granizado | Barra 2 | 1 Granizado cortesía | **CANJEADO** | Carlos M. | Cuenta individual |

> **Regla de Caja**: Antes de validar un código, el cajero o salonero revisa rápidamente si dicho código ya fue anotado previamente en la jornada para evitar duplicidad de canje.

---

## 4. Gestión de Campañas en Google Sheets

La administración gestiona las promociones en tiempo real a través de la hoja de cálculo vinculada a la web:

| Parámetro | Propósito Operativo | Efecto en la Web |
| :--- | :--- | :--- |
| **Título** | Nombre de la oferta activa (ej. `1 Vaso de Granizado`) | Al cambiar este texto, **todos los cupones de la oferta anterior se invalidan automáticamente**. |
| **Descripción** | Alcance y condiciones breves de la oferta | Se muestra en el banner principal del cupón. |
| **Cupos Totales** | Techo de cupones habilitados para la jornada | Fija la meta visual de la barra de progreso. |
| **Cupos Restantes** | Cupones aún disponibles para reclamar | Al llegar a 0, la web muestra "Cupos Agotados por Hoy". |

### Cómo cerrar o renovar una promoción
1. Acceda a la hoja de control de la administración.
2. Para **finalizar la campaña actual**: modifique el título de la oferta (por ejemplo, escriba `Campaña Concluida` o ingrese el nuevo nombre, ej. `Postre de la Casa`).
3. Los clientes que guardaban el cupón anterior verán su pantalla en rojo indicando que la campaña concluyó.
4. Para **habilitar nuevos cupos diarios**: incremente el número en la casilla de cupos restantes.

---

## 5. Protocolo de Atención y Trato Cordial

### Caso A: Comensales con múltiples cupones válidos
* Si la campaña vigente admite cupones por persona o varios por familia, valide con agrado los códigos presentados en pantalla viva y anótelos en el registro manual.
* Si la campaña activa especifica un límite por cuenta, explíquelo amablemente:
  > *"Con mucho gusto. Para esta promoción en particular, la condición fijada es de un beneficio por cuenta. No obstante, permítanos consultar si podemos aplicar una cortesía adicional según la disponibilidad de cocina."*

### Caso B: Cliente con cupón caducado ("Campaña Concluida")
* Trato cordial, empático y profesional:
  > *"Estimado/a cliente, con gusto le atendemos. Veo que este cupón corresponde a una campaña que ya finalizó en nuestro sistema. Permítame revisar si en este momento tenemos una nueva promoción activa para que pueda generar su beneficio de hoy."*
* Indíquele cómo presionar el botón **"Descartar y ver nueva promoción"** para revisar la oferta vigente.

### Caso C: Presentación de capturas de pantalla o mensajes reenviados
* Explique con respeto la política de servicio:
  > *"Por políticas operativas de Casa Barbosa, requerimos verificar el cupón en vivo directamente en la página web abierta en su teléfono. Si no cuenta con datos móviles, con gusto le compartimos el acceso a nuestro Wi-Fi de clientes para abrirla."*

---

## 6. Conciliación y Arqueo al Cierre de Turno

Al finalizar cada jornada:
1. El encargado de caja totaliza las filas marcadas como **CANJEADO** en la tabla de registro manual.
2. Se coteja la cantidad de cortesías entregadas por cocina con las comandas registradas.
3. Se archiva la hoja diaria para control administrativo y auditoría interna de promociones.
