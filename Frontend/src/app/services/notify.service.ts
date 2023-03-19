import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private notyf = new Notyf({
    duration: 3000,
    ripple: true,
    position: { x: 'center', y: 'bottom' },
  });

  public success(message: string): void {
    this.notyf.success(message);
  }

  public error(err: any): void {
    const message = this.extractErrorMessage(err);
    this.notyf.error(message);
  }

  private extractErrorMessage(err: any): string {
    if (typeof err === 'string') return err;

    if (typeof err.error === 'string') return err.error; 

    if (Array.isArray(err.error)) return err.error[0]; 

    if (typeof err.message === 'string') return err.message;

    return 'שגיאה! אנא נסה שוב.';
  }
}
