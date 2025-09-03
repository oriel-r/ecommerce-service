import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { City } from '../../city/entities/city.entity';
import { Member } from 'src/modules/auth/members/entities/member.entity';
import { Order } from 'src/modules/sales/orders/entities/order.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
@Index('IDX_unique_default_address_per_member', ['member'], {
    unique: true,
    where: '"is_default" IS TRUE'
})
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  street: string;

  @Column()
  postalCode: string;

  @Column({nullable: true})
  apartment_floor: string;

  @Column()
  country: string;

  @ManyToOne(() => City, (city) => city.addresses, { eager: true })
  city: City;

  @ManyToOne(() => Member, (member) => member.addresses, { onDelete: 'CASCADE' })
  member: Member;

  @Column({
    type: 'boolean',
    name: 'is_default',
    default: 'false'
  })
  isDefaul: boolean

  @OneToMany(
    () => Order,
    order => order.shippingAddress,
    {nullable: true}
  )
  shippingOrders: Order[]
}

