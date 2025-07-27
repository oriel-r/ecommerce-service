import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { UUID } from "crypto";

export class UpdateCategoryDto {

    @ApiProperty({
        description: "the new category name"
    })
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({
        description: "An array of children's category ids",
    })
    @IsOptional()
    @IsArray()
    @IsUUID('4', {each: true})
    childrenIds?: string[]

    @ApiProperty({
        description: "A new parent's category id"
    })
    @IsOptional()
    @IsUUID('4')
    parentId?: string

}