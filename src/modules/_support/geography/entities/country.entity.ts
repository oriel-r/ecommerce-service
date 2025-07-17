import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Province } from "./province.entity";

@Entity()
export class Country extends BaseEntity {

    @ApiProperty({
        description: 'Autogenrated ID',
        type: 'string'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
        description: "Counstry's name",
        type: 'string',
        example: "Argentina"
    })
    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string

    @ApiProperty({
        description: "Country's provinces"
    })
    @OneToMany(() => Province, province => province.country, {nullable: true})
    provinces: Province[]
}