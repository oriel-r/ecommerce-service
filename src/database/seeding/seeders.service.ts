import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { appDataSource } from '../data-source';
import { PlatformUserSeeder } from './platform-seeder/platform-user.seeder';
import { StoreSeeder } from './store-seeder/store.seeder';
import { CategorySeeder } from './category-seeder/category.seeder';
import { ProductSeeder } from './products-seeder/products.seeder';

// Importa los seeders que vas a utilizar

@Injectable()
export class SeederService implements OnModuleInit {
    private readonly logger = new Logger(SeederService.name);

    constructor(
        private readonly platformUserSeeder: PlatformUserSeeder,
        private readonly storeSeeder: StoreSeeder,
        private readonly categorySeeder: CategorySeeder,
        private readonly productsSeeder: ProductSeeder
    ) {}


    async onModuleInit() {
        await this.seed();
    }

    async seed() {
        if (appDataSource.isInitialized) {
            this.logger.warn('La conexión ya estaba inicializada. No se reiniciará.');
        } else {
            try {
                this.logger.log('Inicializando conexión con la base de datos para los seeders...');
                await appDataSource.initialize();
                this.logger.log('Conexión establecida.');
            } catch (error) {
                this.logger.error('Error al inicializar la conexión con la base de datos.', error.stack);
                return; // Detener si no se puede conectar
            }
        }


        try {
            this.logger.log('--- Iniciando ejecución de seeders secuenciales ---');
            
            await this.platformUserSeeder.run();
            await this.storeSeeder.run();
            await this.categorySeeder.run();
            await this.productsSeeder.run();
            
            this.logger.log('--- Todos los seeders se han ejecutado exitosamente. ---');

        } catch (error) {
            this.logger.error('Un error crítico detuvo la ejecución de los seeders.', error.stack);
        } finally {
            if (appDataSource.isInitialized) {
                this.logger.log('Cerrando conexión de la base de datos de los seeders.');
                await appDataSource.destroy();
            }
        }
    }
}