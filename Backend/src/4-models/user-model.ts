import mongoose from "mongoose";

export interface IUserModel extends mongoose.Document {
  userId: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  isAdmin: boolean;
}

export const UserSchema = new mongoose.Schema<IUserModel>(
  {
    userId: {
      type: Number,
      required: [true, "Missing User Id"],
      minlength: [7, "Id Too Short."],
      maxlength: [14, "Id Too long."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Missing Email"],
      minlength: [4, "Email Too Short."],
      maxlength: [100, "Email Too long."],
    },
    password: {
      type: String,
      required: [true, "Missing Password"],
      minlength: [4, "Password Too Short."],
      maxlength: [150, "Password Too long."],
    },
    firstName: {
      type: String,
      required: [true, "Missing First Name"],
      minlength: [2, "Name Too Short."],
      maxlength: [50, "Name Too long."],
    },
    lastName: {
      type: String,
      required: [true, "Missing Last Name "],
      minlength: [2, "Last name Too Short."],
      maxlength: [50, "Last name Too long."],
    },
    city: {
      type: String,
      minlength: [2, "City Too Short."],
      maxlength: [50, "Street Too long."],
    },
    street: {
      type: String,
      minlength: [2, "Street Too Short."],
      maxlength: [50, "Street Too long."],
    },
    isAdmin:{
      type: Boolean
    }
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
  }
);

export const UserModel = mongoose.model<IUserModel>("UserModel", UserSchema, "users");
