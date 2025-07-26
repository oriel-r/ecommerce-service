import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsBoolean, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator"

export class CreateProductDto {


    @ApiProperty({
        description: 'The name of product'
    })
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: "short product's description"
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description?: string

    @ApiProperty({
        description: "extended product's description"
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    detail?: string

    @ApiProperty({
        description: "featued product"
    })
    @IsBoolean()
    @IsOptional()
    isFeatured?: boolean

    @ApiProperty({
        description: 'true by default'
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean

    @ApiProperty({
        description: 'discount'
    })
    @IsNumber()
    @IsOptional()
    discount?: number 
    
}