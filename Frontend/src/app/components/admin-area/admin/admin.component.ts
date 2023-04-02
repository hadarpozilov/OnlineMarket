import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category-model';
import { ProductModel } from 'src/app/models/product-model';
import { ProductsService } from 'src/app/services/products.service';
import { Unsubscribe } from 'redux';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddComponent } from '../../products-area/product-add/product-add.component';
import store from 'src/app/redux/store';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public categories: CategoryModel[];
  public products: ProductModel[];
  public searchPattern: string;

  private unsubscribeProducts: Unsubscribe;

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog
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
    if (!this.searchPattern)
      return this.fetchAllProducts();

    try {
      this.products = await this.productsService.getProductsByPattern(
        this.searchPattern
      );
    } catch (err: any) {
      alert(err.message);
    }
  }

  addProductDialog() {
    const dialogRef = this.dialog.open(ProductAddComponent);
  }

  ngOnDestroy(): void {
    this.unsubscribeProducts();
  }
}
