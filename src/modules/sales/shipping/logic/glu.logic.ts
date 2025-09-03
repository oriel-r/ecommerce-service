import { GLU_ZONES } from '../config/glu-zones.config';
import { GLU_PRICING_CONFIG } from '../config/glu-pricing.config';

function findZoneForPostalCode(postalCode: string): string {
  const cpNumber = parseInt(postalCode, 10);
  if (isNaN(cpNumber) ) return 'INTERIOR';

  for (const zoneInfo of GLU_ZONES) {
    if (Array.isArray(zoneInfo.cps)) {
      if (zoneInfo.cps.includes(postalCode)) {
        return zoneInfo.zone;
      }
    } else {
      if (cpNumber >= zoneInfo.cps.from && cpNumber <= zoneInfo.cps.to) {
        return zoneInfo.zone;
      }
    }
  }
  return 'INTERIOR';
}

export function calculateGluShippingCost(postalCode: string): { shipping: number; handling: number; total: number } | null {
  const zone = findZoneForPostalCode(postalCode);
  const shippingCost = GLU_PRICING_CONFIG.zones[zone];

  if (shippingCost === undefined) {
    return null;
  }

  const handlingCost = GLU_PRICING_CONFIG.fulfillmentFee;
  
  return {
    shipping: shippingCost,
    handling: handlingCost,
    total: shippingCost + handlingCost,
  };
}