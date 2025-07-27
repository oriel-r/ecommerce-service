import { ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { StoresService } from 'src/modules/_platform/stores/stores.service';
import { RolesService } from '../roles/roles.service';
import { hash } from 'bcrypt';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
    @Inject(forwardRef(() => StoresService))
    private readonly storeService: StoresService,
    @Inject(forwardRef(() => RolesService))
    private readonly roleService: RolesService
  ) {}

  async createMember(createMemberDto: CreateMemberDto, storeId: string) {
    const store = await this.storeService.findOneById(storeId);
    const { email, dni, phoneNumber, password } = createMemberDto;

    const existingEmail = await this.memberRepo.findOne({
      where: { email },
    });
    if (existingEmail) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const existingDni = await this.memberRepo.findOne({
      where: { dni },
    });
    if (existingDni) {
      throw new ConflictException(
        'El documento de identidad ya está registrado',
      );
    }

    const existingPhone = await this.memberRepo.findOne({
      where: { phoneNumber },
    });
    if (existingPhone) {
      throw new ConflictException(
        'El número de celular ya se encuentra registrado',
      );
    }

    const role = await this.roleService.findByName('customer');

    const hashedPassword = await hash(password, 10);

    const newUser = this.memberRepo.create({
      ...createMemberDto,
      password: hashedPassword,
      storeId: store.id,
      role: role
    });

    await this.memberRepo.save(newUser);

    return newUser;
  }

  findAll() {
    return `This action returns all members`;
  }

  async findOneByStore(storeId: string, memberId: string) {
    const member = await this.memberRepo.findOne({
      where: { storeId, id: memberId },
    });

    if (!member) {
          throw new NotFoundException(
            `No se encontró un miembro en la tienda con id ${storeId}`,
          );
        }
        return member;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
