import mongoose from "mongoose";
import { CartModel } from "./cart-model";
import { ICityModel } from "./city-model";
import { UserModel } from "./user-model";

export interface IOrderModel extends mongoose.Document {
  user_id: mongoose.Schema.Types.ObjectId;
  cart_id: mongoose.Schema.Types.ObjectId;
  shippingCity: ICityModel;
  shippingStreet: ICityModel;
  shippingDate: Date;
  creditCardNumber: number;
}

export const OrderSchema = new mongoose.Schema<IOrderModel>(
  {
    user_id: mongoose.Schema.Types.ObjectId,
    cart_id: mongoose.Schema.Types.ObjectId,
    shippingCity: String,
    shippingStreet: String,
    shippingDate: Date,
    creditCardNumber: Number,
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
  }
);

// Virtual Fields:
OrderSchema.virtual("user", {
  ref: UserModel,
  localField: "user_id",
  foreignField: "_id",
  justOne: true,
});

OrderSchema.virtual("cart", {
  ref: CartModel,
  localField: "cart_id",
  foreignField: "_id",
  justOne: true,
});

export const OrderModel = mongoose.model<IOrderModel>("OrderModel",OrderSchema,"orders"
);
