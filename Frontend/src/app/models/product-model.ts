import { CategoryModel } from './category-model';

export class ProductModel {
  public _id: string;
  public name: string;
  public price: number;
  public categoryId: string;
  public category: CategoryModel;

  public imageName: string;
  public image: File;
}