import * as React from 'react';

import { GlobalStateContext, Payload } from '../stores/globalStateStore';

const useGlobalState = <T>(key: string, defaultValue: T|null=null) => {
  const {state, dispatch} = React.useContext(GlobalStateContext);

  React.useEffect(() => {
    if (!state[key] && defaultValue) {
      setValue(defaultValue);
    }
  }, []);

  const setValue = (value: T) => {
    dispatch({ key, payload: {result: value, pending: false, error: null}});
  };

  const getValue = (): T => {
    const payload = getPayload();
    return payload ? payload.result : defaultValue;
  };

  const setPayload = (payload: Payload) => {
    dispatch({ key, payload});
  };

  const getPayload = () => {
    return state[key] || { result: defaultValue, pending: false, error: false };
  };

  return { setValue, getValue, setPayload, getPayload, payload: getPayload() };
};

export default useGlobalState;