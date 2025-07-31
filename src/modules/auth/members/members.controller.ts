import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { CurrentStore } from 'src/common/decorators/store/store.decorator';
import { Store } from 'src/modules/_platform/stores/entities/store.entity';
import { UpdateMemberBillingDto } from './dto/update-member-billing.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  async createMember(
    @Body() createMemberDto: CreateMemberDto,
    @CurrentStore() store: Store,
  ) {
    return await this.membersService.createMember(createMemberDto, store.id);
  }

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.membersService.findOneById(id);
  }

  @Patch(':id')
  updateMember(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.updateMember(id, updateMemberDto);
  }

  @Delete(':id')
  removeMember(@Param('id') id: string) {
    return this.membersService.removeMember(id);
  }

  @Patch(':id/billing')
  async updateBillingInfo(
    @Param('id') memberId: string,
    @Body() dto: UpdateMemberBillingDto,
  ) {
    return await this.membersService.updateMemberBillingInfo(memberId, dto);
  }
}
