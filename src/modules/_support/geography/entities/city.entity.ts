import { ApiProperty } from "@nestjs/swagger";
import { Address } from "cluster";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, DeepPartial } from "typeorm";
import { Province } from "./province.entity";
import { BaseEntity } from "src/common/entities/base.entity";

@Entity()
export class City extends BaseEntity {
  @ApiProperty({
    title: 'id',
    description: "city's id",
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    title: 'name',
    description: "city's name",
  })
  @Column('varchar', { nullable: false })
  name: string;

  @ApiProperty({
    title: 'cities',
    description: "city's province",
  })
  @ManyToOne(() => Province, (province) => province.cities, { eager: true })
  province: Province;
/*
  @ApiProperty({
    title: 'addresses',
  })
  @OneToMany(() => Address, (address) => address.city)
  addresses: Address[];
*/
  constructor(partial: DeepPartial<City>) {
    super();
    Object.assign(this, partial);
  }
}