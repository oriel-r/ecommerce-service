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
import { UpdateStatusMemberDto } from './dto/update-status-member.dto';
import { CurrentCustomer } from 'src/common/interfaces/current-customer.interface';

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

    const defaultAddress = addresses[0]
    const defaulValue = defaultAddress.isDefault ?? false

    defaultAddress.isDefault = defaulValue

      await this.addressService.createAddress({
        ...defaultAddress,
        memberId: newUser.id,
      });
    

    const userWithRelations = await this.memberRepo.findOne({
      where: { id: newUser.id },
      relations: [
      'role',
      'addresses',
      'addresses.city',
      'addresses.city.province'
  ],
    });
    return userWithRelations;
  }

  async findAll(storeId: string) {
    const members = await this.memberRepo.find({
      where: { storeId },
      relations: ['role', 'addresses'],
    });
    if (!members.length) throw new NotFoundException('Usuarios no encontrados');
    return members;
  }

  async findOneByStore(storeId: string, memberId: string) {
    const member = await this.memberRepo.findOne({
      where: { id: memberId, storeId },
      relations: ['role', 'addresses'],
    });
    if (!member) {
      throw new NotFoundException(
        `No se encontró un miembro en la tienda con id ${storeId}`,
      );
    }
    return member;
  }

  async findOneById(id: string ) {
    const member = await this.memberRepo.findOne({
      where: { id },
      relations: ['role', 'addresses'],
    });
    if (!member) throw new NotFoundException('Usuario no encontrado');
    return member;
  }

  async findOneByEmail(email: string, storeId: string) {
    const member = await this.memberRepo.findOne({
      where: { email, storeId },
      relations: ['role', 'addresses'],
    });
    if (!member) throw new NotFoundException('Email inexistente');
    return member;
  }

  async updateMember(
    id: string,
    updateMemberDto: UpdateMemberDto,
    storeId: string,
  ) {
    const member = await this.memberRepo.findOne({
      where: { id, storeId: storeId },
      relations: ['role', 'addresses'],
    });

    if (!member)
      throw new NotFoundException('Usuario no encontrado');

    Object.assign(member, updateMemberDto);
    return this.memberRepo.save(member);
  }

  async findMemberByEmailWithStore(email: string, store: Store) {
    const existing = await this.memberRepo.findOne({
      where: { email, storeId: store.id },
      relations: [
      'role',
      'addresses',
      'addresses.city',
      'addresses.city.province'
  ],
    });
    if (!existing)
      throw new NotFoundException('No se ha encontrado el email indicado');
    return existing;
  }

  async updateMemberBillingInfo(
    memberId: string,
    dto: UpdateMemberBillingDto,
    storeId: string,
  ) {
    const member = await this.memberRepo.findOne({
      where: { id: memberId, storeId: storeId },
      relations: ['role', 'addresses'],
    });

    if (!member)
      throw new NotFoundException('Usuario no encontrado');

    if (dto.cuit !== undefined) {
      member.cuit = dto.cuit;
    }

    if (dto.taxCondition !== undefined) {
      member.taxCondition = dto.taxCondition;
    }

    return this.memberRepo.save(member);
  }

  async updateStatusMember(id: string, updateStatusMember: UpdateStatusMemberDto) {
      const member = await this.findOneById(id);
      member.isActive = updateStatusMember.isActive;
      return await this.memberRepo.save(member);
  }

  private async existMember(member: CurrentCustomer) {
    const {memberId, storeId} = member
    const count = await this.memberRepo.count({
      where: {
        id: memberId,
        storeId
      }
    })

    if(count === 0)
       throw new NotFoundException('El cliente no existe')

  }

    //                                                  //
    // -------------------- ADDRESS ------------------- //
    //                                                  // 

  async getAddresses(member: CurrentCustomer, isDefault?: boolean) {
    await this.existMember(member)

    const addresses = await this.addressService.findAllByMember(member.memberId);
    
    if(!isDefault)
      return addresses
    
    const defaultAddress = addresses.filter(address => address.isDefaul)

    return defaultAddress

  }

  async changeDefaultAddress(member: CurrentCustomer) {
    await this.existMember(member)
    return

  }



}
