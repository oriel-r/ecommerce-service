import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderItem } from "./entities/order-item.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderItemsRepository {
    constructor (
        @InjectRepository(OrderItem) private readonly orderItemsRepository: Repository<OrderItem>
    ) {}
}