import { Component, OnInit, inject, signal } from '@angular/core';
import { ApiClient } from '../api/api-client.service';

@Component({
  selector: 'app-portfolio-page',
  template: `
    <section class="section">
      <p class="eyebrow">Portfolio</p>
      <h1>Project Portfolio</h1>
      <p class="lede">A public project presentation area for architecture notes, milestones, and development showcases.</p>
      <div class="grid">
        @for (project of projects(); track $index) {
          <article class="card">
            <h2>{{ asRecord(project)['title'] || 'Project' }}</h2>
            <p>{{ asRecord(project)['summary'] || 'Portfolio details are managed in Directus.' }}</p>
          </article>
        } @empty {
          <article class="card">
            <h2>Companion Web Platform</h2>
            <p>Architecture, development milestones, and portfolio entries will publish here.</p>
          </article>
        }
      </div>
    </section>
  `,
})
export class PortfolioPageComponent implements OnInit {
  private readonly api = inject(ApiClient);
  readonly projects = signal<unknown[]>([]);

  ngOnInit() {
    this.api.getPortfolio().subscribe({ next: ({ projects }) => this.projects.set(projects), error: () => this.projects.set([]) });
  }

  asRecord(value: unknown) {
    return value as Record<string, unknown>;
  }
}
