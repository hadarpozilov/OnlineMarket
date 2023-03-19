import { CityModel, ICityModel } from "../4-models/city-model";

async function getAllCities(): Promise<ICityModel[]> {
  return CityModel.find().exec();
}

export default {
  getAllCities,
};
