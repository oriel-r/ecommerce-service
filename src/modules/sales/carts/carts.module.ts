import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { CartsRepository } from './carts.repository';
import { ProductModule } from 'src/modules/inventory/products/product.module';
import { cartItemsRepository } from './cart-items.repository';
import { MembersModule } from 'src/modules/auth/members/members.module';
import { AddressModule } from 'src/modules/_support/geography/address/address.module';
import { ShippingModule } from '../shipping/shipping.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem]), ProductModule, AddressModule, ShippingModule],
  controllers: [CartsController],
  providers: [CartsService, CartsRepository, cartItemsRepository],
  exports: [CartsService]
})
export class CartsModule {}
