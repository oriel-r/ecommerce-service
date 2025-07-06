import { Test, TestingModule } from '@nestjs/testing';
import { CuponsService } from './cupons.service';

describe('CuponsService', () => {
  let service: CuponsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CuponsService],
    }).compile();

    service = module.get<CuponsService>(CuponsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
