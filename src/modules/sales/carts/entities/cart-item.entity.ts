import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { ProductVariant } from "src/modules/inventory/products/entities/product-variant.entity";

@Entity('cart_items')
export class CartItem extends BaseEntity {

    @PrimaryColumn('uuid', { name: 'cart_id'})
    cartId: string

    @PrimaryColumn('uuid',{ name: 'product_variant_id'})
    productVariantId: string

    @Column('smallint', {nullable: false, default: 1})
    quantity: number

    @ManyToOne(() => Cart)
    @JoinColumn({ name: 'cart_id'})
    cart: Cart

    @ManyToOne(() => ProductVariant, productVariant => productVariant.cartItems, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({ name: 'product_variant_id'})
    productVariant: ProductVariant

}