import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { OrderItemsRepository } from './order-items.repository';
import { CurrentCustomer } from 'src/common/interfaces/current-customer.interface';
import { CartsService } from '../carts/carts.service';
import { ProductService } from 'src/modules/inventory/products/product.service';
import { Order } from './entities/order.entity';
import { OrderStatus } from 'src/common/enums/orders/order-status.enum';
import { OrderItem } from './entities/order-item.entity';
import { Member } from 'src/modules/auth/members/entities/member.entity';
import { Store } from 'src/modules/_platform/stores/entities/store.entity';
import { MembersService } from 'src/modules/auth/members/members.service';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderNotification } from 'src/common/enums/orders/orders-notifications.enum';

@Injectable()
export class OrdersService {
    private logger = new Logger(OrdersService.name)

    constructor (
        private readonly ordersRepository: OrdersRepository,
        private readonly cartsService: CartsService,
        private readonly membersService: MembersService,
        private readonly productsService: ProductService,
        private readonly eventEmitter: EventEmitter2
    ) {}

    async createOrderFromCart(payload: CurrentCustomer): Promise<Order | null> {
        const cart = await this.cartsService.getMemberCart(payload);
        
        if (!cart || cart.items.length === 0) {
            throw new BadRequestException('El carrito está vacío.');
        }

        await this.productsService.validateStockForOrder(cart.items);

        const subTotal = cart.items.reduce(
            (sum, item) => sum + item.productVariant.price * item.quantity,
            0,
        );

        const totalAmount = subTotal + 9000;

        const member = await this.membersService.findOneByStore(payload.storeId, payload.memberId)

        const orderData: Partial<Order> = {
        member: member,
        store: {id: member.storeId} as Store,
        shippingAddress: member.addresses[0],
        subTotal,
        shippingCost: 9000,
        discountAmount: 0,
        totalAmount,
        status: OrderStatus.PENDING_PAYMENT,
        orderDate: new Date(),
        };

        const itemsData: Partial<OrderItem>[] = cart.items.map((item) => ({
        productVariantId: item.productVariantId,
        quantity: item.quantity,
        priceAtPurchase: item.productVariant.price,
        }));

        const variantsToUpdate = cart.items.map((item) => ({
        id: item.productVariantId,
        quantity: item.quantity,
        }));

        const newOrder = await this.ordersRepository.createOrderInTransaction(
        orderData,
        itemsData,
        variantsToUpdate,
        cart.id,
        );

        this.eventEmitter.emit(OrderNotification.CREATED, {orderId: newOrder.id})

        return this.ordersRepository.findOneBy({ id: newOrder.id });
    }

    async findAllForAdmin(storeId: string) {
    return await this.ordersRepository.find({
      where: { store: {id: storeId} }, 
      order: { createdAt: 'DESC' },
      relations: { 
        member: true,
        items: true,
      },
    });
  }

    async findAllForMember(memberId: string) {
        return await this.ordersRepository.find({
        where: { member: { id: memberId } }, 
        order: { createdAt: 'DESC' },
        relations: { 
            items: {
            productVariant: {
                product: true
            }
            },
            shippingAddress: true,
        },
        });
    }

    async findOne(orderId: string, memberId?: string): Promise<Order> {
    const criteria: FindOptionsWhere<Order> = { id: orderId };

    if (memberId) {
      criteria.member = { id: memberId };
    }

    const order = await this.ordersRepository.findOne(criteria);
    
    if (!order) {
      throw new NotFoundException('Orden no encontrada.');
    }
    return order;
    }

    async markAsPaid(orderId: string): Promise<Order> {
        const order = await this.ordersRepository.findOneBy({ id: orderId });
        if (!order) {
        throw new NotFoundException(
            `Orden con ID ${orderId} no encontrada para marcar como pagada.`,
        );
        }

        if (order.status !== OrderStatus.PENDING_PAYMENT) {
        throw new BadRequestException(
            'Solo las órdenes pendientes de pago pueden ser marcadas como pagadas.',
        );
        }

        order.status = OrderStatus.PAID;
        return this.ordersRepository.save(order);
    }
}
