import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

// Importamos la configuración, entidades y los mocks mejorados
import { Store } from 'src/modules/_platform/stores/entities/store.entity'; // Asegúrate que la ruta sea correcta
import { PlatformUser } from 'src/modules/_platform/platform-users/entities/platform-user.entity'; // Asegúrate que la ruta sea correcta
import { defaultStoreMock, platformUserMock } from '../mocks'; // Ajusta la ruta a tu archivo de mocks
import { appDataSource } from 'src/database/data-source';

@Injectable()
export class StoreSeeder {
    private readonly logger = new Logger(StoreSeeder.name);
    private readonly dataSource: DataSource;

    constructor() {
        this.dataSource = appDataSource;
    }

    async run() {
        this.logger.log('Iniciando el seeder de Store...');

        const storeRepository = this.dataSource.getRepository(Store);
        const platformUserRepository = this.dataSource.getRepository(PlatformUser);

        const storeExists = await storeRepository.findOneBy({ 
            domain: defaultStoreMock.domain 
        });

        if (storeExists) {
            this.logger.warn(`La tienda con el dominio '${defaultStoreMock.domain}' ya existe. No se realizarán acciones.`);
            return;
        }

        const adminUser = await platformUserRepository.findOneBy({
            email: platformUserMock.email,
        });

        if (!adminUser) {
            this.logger.error(`Error crítico: El usuario dueño '${platformUserMock.email}' no fue encontrado.`);
            this.logger.error('Asegúrese de que el seeder de PlatformUser se ejecute antes que el seeder de Store.');
            return; 
        }

        try {
            this.logger.log(`Creando la tienda por defecto '${defaultStoreMock.name}'...`);

            const newStore = storeRepository.create({
                ...defaultStoreMock,
                platformUser: adminUser, // TypeORM se encarga de asignar la relación usando el objeto completo.
            });

            await storeRepository.save(newStore);
            this.logger.log(`Tienda '${defaultStoreMock.name}' creada exitosamente y asignada a '${adminUser.email}'.`);

        } catch (error) {
            this.logger.error(`Ocurrió un error inesperado al crear la tienda.`, error.stack);
        }
    }
}