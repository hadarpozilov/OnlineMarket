import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { CheckoutDetailsModel } from '../models/checkout-details.model';

@Injectable({
  providedIn: 'root',
})
export class HomeDataService {
  constructor(private http: HttpClient) {}

  public async getNumberOfProducts(): Promise<number> {
    const observable = this.http.get<number>(environment.numberOfProductsUrl)
    const numberOfProducts = await firstValueFrom(observable);
    return numberOfProducts;
  }

  // ------------------------------------

  public async getNumberOfOrders(): Promise<number> {
    const observable = this.http.get<number>(environment.numberOfOrdersUrl)
    const numberOfOrders = await firstValueFrom(observable);
    return numberOfOrders;
  }

  // ------------------------------------

  public async getLastOrder(): Promise<CheckoutDetailsModel> {
    const observable = this.http.get<CheckoutDetailsModel[]>(environment.lastOrderUrl)
    const ordersFromUser = await firstValueFrom(observable);
    return ordersFromUser[0];
  }
}
