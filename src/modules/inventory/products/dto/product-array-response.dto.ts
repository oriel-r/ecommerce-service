import { ProductCategory } from "../entities/product-category.entity";
import { ProductVariant } from "../entities/product-variant.entity";
import { Product } from "../entities/product.entity";

export class ProductArrayResponseDto {
    id: string;
    name: string;
    variants: Partial<ProductVariant>;

    constructor(data: Product) {
        this.id = data.id,
        this.name = data.name,
        this.variants = {
            id: data.variants[0].id,
            optionName: data.variants[0].optionName,
            optionValue: data.variants[0].optionValue,
            price: data.variants[0].price,
            images: data.variants[0].images
        }
    }
}