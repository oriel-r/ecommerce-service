import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorators/roles/roles.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) return true;

    // Si no hay roles requeridos, permite el acceso
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('No tienes los permisos adecuados.');
    }

    let userRoles: string[] = [];

    if (user.roles && Array.isArray(user.roles)) {
      userRoles = user.roles.map((r) => r.name);
    } else if (user.role && typeof user.role === 'string') {
      userRoles = [user.role];
    } else if (user.role && typeof user.role.name === 'string') {
      userRoles = [user.role.name];
    } else {
      throw new UnauthorizedException('No tienes los permisos adecuados.');
    }

    const hasRole = requiredRoles.some((role) => userRoles.includes(role));

    if (!hasRole) {
      throw new UnauthorizedException('No tienes los permisos adecuados.');
    }

    return true;
  }
}



