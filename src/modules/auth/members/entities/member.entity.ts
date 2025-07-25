import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

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

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @Column()
  dni: string;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  role: Role;
}
