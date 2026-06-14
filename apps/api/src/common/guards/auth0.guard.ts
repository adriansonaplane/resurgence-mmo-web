import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';

@Injectable()
export class Auth0Guard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<FastifyRequest & { user?: CurrentUser }>();
    const token = this.extractBearerToken(request.headers.authorization);
    if (!token) throw new UnauthorizedException('Bearer token is required.');

    request.user = await this.verifyToken(token);
    return true;
  }

  private extractBearerToken(header: string | undefined) {
    if (!header?.startsWith('Bearer ')) return undefined;
    return header.slice('Bearer '.length).trim();
  }

  private async verifyToken(token: string): Promise<CurrentUser> {
    if (process.env.NODE_ENV !== 'production' && token.startsWith('test-')) {
      return {
        sub: token === 'test-admin' ? 'auth0|admin' : token === 'test-staff-no-permissions' ? 'auth0|staff' : 'auth0|player',
        email:
          token === 'test-admin'
            ? 'admin@example.com'
            : token === 'test-staff-no-permissions'
              ? 'staff@example.com'
              : 'player@example.com',
        roles:
          token === 'test-admin'
            ? ['player', 'super_admin', 'store_manager', 'support_agent']
            : token === 'test-staff-no-permissions'
              ? ['support_agent']
              : ['player'],
        permissions: token === 'test-admin' ? ['admin:read', 'admin:write', 'entitlements:read'] : [],
      };
    }

    const domain = process.env.AUTH0_DOMAIN;
    const audience = process.env.AUTH0_AUDIENCE;
    if (!domain || !audience) throw new UnauthorizedException('Auth0 configuration is incomplete.');

    const issuer = `https://${domain}/`;
    const { createRemoteJWKSet, jwtVerify } = await import('jose');
    const { payload } = await jwtVerify(token, createRemoteJWKSet(new URL(`${issuer}.well-known/jwks.json`)), {
      issuer,
      audience,
    });
    return {
      sub: payload.sub ?? '',
      email: typeof payload.email === 'string' ? payload.email : undefined,
      roles: this.readStringArrayClaim(payload, 'https://mmo.example.com/roles'),
      permissions: this.readStringArrayClaim(payload, 'permissions'),
    };
  }

  private readStringArrayClaim(payload: Record<string, unknown>, claim: string) {
    const value = payload[claim];
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
  }
}
