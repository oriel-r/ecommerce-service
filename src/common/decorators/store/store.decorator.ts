import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Store } from 'src/modules/_platform/stores/entities/store.entity';

export const  CurrentStore = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Store => {
    const request = ctx.switchToHttp().getRequest();
     if (!request.store) {
      throw new UnauthorizedException('Tienda no detectada en la petición');
    }
    return request.store;
  },
);
