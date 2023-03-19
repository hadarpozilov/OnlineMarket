import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { CheckoutComponent } from './components/checkout-area/checkout/checkout.component';
import { AdminComponent } from './components/admin-area/admin/admin.component';

import { CustomerGuard } from './guards/customer.guard';
import { AdminGuard } from './guards/admin.guard';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { CartItemListComponent } from './components/cart-area/cart-item-list/cart-item-list.component';

const routes: Routes = [
  // All Users 
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  // Only Admin
  { path: 'admin', canActivate: [AdminGuard], component: AdminComponent },
  // Only logged-in Users
  { path: 'products',canActivate: [CustomerGuard],component: ProductListComponent},
  { path: 'cart',canActivate: [CustomerGuard],component: CartItemListComponent},
  { path: 'cart/checkout',canActivate: [CustomerGuard],component: CheckoutComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '*', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
