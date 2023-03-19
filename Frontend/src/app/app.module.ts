import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './services/jwt.interceptor';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { ProductAddComponent } from './components/products-area/product-add/product-add.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { CartItemListComponent } from './components/cart-area/cart-item-list/cart-item-list.component';
import { CartItemCardComponent } from './components/cart-area/cart-item-card/cart-item-card.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { ProductDialogComponent } from './components/products-area/product-card/product-dialog/product-dialog.component';
import { CheckoutComponent } from './components/checkout-area/checkout/checkout.component';
import { CheckoutDialogComponent } from './components/checkout-area/checkout-dialog/checkout-dialog.component';
import { AdminComponent } from './components/admin-area/admin/admin.component';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { ProductUpdateComponent } from './components/products-area/product-update/product-update.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    ProductListComponent,
    ProductCardComponent,
    ProductAddComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AuthMenuComponent,
    PageNotFoundComponent,
    CartItemListComponent,
    CartItemCardComponent,
    ProductDialogComponent,
    CheckoutComponent,
    CheckoutDialogComponent,
    AdminComponent,
    ProductUpdateComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    {
      useClass: JwtInterceptor,
      provide: HTTP_INTERCEPTORS,
      multi: true,
    },
  ],
  bootstrap: [LayoutComponent],
})
export class AppModule {}
