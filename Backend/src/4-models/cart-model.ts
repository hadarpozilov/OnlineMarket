import mongoose from "mongoose";
import { UserModel } from "./user-model";

export interface ICartModel extends mongoose.Document {
  user_id: mongoose.Schema.Types.ObjectId;
}

export const CartSchema = new mongoose.Schema<ICartModel>(
  {
    user_id: mongoose.Schema.Types.ObjectId,
  },
  {
    versionKey: false,
  }
);

// Virtual Fields:
CartSchema.virtual("user", {
  ref: UserModel, 
  localField: "user_id", 
  foreignField: "_id",
  justOne: true, 
});

export const CartModel = mongoose.model<ICartModel>("CartModel", CartSchema, "carts");
