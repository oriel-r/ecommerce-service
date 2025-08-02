import { Category } from "../entities/category.entity"

export class CategoryResponseDto {
    id: string
    name: string

    constructor(category: Category) {
        this.id = category.id
        this.name = category.name
    }
}

export class CategoryTreeResponseDto {
    id: string
    name: string
    children: CategoryResponseDto[]
    constructor(category: Category){
        this.id = category.id,
        this.name = category.name
        this.children = category.children.map(
            category => new CategoryResponseDto(category)
        )
    }
}