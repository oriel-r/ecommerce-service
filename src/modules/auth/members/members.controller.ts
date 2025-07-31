import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { UpdateMemberBillingDto } from './dto/update-member-billing.dto';
import { Store } from 'src/modules/_platform/stores/entities/store.entity';
import { CurrentStore } from 'src/common/decorators/store/store.decorator';
import { Roles } from 'src/common/decorators/roles/roles.decorators';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { StoreAccessGuard } from 'src/common/guards/auth/store-access.guard';

@UseGuards(AuthGuard, RolesGuard, StoreAccessGuard)
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @Roles('platform')
  async createMember(
    @Body() createMemberDto: CreateMemberDto,
    @CurrentStore() store: Store,
  ) {
    return await this.membersService.createMember(createMemberDto, store.id);
  }

  @Get()
  @Roles('platform')
  async findAll(@CurrentStore() store: Store) {
    return await this.membersService.findAll(store.id);
  }

  @Get(':id')
  @Roles('platform')
  async findOneById(
    @Param('id') id: string,
    @CurrentStore() store: Store,
  ) {
    return await this.membersService.findOneByStore(store.id, id);
  }

  @Patch(':id')
  @Roles('platform')
  async updateMember(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
    @CurrentStore() store: Store,
  ) {
    await this.membersService.findOneByStore(store.id, id);
    return await this.membersService.updateMember(id, updateMemberDto, store.id);
  }

  @Delete(':id')
  @Roles('platform')
  async removeMember(
    @Param('id') id: string,
    @CurrentStore() store: Store,
  ) {
    await this.membersService.findOneByStore(store.id, id);
    return await this.membersService.removeMember(id, store.id);
  }

  @Patch(':id/billing')
  @Roles('platform')
  async updateBillingInfo(
    @Param('id') memberId: string,
    @Body() dto: UpdateMemberBillingDto,
    @CurrentStore() store: Store,
  ) {
    await this.membersService.findOneByStore(store.id, memberId);
    return await this.membersService.updateMemberBillingInfo(memberId, dto, store.id);
  }
}

