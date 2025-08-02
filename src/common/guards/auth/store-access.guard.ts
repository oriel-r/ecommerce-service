import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { StoresService } from 'src/modules/_platform/stores/stores.service';
import { PlatformUsersService } from 'src/modules/_platform/platform-users/platform-users.service';
import { Store } from 'src/modules/_platform/stores/entities/store.entity';
import { MembersService } from 'src/modules/auth/members/members.service';

@Injectable()
export class StoreAccessGuard implements CanActivate {
  constructor(
    private readonly storesService: StoresService,
    private readonly platformUsersService: PlatformUsersService,
    private readonly membersService: MembersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userPayload = req.user;   // viene del token, con sub, type, storeId, etc
    const store: Store = req.store; // viene del middleware

    if (!userPayload || !store) {
      throw new ForbiddenException('Acceso denegado');
    }

    let userComplete;

    if (userPayload.type === 'platform') {
      userComplete = await this.platformUsersService.findById(userPayload.sub);
      // Validar que el platformUser es dueño de la tienda
      if (userComplete.id !== store.platformUser.id) {
        throw new ForbiddenException('No tenés permisos para esta tienda');
      }
    } else if (userPayload.type === 'customer') {
      userComplete = await this.membersService.findOneById(userPayload.sub);
      // Validar que el member pertenece a la tienda
      if (userComplete.storeId !== store.id) {
        throw new ForbiddenException('No tenés permisos para esta tienda');
      }
    } else {
      throw new ForbiddenException('Tipo de usuario inválido');
    }

    // Opcional: dejar el usuario completo disponible para el controlador
    req.userComplete = userComplete;

    return true;
  }
}


