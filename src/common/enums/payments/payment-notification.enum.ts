export enum PaymentWebhookNotification {
    WEBHOOK_RECEIVED = 'payment.webhook.received'
}

export enum PaymentStatusNotification {
    PENDING = 'payment.status.pending',
    SUCCESSFUL = 'payment.status.successful',
    FAILED = 'payment.status.failed',
    REFUNDED = 'payment.status.refounded'
}