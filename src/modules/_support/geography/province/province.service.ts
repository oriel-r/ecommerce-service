import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Province } from './entities/province.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepo: Repository<Province>,
  ) {}

  async findOrCreateProvince(
    createProvince: CreateProvinceDto,
  ): Promise<Province> {
    const { name } = createProvince;
    let province = await this.provinceRepo.findOne({ where: { name } });
    if (!province) {
      province = this.provinceRepo.create({ name });
      await this.provinceRepo.save(province);
    }
    return province;
  }

  async findAll() {
    return this.provinceRepo.find({ relations: ['cities'] });
  }

  async findOneById(id: string) {
    const province = await this.provinceRepo.findOne({ where: { id } });
    if (!province) throw new NotFoundException('Provincia no encontrada');
    return province;
  }

  async findOneByName(name: string) {
    const province = await this.provinceRepo.findOne({ where: { name } });
    if (!province) throw new NotFoundException('Provincia no encontrada');
    return province;
  }

  update(id: number, updateProvinceDto: UpdateProvinceDto) {
    return `This action updates a #${id} province`;
  }

  remove(id: number) {
    return `This action removes a #${id} province`;
  }
}
