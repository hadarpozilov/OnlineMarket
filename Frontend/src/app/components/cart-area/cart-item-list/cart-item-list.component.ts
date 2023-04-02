import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartItemModel } from 'src/app/models/cartItem-model';
import { CartModel } from 'src/app/models/cart-model';
import { logoutAction } from 'src/app/redux/auth-state';
import store from 'src/app/redux/store';
import { CartService } from 'src/app/services/cart.service';
import { CartItemsService } from 'src/app/services/cartItems.service';

@Component({
  selector: 'app-cart-item-list',
  templateUrl: './cart-item-list.component.html',
  styleUrls: ['./cart-item-list.component.css'],
})
export class CartItemListComponent implements OnInit {
  public cart: CartModel;
  public cartItems: CartItemModel[];
  public items: number;

  private unsubscribeCart: Unsubscribe;
  private unsubscribeCartItems: Unsubscribe;

  constructor(
    private cartItemsService: CartItemsService,
    private cartService: CartService,

  ) { }

  ngOnInit(): void {
    this.getCart();
    this.subscription();
    if (this.cart) this.getCartItems(this.cart._id);
  }

  subscription() {
    this.cart = store.getState().cartState.cart;
    if (!this.cart) this.getCart;
    this.unsubscribeCart = store.subscribe(() => {
      this.cart = store.getState().cartState.cart;
    });

    this.cartItems = store.getState().cartItemsState.cartItems;
    this.unsubscribeCartItems = store.subscribe(() => {
      this.cartItems = store.getState().cartItemsState.cartItems;
      this.items = this.cartItems.length;
    });
  }

  public async getCart() {
    try {
      if (!store.getState().cartState.cart) {
        this.cart = await this.cartService.getCart();
      }
      this.cart = store.getState().cartState.cart;
    } catch (err: any) {
      if ((err.status = 401)) {
        alert('Your token is invalid. Login again.');
        store.dispatch(logoutAction());
      } else {
        alert(err.message);
      }
    }
  }

  public async getCartItems(_id: string) {
    try {
      this.cartItems = await this.cartItemsService.getCartItems(_id);
    }  catch(err: any) {
        alert(err.message);
    }
  }

  public async removeAllItemsFromCart() {
    try {
      if (
        confirm("למחיקת המוצרים לחץ אישור") == true
      ) {
        await this.cartItemsService.removeAllItemsFromCart(this.cart._id);
      } else {
        return;
      }
    }  catch(err: any) {
        alert(err.message);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeCartItems();
    this.unsubscribeCart();
  }
}
