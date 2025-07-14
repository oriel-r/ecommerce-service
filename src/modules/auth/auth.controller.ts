import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreatePlatformUserWithStoreDto } from "../_platform/platform-users/dto/create-platform-user-with-store.dto";
import { SignInPlatformUserDto } from "./members/dto/signIn-platform.dto";
import { CurrentStore } from "src/common/decorators/store/store.decorator";
import { Store } from "../_platform/stores/entities/store.entity";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('platform/register')
  async registerPlatform(@Body() dto: CreatePlatformUserWithStoreDto) {
    return await this.authService.registerPlatformUser(dto);
  }

  @Post('platform/login')
  async loginPlatform(@CurrentStore() store: Store, @Body() dto: SignInPlatformUserDto) {
    return await this.authService.loginPlatformUser(store, dto);
  }
}
