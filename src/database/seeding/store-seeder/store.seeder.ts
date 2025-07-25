import { Injectable, Logger, OnModuleInit, NotFoundException, ConflictException } from '@nestjs/common';
import { PlatformUsersService } from 'src/modules/_platform/platform-users/platform-users.service';
import { StoresService } from 'src/modules/_platform/stores/stores.service';
import { platformUserMock, storeMock } from '../mocks';

@Injectable()
export class StoreSeeder {
    private readonly logger = new Logger(StoreSeeder.name);

    constructor(
        private readonly storesService: StoresService,
        private readonly platformUserService: PlatformUsersService,
    ) {}


    async seedDefaultStore() {
        try {
            const adminUser = await this.platformUserService.findByEmail(platformUserMock.email);

            if (!adminUser) {
                throw new NotFoundException(
                    `Seeder fallido: El usuario dueño '${platformUserMock.email}' no fue encontrado.`
                );
            }

            const storeData = storeMock(adminUser.id);
            
            const newStore = await this.storesService.createStore(storeData);
            this.logger.log(`Tienda por defecto '${newStore.name}' creada exitosamente.`);

        } catch (error) {
            if (error instanceof ConflictException) {
                this.logger.log('La tienda por defecto ya existe. No se requiere ninguna acción.');
            } else {
                this.logger.error('Fallo inesperado durante el seeding de la tienda:', error.stack);
            }
        }
    }
}