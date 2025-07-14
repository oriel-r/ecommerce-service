import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePlatformUserDto } from './dto/update-platform-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlatformUser } from './entities/platform-user.entity';
import { EntityManager, Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { Store } from '../stores/entities/store.entity';
import { CreatePlatformUserDto } from './dto/create-platform-user.dto';

@Injectable()
export class PlatformUsersService {
  constructor(
    @InjectRepository(PlatformUser)
    private readonly platformUserRepo: Repository<PlatformUser>,
  ) {}

  async create(
  dto: CreatePlatformUserDto,
  manager?: EntityManager,
): Promise<PlatformUser> {
  const repo = manager ? manager.getRepository(PlatformUser) : this.platformUserRepo;

  const findOwner = await repo.findOne({ where: { email: dto.email } });
  if (findOwner) throw new ConflictException('Email existente');

  const hashedPassword = await hash(dto.password, 10);

  const newOwner = repo.create({
    ...dto,
    password: hashedPassword,
  });

  return await repo.save(newOwner);
}

  async findByEmailWithStore(email: string, store: Store) {
    const existing = await this.platformUserRepo.findOne({
      where: {
        email,
        stores: { id: store.id },
      },
    });
    if (!existing)
      throw new NotFoundException('No se ha encontrado el email indicado');

    return existing;
  }

  async findByEmail(email: string) {
    return await this.platformUserRepo.findOne({
      where: {
        email,
      },
    });
  }

  async checkPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(plainPassword, hashedPassword);
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
