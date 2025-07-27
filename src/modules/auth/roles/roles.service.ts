import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { StoresService } from 'src/modules/_platform/stores/stores.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @Inject(forwardRef(() => StoresService))
    private readonly storeService: StoresService,
  ) {}

  async createRoleIfNotExists(name: string): Promise<Role> {
    let role = await this.roleRepo.findOne({ where: { name } });
    if (!role) {
      role = this.roleRepo.create({ name });
      await this.roleRepo.save(role);
    }
    return role;
  }

  async createRole(dto: CreateRoleDto): Promise<Role>  {
    const { name, storeId } = dto;
    let storeIdFind = await this.storeService.findOneById(storeId);
    let roleExist = await this.roleRepo.findOne({ where: { name } });
    if (!roleExist) {
      roleExist = this.roleRepo.create({
        name,
        storeId: storeIdFind.id,
      });
      await this.roleRepo.save(roleExist);
    }
    return roleExist;
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepo.find();
  }

  async findByName(name: string): Promise<Role>  {
    const role = await this.roleRepo.findOne({ where: { name } });
    if (!role) {
      throw new NotFoundException(`El rol "${name}" no existe`);
    }
    return role;
  }

  async findOneById( id: string ): Promise<Role> {
    const role = await this.roleRepo.findOne({where: {id}});
    if (!role) {
      throw new NotFoundException(`El rol con id: "${id}" no se encuentra`);
    }
    return role;
  }

  async remove( id: string ): Promise<{ message: string }> {
    const role = await this.findOneById(id);
    await this.roleRepo.remove(role);
    return { message: 'Rol eliminado correctamente' };
  }
}
