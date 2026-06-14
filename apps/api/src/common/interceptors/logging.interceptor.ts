import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const startedAt = Date.now();
    const request = context.switchToHttp().getRequest<FastifyRequest & { requestId?: string; user?: { sub?: string } }>();

    return next.handle().pipe(
      tap(() => {
        const log = {
          level: 'info',
          service: 'website-api',
          environment: process.env.NODE_ENV ?? 'development',
          requestId: request.requestId,
          method: request.method,
          route: request.url,
          durationMs: Date.now() - startedAt,
          user: request.user?.sub,
        };
        process.stdout.write(`${JSON.stringify(log)}\n`);
      }),
    );
  }
}
