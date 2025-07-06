import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlatformModule } from './modules/_platform/_platform.module';
import { SupportModule } from './modules/_support/_support.module';
import { AuthModule } from './modules/auth/auth.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { SalesModule } from './modules/sales/sales.module';

@Module({
  imports: [
    PlatformModule, 
    SupportModule, 
    AuthModule, 
    InventoryModule, 
    SalesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
