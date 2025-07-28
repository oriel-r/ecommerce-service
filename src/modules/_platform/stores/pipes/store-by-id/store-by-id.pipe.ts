import { Injectable, PipeTransform } from '@nestjs/common';
import { Store } from 'src/modules/_platform/stores/entities/store.entity';
import { StoresService } from '../../stores.service';

@Injectable()
export class StoreByIdPipe implements PipeTransform {
  constructor (
    private readonly storeService: StoresService
  )  {}
  
  async transform(value: string) {
    return await this.storeService.findOne(value)
  }

}
