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
      const baselineMigration = readFileSync(join(__dirname, '../../src/database/migrations/0000_initial.sql'), 'utf8');
      const companionBoundaryMigration = readFileSync(
        join(__dirname, '../../src/database/migrations/0002_clever_marvel_zombies.sql'),
        'utf8',
      );
      await sql.unsafe(baselineMigration);
      await sql.unsafe(companionBoundaryMigration);
      const tables = await sql`select table_name from information_schema.tables where table_schema = 'billing'`;
      expect(tables.map((row) => row.table_name)).toContain('stripe_events');
      expect(tables.map((row) => row.table_name)).toContain('entitlements');

      const playerTables = await sql`select table_name from information_schema.tables where table_schema = 'player'`;
      expect(playerTables.map((row) => row.table_name)).toContain('public_profile_settings');
      expect(playerTables.map((row) => row.table_name)).toContain('character_summary_read_models');
      expect(playerTables.map((row) => row.table_name)).toContain('achievement_summary_read_models');

      const integrationTables = await sql`select table_name from information_schema.tables where table_schema = 'integration'`;
      expect(integrationTables.map((row) => row.table_name)).toContain('account_service_events');
      expect(integrationTables.map((row) => row.table_name)).toContain('entitlement_handoff_events');
    } finally {
      await sql.end();
      await container.stop();
    }
  }, 120000);
});
