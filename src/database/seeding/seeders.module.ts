import { Module } from '@nestjs/common';
import { PlatformUserSeeder } from './platform-seeder/platform-user.seeder';
import { StoreSeeder } from './store-seeder/store.seeder';
import { PlatformModule } from 'src/modules/_platform/_platform.module';
import { StoresModule } from 'src/modules/_platform/stores/stores.module';
import { SeederService } from "./seeders.service";
import { CategoryModule } from 'src/modules/inventory/categories/category.module';
import { CategorySeeder } from './category-seeder/category.seeder';
import { ProductModule } from 'src/modules/inventory/products/product.module';
import { ProductSeeder } from './products-seeder/products.seeder';
import { MembersModule } from 'src/modules/auth/members/members.module';
import { RolesModule } from 'src/modules/auth/roles/roles.module';

@Module({
    imports: [PlatformModule, StoresModule, CategoryModule, ProductModule, MembersModule, RolesModule],
    providers: [SeederService, PlatformUserSeeder, StoreSeeder, CategorySeeder, ProductSeeder]
})
export class SeedersModule {}
