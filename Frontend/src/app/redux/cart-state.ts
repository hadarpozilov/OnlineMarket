import { CartModel } from "../models/cart-model";

export class CartState {
  public cart: CartModel;
}

export enum CartActionType {
  FetchCart = "FetchCart",
  DeleteCart = "DeleteCart",
}

export interface CartAction {
  type: CartActionType;
  payload?: any;
}

export function fetchCartAction(cart: CartModel): CartAction {
  return { type: CartActionType.FetchCart, payload: cart };
}
export function deleteCartAction(): CartAction {
  return { type: CartActionType.DeleteCart };
}

export function cartReducer(
  currentState = new CartState(),
  action: CartAction
): CartState {
  const newState = { ...currentState };

  switch (action.type) {
    case CartActionType.FetchCart:
      newState.cart = action.payload;

      break;
    case CartActionType.DeleteCart:
      newState.cart = null;

      break;
  }

  return newState;
}
