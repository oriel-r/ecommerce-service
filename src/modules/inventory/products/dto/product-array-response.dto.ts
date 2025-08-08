// en product-array-response.dto.ts

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
    novelty: boolean;
    createdAt: Date;
    detail: string;
    offer: {
        percentage: number | null
    };
    variants: ProductVariant[]
    categoryId: string | null;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.detail = product.longDescription;
        this.novelty = product.isFeatured;
        this.createdAt = product.createdAt;
        const defaultVariant = product.variants?.[0];
        this.sku = defaultVariant?.sku;
        this.price = defaultVariant?.price || 0;
        this.stock = defaultVariant?.stock || 0;
        this.images = defaultVariant?.images || [];
        this.offer = { percentage: defaultVariant?.discountPercentage || null };
        this.variants= product.variants
        const assignments = product.categoryAssignments || [];
        const lastAssignment = assignments[assignments.length - 1];
        this.categoryId = lastAssignment?.category?.name || null;
    }
}