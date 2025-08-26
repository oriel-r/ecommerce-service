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
import { StoreConfigurationsRepository } from './store-configurations.repository';
import { CreateStoreConfigurationDto } from './dto/create-store-config.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepo: Repository<Store>,
    @InjectRepository(PlatformUser)
    private readonly platformUserRepo: Repository<PlatformUser>,
    @Inject(forwardRef(() => MembersService))
    private readonly memberService: MembersService,
    private readonly storeConfigurationsRepository: StoreConfigurationsRepository
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

    const newStore = await repo.save(store);

    await this.createStoreConfig(newStore.id)
    
    return newStore
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

  private async exist(id: string) {
    const count = await this.storeRepo.count({
      where: {
        id
      }
    })

    if(count === 0) throw new NotFoundException('La tienda no existe')
  }


    //                                                  //
    // -------------------- CONFIG -------------------- //
    //                                                  // 

    async getPublicStoreConfiguration(domain: string) {
      const storeConfiguration = await this.storeConfigurationsRepository.getByDomain(domain)
      if(!storeConfiguration) return {}
      return storeConfiguration
    }

    private async createStoreConfig(id: string, data?: CreateStoreConfigurationDto) {
      const storeConfiguration = await this.storeConfigurationsRepository.create({
        ...data,
        storeId: id
      })

      return
    }

    async updateStoreConfiguration(id: string, config: CreateStoreConfigurationDto) {
        await this.exist(id)
        const configuration = await this.storeConfigurationsRepository.getByStoreId(id)
        configuration!.data = config
        await this.storeConfigurationsRepository.save(configuration!)
        return configuration
    }

}
