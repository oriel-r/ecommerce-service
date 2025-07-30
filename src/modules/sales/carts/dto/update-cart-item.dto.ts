import { IsInt, Max, Min } from "class-validator";

export class UpdateCartItemDto {
    
    @IsInt()
    @Min(1)
    @Max(50)
    quantity: number
}