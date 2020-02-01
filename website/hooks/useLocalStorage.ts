import * as React from 'react';

const useLocalStorage = <T>(key: string, initialValue: T, listen: boolean=false): [T, (value: T) => void] => {
  const getValue = (key: string) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  }

  const [storedValue, setStoredValue] = React.useState(getValue(key));

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

  const latestValue = listen ? getValue(key) : storedValue;

  React.useEffect(() => {
    setStoredValue(latestValue);
  }, [latestValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;