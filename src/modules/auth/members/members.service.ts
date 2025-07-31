import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { StoresService } from 'src/modules/_platform/stores/stores.service';
import { RolesService } from '../roles/roles.service';
import { hash } from 'bcrypt';
import { AddressService } from 'src/modules/_support/geography/address/address.service';
import { Store } from 'src/modules/_platform/stores/entities/store.entity';
import { UpdateMemberBillingDto } from './dto/update-member-billing.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
    @Inject(forwardRef(() => StoresService))
    private readonly storeService: StoresService,
    @Inject(forwardRef(() => RolesService))
    private readonly roleService: RolesService,
    @Inject(forwardRef(() => AddressService))
    private readonly addressService: AddressService,
  ) {}

  async createMember(createMemberDto: CreateMemberDto, storeId: string) {
    const store = await this.storeService.findOneById(storeId);
    const { email, dni, phoneNumber, password, addresses, ...memberData } =
      createMemberDto;

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
      ...memberData,
      phoneNumber,
      dni,
      email,
      password: hashedPassword,
      storeId: store.id,
      role: role,
    });

    await this.memberRepo.save(newUser);

    for (const addressDto of addresses) {
      await this.addressService.createAddress({
        ...addressDto,
        memberId: newUser.id,
      });
    }

    const userWithRelations = await this.memberRepo.findOne({
      where: { id: newUser.id },
      relations: ['role', 'addresses'],
    });
    return userWithRelations;
  }

  async findAll() {
    const members = await this.memberRepo.find({ relations: ['role', 'addresses']});
    if (!members) throw new NotFoundException('Usuarios no encontrados');
    return members;
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

  async findOneById(id: string) {
    const member = await this.memberRepo.findOne({ 
      where: { id } ,
      relations: ['role', 'addresses'],
    });
    if (!member) throw new NotFoundException('Usuario no encontrado');
    return member;
  }

  async findOneByEmail(email: string) {
    const member = await this.memberRepo.findOne({ 
      where: { email } ,
      relations: ['role', 'addresses'],
    });
    if (!member) throw new NotFoundException('Email inexistente');
    return member;
  }

  async updateMember(id: string, updateMemberDto: UpdateMemberDto) {
    const member = await this.findOneById(id);
    Object.assign(member, updateMemberDto);
    return await this.memberRepo.save(member);
  }

  async removeMember(id: string) {
    const member = await this.findOneById(id);
    await this.memberRepo.remove(member);

    return { message: 'Usuario eliminado correctamente' };
  }

  async findMemberByEmailWithStore(email: string, store: Store) {
      const existing = await this.memberRepo.findOne({
        where: {
          email,
          storeId: store.id ,
        },
        relations: ['role', 'addresses'],
      });
      if (!existing)
        throw new NotFoundException('No se ha encontrado el email indicado');
  
      return existing;
  }

  async updateMemberBillingInfo(memberId: string, dto: UpdateMemberBillingDto) {
  const member = await this.findOneById(memberId);

  if (dto.cuit !== undefined) {
    member.cuit = dto.cuit;
  }

  if (dto.taxCondition !== undefined) {
    member.taxCondition = dto.taxCondition;
  }

  return await this.memberRepo.save(member);
}
}
