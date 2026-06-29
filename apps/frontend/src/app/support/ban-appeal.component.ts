import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiClient } from '../api/api-client.service';

@Component({
  selector: 'app-ban-appeal',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="section article-shell">
      <p class="eyebrow">Account Service boundary</p>
      <h1>Ban Appeal</h1>
      <p class="lede">Ban appeals are routed to Account Service review. The website does not directly change account status.</p>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <label>
          Appeal details
          <textarea rows="8" formControlName="appealText"></textarea>
        </label>
        <button type="submit" [disabled]="form.invalid">Submit appeal</button>
      </form>
      @if (submitted()) {
        <p class="lede">Appeal submitted for Account Service review.</p>
      }
      <a class="button secondary" routerLink="/support">Back to support</a>
    </section>
  `,
})
export class BanAppealComponent {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiClient);
  readonly submitted = signal(false);
  readonly form = this.fb.nonNullable.group({
    appealText: ['', [Validators.required, Validators.maxLength(4000)]],
  });

  submit() {
    if (this.form.invalid) return;
    this.api.createBanAppeal(this.form.getRawValue()).subscribe({ next: () => this.submitted.set(true) });
  }
}
