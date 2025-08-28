import { IsJSON, IsObject } from "class-validator";

export class CreateStoreConfigurationDto {

    @IsJSON()
    data: JSON
}