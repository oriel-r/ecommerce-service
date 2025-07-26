import { DeepPartial } from "typeorm";
import { ProductCategory } from "../entities/product-category.entity";
import { ProductVariant } from "../entities/product-variant.entity";
import { Product } from "../entities/product.entity";
import { Category } from "../../categories/entities/category.entity";

export class ProductArrayResponseDto {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    sku: string;
    novelty: boolean;
    createdAt: Date;
    detail: string;
    offer: {
        percentage: number | null
    }
    categoryId: string[] | Partial<ProductCategory>[]

    constructor({name , id , longDescription, description, createdAt, variants, isFeatured, categoryAssignments}: Product) {
        this.id = id,
        this.name = name,
        this.description = description
        this.detail = longDescription
        this.novelty = isFeatured
        this.sku = variants[0].sku
        this.price = variants[0].price
        this.stock = variants[0].stock
        this.images = variants[0].images
        this.createdAt = createdAt
        this.offer = {percentage: variants[0].discount}
        this.categoryId = categoryAssignments
    }
}