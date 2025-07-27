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

    @Column({type: 'text', nullable: true})
    description: string

    @Column({type: 'text', nullable: true})
    longDescription: string

    @Column('boolean', {default: true})
    isActive: boolean

    @Column({type: 'boolean', default: false, name: 'is_featured'})
    isFeatured: boolean

    @OneToMany(() => ProductCategory, productCategory => productCategory.product, {nullable: true})
    categoryAssignments: ProductCategory[]

    @OneToMany(() => ProductVariant , productVariant => productVariant.product, {nullable: false})
    variants: ProductVariant[]

    @ManyToOne(() => Store, (store) => store.products, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({name: 'store_id'})
    store: Store

    @Column({type: 'uuid', nullable: false, name: 'store_id', onUpdate: 'CASCADE'})
    storeId: string

}