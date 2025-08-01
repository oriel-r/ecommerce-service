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
import { plainToInstance } from 'class-transformer';
import { PlatformUserResponseDto } from './dto/platform-user-response.dto';
import { CreatePlatformUserDto } from './dto/create-platform-user.dto';
import { RolesService } from 'src/modules/auth/roles/roles.service';

@Injectable()
export class PlatformUsersService {
  constructor(
    @InjectRepository(PlatformUser)
    private readonly platformUserRepo: Repository<PlatformUser>,
    private readonly rolesService: RolesService,
  ) {}

  async create(
    dto: CreatePlatformUserDto,
    manager?: EntityManager,
  ): Promise<PlatformUser> {
    const repo = manager
      ? manager.getRepository(PlatformUser)
      : this.platformUserRepo;

    const findOwner = await repo.findOne({ where: { email: dto.email } });
    if (findOwner) throw new ConflictException('Email existente');

    const role = await this.rolesService.findByName('platform');

    const hashedPassword = await hash(dto.password, 10);

    const newOwner = repo.create({
      ...dto,
      role,
      password: hashedPassword,
    });

    await repo.save(newOwner);

    const user = await repo.findOne({
      where: { id: newOwner.id },
      relations: ['role'],
    });

    if (!user) throw new NotFoundException('Error al cargar el usuario creado');

    return user;
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
      where: { email },
      relations: ['stores', 'role'],
    });
  }

  async checkPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(plainPassword, hashedPassword);
  }

  async findAllPlatformUsers(storeId: string) {
    const owners = await this.platformUserRepo.find({
      where: { stores: { id: storeId } },
      relations: ['stores'],
    });
    if (!owners.length) throw new NotFoundException('Admins no encontrados');

    return plainToInstance(PlatformUserResponseDto, owners, {
      excludeExtraneousValues: true,
    });
  }

   async findById(id: string): Promise<PlatformUser> {
    const user = await this.platformUserRepo.findOne({
      where: { id },
      relations: ['stores'], 
    });

    if (!user) {
      throw new NotFoundException('Admin no encontrado');
    }

    return user;
  }

  update(id: number, updatePlatformUserDto: UpdatePlatformUserDto) {
    return `This action updates a #${id} platformUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} platformUser`;
  }
}
