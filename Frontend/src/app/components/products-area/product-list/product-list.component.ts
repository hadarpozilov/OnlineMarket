import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CategoryModel } from 'src/app/models/category-model';
import { ProductModel } from 'src/app/models/product-model';
import store from 'src/app/redux/store';
import { ProductsService } from 'src/app/services/products.service';
import { ProductAddComponent } from '../product-add/product-add.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  public categories: CategoryModel[];
  public products: ProductModel[];
  public searchPattern: string;
  public cartStatus: boolean = true;
  private unsubscribeProducts: Unsubscribe;

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchAllProducts();
    this.subscription();
  }

  subscription() {
    this.products = store.getState().productsState.products;
    this.unsubscribeProducts = store.subscribe(() => {
      this.products = store.getState().productsState.products;
    });
  }

  cartStatusHandler(): void {
    this.cartStatus = !this.cartStatus;
  }

  public async fetchCategories() {
    try {
      this.categories = await this.productsService.getAllCategories();
    } catch (err: any) {
      alert(err.message);
    }
  }

  public async fetchAllProducts() {
    try {
      this.products = await this.productsService.getAllProducts();
    } catch (err: any) {
      alert(err.message);
    }
  }

  public async fetchProductsByCategory(category_id: string) {
    try {
      this.products = await this.productsService.getProductsByCategory(
        category_id
      );
    } catch (err: any) {
      alert(err.message);
    }
  }

  public async fetchProductsBySearchPattern() {
    if (!this.searchPattern) return this.fetchAllProducts();
    try {
      this.products = await this.productsService.getProductsByPattern(
        this.searchPattern
      );
    } catch (err: any) {
      alert(err.message);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductAddComponent);
  }

  ngOnDestroy(): void {
    this.unsubscribeProducts();
  }
}
