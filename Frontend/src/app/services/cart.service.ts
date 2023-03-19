import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartModel } from '../models/cart-model';
import { fetchCartAction } from '../redux/cart-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  public async getCart(): Promise<CartModel> {
    const observable = this.http.get<CartModel>(environment.cartUrl)
    const cart = await firstValueFrom(observable);
    store.dispatch(fetchCartAction(cart));
    return cart;
  }

  // ------------------------------------

  public async createCart(): Promise<CartModel> {
    const observable = this.http.get<CartModel>(environment.cartNewUrl)
    const newCart = await firstValueFrom(observable);
    store.dispatch(fetchCartAction(newCart));
    return newCart;
  }

  // ------------------------------------

  public async forceNewCart(cart_id: string): Promise<CartModel> {
    const observable = this.http.get<CartModel>(environment.cartUrl + cart_id)
    const cart = await firstValueFrom(observable);
    store.dispatch(fetchCartAction(cart));
    return cart;
  }
}
