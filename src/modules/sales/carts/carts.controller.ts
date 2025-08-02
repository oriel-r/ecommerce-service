import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { CurrentMember } from 'src/common/decorators/current-curstomer/current-customer.decorator';
import { CurrentCustomer } from 'src/common/interfaces/current-customer.interface';
import { ApiOperation } from '@nestjs/swagger';
import { ApiWrappedResponse } from 'src/common/decorators/api-wrapped-response/api-wrapped-response.decorator';
import { Cart } from './entities/cart.entity';
import { AddItemToCartDto } from './dto/add-item-to-cart.dto';
import { Member } from 'src/modules/auth/members/entities/member.entity';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Roles } from 'src/common/decorators/roles/roles.decorators';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';

@Controller('carts')
@UseGuards(AuthGuard)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @ApiOperation({
    description: 'get cart'
  })
  @ApiWrappedResponse(Cart)
  @Get()
  async get(@CurrentMember() data: CurrentCustomer) {
    return await this.cartsService.getMemberCart(data)
  }

  @Post('items')
  async addItem(
    @CurrentMember() member: CurrentCustomer,
    @Body() data: AddItemToCartDto ) {
    return await this.cartsService.addItem(member, data)
  }

  @Patch('items/:productVariantId')
  async updateMyCartItem(
    @CurrentMember() member: CurrentCustomer,
    @Param('productVariantId', ParseUUIDPipe) productVariantId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartsService.updateItemQuantity(
      member,
      productVariantId,
      updateCartItemDto,
    );
  }

  @Delete('items/:productVariantId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeMyCartItem(
    @CurrentMember() member: CurrentCustomer,
    @Param('productVariantId', ParseUUIDPipe) productVariantId: string,
  ) {
    return this.cartsService.removeItem(member, productVariantId);

  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async clearMyCart(@CurrentMember() member: CurrentCustomer) {
    return await this.cartsService.clearCart(member);
  }
}
