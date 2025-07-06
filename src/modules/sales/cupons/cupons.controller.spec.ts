import { Test, TestingModule } from '@nestjs/testing';
import { CuponsController } from './cupons.controller';
import { CuponsService } from './cupons.service';

describe('CuponsController', () => {
  let controller: CuponsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuponsController],
      providers: [CuponsService],
    }).compile();

    controller = module.get<CuponsController>(CuponsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
