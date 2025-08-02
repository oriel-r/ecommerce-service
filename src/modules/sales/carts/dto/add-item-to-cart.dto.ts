import { IsInt, IsUUID, Max, Min } from "class-validator"

export class AddItemToCartDto {
    
    @IsUUID()
    productVariantId: string
    
    @IsInt()
    @Min(1)
    @Max(30)
    quantity: number
}