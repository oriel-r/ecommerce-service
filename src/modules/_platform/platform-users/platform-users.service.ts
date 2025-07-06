import { Injectable } from '@nestjs/common';
import { CreatePlatformUserDto } from './dto/create-platform-user.dto';
import { UpdatePlatformUserDto } from './dto/update-platform-user.dto';

@Injectable()
export class PlatformUsersService {
  create(createPlatformUserDto: CreatePlatformUserDto) {
    return 'This action adds a new platformUser';
  }

  findAll() {
    return `This action returns all platformUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} platformUser`;
  }

  update(id: number, updatePlatformUserDto: UpdatePlatformUserDto) {
    return `This action updates a #${id} platformUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} platformUser`;
  }
}
