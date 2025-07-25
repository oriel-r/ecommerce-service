import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";
import { ApiProperty } from "@nestjs/swagger";
import { DeepPartial } from "typeorm";

export class CreateCategoryDto {
    
    @ApiProperty({
        description: "Category's name",
        example: 'Autos'
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: "The optional father category to create a child category",
        type: 'string'
    })
    @IsOptional()
    @IsUUID()
    parentId?: string

    constructor(partial: DeepPartial<CreateCategoryDto>) {
        Object.assign(this, partial)
    }
}