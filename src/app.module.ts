import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlatformModule } from './modules/_platform/_platform.module';
import { SupportModule } from './modules/_support/_support.module';
import { AuthModule } from './modules/auth/auth.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { SalesModule } from './modules/sales/sales.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dbConfig } from './config/configuration';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RequestLoggerMiddleware } from './common/middlewares/request-logger/request-logger.middleware';


@Module({
  imports: [
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
    PlatformModule, 
    SupportModule, 
    AuthModule, 
    InventoryModule, 
    SalesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(RequestLoggerMiddleware).exclude('/favicon.ico').forRoutes('*')
  }
}
