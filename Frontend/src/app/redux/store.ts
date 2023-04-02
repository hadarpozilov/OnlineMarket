import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { productsReducer } from "./products-state";
import { cartReducer } from "./cart-state";
import { cartItemsReducer } from "./cart-items-state";

const reducers = combineReducers({
  productsState: productsReducer,
  authState: authReducer,
  cartState: cartReducer,
  cartItemsState: cartItemsReducer,
});

const store = createStore(reducers);
export default store;
