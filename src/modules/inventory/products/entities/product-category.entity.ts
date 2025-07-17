import { BaseEntity } from "src/common/entities/base.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn, RelationId } from "typeorm";
import { Product } from "./product.entity";
import { Category } from "../../categories/entities/category.entity";

@Entity()
export class ProductCategory extends BaseEntity {

    @PrimaryColumn()
    productId: string

    @PrimaryColumn()
    categoryId: string

    @ManyToOne(() => Product, product => product.categoryAssignments)
    product: Product

    @ManyToOne(() => Category, category => category.productAssignments)
    category: Category
 /*
    @ManyToOne(() => Store, (store) => store.productCategories)
    @JoinColumn({name: 'store_id'})
    store: Store

    @RelationId((productCategory: ProductCategory) => productCategory.store)
    storeId: string
*/
}