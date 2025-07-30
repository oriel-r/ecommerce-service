import { Store } from "src/modules/_platform/stores/entities/store.entity";
import { Member } from "src/modules/auth/members/entities/member.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./cart-item.entity";

@Entity('carts')
export class Cart extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('uuid', {name: 'store_id', nullable: false})
    storeId: string

    @ManyToOne(() => Store, store => store.carts, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({ name: 'store_id'})
    store: Store

    @Column('uuid', {name: 'member_id', nullable: false})
    memberId: string

    @OneToOne(() => Member, member => member.cart, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'member_id'})
    member: Member

    @OneToMany(() => CartItem, cartItem => cartItem.cart)
    items: CartItem[]
}