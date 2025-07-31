import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { City } from '../../city/entities/city.entity';
import { Member } from 'src/modules/auth/members/entities/member.entity';
import { Order } from 'src/modules/sales/orders/entities/order.entity';

@Entity()
export class Address {
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

  @OneToMany(
    () => Order,
    order => order.shippingAddress,
    {nullable: true}
  )
  shippingOrders: Order[]
}

