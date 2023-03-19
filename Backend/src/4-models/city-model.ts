import mongoose from "mongoose";

export interface ICityModel extends mongoose.Document {
  city: string;
}

export const CitySchema = new mongoose.Schema<ICityModel>(
  {
    city: String,
  },
  {
    versionKey: false,
  }
);

export const CityModel = mongoose.model<ICityModel>("CityModel", CitySchema, "cities");
