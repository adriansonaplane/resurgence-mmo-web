import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorTrackingService implements ErrorHandler {
  handleError(error: unknown) {
    console.error(error);
  }
}
