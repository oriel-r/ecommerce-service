import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "../../members/entities/member.entity";

@Index(['storeId', 'name'], { unique: true }) 
@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: true})
    storeId: string;

    @Column()
    name: string;

    @OneToMany(() => Member, member => member.role)
    members: Member[];
}
