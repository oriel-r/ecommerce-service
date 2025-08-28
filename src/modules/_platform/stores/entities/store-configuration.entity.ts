import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Store } from "./store.entity";

@Entity('store_configurations')
export class StoreConfiguration extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'jsonb',
        nullable: false,
        default: () => "'{}'"
    })
    data: Record<string, any>

    @Column({
        type: 'uuid',
        nullable: false,
        name: 'store_id'
    })
    storeId: string

    @OneToOne(
        () => Store,
        {nullable: false}
    )
    @JoinColumn({name: 'store_id'})
    store: Store

}