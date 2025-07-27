import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Product } from "./product.entity";

const imagesArray = [
    "https://i.postimg.cc/0N524FMM/Screenshot-from-2025-07-25-14-42-31.png",
    "https://i.postimg.cc/0N524FMM/Screenshot-from-2025-07-25-14-42-31.png",
    "https://i.postimg.cc/0N524FMM/Screenshot-from-2025-07-25-14-42-31.png"
]

@Entity()
export class ProductVariant extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'decimal', precision: 11, scale: 2})
    price: number

    @Column({type: 'integer', nullable: true, default: 999})
    stock: number
    
    @Column({type: 'varchar', nullable: true, unique: true})
    sku: string

    @Column({type: 'varchar', array: true, nullable: true, default: imagesArray})
    images: string[]

    @Column({type: 'varchar', nullable: true, name: 'option_name'})
    optionName: string

    @Column({type: 'varchar', nullable: true, name: 'option_value'})
    optionValue: string

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    weight: number | null

    @Column({type: 'boolean', default: false, name: 'is_default'})
    isDefault: boolean

    @Column({type: 'int', nullable: true })
    discount: number | null

    @ManyToOne(() => Product, product => product.variants, {nullable: false})
    @JoinColumn({name: 'product_id'})
    product: Product

    @RelationId((productVariant: ProductVariant) => productVariant.product)
    productId: string
}