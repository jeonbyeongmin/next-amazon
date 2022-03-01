import type { ActionType, DarkModeStateType } from "../types/storeType";
import Cookies from "js-cookie";
import React, { createContext, Dispatch, useContext, useReducer } from "react";

const DarkModeState = createContext<DarkModeStateType | null>(null);
const DarkModeDispatch = createContext<Dispatch<ActionType> | null>(null);

const initialState = {
  darkMode: Cookies.get("darkMode") === "ON",
};

function reducer(state: DarkModeStateType, action: ActionType) {
  switch (action.type) {
    case "DARK_MODE_ON":
      Cookies.set("darkMode", "ON");
      return { ...state, darkMode: true };
    case "DARK_MODE_OFF":
      Cookies.set("darkMode", "OFF");
      return { ...state, darkMode: false };
    default:
      return state;
  }
}

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DarkModeState.Provider value={state}>
      <DarkModeDispatch.Provider value={dispatch}>
        {children}
      </DarkModeDispatch.Provider>
    </DarkModeState.Provider>
  );
}

export function useDarkModeState() {
  const state = useContext(DarkModeState);
  if (!state) throw new Error("Cannot find DarkModeState");
  return state;
}

export function useDarkModeDispatch() {
  const dispatch = useContext(DarkModeDispatch);
  if (!dispatch) throw new Error("Cannot find DarkModeDispatch");
  return dispatch;
}
