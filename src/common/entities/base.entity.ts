import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {

    @CreateDateColumn({
        type: "timestamptz",
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date

    @UpdateDateColumn({
        type: "timestamptz",
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date

    @DeleteDateColumn({
            type: 'timestamptz',
            nullable: true
        })
    deletedAt: Date
}
