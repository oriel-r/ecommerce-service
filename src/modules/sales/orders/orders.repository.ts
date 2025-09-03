import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { DataSource, FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import { OrderItem } from "./entities/order-item.entity";
import { ProductVariant } from "src/modules/inventory/products/entities/product-variant.entity";
import { CartItem } from "../carts/entities/cart-item.entity";
import { paginate } from "src/common/utils/pagination.util";


interface PaginatedFindOptions {
  page: number;
  limit: number;
  where?: FindManyOptions<Order>['where'];
  order?: FindManyOptions<Order>['order'];
}

@Injectable()
export class OrdersRepository {
    constructor (
        @InjectRepository(Order) private readonly ordersRepository: Repository<Order>,
        @InjectDataSource() private readonly dataSource: DataSource
    ) {}

    create(data: Partial<Order>): Order {
        return this.ordersRepository.create(data);
    }

    async save(order: Order): Promise<Order> {
        return this.ordersRepository.save(order);
    }

    async find(options): Promise<Order[]| void[]> {
        return this.ordersRepository.find(options);
    }

    async findOne(criteria: FindOptionsWhere<Order>): Promise<Order | null> {
        return this.ordersRepository.findOne({
        where: criteria,
        relations: {
            items: {
            productVariant: {
                product: true,
            },
            },
            member: true,
            shippingAddress: true, // Asumo que quieres esto también
            payments: true,
            store: {
                platformUser: true
            }
        },
        });
    }

    async findOneBy(criteria: FindOptionsWhere<Order>): Promise<Order | null> {
        return this.ordersRepository.findOne({
        where: criteria,
        relations: {
            items: {
            productVariant: {
                product: true,
                },
            },
            member: true,
            payments: true
        },
        });
    }

    async findPaginated(options: PaginatedFindOptions) {
        const { page, limit, where, order } = options;

        const queryBuilder = this.ordersRepository.createQueryBuilder('order')
        .leftJoinAndSelect('order.member','member')
        .leftJoinAndSelect('order.items','item')
        .leftJoinAndSelect('item.productVariant','variant')
        .leftJoinAndSelect('variant.product','product'); 

        if(where) {
            queryBuilder.where(where)
        }

        return await queryBuilder.getMany();
    }

    async createOrderInTransaction(
        orderData: Partial<Order>,
        itemsData: Partial<OrderItem>[],
        variantsToUpdate: { id: string; quantity: number }[],
        cartId: string,
        
    ): Promise<Order> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const newOrder = await queryRunner.manager.save(
                queryRunner.manager.create(Order, orderData),
            );

            const orderItems = itemsData.map((item) =>
                queryRunner.manager.create(OrderItem, {
                ...item,
                orderId: newOrder.id,
                }),
            );
            await queryRunner.manager.save(orderItems);

            for (const variant of variantsToUpdate) {
                await queryRunner.manager.decrement(
                ProductVariant,
                { id: variant.id },
                'stock',
                variant.quantity,
                );
            }

            await queryRunner.manager.delete(CartItem, { cartId });

            await queryRunner.commitTransaction();
            return newOrder;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}