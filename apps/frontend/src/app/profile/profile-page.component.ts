import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ApiClient } from '../api/api-client.service';

@Component({
  selector: 'app-profile-page',
  imports: [RouterLink],
  template: `
    <section class="section">
      <p class="eyebrow">Player profile</p>
      <h1>{{ publicName }}</h1>
      <p class="lede">Public profile data is web-owned; character and achievement summaries are read-only game-service read models.</p>

      <div class="grid">
        <article class="card">
          <h2>Profile settings</h2>
          @if (profile(); as data) {
            <p>{{ data.displayName || data.publicName }}</p>
            <p>Visibility: {{ data.visibility }}</p>
            <p class="eyebrow">{{ data.sourceOfTruth || 'website database' }}</p>
          } @else {
            <p>Profile preview is unavailable.</p>
          }
        </article>
        <article class="card">
          <h2>Characters</h2>
          <p>{{ characters().length }} read-only summaries.</p>
          <a class="button secondary" [routerLink]="['/profile', publicName, 'characters']">View characters</a>
        </article>
        <article class="card">
          <h2>Achievements</h2>
          <p>{{ achievements().length }} read-only summaries.</p>
        </article>
      </div>
    </section>
  `,
})
export class ProfilePageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(ApiClient);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly publicName = this.route.snapshot.paramMap.get('publicName') ?? 'player';
  readonly profile = signal<{ publicName: string; displayName: string; visibility: string; sourceOfTruth?: string } | null>(null);
  readonly characters = signal<unknown[]>([]);
  readonly achievements = signal<unknown[]>([]);

  ngOnInit() {
    this.title.setTitle(`${this.publicName} | Player Profile | Resurgence`);
    this.meta.updateTag({
      name: 'description',
      content: 'Read-only public player profile summaries for Resurgence.',
    });
    this.api.getPublicProfile(this.publicName).subscribe({ next: ({ profile }) => this.profile.set(profile), error: () => this.profile.set(null) });
    this.api
      .getPublicProfileCharacters(this.publicName)
      .subscribe({ next: ({ characters }) => this.characters.set(characters), error: () => this.characters.set([]) });
    this.api
      .getPublicProfileAchievements(this.publicName)
      .subscribe({ next: ({ achievements }) => this.achievements.set(achievements), error: () => this.achievements.set([]) });
  }
}
