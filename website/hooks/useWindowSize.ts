import * as React from 'react';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

const useWindowSize = (): WindowSize => {
  const isClient = typeof window === 'object';

  const getSize = (): WindowSize => ({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined
  });

  const [windowSize, setWindowSize] = React.useState<WindowSize>(getSize);

  React.useEffect(() => {
    if (!isClient) {
      return;
    }
    
    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;