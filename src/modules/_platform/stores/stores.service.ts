import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { EntityManager, Repository} from 'typeorm';
import { MembersService } from 'src/modules/auth/members/members.service';
import { PlatformUser } from '../platform-users/entities/platform-user.entity';
import { UpdateStatusStoreDto } from './dto/update-status-store.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepo: Repository<Store>,
    @InjectRepository(PlatformUser)
    private readonly platformUserRepo: Repository<PlatformUser>,
    @Inject(forwardRef(() => MembersService))
    private readonly memberService: MembersService,
  ) {}

  async createStore(
    dto: CreateStoreDto,
    manager?: EntityManager,
  ): Promise<Store> {
    const repo = manager ? manager.getRepository(Store) : this.storeRepo;

    const platformUserRepo = manager
      ? manager.getRepository(PlatformUser)
      : this.platformUserRepo;

    const platformUser = await platformUserRepo.findOne({
      where: { id: dto.platformUserId },
    });
    if (!platformUser)
      throw new NotFoundException('Platform user no encontrado');

    const store = repo.create({
      name: dto.name,
      domain: dto.domain,
      platformUser,
    });

    return await repo.save(store);
  }

  findByDomain(domain: string) {
    return this.storeRepo.findOne({ where: { domain: domain } });
  }

  async userHasAccessToStore(userId: string, store: Store): Promise<boolean> {
    if (store.platformUser.id === userId) return true;

    const member = await this.memberService.findOneByStore(store.id, userId);
    return !!member;
  }

  async findAllStores() {
    const stores = await this.storeRepo.find();

    if(!stores) throw new NotFoundException('No se encontraron tiendas');

    return stores;
  }

  async findOneById(id: string) {
    const store = await this.storeRepo.findOne({
      where: {id}
    });

    if(!store) throw new NotFoundException('Tienda no encontrada');

    return store;
  }

  async updateStore(id: string, updateStoreDto: UpdateStoreDto) {
    const store = await this.findOneById(id);
    Object.assign(store, updateStoreDto);
    const updateStore = await this.storeRepo.save(store);
    return updateStore;
  }

  async updateStatusStore(id: string, updateStatusStore: UpdateStatusStoreDto) {
    const store = await this.findOneById(id);
    store.isActive = updateStatusStore.isActive;
    return await this.storeRepo.save(store);
  }

  async findByPlatformUserId(platformUserId: string): Promise<Store> {
  const store = await this.storeRepo.findOne({
    where: { platformUser: { id: platformUserId } },
    relations: ['platformUser'], 
  });

  if (!store) {
    throw new NotFoundException('No se encontró una tienda para este usuario');
  }

  return store;
}
}
