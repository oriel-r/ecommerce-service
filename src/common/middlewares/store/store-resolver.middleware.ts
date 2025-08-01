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
  private logger = new Logger(StoreResolverMiddleware.name)

  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const rawHost = req.headers.host;
    const domain = rawHost?.split(':')[0];

    if (!domain) {
      throw new NotFoundException('Dominio no detectado');
    }



    const store = await this.storeRepository.findOne({
      where: { domain: 'localhost' },
    });

    if (!store) {
      throw new NotFoundException(`Tienda no encontrada para dominio: ${domain}`);
    }


    (req as any).store = store;

    next();
  }
}

