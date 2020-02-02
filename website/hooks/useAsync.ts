import * as React from 'react';

interface Async<T> {
  execute: (...params: any[]) => Promise<void>;
  pending: boolean;
  result: T|null;
  error: any;
}

const useAsync = <T>(asyncFunc: (...params: any[]) => Promise<T>, immediate: boolean = true): Async<T> => {
  const [pending, setPending] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<T|null>(null);
  const [error, setError] = React.useState<any>(null);

  const execute = React.useCallback((...params: any[]) => {
    setPending(true);
    setError(null);
    return asyncFunc(params)
      .then((response: T) => setResult(response))
      .catch((error: any) => setError(error))
      .finally(() => setPending(false));
  }, [asyncFunc]);

  React.useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, pending, result, error };
};

export default useAsync;
