import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/category-model';
import { ProductModel } from '../models/product-model';
import { addProductAction, deleteProductAction, fetchCategoriesAction, fetchProductsAction, ProductsAction, updateProductAction,} from '../redux/products-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  public async getAllCategories(): Promise<CategoryModel[]> {
    const observable =this.http.get<CategoryModel[]>(environment.catgoriesUrl)
    const categories = await firstValueFrom(observable);
    const action: ProductsAction = fetchCategoriesAction(categories);
    store.dispatch(action);

    return categories;
  }

  // ------------------------------------

  public async getAllProducts(): Promise<ProductModel[]> {
    const observable = this.http.get<ProductModel[]>(environment.productsUrl)
    const products = await firstValueFrom(observable);
    const action: ProductsAction = fetchProductsAction(products);
    store.dispatch(action);

    return products;
  }

  // ------------------------------------

  public async getProductsByCategory(categoryId: string): Promise<ProductModel[]> {
    const observable = this.http.get<ProductModel[]>(environment.productsByCategoryUrl + categoryId)
    const products = await firstValueFrom( observable);
    return products;
  }

  // ------------------------------------

  public async getProductsByPattern(pattern: string): Promise<ProductModel[]> {
    const observable =this.http.get<ProductModel[]>(environment.productsSearchByPatternUrl + pattern)
    const products = await firstValueFrom(observable);
    return products;
  }

  // ------------------------------------

  public async addProduct(product: ProductModel): Promise<ProductModel> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('category_id', product.categoryId);
    formData.append('image', product.image);
    const observable = this.http.post<ProductModel>(environment.productsUrl, formData)
    const addedProduct = await firstValueFrom(observable);
    if (addedProduct) store.dispatch(addProductAction(addedProduct));

    return addedProduct;
  }

  // ------------------------------------

  public async updateProduct(product: ProductModel): Promise<ProductModel> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('category_id', product.categoryId);
    formData.append('image', product.image);
    const observable =this.http.put<ProductModel>(environment.productsUrl + product._id,formData)
    const updatedProduct = await firstValueFrom(observable);
    if (updatedProduct) store.dispatch(updateProductAction(updatedProduct));

    return updatedProduct;
  }

  // ------------------------------------

  public async deleteProduct(_id: string): Promise<void> {
    const observable =this.http.delete(environment.productsUrl + _id)
    const action: ProductsAction = deleteProductAction(_id);
    store.dispatch(action);

    await firstValueFrom(observable);
  }
}
