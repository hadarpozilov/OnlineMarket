import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from '../redux/store';
import { NotifyService } from '../services/notify.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  public constructor(private notify: NotifyService, private router: Router) {}

  canActivate(): boolean {
    if (store.getState().authState.user.isAdmin) {
      return true;
    }

    this.notify.error("אינך מורשה");
    this.router.navigateByUrl('/home');
    return false;
  }
}
