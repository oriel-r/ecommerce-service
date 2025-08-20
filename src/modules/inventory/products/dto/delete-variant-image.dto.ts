import { IsUrl } from "class-validator";

export class DeleteVariantImage {
    
    @IsUrl()
    url: string
}