import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { BaseEntity } from "../../../../common/entities/base.entity";
import { ProductCategory } from "../../products/entities/product-category.entity";
import { Store } from "src/modules/_platform/stores/entities/store.entity";

@Entity()
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', {nullable: false})
    name: string

    @OneToMany(
        () => Category,
        category => category.parent,
         {nullable: true}
        )
    children: Category[]

    @ManyToOne(
        () => Category,
        category => category.children,
        {nullable: true, onDelete: 'SET NULL'}
    )
    parent: Category | null

    @ManyToOne(() => Store, store => store.categories, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({name: 'store_id'})
    store: Store

    @RelationId((category: Category) => category.store) 
    storeId: string

    @OneToMany(() => ProductCategory, productCategory => productCategory.category, {nullable: true})
    productAssignments: ProductCategory[]
}