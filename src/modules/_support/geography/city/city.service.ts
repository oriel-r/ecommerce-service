import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';
import { ProvinceService } from '../province/province.service';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
    private readonly provinceService: ProvinceService
  ) {}

  async findOrCreateCity({ name, province }: CreateCityDto): Promise<City> {
  const newProvince = await this.provinceService.findOrCreateProvince({ name: province });

  let city = await this.cityRepo.findOne({
    where: { name, province: { id: newProvince.id } },
    relations: ['province'],
  });

  if (!city) {
    city = this.cityRepo.create({ name,  province: newProvince,  });
    await this.cityRepo.save(city);
  }

  return city;
}

  async findAll() {
    return this.cityRepo.find();
  }

  async findOne(id: string) {
    const city = await this.cityRepo.findOne({where: {id}});
    if (!city) throw new NotFoundException('Ciudad no encontrada');
    return city;
  }

  async findOneByName(name: string) {
    const city = await this.cityRepo.findOne({where: {name}});
    if (!city) throw new NotFoundException('Ciudad no encontrada');
    return city;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
