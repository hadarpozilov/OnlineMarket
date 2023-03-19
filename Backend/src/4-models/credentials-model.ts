import mongoose from "mongoose";

export interface ICredentialsModel extends mongoose.Document {
  email: string;
  password: string;
}

export const CredentialsSchema = new mongoose.Schema<ICredentialsModel>(
  {
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
      maxlength: [20, "Password Too long."],
    },
  },
  {
    versionKey: false,
  }
);

export const CredentialsModel = mongoose.model<ICredentialsModel>("CredentialsModel",CredentialsSchema,"users");
