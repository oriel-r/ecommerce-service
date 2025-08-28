import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShippingMethod extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string
    

}