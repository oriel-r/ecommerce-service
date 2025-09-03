import { Injectable } from '@nestjs/common';
import { calculateGluShippingCost } from './logic/glu.logic';
import { Address } from 'src/modules/_support/geography/address/entities/address.entity';
import { ShippingOptionDto } from './dto/shipping-option.dto';

@Injectable()
export class ShippingService {
     constructor() {} 

  async getShippingOptions(address: Partial<Address>): Promise<ShippingOptionDto[]> {
    if (!address?.postalCode) {
      return []; 
    }

    const costDetails = calculateGluShippingCost(address.postalCode);

    if (!costDetails) {
      return [];
    }

    const shippingOption = new ShippingOptionDto({
      methodName: 'GLU',
      cost: costDetails.total,
    });
    
    return [shippingOption];
  }
}
