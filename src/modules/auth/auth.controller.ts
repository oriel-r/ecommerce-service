import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreatePlatformUserWithStoreDto } from "../_platform/platform-users/dto/create-platform-user-with-store.dto";
import { CurrentStore } from "src/common/decorators/store/store.decorator";
import { Store } from "../_platform/stores/entities/store.entity";
import { SignInPlatformUserDto } from "./dto/signIn-platform-user.dto";
import { CreateMemberDto } from "./members/dto/create-member.dto";
import { SignInMemberDto } from "./dto/signIn-member.dto";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('platform/register')
  @ApiOperation({ summary: 'Registrar usuario de plataforma (dueño de tienda)' })
  @ApiResponse({ status: 201, description: 'Usuario de plataforma registrado correctamente' })
  @ApiResponse({ status: 400, description: 'Error en los datos de registro' })
  async registerPlatform(@Body() dto: CreatePlatformUserWithStoreDto) {
    return await this.authService.registerPlatformUser(dto);
  }

  @Post('member/register')
  @ApiOperation({ summary: 'Registrar miembro (cliente) para una tienda' })
  @ApiResponse({ status: 201, description: 'Miembro registrado correctamente' })
  @ApiResponse({ status: 400, description: 'Error en los datos de registro' })
  async registerMember(
    @Body() creatememberDto: CreateMemberDto,
    @CurrentStore() store: Store,
  ) {
    return await this.authService.registerMember(creatememberDto, store?.id);
  }

  @Post('platform/login')
  @ApiOperation({ summary: 'Login usuario de plataforma (dueño de tienda)' })
  @ApiResponse({ status: 200, description: 'Login exitoso, retorna token JWT' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async loginPlatform(@Body() dto: SignInPlatformUserDto) {
    return await this.authService.loginPlatformUser(dto);
  }

  @Post('member/login')
  @ApiOperation({ summary: 'Login miembro (cliente) de una tienda' })
  @ApiResponse({ status: 200, description: 'Login exitoso, retorna token JWT' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async loginMember(@CurrentStore() store: Store, @Body() dto: SignInMemberDto) {
    return await this.authService.loginMember(store, dto);
  }
}

