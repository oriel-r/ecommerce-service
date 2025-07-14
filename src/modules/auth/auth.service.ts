import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PlatformUsersService } from '../_platform/platform-users/platform-users.service';
import { CreatePlatformUserWithStoreDto } from '../_platform/platform-users/dto/create-platform-user-with-store.dto';
import { SignInPlatformUserDto } from './members/dto/signIn-platform.dto';
import { Store } from '../_platform/stores/entities/store.entity';
import { StoresService } from '../_platform/stores/stores.service';
import { DataSource } from 'typeorm';
import { PlatformUser } from '../_platform/platform-users/entities/platform-user.entity';
import { plainToInstance } from 'class-transformer';
import { PlatformUserResponseDto } from '../_platform/platform-users/dto/platform-user-response.dto';
import { StoreResponseDto } from '../_platform/stores/dto/store-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly platformUserService: PlatformUsersService,
    private readonly storesService: StoresService,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource, 
  ) {}

  async registerPlatformUser(dto: CreatePlatformUserWithStoreDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingStore = await queryRunner.manager.findOne(Store, {
        where: { domain: dto.domain },
      });
      if (existingStore) throw new ConflictException('Dominio ya registrado');

      const existingUser = await queryRunner.manager.findOne(PlatformUser, {
        where: { email: dto.email },
      });
      if (existingUser) throw new ConflictException('Email existente');

      const user = await this.platformUserService.create(
        {
          fullName: dto.fullName,
          email: dto.email,
          password: dto.password,
        },
        queryRunner.manager,
      );

      const store = await this.storesService.createStore(
        {
          name: dto.storeName,
          domain: dto.domain,
          platformUserId: user.id,
        },
        queryRunner.manager,
      );

      await queryRunner.commitTransaction();

      const token = await this.jwtService.signAsync({
        sub: user.id,
        type: 'platform',
        storeId: store.id,
      });

       return {
      token,
      user: plainToInstance(PlatformUserResponseDto, user, { excludeExtraneousValues: true }),
      store: plainToInstance(StoreResponseDto, store, { excludeExtraneousValues: true }),
    };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async loginPlatformUser(store: Store, dto: SignInPlatformUserDto) {
    const user = await this.platformUserService.findByEmailWithStore(dto.email, store);
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    const valid = await this.platformUserService.checkPassword(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Credenciales incorrectas');

    const payload = { sub: user.id, type: 'platform' };
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}
