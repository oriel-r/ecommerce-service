import { Exclude } from "class-transformer";
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {

    @CreateDateColumn({
        type: "timestamptz",
        default: () => 'CURRENT_TIMESTAMP',
    })
    @Exclude()
    createdAt: Date

    @UpdateDateColumn({
        type: "timestamptz",
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    @Exclude()
    updatedAt: Date

    @DeleteDateColumn({
          type: 'timestamptz',
        nullable: true,
    })
    @Exclude()
    deletedAt: Date
}
