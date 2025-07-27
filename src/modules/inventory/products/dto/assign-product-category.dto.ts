import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsUUID } from "class-validator";

export class AssignProductCategoryDto {

    @ApiProperty({
        description: 'An array of categories ids'
    })
    @IsArray()
    @IsUUID('4', {each: true})
    categoriesIds: string[]

}