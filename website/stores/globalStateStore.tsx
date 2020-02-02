import * as React from 'react';

export interface Payload {
  pending?: boolean;
  result?: any;
  error?: any;
}

interface Action {
  key: string;
  payload: Payload;
}

interface State {
  [name: string]: Payload,
}

type Store = {
  state: State,
  dispatch: (action: Action) => void,
};

const initialState: State = {};

const globalStateReducer = (state: State, action: Action): State => {
  if (!state[action.key]) {
    state[action.key] = action.payload;
  } else {
    state[action.key] = {
      ...state[action.key],
      ...action.payload,
    };
  }
  
  return {
    ...state,
  };
};

export const GlobalStateContext = React.createContext<Store>({state: initialState} as Store);

export const GlobalStateProvider = ({ children }: { children: any }): JSX.Element => {
  const [state, dispatch] = React.useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{state, dispatch}}>
      {children}
    </GlobalStateContext.Provider>
  );
};
