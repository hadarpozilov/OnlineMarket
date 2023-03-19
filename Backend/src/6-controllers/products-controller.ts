import express, { NextFunction, Request, Response } from 'express';
import productsLogic from '../5-logic/products-logic';
import path from 'path';
import verifyToken from '../3-middleware/verify-token';

const router = express.Router();

router.get("/products/categories/",verifyToken,async (request: Request, response: Response, next: NextFunction) => {
    try {
      const categories = await productsLogic.getAllCategories();
      response.json(categories);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get("/products/number-of-products/",async (request: Request, response: Response, next: NextFunction) => {
    try {
      const numberOfProducts = await productsLogic.getCountOfProducts();
      response.json(numberOfProducts);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get("/products/products-by-category/:categoryId",async (request: Request, response: Response, next: NextFunction) => {
    try {
      const categoryId = request.params.categoryId;
      const productsByCategory = await productsLogic.getProductsByCategory(categoryId);
      response.json(productsByCategory);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get("/products/products-search/:pattern",async (request: Request, response: Response, next: NextFunction) => {
    try {
      const pattern = request.params.pattern;
      const resultSearch = await productsLogic.getProductByPattern(pattern);
      response.json(resultSearch);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get("/products",async (request: Request, response: Response, next: NextFunction) => {
    try {
      const products = await productsLogic.getAllProducts();
      response.json(products);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post("/products",async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.image = request.files?.image;
      const product = request.body;
      const addedProduct = await productsLogic.addProduct(product);
      response.status(201).json(addedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

router.put("/products/:_id",async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.image = request.files?.image;
      const product = request.body;
      const _id = request.params._id;
      const updatedProduct = await productsLogic.updateProduct(_id, product);
      response.status(201).json(updatedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

router.delete("/products/:_id",async (request: Request, response: Response, next: NextFunction) => {
    try {
      const _id = request.params._id;
      await productsLogic.deleteProduct(_id);
      response.sendStatus(204);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get("/products/images/:imageName",(req: Request, res: Response, next: NextFunction) => {
    try {
      const imageName = req.params.imageName;
      const absolutePath = path.join(__dirname,'..','1-assets','images',imageName);
      res.sendFile(absolutePath);
    } catch (error: any) {
      next(error);
    }
  }
);
export default router;
