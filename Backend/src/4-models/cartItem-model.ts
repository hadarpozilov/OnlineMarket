import mongoose from "mongoose";
import { CartModel } from "./cart-model";
import { ProductModel } from "./product-model";

export interface ICartItemModel extends mongoose.Document {
  product_id: mongoose.Schema.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  cart_id: mongoose.Schema.Types.ObjectId;
}

export const CartItemSchema = new mongoose.Schema<ICartItemModel>(
  {
    product_id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    cart_id: mongoose.Schema.Types.ObjectId,
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
  }
);

// Virtual Fields:
CartItemSchema.virtual("product", {
  ref: ProductModel,
  localField: "product_id",
  foreignField: "_id",
  justOne: true,
});

// Virtual Fields:
CartItemSchema.virtual("cart", {
  ref: CartModel,
  localField: "cart_id",
  foreignField: "_id",
  justOne: true,
});

export const CartItemModel = mongoose.model<ICartItemModel>("CartItemModel",CartItemSchema,"cart-items");
