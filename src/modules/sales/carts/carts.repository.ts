import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "./entities/cart.entity";
import { Repository } from "typeorm";

@Injectable()
export class CartsRepository {
    constructor(
        @InjectRepository(Cart) private readonly cartsRepostory: Repository<Cart>
    ) {}

    async findOneBy(memberId: string) {
        return await this.cartsRepostory.findOneBy({memberId})
    }

    async findOrCreate(storeId: string, memberId: string) {
        let cart = await this.findByMemberIdAndStoreId(storeId, memberId)

        if(cart) {
            return cart
        }

        await this.cartsRepostory.save(
            this.cartsRepostory.create({
                memberId,
                storeId
            })
        )

        cart = await this.findByMemberIdAndStoreId(storeId, memberId)

        return cart
    }

    async findByMemberIdAndStoreId(storeId: string, memberId: string) {
        const cart = await this.cartsRepostory.findOne({
            where: {
                memberId,
                storeId
            },
            relations: {items: {productVariant: true}}
        })
        
        return cart
    }

    async save(cart: Cart): Promise<Cart> {
        return this.cartsRepostory.save(cart);
    }
}