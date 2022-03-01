import type { ActionType, CartStateType } from "../types/storeType";
import React, { createContext, Dispatch, useContext, useReducer } from "react";
import Cookies from "js-cookie";

const CartState = createContext<CartStateType | null>(null);
const CartDispatch = createContext<Dispatch<ActionType> | null>(null);

const initialState = {
  cart: {
    cartItems: Cookies.get("cartItems")
      ? JSON.parse(Cookies.get("cartItems") ?? "")
      : [],
  },
};

function reducer(state: CartStateType, action: ActionType) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartState.Provider value={state}>
      <CartDispatch.Provider value={dispatch}>{children}</CartDispatch.Provider>
    </CartState.Provider>
  );
}

export function useCartState() {
  const state = useContext(CartState);
  if (!state) throw new Error("Cannot find CartState");
  return state;
}

export function useCartDispatch() {
  const dispatch = useContext(CartDispatch);
  if (!dispatch) throw new Error("Cannot find CartDispatch");
  return dispatch;
}
