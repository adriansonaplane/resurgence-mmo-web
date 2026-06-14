import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideHttpClient()],
    }).compileComponents();
    fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
  });

  it('requires valid form input', () => {
    expect(fixture.componentInstance.form.valid).toBe(false);
    fixture.componentInstance.form.setValue({
      email: 'player@example.com',
      subject: 'Question',
      message: 'When does beta start?',
    });
    expect(fixture.componentInstance.form.valid).toBe(true);
  });
});
