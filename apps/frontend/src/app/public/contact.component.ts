import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiClient } from '../api/api-client.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  template: `
    <section class="section">
      <h1>Contact</h1>
      <p class="lede">Send a message to the website support team.</p>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <label>Email <input formControlName="email" type="email" /></label>
        <label>Subject <input formControlName="subject" /></label>
        <label>Message <textarea formControlName="message" rows="6"></textarea></label>
        <button type="submit" [disabled]="form.invalid || loading()">Send</button>
      </form>
      @if (status()) {
        <p>{{ status() }}</p>
      }
    </section>
  `,
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiClient);
  readonly loading = signal(false);
  readonly status = signal('');
  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.maxLength(160)]],
    message: ['', [Validators.required, Validators.maxLength(4000)]],
  });

  submit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.api.createContactMessage(this.form.getRawValue()).subscribe({
      next: () => {
        this.status.set('Message received.');
        this.loading.set(false);
        this.form.reset();
      },
      error: () => {
        this.status.set('Could not send message yet.');
        this.loading.set(false);
      },
    });
  }
}
