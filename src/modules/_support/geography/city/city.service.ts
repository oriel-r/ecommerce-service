import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';
import { Province } from '../province/entities/province.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,

    @InjectRepository(Province)
    private readonly provinceRepo: Repository<Province>,
  ) {}

  async create(dto: CreateCityDto) {
    const province = await this.provinceRepo.findOne({ where: {id: dto.provinceId }});
    if(!province) throw new NotFoundException('Provincia no encontrada')
    const city = this.cityRepo.create({ name: dto.name, province });
    return this.cityRepo.save(city);
  }

  async findAll() {
    return this.cityRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
