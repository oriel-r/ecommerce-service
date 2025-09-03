import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PlatformUser } from "../../platform-users/entities/platform-user.entity";
import { Category } from "src/modules/inventory/categories/entities/category.entity";
import { Product } from "src/modules/inventory/products/entities/product.entity";
import { Cart } from "src/modules/sales/carts/entities/cart.entity";
import { Order } from "src/modules/sales/orders/entities/order.entity";
import { Payment } from "src/modules/sales/payments/entities/payment.entity";
import { StoreConfiguration } from "./store-configuration.entity";

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

    @OneToMany(() => Product, product => product.store, {nullable: true})
    products: Product[]

    @OneToMany(() => Cart, cart => cart.store, {nullable: true})
    carts: Cart[]

    @OneToMany(() => Order, order => order.store)
    orders: Order[]

    @OneToMany(() => Payment, payment => payment.store)
    payments: Payment[]

    @OneToOne(
        () => StoreConfiguration,
        storeConfig => storeConfig.store
    )
    configurations: StoreConfiguration
}
