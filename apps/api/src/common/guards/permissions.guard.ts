import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CurrentUser } from '../decorators/current-user.decorator';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermissions?.length) return true;

    const user = context.switchToHttp().getRequest<{ user?: CurrentUser }>().user;
    if (requiredPermissions.every((permission) => user?.permissions.includes(permission))) return true;
    throw new ForbiddenException('Required permission is missing.');
  }
}
