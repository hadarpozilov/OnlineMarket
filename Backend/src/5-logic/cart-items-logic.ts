import { CartItemModel, ICartItemModel } from "../4-models/cartItem-model";
import { ValidationError } from "../4-models/error-models";

async function getAllItemsFromCart(cart_id: string): Promise<ICartItemModel[]> {
  return CartItemModel.find({ cart_id: cart_id }).populate("product").exec();
}

async function addCartItem(item:ICartItemModel): Promise<ICartItemModel> {
  const errors = item.validateSync();
  if (errors) {
      throw new ValidationError(errors.message);
  }
  return item.save();
}

async function updateCartItem(item_id: string,newQuantity): Promise<ICartItemModel> {
   const updateItem = await CartItemModel.findByIdAndUpdate(item_id,{ quantity: newQuantity },{ new: true }).exec();
   return updateItem
}

// Delete cart item:
async function removeCartItem(_id: string): Promise<void> {
  await CartItemModel.findByIdAndDelete(_id).exec();
}
async function removeAllItemsFromCart(cart_id: string): Promise<void> {
  await CartItemModel.deleteMany({ cart_id: cart_id }).exec();
}

export default {
  getAllItemsFromCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  removeAllItemsFromCart,
};
