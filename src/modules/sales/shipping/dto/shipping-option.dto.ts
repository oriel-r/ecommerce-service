import { ApiProperty } from "@nestjs/swagger";

export class ShippingOptionDto {
    @ApiProperty()
    methodName: string;

    @ApiProperty()
    cost: number;

    @ApiProperty()
    estimatedDelivery?: string | null;
    
    constructor(partial: Partial<ShippingOptionDto>) {
        Object.assign(this, partial);
    }
}