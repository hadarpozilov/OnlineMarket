import { CategoryModel, ICategoryModel } from "../4-models/category-model";
import { IProductModel, ProductModel } from "../4-models/product-model";
import { ResourceNotFoundError, ValidationError } from "../4-models/error-models";
import { v4 as uuid } from "uuid";
import path from "path";
import fs from "fs";

// Get all categories:
async function getAllCategories(): Promise<ICategoryModel[]> {
  return CategoryModel.find().exec();
}

// Get all products:
async function getAllProducts(): Promise<IProductModel[]> {
  return ProductModel.find().select("-image").populate("category").exec();
}

// Get Count Of Products
async function getCountOfProducts(): Promise<number> {
  return ProductModel.find().count().exec();
}

// Get Products By CategoryId
async function getProductsByCategory(categoryId: string):Promise<IProductModel[]> {
  return ProductModel.find({ category_id: categoryId }).select("-image").populate("category").exec();
}

// Get Product By Pattern
async function getProductByPattern(pattern: string): Promise<IProductModel[]> {
  const resultRegexSearch = ProductModel.find({name: { $regex: pattern, $options: "i" },}).populate("category").exec();
  return resultRegexSearch;
}

// Add new product:
async function addProduct(product: IProductModel): Promise<IProductModel> {
  if (product.image) {
    const extension = product.image.name.substring(product.image.name.lastIndexOf("."));
    product.imageName = uuid() + extension;
    await product.image.mv("./src/1-assets/images/"+ product.imageName)
    delete product.image;
  }
  const newProduct = new ProductModel(product);
  return newProduct.save();
}

// Update product: 
async function updateProduct(product_id: string,product: IProductModel): Promise<IProductModel> {
  if (product.image) {
    const excistingProduct = await ProductModel.findById(product_id).exec();
    if (excistingProduct.imageName) {
      removeImage(excistingProduct.imageName);
    }
    // save new image.
    const extension = product.image.name.substring(product.image.name.lastIndexOf("."));
    product.imageName = uuid() + extension;
    await product.image.mv(path.join(__dirname, '..', '1-assets', 'images', product.imageName))
    delete product.image;
  }

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    product_id,
    product,
    { returnOriginal: false }
  ).exec();
  if (!updatedProduct)
    throw new ResourceNotFoundError(`_id ${product._id} not found`);

  return updatedProduct;
}

// Delete product:
async function deleteProduct(_id: string): Promise<void> {
  const product = await ProductModel.findById(_id).exec();
  if (product.imageName) {
    removeImage(product.imageName);
  }
  await ProductModel.findByIdAndDelete(_id).exec();
}

//----------------

// remove image
async function removeImage(imageName: string) {
  const absolutePath = path.join(__dirname,'..','1-assets','images',imageName);
  await fs.unlink(absolutePath, function (err) {
  });
  return;
}

export default {
  getAllCategories,
  getAllProducts,
  getCountOfProducts,
  getProductsByCategory,
  getProductByPattern,
  addProduct,
  deleteProduct,
  updateProduct,
};
