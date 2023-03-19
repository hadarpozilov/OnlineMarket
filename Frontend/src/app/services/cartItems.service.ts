import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItemModel } from '../models/cartItem-model';
import { addCartItemAction,deleteCartItemAction,fetchCartItemsAction,removeAllItemsAction,updateCartItemAction,} from '../redux/cart-items-state';
import store from '../redux/store';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root',
})
export class CartItemsService {
  constructor(private http: HttpClient) {}

  public async getCartItems(_id: string): Promise<CartItemModel[]> {
    const observable = this.http.get<CartItemModel[]>(environment.cartItemsUrl + _id)
    const cartItems = await firstValueFrom(observable);
    store.dispatch(fetchCartItemsAction(cartItems));
    return cartItems;
  }
  // ------------------------------------

  public async addCartItem(product: ProductModel,quantity: number): Promise<CartItemModel> {
    const cartItems = store.getState().cartItemsState.cartItems;
    const cartItemIndex = cartItems.findIndex((ci) => ci.product_id === product._id)
    const cartItem = cartItems[cartItemIndex];
    if (cartItemIndex >= 0) {
      return this.updateCartItem(cartItem._id, quantity);
    }
    const item = new CartItemModel();
    item.product_id = product._id;
    item.name = product.name;
    item.price = product.price;
    item.quantity = quantity;
    item.cart_id = store.getState().cartState.cart._id;
    const observable = this.http.post<CartItemModel>(environment.cartItemsUrl, item)
    const addedCartItem = await firstValueFrom(observable);
    store.dispatch(addCartItemAction(addedCartItem));
    return addedCartItem;
  }

  // ------------------------------------

  public async updateCartItem(cartItemId: string,addQuantity: number): Promise<CartItemModel> {
    const cartItems = store.getState().cartItemsState.cartItems;
    const cartItemIndex = cartItems.findIndex((ci) => ci._id === cartItemId);
    const cartItem = cartItems[cartItemIndex];
    const exsitingQuantity = +cartItem.quantity;
    const newQuantity = +addQuantity + exsitingQuantity;
    const observable = this.http.put<CartItemModel>(environment.cartItemsUrl + cartItemId, {newQuantity,})
    const updatedCartItem = await firstValueFrom(observable)
    store.dispatch(updateCartItemAction(updatedCartItem));
    return updatedCartItem;
  }
  // ------------------------------------

  public async deleteCartItem(_id: string): Promise<void> {
    store.dispatch(deleteCartItemAction(_id));
    const observable = this.http.delete<CartItemModel>(environment.cartItemsUrl + _id)
    await firstValueFrom(observable);
  }

  // ------------------------------------

  public async removeAllItemsFromCart(cart_id: string): Promise<void> {
    store.dispatch(removeAllItemsAction());
    const observable = this.http.delete<CartItemModel>(environment.removeAllCartItemsUrl + cart_id)
    await firstValueFrom(observable)
  }
}
