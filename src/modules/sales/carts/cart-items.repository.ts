import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItem } from "./entities/cart-item.entity";
import { Repository } from "typeorm";

@Injectable()
export class cartItemsRepository {
    constructor(
        @InjectRepository(CartItem) private readonly cartItemsRepository: Repository<CartItem>
    ) {}

    findOneBy(criteria: {
    cartId: string;
    productVariantId: string;
  }): Promise<CartItem | null> {
    return this.cartItemsRepository.findOneBy(criteria);
  }

  create(
    cartId: string,
    productVariantId: string,
    quantity: number,
  ): CartItem {
    return this.cartItemsRepository.create({
      cartId,
      productVariantId,
      quantity,
    });
  }

  async save(cartItem: CartItem): Promise<CartItem> {
    return this.cartItemsRepository.save(cartItem);
  }

  async delete(criteria: { cartId: string; productVariantId: string;}) {
    const result = await this.cartItemsRepository.delete(criteria);
    return result;
  }

  async clearByCartId(cartId: string) {
    const result = await this.cartItemsRepository.delete({ cartId });
    return result;
  }

}