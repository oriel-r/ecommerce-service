export enum OrderStatus {
   // La orden ha sido creada, pero el pago aún no ha sido confirmado.
   // El stock ha sido reservado.

  PENDING_PAYMENT = 'PENDING_PAYMENT',
    
    // El pago ha sido recibido y confirmado. La orden está lista para ser preparada.
  PAID = 'PAID',

    // La orden ha sido preparada y enviada al cliente.
  SHIPPED = 'SHIPPED',

    // El cliente ha recibido la orden. El ciclo de venta está completo.
  DELIVERED = 'DELIVERED',

    // La orden ha sido cancelada antes del envío (por el cliente o el administrador).
    // El stock debe ser devuelto al inventario.
  CANCELLED = 'CANCELLED',

    // El pago ha sido devuelto al cliente (reembolso total o parcial).
    // Ocurre después de que el estado fuera 'PAID'.
  REFUNDED = 'REFUNDED',

    // El intento de pago falló. La orden sigue existiendo para un posible reintento.
  PAYMENT_FAILED = 'PAYMENT_FAILED',
}