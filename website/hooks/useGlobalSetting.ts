import * as React from 'react';

import { GlobalSettingContext } from '../stores/globalSettingStore';

const useGlobalSetting = <T>(key: string, defaultValue: T): [any, (value: T) => void] => {
  const {settings, dispatch} = React.useContext(GlobalSettingContext);

  const set = (value: T) => {
    dispatch({ key, value});
  };

  const get = () => {
    return settings[key] || defaultValue;
  };

  return [get(), set];
};

export default useGlobalSetting;