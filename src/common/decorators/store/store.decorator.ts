import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Store } from 'src/modules/_platform/stores/entities/store.entity';

export const  CurrentStore = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Store => {
    const request = ctx.switchToHttp().getRequest();
    return request.store;
  },
);
