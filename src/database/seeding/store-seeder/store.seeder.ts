import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Store } from 'src/modules/_platform/stores/entities/store.entity';
import { PlatformUser } from 'src/modules/_platform/platform-users/entities/platform-user.entity';
import { defaultStoreMock, platformUserMock } from '../mocks';
import { appDataSource } from 'src/database/data-source';

@Injectable()
export class StoreSeeder {
    private readonly logger = new Logger(StoreSeeder.name);
    private readonly dataSource: DataSource;

    constructor() {
        this.dataSource = appDataSource;
    }

    async run(): Promise<Store> { // <-- Devuelve la tienda creada
        this.logger.log('Iniciando el seeder de Store...');

        const storeRepository = this.dataSource.getRepository(Store);
        const platformUserRepository = this.dataSource.getRepository(PlatformUser);

        const storeExists = await storeRepository.findOneBy({ 
            domain: defaultStoreMock.domain 
        });

        if (storeExists) {
            this.logger.warn(`La tienda con el dominio '${defaultStoreMock.domain}' ya existe. Se usará esta tienda.`);
            return storeExists; // <-- Devuelve la tienda existente
        }

        const adminUser = await platformUserRepository.findOneBy({
            email: platformUserMock.email,
        });

        if (!adminUser) {
            throw new Error(
                `El usuario '${platformUserMock.email}' no fue encontrado. Ejecuta primero PlatformUserSeeder.`
            );
        }

        try {
            this.logger.log(`Creando la tienda por defecto '${defaultStoreMock.name}'...`);

            const newStore = storeRepository.create({
                ...defaultStoreMock,
                platformUser: adminUser, // TypeORM asigna la relación
            });

            const savedStore = await storeRepository.save(newStore);

            this.logger.log(`Tienda '${defaultStoreMock.name}' creada exitosamente y asignada a '${adminUser.email}'.`);

            return savedStore; // <-- Devuelve la tienda creada

        } catch (error) {
            this.logger.error(`Ocurrió un error inesperado al crear la tienda.`, error.stack);
            throw error; // Lanzar el error para que SeederService lo capture
        }
    }
}
