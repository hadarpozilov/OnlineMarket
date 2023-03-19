import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';
import { environment } from 'src/environments/environment';
import store from 'src/app/redux/store';

import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ProductsService } from 'src/app/services/products.service';
import { ProductUpdateComponent } from '../product-update/product-update.component';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  public productImageUrl = environment.productImageUrl;
  public isAdmin: boolean;

  @Input()
  public product: ProductModel;

  constructor(
    public productsService: ProductsService,
    public dialog: MatDialog,
    private notify: NotifyService,

  ) { }

  ngOnInit(): void {
    this.isAdmin = store.getState().authState.user.isAdmin;
  }

  public async deleteThisCard(_id: string) {
    try {
      await this.productsService.deleteProduct(_id);
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: { product: this.product },
    });
  }

  updateProductDialog() {
    const dialogRef = this.dialog.open(ProductUpdateComponent, {
      data: { product: this.product },
    });
  }
}
