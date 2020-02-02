import * as React from 'react';

interface SettingAction {
  key: string,
  value: any,
}

interface Settings {
  [name: string]: any,
}

type Store = {
  settings: Settings,
  dispatch: (action: SettingAction) => void,
};

const initialSettings: Settings = {};

const globalSettingReducer = (state: Settings, action: SettingAction): Settings => {
  state[action.key] = action.value;
  
  return {
    ...state,
  };
};

export const GlobalSettingContext = React.createContext<Store>({settings: initialSettings} as Store);

export const GlobalSettingProvider = ({ children }: { children: any }): JSX.Element => {
  const [settings, dispatch] = React.useReducer(globalSettingReducer, initialSettings);

  return (
    <GlobalSettingContext.Provider value={{settings, dispatch}}>
      {children}
    </GlobalSettingContext.Provider>
  );
};
