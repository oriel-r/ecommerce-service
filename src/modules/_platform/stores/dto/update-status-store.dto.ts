import { IsBoolean } from "class-validator";

export class UpdateStatusStoreDto {
    @IsBoolean()
    isActive: boolean;
}