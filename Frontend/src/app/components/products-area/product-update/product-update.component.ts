import { Component, Inject, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';
import { CategoryModel } from 'src/app/models/category-model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
  public product: ProductModel;
  public categories: CategoryModel[];
  public imageRef: File;
  public selected: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productsService: ProductsService
  )
   {
    this.product = this.data.product;
  }

  public async ngOnInit() {
    this.categories = await this.productsService.getAllCategories();
    this.selected = this.product.category._id;
  }

  onFileChange(evt: any): void {
    this.imageRef = evt.target.files[0];
  }

  public async updateProduct() {
    try {
      this.product.image = this.imageRef;
      await this.productsService.updateProduct(this.product);
    } catch (err: any) {
      alert(err.message);
    }
  }
}
