import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

@Injectable()
export class DrizzleService implements OnModuleDestroy {
  private readonly client = postgres(process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/mmo_website', {
    max: 5,
    prepare: false,
  });

  readonly db: PostgresJsDatabase<typeof schema> = drizzle(this.client, { schema });

  async healthCheck() {
    await this.client`select 1`;
    return true;
  }

  async transaction<T>(handler: Parameters<PostgresJsDatabase<typeof schema>['transaction']>[0]) {
    return this.db.transaction(handler) as Promise<T>;
  }

  async onModuleDestroy() {
    await this.client.end();
  }
}
