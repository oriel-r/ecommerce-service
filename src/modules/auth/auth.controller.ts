import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreatePlatformUserWithStoreDto } from "../_platform/platform-users/dto/create-platform-user-with-store.dto";
import { CurrentStore } from "src/common/decorators/store/store.decorator";
import { Store } from "../_platform/stores/entities/store.entity";
import { SignInPlatformUserDto } from "./dto/signIn-platform-user.dto";
import { CreateMemberDto } from "./members/dto/create-member.dto";
import { SignInMemberDto } from "./dto/signIn-member.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('platform/register')
  async registerPlatform(@Body() dto: CreatePlatformUserWithStoreDto) {
    return await this.authService.registerPlatformUser(dto);
  }

  @Post('member/register')
  async registerMember(
    @Body() creatememberDto: CreateMemberDto,
    @CurrentStore() store: Store,
  ) {
    return await this.authService.registerMember(creatememberDto, store?.id);
  }

  @Post('platform/login')
  async loginPlatform(@Body() dto: SignInPlatformUserDto) {
    return await this.authService.loginPlatformUser(dto);
  }

  @Post('member/login')
  async loginMember(@CurrentStore() store: Store, @Body() dto: SignInMemberDto) {
    return await this.authService.loginMember(store, dto);
  }
}
