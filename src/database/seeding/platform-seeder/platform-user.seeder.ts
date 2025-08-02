import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { PlatformUser } from 'src/modules/_platform/platform-users/entities/platform-user.entity'; 
import { platformUserMock } from '../mocks';
import { Role } from 'src/modules/auth/roles/entities/role.entity';
import { appDataSource } from 'src/database/data-source';

@Injectable()
export class PlatformUserSeeder {
    private readonly logger = new Logger(PlatformUserSeeder.name);
    private readonly dataSource: DataSource;

    constructor() {
        this.dataSource = appDataSource;
    }

    async run() {

        this.logger.log('Iniciando el seeder de PlatformUser...');

        const roleRepository = this.dataSource.getRepository(Role);
        const platformUserRepository = this.dataSource.getRepository(PlatformUser);

        let platformRole = await roleRepository.findOneBy({ name: 'platform' });

        if (!platformRole) {
            this.logger.log("El rol 'platform' no existe, creándolo...");
            platformRole = roleRepository.create({ name: 'platform' });
            await roleRepository.save(platformRole);
            this.logger.log("Rol 'platform' creado exitosamente.");
        } else {
            this.logger.log("El rol 'platform' ya existe.");
        }

        const adminUserExists = await platformUserRepository.findOneBy({
            email: platformUserMock.email,
        });

        if (adminUserExists) {
            this.logger.warn(`El usuario administrador con email '${platformUserMock.email}' ya existe. No se realizarán acciones.`);
            return; // Termina la ejecución si ya existe
        }

        try {
            this.logger.log(`Creando el usuario administrador: ${platformUserMock.email}`);
            
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(platformUserMock.password, salt);

            const newUser = platformUserRepository.create({
                fullName: platformUserMock.fullName,
                email: platformUserMock.email,
                password: hashedPassword,
                role: platformRole, 
            });

            await platformUserRepository.save(newUser);
            this.logger.log('Usuario administrador creado exitosamente.');

        } catch (error) {
            this.logger.error('Ocurrió un error al crear el usuario administrador.', error.stack);
        }
    }
}