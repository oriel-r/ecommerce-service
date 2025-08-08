import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Address } from 'src/modules/_support/geography/address/entities/address.entity';
import { Exclude } from 'class-transformer';
import { Cart } from 'src/modules/sales/carts/entities/cart.entity';
import { Order } from 'src/modules/sales/orders/entities/order.entity';
import { TaxCondition } from 'src/common/enums/tax-condition.enum';

@Entity()
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  storeId: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column({ type: 'date'})
  birthDate: Date;

  @Exclude()
  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @Column()
  dni: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  cuit?: string;

  @Column({ 
    type: 'enum',
    enum: TaxCondition,
    default: TaxCondition.CONSUMIDOR_FINAL,
    nullable: true,
   })
  taxCondition?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @OneToMany(() => Address, (address) => address.member, { cascade: true })
  addresses: Address[];

  @OneToOne(() => Cart, cart => cart.member)
  cart: Cart

  @OneToMany(() => Order, order => order.member)
  orders: Order[]
}
