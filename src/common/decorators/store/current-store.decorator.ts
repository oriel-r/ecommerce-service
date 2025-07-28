import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const CurrentStoreId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.store) {
      throw new UnauthorizedException('Tienda no detectada en la petición');
    }
    return request.user.storeId;
  },
);