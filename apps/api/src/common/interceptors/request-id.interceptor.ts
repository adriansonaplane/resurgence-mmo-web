import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { randomUUID } from 'crypto';

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<FastifyRequest & { requestId?: string }>();
    const inbound = request.headers['x-request-id'];
    request.requestId = Array.isArray(inbound) ? inbound[0] : inbound ?? randomUUID();
    return next.handle();
  }
}
