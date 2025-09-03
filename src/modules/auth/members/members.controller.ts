import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseBoolPipe,
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
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Member } from './entities/member.entity';
import { UpdateStatusMemberDto } from './dto/update-status-member.dto';
import { boolean } from 'yargs';
import { CurrentMember } from 'src/common/decorators/current-curstomer/current-customer.decorator';
import { CurrentCustomer } from 'src/common/interfaces/current-customer.interface';

@ApiTags('Members')
@UseGuards(AuthGuard, RolesGuard, StoreAccessGuard)
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @ApiOperation({ summary: 'Crear un nuevo miembro' })
  @ApiResponse({ status: 201, description: 'Miembro creado exitosamente' })
  @ApiResponse({ status: 409, description: 'El correo electrónico ya está registrado' })
  @Post()
  @Roles('platform')
  async createMember(
    @Body() createMemberDto: CreateMemberDto,
    @CurrentStore() store: Store,
  ) {
    return await this.membersService.createMember(createMemberDto, store.id);
  }

  
  @ApiOperation({ summary: 'Listar todos los miembros de la tienda actual' })
  @ApiResponse({ status: 200, description: 'Lista de miembros retornada correctamente' })
  @Get()
  @Roles('platform')
  async findAll(@CurrentStore() store: Store) {
    return await this.membersService.findAll(store.id);
  }

  @ApiOperation({ summary: 'Obtener un miembro por su ID' })
  @ApiParam({ name: 'id', description: 'ID del miembro' })
  @ApiResponse({ status: 200, description: 'Miembro encontrado' })
  @ApiResponse({ status: 404, description: 'Miembro no encontrado o no pertenece a la tienda' })
  @Get(':id')
  @Roles('platform')
  async findOneById(
    @Param('id') id: string,
    @CurrentStore() store: Store,
  ) {
    return await this.membersService.findOneByStore(store.id, id);
  }

  @ApiOperation({ summary: 'Actualizar información de un miembro' })
  @ApiParam({ name: 'id', description: 'ID del miembro a actualizar' })
  @ApiResponse({ status: 200, description: 'Miembro actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Miembro no encontrado o no pertenece a la tienda' })
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

  @ApiOperation({ summary: 'Actualizar información de facturación del miembro' })
  @ApiParam({ name: 'id', description: 'ID del miembro' })
  @ApiResponse({ status: 200, description: 'Información de facturación actualizada' })
  @ApiResponse({ status: 404, description: 'Miembro no encontrado o no pertenece a la tienda' })
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

  @Patch(':id/status')
    @ApiOperation({ summary: 'Actualizar el estado de un usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID de el usuario' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente', type: Member })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    async updateStatusMember(@Param('id') id: string, @Body() updateStatusMemberDto: UpdateStatusMemberDto) {
      return await this.membersService.updateStatusMember(id, updateStatusMemberDto);
    }

    //                                                  //
    // -------------------- ADDRESS ------------------- //
    //                                                  // 

    @ApiOperation({
      summary: 'get addresses'
    })
    @ApiQuery({
      name: 'isDefaul',
      required: false,
      type: boolean,
      description: 'If you send this in true return the default address'
    })
    @Get('address')
    async getMemberAdresses(
      @CurrentMember() member: CurrentCustomer,
      @Query(
        'isDefault',
        new DefaultValuePipe(false),
        new ParseBoolPipe({optional: true})
      )
      isDefault?: boolean,
    ) {
      return await this.membersService.getAddresses(member, isDefault)
    }

}

