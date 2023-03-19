import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CheckoutDetailsModel } from '../models/checkout-details.model';
import { firstValueFrom } from 'rxjs';
import { CityModel } from '../models/city-model';
import store from '../redux/store';

import { deleteCartAction } from '../redux/cart-state';
import { removeAllItemsAction } from '../redux/cart-items-state';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient) {}

  public async getAllCities(): Promise<CityModel[]> {
    const observable = this.http.get<CityModel[]>(environment.orderCitiesUrl)
    const cities = await firstValueFrom(observable);
    return cities;
  }

  // ------------------------------------

  public async checkout(
    checkoutDetails: CheckoutDetailsModel): Promise<boolean> {
    try {
      const observable = this.http.post<boolean>(environment.orderUrl, checkoutDetails)
      const res = await firstValueFrom(observable);
      if (res) store.dispatch(deleteCartAction());
      if (res) store.dispatch(removeAllItemsAction());
      return true;
    } catch (error) {
      return false;
    }
  }

  // ------------------------------------

  public async checkDate(date: Date): Promise<boolean> {
    let checkDate = { date: date };
    const observable = this.http.post<boolean>(environment.orderCheckDateUrl, checkDate)
    const isDateBad = await firstValueFrom(observable);
    return isDateBad;
  }
}
