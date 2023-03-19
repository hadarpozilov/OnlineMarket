import { CartModel, ICartModel } from "../4-models/cart-model";
import { CartItemModel } from "../4-models/cartItem-model";

async function getCart(user_id: string): Promise<ICartModel> {
  const myCart = await isCartExist(user_id);
  if (myCart.length > 0) {
    return myCart[0];
  }
  return undefined;
}

async function createCart(user_id: string): Promise<ICartModel> {
  const newCartt = await createNewCart(user_id);
  return newCartt;
}

async function forceNewCart(cart_id: string,user_id: string): Promise<ICartModel> {
  await CartModel.findByIdAndDelete({ _id: cart_id }).exec();
  await CartItemModel.deleteMany({ cart_id: cart_id }).exec();
  const newCart = await createNewCart(user_id);
  return newCart;
}

async function deleteCart(cart_id: string): Promise<void> {
  // delete cart;
  await CartModel.findByIdAndDelete({ _id: cart_id }).exec();
  await CartItemModel.deleteMany({ cart_id: cart_id }).exec();
}

//------------------

async function isCartExist(user_id: string): Promise<ICartModel[]> {
  const cart = await CartModel.find({ user_id: user_id }).populate("user").exec();
  return cart;
}

async function createNewCart(user_id: string): Promise<ICartModel> {
  const cart = new CartModel({ user_id: user_id });
  return cart.save();
}

export default {
  getCart,
  createCart,
  forceNewCart,
  deleteCart,
};
