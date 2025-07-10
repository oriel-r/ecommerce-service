import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeepPartial, ManyToOne } from "typeorm";
import { City } from "./city.entity";
import { BaseEntity } from "src/common/entities/base.entity";
import { Country } from "./country.entity";

@Entity()
export class Province extends BaseEntity {
  @ApiProperty({
    title: 'id',
    description: "province's id",
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    title: 'name',
    description: "province's name",
  })
  @Column('varchar', { nullable: false })
  name: string;

  @ApiProperty({
    description: "Province's country"
  })
  @ManyToOne(() => Country, country => country.provinces, {nullable: false})
  country: Country;

  @ApiProperty({
    title: 'cities',
    description: "province's cities",
  })
  @OneToMany(() => City, (city) => city.province)
  cities: City[];



  constructor(partial: DeepPartial<Province>) {
    super();
    Object.assign(this, partial);
  }
}