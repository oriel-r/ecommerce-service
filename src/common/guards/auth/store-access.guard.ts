import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Store } from "src/modules/_platform/stores/entities/store.entity";
import { StoresService } from "src/modules/_platform/stores/stores.service";

@Injectable()
export class StoreAccessGuard implements CanActivate {
  constructor(private readonly storeService: StoresService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const store: Store = req.store;

    if (!user || !store) {
      throw new ForbiddenException('Acceso denegado');
    }

    const hasAccess = await this.storeService.userHasAccessToStore(user.sub, store);
    if (!hasAccess) {
      throw new ForbiddenException('No tenés permisos para esta tienda');
    }

    return true;
  }
}
