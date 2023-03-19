import { CityModel, ICityModel } from "../4-models/city-model";
import { ValidationError } from "../4-models/error-models";
import { IOrderModel, OrderModel } from "../4-models/order-model";
import cartsLogic from "./carts-logic";

// Get all cities:
async function getCities(): Promise<ICityModel[]> {
  return CityModel.find().exec();
}

// Get Number Of Orders
async function getNumberOfOrders(): Promise<number> {
  return OrderModel.find().count().exec();
}

// Get Last Order
async function getLastOrder(user_id): Promise<IOrderModel[]> {
  return OrderModel.find({ user_id: user_id }).sort({ _id: -1 }).limit(1).exec();
}

// Add order
async function addOrder(order: IOrderModel): Promise<IOrderModel> {
  const errors = order.validateSync()
    if (errors){
       throw new ValidationError(errors.message)
    }
  await cartsLogic.deleteCart(order.cart_id.toString());
  return order.save();
}

async function checkDate(date: Date): Promise<boolean> {
  const numOfShippingOnDate = await countOrdersDates(date);
  if (numOfShippingOnDate >= 3) {
    return true;
  }
  return false;
}

//---------------

async function countOrdersDates(shippingDate: Date): Promise<number> {
  const orderDate = await OrderModel.find({ shippingDate }).count().exec();
  return orderDate;
}

export default {
  getCities,
  getNumberOfOrders,
  addOrder,
  checkDate,
  getLastOrder,
};
