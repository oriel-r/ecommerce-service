import { ProductCategory } from "../entities/product-category.entity";
import { ProductVariant } from "../entities/product-variant.entity";
import { Product } from "../entities/product.entity";

export class ProductReponseDto  {
    id: string;
    name: string;
    variants: Partial<ProductVariant>[];
    categoryAssignments: string[];

    constructor({id, name, variants, categoryAssignments}: Product) {
        this.id = id,
        this.name = name,
        this.variants = variants.map(
            (variant) => {
             return {
            id: variant.id,
            optionName: variant.optionName,
            optionValue: variant.optionValue,
            price: variant.price,
            images: variant.images
        }}),
        this.categoryAssignments = categoryAssignments.map(
            (productCategory) => productCategory.category.name
        )
                
    }
}