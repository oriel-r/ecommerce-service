import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../../../common/entities/base.entity";
import { ProductCategory } from "../../products/entities/product-category.entity";

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

    @OneToMany(() => ProductCategory, productCategory => productCategory.category, {nullable: true})
    productAssignments: ProductCategory[]
}