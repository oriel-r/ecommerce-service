import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { CurrentStore } from 'src/common/decorators/store/store.decorator';
import { Store } from 'src/modules/_platform/stores/entities/store.entity';

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

  /* @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  } */

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }
}
