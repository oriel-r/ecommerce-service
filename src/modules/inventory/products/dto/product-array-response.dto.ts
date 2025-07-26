import { ProductCategory } from "../entities/product-category.entity";
import { ProductVariant } from "../entities/product-variant.entity";
import { Product } from "../entities/product.entity";

export class ProductArrayResponseDto {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    sku: string;
    createdAt: Date
    offer: {
        porcentage: number | null
    }

    constructor({name, id, detail, createdAt, variants}: Product) {
        this.id = id,
        this.name = name,
        this.description = detail
        this.sku = variants[0].sku
        this.price = variants[0].price
        this.stock = variants[0].stock
        this.images = variants[0].images
        this.createdAt = createdAt
        this.offer = {porcentage: variants[0].discount}
    }
}