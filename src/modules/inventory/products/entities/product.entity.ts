import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { ProductVariant } from "./product-variant.entity";
import { ProductCategory } from "./product-category.entity";
import { Store } from "src/modules/_platform/stores/entities/store.entity";

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', {nullable: false})
    name: string

    @Column('boolean', {default: true})
    isActive: boolean

    @OneToMany(() => ProductCategory, productCategory => productCategory.product, {nullable: true})
    categoryAssignments: ProductCategory[]

    @OneToMany(() => ProductVariant , productVariant => productVariant.product, {nullable: false})
    variants: ProductVariant[]

    @ManyToOne(() => Store, (store) => store.products, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({name: 'store_id'})
    store: Store

    @RelationId((product: Product) => product.store)
    storeId: string

}