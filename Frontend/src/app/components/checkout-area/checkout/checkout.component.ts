import { Component, OnInit } from '@angular/core';
import { CartItemModel } from 'src/app/models/cartItem-model';
import { CheckoutDetailsModel } from 'src/app/models/checkout-details.model';
import { CityModel } from 'src/app/models/city-model';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CheckoutDialogComponent } from '../checkout-dialog/checkout-dialog.component';
import store from 'src/app/redux/store';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  public cartItems: CartItemModel[];
  public cities: CityModel[];
  public checkoutDetails: CheckoutDetailsModel;
  public shippingCity: string;
  public shippingStreet: string;
  public creditCardNumber: number;
  public shippingDate: Date;
  public badShippingDate: boolean = false;

  constructor(
    private checkoutService: CheckoutService,
    public dialog: MatDialog,
    private router: Router,
    private notify: NotifyService,

  ) { }

  ngOnInit(): void {
    this.checkoutDetails = new CheckoutDetailsModel();
    this.fetchCities();
    this.cartItems = store.getState().cartItemsState.cartItems;
  }

  public async fetchCities() {
    try {
      this.cities = await this.checkoutService.getAllCities();
    } catch (err: any) {
      this.notify.error(err);
    }
  }


  public async checkDate(shippingDate: Date) {
    try {
      this.badShippingDate = await this.checkoutService.checkDate(shippingDate);
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  public async submitPayment(e: any) {
    this.setInitialDetails();
    this.checkoutDetails.shippingDate = this.shippingDate;
    const res = await this.checkoutService.checkout(this.checkoutDetails);
    if (res) this.openDialog();
  }

  setInitialDetails() {
    this.checkoutDetails = new CheckoutDetailsModel();
    this.checkoutDetails.user_id = store.getState().authState.user._id;
    this.checkoutDetails.cart_id = store.getState().cartState.cart._id;
    this.checkoutDetails.shippingCity = this.shippingCity;
    this.checkoutDetails.shippingStreet = this.shippingStreet;
    this.checkoutDetails.creditCardNumber = this.creditCardNumber;
  }

  openDialog() {
    const dialogRef = this.dialog.open(CheckoutDialogComponent, {
      data: {
        cartItems: this.cartItems,
        checkoutDetails: this.checkoutDetails,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/home');
    });
  }
}

