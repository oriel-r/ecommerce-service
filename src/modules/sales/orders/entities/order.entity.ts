import { BaseEntity } from "src/common/entities/base.entity";
import { Store } from "src/modules/_platform/stores/entities/store.entity";
import { Member } from "src/modules/auth/members/entities/member.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { OrderItem } from "./order-item.entity";

@Entity('orders')
export class Order extends BaseEntity{
    
    @PrimaryGeneratedColumn('uuid')
    id: string
    
 @Column({type: 'decimal',
        precision: 12,
        scale: 2,
        name: 'sub_total',
        nullable: false
    })
    subTotal: Number

    @Column({
        type: 'decimal',
        precision: 12,
        scale: 2,
        name: 'shipping_cost',
        nullable: false
    })
    shippingCost: Number

    @Column({
        type: 'decimal',
        precision: 12,
        scale: 2,
        name: 'discount_amount',
        nullable: false
    })
    discountAmount: Number

    @Column({
        type: 'decimal',
        precision: 12,
        scale: 2,
        name: 'total_amount',
        nullable: false
    })
    totalAmount: Number

    @OneToMany(
        () => OrderItem,
        orderItem => orderItem.order,
        {nullable: true}
    )
    items: OrderItem[]
    
    @ManyToOne(
        () => Store,
        store => store ,
        {nullable: false, onDelete: 'CASCADE'}
    )
    @JoinColumn({name: 'store_id'})
    store: Store
    
    @RelationId((order: Order) => order.store)
    storeId: string
    
    @ManyToOne(
        () => Member,
        member => member,
        {nullable: false, onDelete: 'CASCADE'}
    )
    @JoinColumn({name: 'member_id'})
    member: Member

    @RelationId((order: Order) => order.member)
    memberId: string

}