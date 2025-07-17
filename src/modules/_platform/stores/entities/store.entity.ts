import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PlatformUser } from "../../platform-users/entities/platform-user.entity";
import { Category } from "src/modules/inventory/categories/entities/category.entity";

@Entity()
export class Store {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ unique: true })
    domain: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => PlatformUser, user => user.stores, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'platform_user_id' })
    platformUser: PlatformUser;

    @OneToMany(() => Category, category => category.store, {nullable: true, })
    categories: Category[]
}
