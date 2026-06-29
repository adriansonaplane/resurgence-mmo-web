import { readFileSync } from 'fs';
import { join } from 'path';

const repoRoot = join(__dirname, '../../..');

describe('acceptance gate policy checks', () => {
  it('keeps backend HTTP tests on Fastify Inject and off the forbidden HTTP test package', () => {
    const packageFiles = ['package.json', 'apps/api/package.json', 'apps/frontend/package.json'];
    for (const packageFile of packageFiles) {
      const json = JSON.parse(readFileSync(join(repoRoot, packageFile), 'utf8'));
      expect(json.dependencies?.supertest).toBeUndefined();
      expect(json.devDependencies?.supertest).toBeUndefined();
    }
  });

  it('does not define forbidden game-authoritative website tables', () => {
    const schemaIndex = readFileSync(join(repoRoot, 'apps/api/src/database/schema/index.ts'), 'utf8');
    expect(schemaIndex).not.toMatch(/inventory|combat_state|zone_state|dungeon_state|movement_validation/);
  });

  it('documents companion boundary acceptance routes', () => {
    const routeDocs = readFileSync(join(repoRoot, 'docs/api/routes.md'), 'utf8');
    expect(routeDocs).toContain('GET /profile/:publicName');
    expect(routeDocs).toContain('POST /support/bug-reports');
    expect(routeDocs).toContain('GET /content/docs');
    expect(routeDocs).toContain('POST /admin/accounts/:id/ban');
  });
});
