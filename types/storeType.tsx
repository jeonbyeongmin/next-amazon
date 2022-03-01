import type { CartType, ProductPayloadType } from "./productType";

export interface DarkModeStateType {
  darkMode: boolean;
}

export interface CartStateType {
  cart: CartType;
}

export type ActionType =
  | { type: "DARK_MODE_ON" }
  | { type: "DARK_MODE_OFF" }
  | { type: "CART_ADD_ITEM"; payload: ProductPayloadType };
