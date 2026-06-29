import { routes } from './app.routes';
import { authGuard } from './guards/auth.guard';

describe('companion frontend routes', () => {
  it('registers public companion pages', () => {
    const paths = routes.map((route) => route.path);
    expect(paths).toEqual(expect.arrayContaining(['support', 'support/known-issues', 'docs', 'portfolio', 'media', 'alpha']));
  });

  it('registers public profile read-model routes', () => {
    const paths = routes.map((route) => route.path);
    expect(paths).toContain('profile/:publicName');
    expect(paths).toContain('profile/:publicName/characters');
  });

  it('protects sensitive support workflows with auth guard', () => {
    const bugReport = routes.find((route) => route.path === 'support/bug-report');
    const banAppeal = routes.find((route) => route.path === 'support/ban-appeal');
    expect(bugReport?.canActivate).toContain(authGuard);
    expect(banAppeal?.canActivate).toContain(authGuard);
  });
});
