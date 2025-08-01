import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PlatformUsersService } from '../_platform/platform-users/platform-users.service';
import { CreatePlatformUserWithStoreDto } from '../_platform/platform-users/dto/create-platform-user-with-store.dto';
import { Store } from '../_platform/stores/entities/store.entity';
import { StoresService } from '../_platform/stores/stores.service';
import { DataSource } from 'typeorm';
import { PlatformUser } from '../_platform/platform-users/entities/platform-user.entity';
import { plainToInstance } from 'class-transformer';
import { PlatformUserResponseDto } from '../_platform/platform-users/dto/platform-user-response.dto';
import { StoreResponseDto } from '../_platform/stores/dto/store-response.dto';
import { SignInPlatformUserDto } from './dto/signIn-platform-user.dto';
import { CreateMemberDto } from './members/dto/create-member.dto';
import { MembersService } from './members/members.service';
import { SignInMemberDto } from './dto/signIn-member.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly platformUserService: PlatformUsersService,
    private readonly storesService: StoresService,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
    private readonly memberService: MembersService,
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

      console.log('user.role:', user.role);

      const token = await this.jwtService.signAsync({
        sub: user.id,
        type: 'platform',
        storeId: store.id,
        role: user.role.name, 
      });

      return {
        token,
        user: plainToInstance(PlatformUserResponseDto, user, {
          excludeExtraneousValues: true,
        }),
        store: plainToInstance(StoreResponseDto, store, {
          excludeExtraneousValues: true,
        }),
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();

      Logger.error(
        'Error en registerPlatformUser',
        error?.stack || error?.message || error,
      );

      if (!(error instanceof ConflictException)) {
        throw new InternalServerErrorException(
          'Ocurrió un error inesperado al registrar el usuario',
        );
      }

      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async loginPlatformUser(dto: SignInPlatformUserDto) {
    const user = await this.platformUserService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    const valid = await this.platformUserService.checkPassword(
      dto.password,
      user.password,
    );
    if (!valid) throw new UnauthorizedException('Credenciales incorrectas');

    const store = await this.storesService.findByPlatformUserId(user.id);

    const payload = {
      sub: user.id,
      type: 'platform',
      storeId: store.id,
      role: user.role.name, 
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user,
    };
  }

  async registerMember(createMemberDto: CreateMemberDto, storeId: string) {
    const member = await this.memberService.createMember(
      createMemberDto,
      storeId,
    );
    const token = await this.jwtService.signAsync({
      sub: member?.id,
      type: 'customer',
      storeId: storeId,
      role: member?.role.name, 
    });

    return {
      token,
      member,
    };
  }

  async loginMember(store: Store, loginDto: SignInMemberDto) {
    const { email, password } = loginDto;
    const user = await this.memberService.findMemberByEmailWithStore(
      email,
      store,
    );
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      type: 'customer',
      storeId: user.storeId,
      role: user?.role.name,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      user,
      store,
    };
  }
}
