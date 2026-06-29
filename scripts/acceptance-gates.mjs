import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const repoRoot = process.cwd();
const failures = [];

const packageFiles = ['package.json', 'apps/api/package.json', 'apps/frontend/package.json'];
const forbiddenDependencies = ['supertest', 'prisma', '@prisma/client'];
const forbiddenGameTables = [
  'inventory',
  'items',
  'currency',
  'loot',
  'combat_state',
  'zone_state',
  'dungeon_state',
  'xp_rewards',
  'monster_ai',
  'movement_validation',
];

for (const packageFile of packageFiles) {
  const json = JSON.parse(read(packageFile));
  const dependencyBlocks = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];
  for (const block of dependencyBlocks) {
    const dependencies = json[block] ?? {};
    for (const forbidden of forbiddenDependencies) {
      if (dependencies[forbidden]) {
        failures.push(`${packageFile} must not declare forbidden dependency ${forbidden}.`);
      }
    }
  }
}

for (const file of walk('apps/api/test').filter((path) => path.endsWith('.ts'))) {
  const content = read(file);
  if (/from ['"]supertest['"]|require\(['"]supertest['"]\)/.test(content)) {
    failures.push(`${file} must use Fastify Inject, not Supertest.`);
  }
}

for (const file of walk('apps/api/src/database/schema').filter((path) => path.endsWith('.ts'))) {
  const content = read(file);
  for (const table of forbiddenGameTables) {
    const tablePattern = new RegExp(`\\.table\\(['"]${table}['"]`);
    if (tablePattern.test(content)) {
      failures.push(`${file} must not define game-authoritative table ${table}.`);
    }
  }
}

const checkoutSuccess = read('apps/frontend/src/app/store/checkout-success.component.ts');
for (const forbidden of ['createCheckoutSession', 'grantEntitlement', 'grantEntitlements']) {
  if (checkoutSuccess.includes(forbidden)) {
    failures.push('Checkout success page must not initiate checkout, grant entitlements, or call entitlement APIs.');
  }
}

const routeDocs = read('docs/api/routes.md');
for (const requiredRoute of [
  'GET /profile/:publicName',
  'POST /support/bug-reports',
  'GET /content/docs',
  'POST /admin/accounts/:id/ban',
  'POST /admin/characters/:id/reset-request',
]) {
  if (!routeDocs.includes(requiredRoute)) {
    failures.push(`docs/api/routes.md is missing ${requiredRoute}.`);
  }
}

const boundaryDocs = [
  'docs/boundaries/account-service-boundary.md',
  'docs/boundaries/companion-web-platform-boundary.md',
  'docs/boundaries/data-ownership-boundary.md',
  'docs/boundaries/entitlement-boundary.md',
  'docs/contracts/account-service-contract.md',
];
for (const doc of boundaryDocs) {
  if (!read(doc).trim()) failures.push(`${doc} must exist and contain boundary documentation.`);
}

read('apps/api/src/database/migrations/meta/_journal.json');

if (failures.length > 0) {
  console.error('Acceptance gates failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Acceptance gates passed.');

function read(path) {
  return readFileSync(join(repoRoot, path), 'utf8');
}

function walk(path) {
  const absolute = join(repoRoot, path);
  const entries = readdirSync(absolute);
  return entries.flatMap((entry) => {
    const entryPath = join(absolute, entry);
    const stats = statSync(entryPath);
    if (stats.isDirectory()) return walk(relative(repoRoot, entryPath));
    return relative(repoRoot, entryPath);
  });
}
