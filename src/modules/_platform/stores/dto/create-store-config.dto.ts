import { IsObject } from "class-validator";

export class CreateStoreConfigurationDto {

    @IsObject()
    data: Record<string, any>
}