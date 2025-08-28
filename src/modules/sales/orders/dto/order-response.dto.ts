import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { ProductVariant } from 'src/modules/inventory/products/entities/product-variant.entity';
import { Product } from 'src/modules/inventory/products/entities/product.entity';
import { OrderStatus } from 'src/common/enums/orders/order-status.enum';
import { Payment } from '../../payments/entities/payment.entity';

// --- Clases Internas para la Estructura de la Respuesta ---

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

class VariantInOrderItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: false })
  sku?: string;

  @ApiProperty()
  images: string[];
  
  @ApiProperty({ required: false })
  optionName?: string;
  
  @ApiProperty({ required: false })
  optionValue?: string;
  
  @ApiProperty({ type: () => ProductSummaryDto })
  @Type(() => ProductSummaryDto)
  product: ProductSummaryDto;

  constructor(variant: ProductVariant) {
    this.id = variant.id;
    this.sku = variant.sku;
    this.images = variant.images;
    this.optionName = variant.optionName;
    this.optionValue = variant.optionValue;
    this.product = new ProductSummaryDto(variant.product);
  }
}

class OrderItemResponseDto {
  @ApiProperty()
  productVariantId: string;
  
  @ApiProperty()
  quantity: number;

  @ApiProperty({ description: 'Precio unitario del producto al momento de la compra.' })
  price: number;
  
  @ApiProperty({ description: 'Subtotal para esta línea de ítem (precio * cantidad).' })
  subtotal: number;
  
  @ApiProperty({ type: () => VariantInOrderItemDto })
  @Type(() => VariantInOrderItemDto)
  variant: VariantInOrderItemDto;

  constructor(orderItem: OrderItem) {
    this.productVariantId = orderItem.productVariantId;
    this.quantity = orderItem.quantity;
    this.price = Number(orderItem.priceAtPurchase);
    this.subtotal = this.price * this.quantity;
    this.variant = new VariantInOrderItemDto(orderItem.productVariant);
  }
}

class OrderSummaryDto {
  @ApiProperty()
  subTotal: number;
  
  @ApiProperty()
  discountAmount: number;
  
  @ApiProperty()
  shippingCost: number;
  
  @ApiProperty()
  totalAmount: number;

  constructor(order: Order) {
    this.subTotal = Number(order.subTotal);
    this.discountAmount = Number(order.discountAmount);
    this.shippingCost = Number(order.shippingCost);
    this.totalAmount = Number(order.totalAmount);
  }
}

// --- DTO Principal de Respuesta ---

export class OrderResponseDto {
  @ApiProperty()
  id: string;
  
  @ApiProperty()
  orderDate: Date;

  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;
  
  @ApiProperty({ type: () => OrderItemResponseDto, isArray: true })
  @Type(() => OrderItemResponseDto)
  items: OrderItemResponseDto[];

  @ApiProperty({ type: () => OrderSummaryDto })
  @Type(() => OrderSummaryDto)
  summary: OrderSummaryDto;

  @ApiProperty({ type: () => Payment, isArray: true })
  payments: Payment[];

  constructor(order: Order) {
    // 1. Mapeo de Propiedades Base
    this.id = order.id;
    this.orderDate = order.orderDate;
    this.status = order.status;
    
    this.items = order.items.map(item => new OrderItemResponseDto(item));
    
    this.summary = new OrderSummaryDto(order);

    this.payments = order.payments || [];
  }
}