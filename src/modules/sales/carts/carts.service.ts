import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CartsRepository } from './carts.repository';
import { NotFoundError } from 'rxjs';
import { cartItemsRepository } from './cart-items.repository';
import { ProductService } from 'src/modules/inventory/products/product.service';
import { AddItemToCartDto } from './dto/add-item-to-cart.dto';
import { CurrentCustomer } from 'src/common/interfaces/current-customer.interface';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartsService {
  private logger = new Logger(CartsService.name)

    constructor(
        private readonly cartsRepository: CartsRepository,
        private readonly cartItemsRepository: cartItemsRepository,
        private readonly productsService: ProductService
    ) {}

    async getMemberCart(data: {memberId: string, storeId: string}) {
        const cart = await this.cartsRepository.findOrCreate(data.storeId, data.memberId)
        if(!cart) throw new InternalServerErrorException('hubo un error desconocido al traer el carrito')
        return cart
    }

    async addItem(member: CurrentCustomer, data: AddItemToCartDto) {
        const { productVariantId, quantity } = data;
        const { memberId, storeId } = member;

        const variant = await this.productsService.getVariantByIdAndStoreId(storeId ,productVariantId);
        if (!variant) {
        throw new NotFoundException('Producto no encontrado en esta tienda.');
        }

        if (variant.stock < quantity) {
        throw new BadRequestException('No hay suficiente stock disponible.');
        }

        const cart = await this.getMemberCart(member);

        let item = await this.cartItemsRepository.findOneBy({
        cartId: cart.id,
        productVariantId,
        });

        if (item) {
        const newQuantity = item.quantity + quantity;
        if (variant.stock < newQuantity) {
            throw new BadRequestException(
            'No hay suficiente stock para la cantidad total solicitada.',
            );
        }
        item.quantity = newQuantity;
        } else {
        item = this.cartItemsRepository.create(cart.id, productVariantId, quantity);
        }

        await this.cartItemsRepository.save(item);
        return this.getMemberCart(member);
    }

    async updateItemQuantity(
    member: CurrentCustomer,
    productVariantId: string,
    dto: UpdateCartItemDto,
    ) {
    const { quantity } = dto;
    const cart = await this.findCartOrFail(member.memberId);

    const item = await this.cartItemsRepository.findOneBy({
      cartId: cart.id,
      productVariantId,
    });

    if (!item) {
      throw new NotFoundException('El producto no se encuentra en el carrito.');
    }

    const variant = await this.productsService.getVariantByIdAndStoreId(member.storeId ,productVariantId);
    
    if(!variant) throw new NotFoundException('Variante no encontrada')
    
    if (variant.stock < quantity) {
      throw new BadRequestException('No hay suficiente stock disponible.');
    }

    item.quantity = quantity;
    await this.cartItemsRepository.save(item);
    return this.getMemberCart(member);
  }

  async removeItem(member: CurrentCustomer, productVariantId: string) {
    const cart = await this.findCartOrFail(member.memberId);

    const result = await this.cartItemsRepository.delete({
      cartId: cart.id,
      productVariantId,
    });

    if (result.affected) {
      throw new NotFoundException('El producto no se encuentra en el carrito.');
    }
    return this.getMemberCart(member);
  }

  async clearCart(member: CurrentCustomer) {
    const cart = await this.cartsRepository.findByMemberIdAndStoreId(member.storeId, member.memberId);
    if (!cart) {
      throw new NotFoundException('No se encontro el carrito')
    }

    await this.cartItemsRepository.clearByCartId(cart.id);
    cart.items = []
    await this.cartsRepository.save(cart)
    return cart
  }


  private async findCartOrFail(memberId: string) {
    const cart = await this.cartsRepository.findOneBy(memberId);
    if (!cart) {
      throw new NotFoundException(
        'No se encontró un carrito para este miembro.',
      );
    }
    return cart;
  }

}
