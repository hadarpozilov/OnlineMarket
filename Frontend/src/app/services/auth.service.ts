import { CredentialsModel } from './../models/credentials-model';
import { firstValueFrom } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
import store from '../redux/store';
import { loginAction, logoutAction, registerAction } from '../redux/auth-state';
import { deleteCartAction } from '../redux/cart-state';
import { removeAllItemsAction } from '../redux/cart-items-state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  public async isUserIdFree(userId: number): Promise<string> {
    const userIdToCheck = { userId: userId };
    const observable = this.http.post<string>(environment.preRegisterUrl, userIdToCheck)
    const response = await firstValueFrom(observable);
    return response;
  }

  // ------------------------------------


  public async register(user: UserModel): Promise<void> {
    const observable = this.http.post<string>(environment.registerUrl, user)
    const token = await firstValueFrom(observable);
    store.dispatch(registerAction(token));
  }

  // ------------------------------------

  
  public async login(credentials: CredentialsModel): Promise<void> {
    const observable = this.http.post<string>(environment.loginUrl, credentials)
    const token = await firstValueFrom(observable);
    store.dispatch(loginAction(token));
  }

  public logout(): void {
    store.dispatch(logoutAction());
    store.dispatch(deleteCartAction());
    store.dispatch(removeAllItemsAction());
  }
}
