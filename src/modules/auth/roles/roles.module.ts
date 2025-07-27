import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { StoresModule } from 'src/modules/_platform/stores/stores.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), forwardRef(() => StoresModule)],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
