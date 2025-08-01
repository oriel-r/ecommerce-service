import { IsBoolean } from "class-validator";

export class UpdateStatusMemberDto {
    @IsBoolean()
    isActive: boolean;
}