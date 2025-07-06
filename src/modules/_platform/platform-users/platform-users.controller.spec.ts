import { Test, TestingModule } from '@nestjs/testing';
import { PlatformUsersController } from './platform-users.controller';
import { PlatformUsersService } from './platform-users.service';

describe('PlatformUsersController', () => {
  let controller: PlatformUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatformUsersController],
      providers: [PlatformUsersService],
    }).compile();

    controller = module.get<PlatformUsersController>(PlatformUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
