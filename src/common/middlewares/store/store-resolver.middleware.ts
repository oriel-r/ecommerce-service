import {
  Injectable,
  Logger,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from 'src/modules/_platform/stores/entities/store.entity';

@Injectable()
export class StoreResolverMiddleware implements NestMiddleware {
  private logger = new Logger(StoreResolverMiddleware.name);

  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const rawHost = req.headers.host; // ej: mitienda.tiendaxtotal.com o localhost:3000
    const hostWithoutPort = rawHost?.split(':')[0]; 
    if (!hostWithoutPort) {
      throw new NotFoundException('Dominio no detectado');
    }

    let subdomain: string | null = null;
    const parts = hostWithoutPort.split('.');

    // Caso 1: localhost (dev)
    if (hostWithoutPort.includes('localhost')) {
      subdomain = 'localhost';
      this.logger.debug(`Detectado localhost -> usando dominio: ${subdomain}`);
    }
    // Caso 2: subdominio válido en producción
    else if (parts.length >= 3) {
      subdomain = parts[0].toLowerCase(); // ej: "mitienda" en mitienda.tiendaxtotal.com
      this.logger.debug(`Subdominio detectado: ${subdomain}`);
    }
    // Caso 3: dominio raíz sin subdominio (ej: tiendaxtotal.com)
    else {
      this.logger.warn(`Request sin subdominio: ${hostWithoutPort}`);
      throw new NotFoundException(
        `No se detectó subdominio en: ${hostWithoutPort}`,
      );
    }

    const store = await this.storeRepository.findOne({
      where: { domain: subdomain },
      relations: ['platformUser'],
    });

    if (!store) {
      throw new NotFoundException(
        `Tienda no encontrada para dominio: ${subdomain}`,
      );
    }

    // Guardar la tienda en el request
    (req as any).store = store;

    next();
  }
}


