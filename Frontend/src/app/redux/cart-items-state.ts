import { CartItemModel } from "../models/cartItem-model";

export class CartItemsState {
  public cartItems: CartItemModel[] = [];
}

export enum CartItemsActionType {
  FetchCartItems = "FetchCartItems",
  AddCartItem = "AddCartItem",
  UpdateCartItem= "UpdateCartItem",
  DeleteCartItem = "DeleteCartItem",
  RemoveAllItemsFromCart = "RemoveAllItemsFromCart",
}

export interface CartItemsAction {
  type: CartItemsActionType;
  payload?: any;
}

export function fetchCartItemsAction(
  cartItems: CartItemModel[]
): CartItemsAction {
  return { type: CartItemsActionType.FetchCartItems, payload: cartItems };
}
export function addCartItemAction(cartItem: CartItemModel): CartItemsAction {
  return { type: CartItemsActionType.AddCartItem, payload: cartItem };
}
export function updateCartItemAction(cartItem: CartItemModel): CartItemsAction {
  return { type: CartItemsActionType.UpdateCartItem, payload: cartItem };
}
export function deleteCartItemAction(_id: string): CartItemsAction {
  return { type: CartItemsActionType.DeleteCartItem, payload: _id };
}
export function removeAllItemsAction(): CartItemsAction {
  return { type: CartItemsActionType.RemoveAllItemsFromCart };
}

export function cartItemsReducer(
  currentState = new CartItemsState(),
  action: CartItemsAction
): CartItemsState {
  const newState = { ...currentState };

  switch (action.type) {
    case CartItemsActionType.FetchCartItems:
      newState.cartItems = action.payload;
      break;

    case CartItemsActionType.AddCartItem:
      newState.cartItems.push(action.payload);
      break;

    case CartItemsActionType.UpdateCartItem:
      const indexToUpdate = newState.cartItems.findIndex((i) => i._id === action.payload._id);
      if (indexToUpdate >= 0) {
        newState.cartItems[indexToUpdate].quantity = action.payload.quantity;
      }
      break;
    case CartItemsActionType.DeleteCartItem:
      const indexToDelete = newState.cartItems.findIndex((i) => i._id === action.payload);
      if (indexToDelete >= 0) {
        newState.cartItems.splice(indexToDelete, 1);
      }
      break;
    case CartItemsActionType.RemoveAllItemsFromCart:
      newState.cartItems = [];
      break;
  }
  return newState;
}
