import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';
import { ProductVariant } from 'src/modules/inventory/products/entities/product-variant.entity';
import { Product } from 'src/modules/inventory/products/entities/product.entity';
import { string } from 'yargs';
import { ShippingOptionDto } from '../../shipping/dto/shipping-option.dto';

interface CreateCartResponse {
  cart: Cart,
  shippingOptions: ShippingOptionDto[]
}


class ProductSummaryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
  
  @ApiProperty({ required: false })
  description?: string;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
  }
}

class ProductVariantResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ description: 'El precio final de venta (con descuento de variante ya aplicado).' })
  price: number;

  @ApiProperty({ description: 'El precio de lista original, sin descuentos.' })
  listPrice: number;

  @ApiProperty({ description: 'El porcentaje de descuento aplicado a esta variante.' })
  discountPercentage: number | null;
  
  @ApiProperty()
  stock: number;

  @ApiProperty({ type: () => ProductSummaryDto })
  @Type(() => ProductSummaryDto)
  product: ProductSummaryDto;

  @ApiProperty({type: 'string', isArray: true})
  images: string[]
  

  constructor(variant: ProductVariant) {
    this.id = variant.id;
    this.price = Number(variant.price); // 
    this.listPrice = Number(variant.listPrice); 
    this.discountPercentage = variant.discountPercentage;
    this.stock = variant.stock;
    this.images = variant.images
    this.product = new ProductSummaryDto(variant.product);
  }
}

class CartItemResponseDto {
  @ApiProperty()
  quantity: number;
  
  @ApiProperty({ type: () => ProductVariantResponseDto })
  @Type(() => ProductVariantResponseDto)
  variant: ProductVariantResponseDto;

  constructor(cartItem: CartItem) {
    this.quantity = cartItem.quantity
    this.variant = new ProductVariantResponseDto(cartItem.productVariant);
  }
}

class CartSummaryDto {
  @ApiProperty({ description: 'Suma total de la cantidad de productos en el carrito.' })
  totalQuantity: number;

  @ApiProperty({ description: 'Suma de los precios de lista de todos los items, sin descuentos de cupón.' })
  subtotal: number;

  @ApiProperty({ description: 'Monto total descontado por el cupón aplicado.' })
  couponDiscount: number;

  @ApiProperty({ description: 'Costo de envío (placeholder).' })
  shipping: number;

  @ApiProperty({ description: 'Precio final a pagar (subtotal - couponDiscount + shipping).' })
  total: number;
}


export class CartResponseDto {
  @ApiProperty()
  cartId: string;

  @ApiProperty()
  storeId: string;

  @ApiProperty({ type: () => CartItemResponseDto, isArray: true })
  @Type(() => CartItemResponseDto)
  items: CartItemResponseDto[];

  @ApiProperty({ type: () => CartSummaryDto })
  @Type(() => CartSummaryDto)
  summary: CartSummaryDto;

  constructor({cart, shippingOptions}: CreateCartResponse ) {
    this.cartId = cart.id;
    this.storeId = cart.storeId;
    this.items = cart.items.map(item => new CartItemResponseDto(item));
    const summary = new CartSummaryDto();
    summary.totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
    summary.subtotal = this.items.reduce(
      (sum, item) => sum + (item.variant.price * item.quantity),
      0
    );
    summary.shipping = shippingOptions[0].cost
    summary.total = summary.subtotal + summary.shipping;
    this.summary = summary;
  }
}