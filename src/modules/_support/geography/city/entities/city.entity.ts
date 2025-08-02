import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Province } from '../../province/entities/province.entity';
import { Address } from '../../address/entities/address.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Province, (province) => province.cities, { eager: true })
  province: Province;

  @OneToMany(() => Address, (address) => address.city)
  addresses: Address[];
}

