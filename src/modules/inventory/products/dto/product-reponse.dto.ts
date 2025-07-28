import { ProductCategory } from "../entities/product-category.entity";
import { ProductVariant } from "../entities/product-variant.entity";
import { Product } from "../entities/product.entity";

export class ProductReponseDto  {
    id: string;
    name: string;
    detail: string;
    variants: Partial<ProductVariant>[];
    categoryAssignments: string[];

    constructor({id, name, variants, categoryAssignments, longDescription}: Product) {
        this.id = id,
        this.name = name,
        this.detail = longDescription
        this.variants = variants.map(
            (variant) => {
             return {
            id: variant.id,
            optionName: variant.optionName,
            optionValue: variant.optionValue,
            price: variant.price,
            images: variant.images,
            weight: variant.weight,
            discount: variant.discount,
            isDefault: variant.isDefault
        }}),
        this.categoryAssignments = categoryAssignments.map(
            (productCategory) => productCategory.category.name
        )
                
    }
}