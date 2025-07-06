import { Controller } from '@nestjs/common';
import { CuponsService } from './cupons.service';

@Controller('cupons')
export class CuponsController {
  constructor(private readonly cuponsService: CuponsService) {}
}
