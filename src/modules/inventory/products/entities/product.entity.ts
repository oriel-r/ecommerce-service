import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductVariant } from "./product-variant.entity";
import { ProductCategory } from "./product-category.entity";

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', {nullable: false})
    name: string

    @Column('boolean', {default: true})
    isActive: boolean

    @OneToMany(() => ProductCategory, productCategory => productCategory.product, {nullable: false})
    categoryAssignments: ProductCategory[]

    @OneToMany(() => ProductVariant , productVariant => productVariant.product, {nullable: false})
    variants: ProductVariant[]

/*
    @ManyToOne(() => Store, (store) => store.products)
    @JoinColumn({name: 'store_id'})
    store: Store

    @RelationId((productCategory: ProductCategory) => product.store)
    storeId: string
*/
}