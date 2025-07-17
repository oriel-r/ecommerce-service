import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsUUID } from "class-validator"

export class CreateProductDto {


    @ApiProperty({
        description: 'The name of product'
    })
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: 'true by default'
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean

}