import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Store } from '../../stores/entities/store.entity';
import { Role } from 'src/modules/auth/roles/entities/role.entity';

@Entity()
export class PlatformUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({unique: true})
  email: string;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Store, store => store.platformUser)
  stores: Store[];

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  role: Role;
}

