import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Product } from "./product.entity";
import { CartItem } from "src/modules/sales/carts/entities/cart-item.entity";
import { OrderItem } from "src/modules/sales/orders/entities/order-item.entity";

const imagesArray = [
    "https://res.cloudinary.com/ddhx1kogg/image/upload/v1754159044/LOGO_SE_INSTALA_1_uj4wg0.png",
]

@Entity()
export class ProductVariant extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'decimal',
        precision: 11,
        scale: 2,
        name: 'list_price'
    })
    listPrice: number

    @Column({
        type: 'smallint',
        nullable: false,
        default: 0,
        name: 'discount_percentage'
    })
    discountPercentage: number

    @Column({
        type: 'decimal',
        precision: 11,
        scale: 2,
        name: 'price',
        generatedType: 'STORED',
        asExpression: `
            CASE
                WHEN "discount_percentage" > 0 AND "discount_percentage" < 100
                THEN ROUND(("list_price" * (1 - "discount_percentage" / 100.0)), 2)
                ELSE "list_price"
            END
        `
    })
    price: number

    @Column({
        type: 'integer',
        nullable: true,
        default: 999
    })
    stock: number
    
    @Column({
        type: 'varchar',
        nullable: true,
        unique: true
    })
    sku: string

    @Column({
        type: 'varchar',
        array: true,
        nullable: true,
        default: imagesArray
    })
    images: string[]

    @Column({
        type: 'varchar',
        nullable: true,
        name: 'option_name'
    })
    optionName: string

    @Column({
        type: 'varchar',
        nullable: true,
        name: 'option_value'
    })
    optionValue: string

    @Column({
        type: 'decimal',
        precision: 5, scale: 2,
        nullable: true
    })
    weight: number | null

    @Column({
        type: 'boolean',
        default: false,
        name: 'is_default'
    })
    isDefault: boolean

    @ManyToOne(() => Product, product => product.variants, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({name: 'product_id'})
    product: Product

    @RelationId((productVariant: ProductVariant) => productVariant.product)
    productId: string

    @OneToMany(() => CartItem, cartItem => cartItem.productVariant, {nullable: true})
    cartItems: CartItem[]

    @OneToMany(() => OrderItem, orderItem => orderItem.productVariant, {nullable: true})
    orderItems: OrderItem[]

}