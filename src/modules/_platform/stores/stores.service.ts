import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { EntityManager, Repository } from 'typeorm';
import { MembersService } from 'src/modules/auth/members/members.service';
import { PlatformUser } from '../platform-users/entities/platform-user.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepo: Repository< Store >,
    @InjectRepository(PlatformUser)
    private readonly platformUserRepo: Repository< PlatformUser >,
    private readonly memberService: MembersService
  ){}
  
  async createStore(
  dto: CreateStoreDto,
  manager?: EntityManager,
): Promise<Store> {
  const repo = manager ? manager.getRepository(Store) : this.storeRepo;

  const platformUserRepo = manager
    ? manager.getRepository(PlatformUser)
    : this.platformUserRepo;

  const platformUser = await platformUserRepo.findOne({ where: { id: dto.platformUserId } });
  if (!platformUser) throw new NotFoundException('Platform user no encontrado');

  const store = repo.create({
    name: dto.name,
    domain: dto.domain,
    platformUser,
  });

  return await repo.save(store);
}


  async findByDomain(domain: string) {
    return await this.storeRepo.findOne({ where: { domain: domain }});
  }

  async userHasAccessToStore(userId: string, store: Store): Promise<boolean> {
  if (store.platformUser.id === userId) return true;

  const member = await this.memberService.findOneByStore(store.id, userId);
  return !!member;
}

  findAll() {
    return `This action returns all stores`;
  }

  async findOne(id: string) {
    const store = await this.storeRepo.findOneBy({id})
    if(!store) throw new NotFoundException('No se encontro la tienda')
      return store
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
