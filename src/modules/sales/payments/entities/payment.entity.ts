import { Entity, Column, ManyToOne, JoinColumn, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Store } from 'src/modules/_platform/stores/entities/store.entity';
import { Order } from '../../orders/entities/order.entity';
import { PaymentStatus } from 'src/common/enums/payments/payment-status.enum';

@Entity('payments')
export class Payment extends BaseEntity {
  
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'uuid',
        name: 'order_id'
    })
    orderId: string;

    @Index()
    @Column({
        type: 'uuid',
        name: 'store_id'
    })
    storeId: string;

    @Column({
        type: 'decimal',
        precision: 11,
        scale: 2,
        nullable: false
    })
    amount: number;

    @Column({
        type: 'varchar',
        name: 'payment_method',
        nullable: false
    })
    paymentMethod: string;

    @Index({ unique: true })
    @Column({
        type: 'varchar',
        name: 'transaction_id',
        nullable: false
    })
    transactionId: string;

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        nullable: false,
        default: PaymentStatus.PENDING,
    })
    status: PaymentStatus;

    @ManyToOne(
        () => Order,
        order => order.payments, 
        { nullable: false, onDelete: 'CASCADE'}
    )
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(
        () => Store,
        store => store.payments,
        { nullable: false, onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'store_id' })
    store: Store;
}