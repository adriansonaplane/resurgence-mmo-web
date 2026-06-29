import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiClient } from '../api/api-client.service';

@Component({
  selector: 'app-bug-report',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="section article-shell">
      <p class="eyebrow">Support portal</p>
      <h1>Bug Report</h1>
      <p class="lede">Bug reports are web-owned support records. Do not include passwords or payment details.</p>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <label>
          Title
          <input formControlName="title" />
        </label>
        <label>
          Description
          <textarea rows="7" formControlName="description"></textarea>
        </label>
        <button type="submit" [disabled]="form.invalid">Submit bug report</button>
      </form>
      @if (submitted()) {
        <p class="lede">Bug report submitted for triage.</p>
      }
      <a class="button secondary" routerLink="/support">Back to support</a>
    </section>
  `,
})
export class BugReportComponent {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiClient);
  readonly submitted = signal(false);
  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(160)]],
    description: ['', [Validators.required, Validators.maxLength(4000)]],
  });

  submit() {
    if (this.form.invalid) return;
    this.api.createBugReport(this.form.getRawValue()).subscribe({ next: () => this.submitted.set(true) });
  }
}
