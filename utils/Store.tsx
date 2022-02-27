import React, { createContext, Dispatch, useContext, useReducer } from "react";

type State = {
  darkMode: boolean;
};

type Action =
  | { type: "DARK_MODE_ON"; count: number }
  | { type: "DARK_MODE_OFF"; text: string };

const DarkModeState = createContext<State | null>(null);
const DarkModeDispatch = createContext<Dispatch<Action> | null>(null);

const initialState = {
  darkMode: true,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkMode: true };
    case "DARK_MODE_OFF":
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
