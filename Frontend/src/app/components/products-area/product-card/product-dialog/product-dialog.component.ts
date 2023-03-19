import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Unsubscribe } from 'redux';
import { CartModel } from 'src/app/models/cart-model';
import { ProductModel } from 'src/app/models/product-model';
import store from 'src/app/redux/store';
import { CartItemsService } from 'src/app/services/cartItems.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css'],
})
export class ProductDialogComponent implements OnInit, OnDestroy {
  public productImageUrl = environment.productImageUrl;
  public cart: CartModel;
  public quantity: number = 1;
  public product: ProductModel;
  public isAdmin: boolean;

  private unsubscribe: Unsubscribe;

  constructor(
    private cartItemsService: CartItemsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.product = this.data.product;
  }

  ngOnInit(): void {
    this.cart = store.getState().cartState.cart;
    this.unsubscribe = store.subscribe(() => {
      this.cart = store.getState().cartState.cart;
    });
    this.isAdmin = store.getState().authState.user.isAdmin;
  }

  public async addProductToCart() {
    await this.cartItemsService.addCartItem(this.product, this.quantity);
  }

  decrementItem() {
    if (this.quantity > 1) this.quantity -= 1;
  }
  incrementItem() {
    this.quantity += 1;
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
