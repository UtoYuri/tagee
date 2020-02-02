import * as React from 'react';

const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const getValue = (key: string) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  }

  const [storedValue, setStoredValue] = React.useState(initialValue);

  const setValue = (value: any, callback?: (error?: any) => any) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
      if (callback) {
        callback();
      }
    } catch (error) {
      if (callback) {
        callback(error);
      }
    }
  };

  React.useLayoutEffect(() => {
    setStoredValue(getValue(key));
  }, []);

  return [storedValue, setValue];
}

export default useLocalStorage;