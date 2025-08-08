import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator"

export class CreateProductVariantDto {

    @ApiProperty({
        description: 'the price of variant. min 0, acept decimal values',
        example: '199.99'
    })
    @IsNotEmpty({message: 'No puedes crear un producto sin su precio'})
    @IsNumber({maxDecimalPlaces: 2})
    @Min(0, {message: 'El precio debe ser mayor o igual a 0'})
    listPrice: number

    @ApiProperty({
        description: "Variant's stock, optional at the moment"
    })
    @IsInt({message: 'No valor de stock debe ser un enteo tener '})
    @Min(0, {message: 'El stock debe ser mayor o igual a 0'})
    @IsOptional()
    stock?: number

    @ApiProperty({
        description: "variant's sku"
    })
    @IsString()
    @IsOptional()
    sku?: string

    @ApiProperty({
        description: 'the name of the option',
        example: 'Color'
    })
    @IsNotEmpty()
    @IsString()
    optionName: string

    @ApiProperty({
        description: "Option's value",
        example: 'Rojo'
    })
    @IsNotEmpty()
    @IsString()
    optionValue: string

    @ApiProperty({
        description: "weight in kg",
        example: 25
    })
    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    weight?: number

    @ApiProperty({
        description: 'if this is in true this are returend by default'
    })
    @IsBoolean()
    @IsOptional()
    isDefault?: boolean

    @ApiProperty({
        description: 'percent of discount'
    })
    @IsInt()
    @Max(100)
    @IsOptional()
    discount?: number

}