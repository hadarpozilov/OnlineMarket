import { CategoryModel } from "./category-model";
import mongoose from "mongoose";
import { UploadedFile } from "express-fileupload";

export interface IProductModel extends mongoose.Document {
  name: string;
  price: number;
  category_id: mongoose.Schema.Types.ObjectId;
  imageName: string;
  image: UploadedFile;
}

export const ProductSchema = new mongoose.Schema<IProductModel>(
  {
    name: {
      type: String,
      required: [true, "Missing Product Name"],
      minlength: [2, "Name Too Short."],
      maxlength: [50, "Name Too long."],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Missing Price"],
      min: [0.01, "Price Too Low."],
      max: [10000, "Price Too High."],
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Missing Category Id"],
    },
    imageName: {
      type: String,
    },
    image: {
      
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
  }
);

// Virtual Fields:
ProductSchema.virtual("category", {
  ref: CategoryModel,
  localField: "category_id",
  foreignField: "_id",
  justOne: true,
});

export const ProductModel = mongoose.model<IProductModel>("ProductModel",ProductSchema,"products");
