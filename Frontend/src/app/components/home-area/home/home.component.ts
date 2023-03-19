import { Component, OnInit} from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { CartModel } from 'src/app/models/cart-model';
import { Unsubscribe } from 'redux';
import { CartService } from 'src/app/services/cart.service';
import store from 'src/app/redux/store';
import { HomeDataService } from 'src/app/services/home-data.service';
import { CheckoutDetailsModel } from 'src/app/models/checkout-details.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public user: UserModel;
  public cart: CartModel;
  public checkout: CheckoutDetailsModel;

  private unsubscribeCart: Unsubscribe;
  private unsubscribeUser: Unsubscribe;

  constructor(
    private cartService: CartService,
    private homeDataService: HomeDataService,
  
    ) {}

  ngOnInit(): void {
    this.subscription();
    this.getHomeData();

    if (this.user) this.getExistingCart();
  }

  subscription() {
    this.cart = store.getState().cartState.cart;
    this.unsubscribeCart = store.subscribe(() => {
      this.cart = store.getState().cartState.cart;
    });

    this.user = store.getState().authState.user;
    this.unsubscribeUser = store.subscribe(() => {
      this.user = store.getState().authState.user;
    });
  }

  public async getHomeData() {
    try {
      if (this.user) this.checkout = await this.homeDataService.getLastOrder();
    }catch (err: any) {
      alert(err.message);
    }
  }

  public async getExistingCart() {
    try {
      if (this.user && !this.cart) {
        this.cart = await this.cartService.getCart();
      }
    } catch (err: any) {
        alert(err.message);
    }
  }

  public async createCart() {
    try {
      if (this.user) {
        this.cart = await this.cartService.createCart();
      }
    } catch (err: any) {
        alert(err.message);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeCart();
    this.unsubscribeUser();
  }
}
