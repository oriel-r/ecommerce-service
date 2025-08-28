import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StoreConfiguration } from "./entities/store-configuration.entity";
import { Repository } from "typeorm";

@Injectable()
export class StoreConfigurationsRepository {
    private logger = new Logger(StoreConfigurationsRepository.name)

    constructor(
        @InjectRepository(StoreConfiguration)
        private readonly storeConfigurationsRepository: Repository<StoreConfiguration>
    ) {}

    async getByDomain(domain: string) {
        const storeConfig = await this.storeConfigurationsRepository.find({
            where: {
                store: {
                    domain
                }
            }
        });
        
        return storeConfig
    }

    async getByStoreId(id: string) {
        const storeConfig = await this.storeConfigurationsRepository.findOne({
            where: {
                store: {
                    id
                }
            }
        });
        
        return storeConfig
    }

    async create(storeConfig: Partial<StoreConfiguration>) {
        const newConfig = await this.storeConfigurationsRepository.save(
            this.storeConfigurationsRepository.create(storeConfig)
        )

        return newConfig
    }

    async save(storeConfig: StoreConfiguration) {
        return await this.storeConfigurationsRepository.save(storeConfig)
    }

}