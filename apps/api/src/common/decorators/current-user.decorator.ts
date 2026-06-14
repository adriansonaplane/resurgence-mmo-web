import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface CurrentUser {
  sub: string;
  email?: string;
  roles: string[];
  permissions: string[];
}

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): CurrentUser => {
  return ctx.switchToHttp().getRequest<{ user: CurrentUser }>().user;
});
