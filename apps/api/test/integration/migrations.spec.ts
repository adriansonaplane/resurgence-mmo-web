import { PostgreSqlContainer } from '@testcontainers/postgresql';
import postgres from 'postgres';
import { readFileSync } from 'fs';
import { join } from 'path';

const describeIfDocker = process.env.RUN_TESTCONTAINERS === 'true' ? describe : describe.skip;

describeIfDocker('Drizzle migration SQL', () => {
  it('applies to a fresh PostgreSQL database', async () => {
    const container = await new PostgreSqlContainer('postgres:16').start();
    const sql = postgres(container.getConnectionUri(), { max: 1 });
    try {
      const migration = readFileSync(join(__dirname, '../../src/database/migrations/0000_initial.sql'), 'utf8');
      await sql.unsafe(migration);
      const tables = await sql`select table_name from information_schema.tables where table_schema = 'billing'`;
      expect(tables.map((row) => row.table_name)).toContain('stripe_events');
      expect(tables.map((row) => row.table_name)).toContain('entitlements');
    } finally {
      await sql.end();
      await container.stop();
    }
  }, 120000);
});
