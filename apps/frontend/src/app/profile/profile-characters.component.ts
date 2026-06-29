import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiClient } from '../api/api-client.service';

@Component({
  selector: 'app-profile-characters',
  imports: [RouterLink],
  template: `
    <section class="section">
      <p class="eyebrow">Read-only character summaries</p>
      <h1>{{ publicName }} Characters</h1>
      <p class="lede">These summaries are display-only read models. Live inventory, stats, currency, and gameplay state stay game-owned.</p>
      <div class="grid">
        @for (character of characters(); track $index) {
          <article class="card">
            <h2>{{ asRecord(character)['characterName'] || asRecord(character)['name'] || 'Character' }}</h2>
            <p>Class: {{ asRecord(character)['className'] || 'Unknown' }}</p>
            <p>Level: {{ asRecord(character)['level'] || 'Preview' }}</p>
          </article>
        } @empty {
          <article class="card">
            <h2>No summaries yet</h2>
            <p>Character read models will appear here when the Game Platform Service sync is available.</p>
          </article>
        }
      </div>
      <a class="button secondary" [routerLink]="['/profile', publicName]">Back to profile</a>
    </section>
  `,
})
export class ProfileCharactersComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(ApiClient);

  readonly publicName = this.route.snapshot.paramMap.get('publicName') ?? 'player';
  readonly characters = signal<unknown[]>([]);

  ngOnInit() {
    this.api
      .getPublicProfileCharacters(this.publicName)
      .subscribe({ next: ({ characters }) => this.characters.set(characters), error: () => this.characters.set([]) });
  }

  asRecord(value: unknown) {
    return value as Record<string, unknown>;
  }
}
