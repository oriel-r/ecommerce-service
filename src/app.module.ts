import { MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlatformModule } from './modules/_platform/_platform.module';
import { SupportModule } from './modules/_support/_support.module';
import { AuthModule } from './modules/auth/auth.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { SalesModule } from './modules/sales/sales.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RequestLoggerMiddleware } from './common/middlewares/request-logger/request-logger.middleware';
import { JwtModule } from '@nestjs/jwt';
import { Store } from './modules/_platform/stores/entities/store.entity';
import { StoreResolverMiddleware } from './common/middlewares/store/store-resolver.middleware';
import { dbConfig } from './database/data-source';
import { RolesService } from './modules/auth/roles/roles.service';
import { SeedersModule } from './database/seeding/seeders.module'; 

 
@Module({
  imports: [
    TypeOrmModule.forFeature([Store]), 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', 'env'],
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const config = configService.get<TypeOrmModuleOptions>('postgres');
        
        if (!config) {
          throw new Error('Database configuration not found');
        }
        return config;
      },
    }),
    EventEmitterModule.forRoot({
      wildcard: true
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN') || '7d',
        },
      }),
    }),
    PlatformModule, 
    SupportModule, 
    AuthModule, 
    InventoryModule, 
    SalesModule, SeedersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule, OnApplicationBootstrap  {
  constructor(private readonly rolesService: RolesService) {} 
  
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply( StoreResolverMiddleware , RequestLoggerMiddleware)
    .exclude(
    '/favicon.ico',
    '/auth/platform/register',
    '/auth/platform/login'
  )
    .forRoutes('*')
  }
  async onApplicationBootstrap() {
    await this.rolesService.createRoleIfNotExists('customer');
    await this.rolesService.createRoleIfNotExists('platform');
  }
}
