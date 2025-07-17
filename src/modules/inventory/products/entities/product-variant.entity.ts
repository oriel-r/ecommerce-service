import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductVariant extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'decimal', precision: 2, scale: 2})
    price: number

    @Column({type: 'integer', nullable: true})
    stock: number
    
    @Column({type: 'varchar', nullable: true, unique: true})
    sku: string

    @Column({type: 'varchar', array: true, nullable: true})
    images: string[]

    @Column({type: 'varchar', nullable: true, name: 'option_name'})
    optionName: string

    @Column({type: 'varchar', nullable: true, name: 'option_value'})
    optionValue: string

    @ManyToOne(() => Product, product => product.variants, {nullable: false})
    @JoinColumn({name: 'product_id'})
    product: Product

    @RelationId((productVariant: ProductVariant) => productVariant.product)
    productId: string
}