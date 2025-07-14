import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    storeId: string;

    @Column({ unique: true })
    name: string;
}
