import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CityService } from '../city/city.service';
import { MembersService } from 'src/modules/auth/members/members.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateCityDto } from '../city/dto/create-city.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository <Address>,
    private readonly cityService: CityService,
    @Inject(forwardRef(() => MembersService))
    private readonly memberService: MembersService
  ) {}

  async createAddress(createAddressDto: CreateAddressDto) {
    const { memberId } = createAddressDto;

    const cityData: CreateCityDto = {
    name: createAddressDto.city,           
    province: createAddressDto.province, 
  };
    const city = await this.cityService.findOrCreateCity(cityData);

    const member = await this.memberService.findOneById(memberId);

    const address = this.addressRepository.create({
      ...createAddressDto,
      city: city,
      member,
    });
    return await this.addressRepository.save(address);
  }

  async findAllByMember(memberId: string) {
    return await this.addressRepository.find({ where: { member: { id: memberId } }, relations: ['city'] });
  }

  async findOne(id: string) {
    const address = await this.addressRepository.findOne({ where: { id }, relations: ['city', 'member'] });
    if (!address) throw new NotFoundException('Dirección no encontrada');
    return address;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const address = await this.findOne(id);
    if (updateAddressDto.city) {
      const city = await this.cityService.findOneByName(updateAddressDto.city);
      address.city = city;
    }
    Object.assign(address, updateAddressDto);
    return await this.addressRepository.save(address);
  }

  async remove(id: string) {
    const address = await this.findOne(id);
    return await this.addressRepository.remove(address);
  }
}
