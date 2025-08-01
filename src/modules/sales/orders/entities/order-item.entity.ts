import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Order } from "./order.entity";
import { ProductVariant } from "src/modules/inventory/products/entities/product-variant.entity";

@Entity('order_items')
export class OrderItem extends BaseEntity {

    @PrimaryColumn('uuid', {name: 'order_id'})
    orderId: string

    @PrimaryColumn('uuid', {name: 'product_variant_id'})
    productVariantId: string

    @Column({type: 'smallint', nullable: false})
    quantity: Number

    @Column({type: 'decimal', precision: 12, scale: 2, nullable: false, name: 'price_at_purchase'})
    priceAtPurchase: number;

    @ManyToOne(
        () => Order,
        order => order.items,
        {nullable: false, onDelete: 'CASCADE'}
    )
    @JoinColumn({name: 'order_id'})
    order: Order

    @ManyToOne(
        () => ProductVariant,
        productVariant => productVariant.orderItems,
        {nullable: false, onDelete: 'CASCADE'}
    )
    @JoinColumn({name: 'product_variant_id'})
    productVariant: ProductVariant

}
