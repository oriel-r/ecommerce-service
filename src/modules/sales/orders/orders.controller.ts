import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { Member } from 'src/modules/auth/members/entities/member.entity';
import { Order } from './entities/order.entity';
import { ApiWrappedResponse } from 'src/common/decorators/api-wrapped-response/api-wrapped-response.decorator';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { CurrentMember } from 'src/common/decorators/current-curstomer/current-customer.decorator';
import { CurrentCustomer } from 'src/common/interfaces/current-customer.interface';

@ApiTags('Orders')
@ApiBearerAuth() 
@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

//                                                  //
// ------------------- MEMBERS -------------------- //
//                                                  //

  @ApiOperation({
    summary: 'Create a new order from the current member cart',
    description: 'Converts the current member cart into a formal order with a PENDING_PAYMENT status.',
  })
  @ApiWrappedResponse(Order)
  @Post('orders')
  @UseGuards(AuthGuard)
  async createOrderFromMyCart(@CurrentMember() member: CurrentCustomer) {
    return await this.ordersService.createOrderFromCart(member);
  }
  
  @ApiOperation({
    summary: 'Get all orders for the current member',
    description: 'Retrieves a paginated list of orders belonging to the authenticated member.',
  })
  @Get('orders')
  @UseGuards(AuthGuard)
  async findMyOrders(
    @CurrentMember() member: Member,
  ) {
    return await this.ordersService.findAllForMember(member.id);
  }

  @ApiOperation({
    summary: 'Get a specific order for the current member',
    description: 'Retrieves a single order by its ID, ensuring it belongs to the authenticated member.',
  })
  @ApiWrappedResponse(Order)
  @Get('orders/:orderId')
  @UseGuards(AuthGuard)
  async findMyOrderById(
    @CurrentMember() member: CurrentCustomer,
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ) {
    return await this.ordersService.findOne(orderId, member.memberId);
  }
Z
//                                                  //
// ------------------- PLATFORM ------------------- //
//                                                  //

  @ApiOperation({
    summary: 'Get all orders for a specific store (Admin)',
    description: 'Retrieves a paginated list of all orders for a given store. Requires ADMIN role.',
  })
  @Get('stores/:storeId/orders')
  @UseGuards(AuthGuard)
  async findAllForStore(
    @Param('storeId', ParseUUIDPipe) storeId: string,
  ) {
    return this.ordersService.findAllForAdmin(storeId, );
  }

  @ApiOperation({
    summary: 'Get a specific order by ID (Admin)',
    description: 'Retrieves a single order by its ID within a store context. Requires ADMIN role.',
  })
  @ApiWrappedResponse(Order)
  @Get('stores/:storeId/orders/:orderId')
  @UseGuards(AuthGuard)
  async findOneForStore(
    @Param('storeId', ParseUUIDPipe) storeId: string,
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ) {
    return this.ordersService.findOne(orderId);

  }
}