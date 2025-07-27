import { ConflictException, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { PlatformUsersService } from "src/modules/_platform/platform-users/platform-users.service";
import { platformUserMock } from "../mocks";
import { StoreSeeder } from "../store-seeder/store.seeder";

@Injectable()
export class PlatformUserSeeder {

    private logger = new Logger('PlatformUserSeeder')
    private platformUser = platformUserMock

    constructor(
        private readonly platformUserService: PlatformUsersService,
        private readonly storeSeeder: StoreSeeder
    ) {}
    
    async seedAdminUser() {
        try {
            const newUser = await this.platformUserService.create(this.platformUser)
            this.logger.log('Se añadio el usuario admin a la base de datos')
        } catch (error) {
            if(error instanceof ConflictException) {
                this.logger.log('El usuarío admin ya esta registrado')
            } else {
                this.logger.log('Hubo un error desconocido al registrar el usuario admin')
            }
        }
    }

}