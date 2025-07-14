import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PlatformUser } from "../../platform-users/entities/platform-user.entity";

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
}
