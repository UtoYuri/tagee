import * as React from 'react';

import { GlobalSettingContext } from '../stores/globalSettingStore';

const useGlobalSetting = (key: string, defaultValue: any): [any, (value: any) => void] => {
  const {settings, dispatch} = React.useContext(GlobalSettingContext);

  const set = (value: any) => {
    dispatch({ key, value});
  };

  const get = () => {
    return settings[key] || defaultValue;
  };

  return [get(), set];
};

export default useGlobalSetting;