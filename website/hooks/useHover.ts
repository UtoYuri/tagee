import * as React from 'react';

const useHover = (defaultIsHovered: boolean): [boolean, React.MutableRefObject<any>] => {
  const [isHovered, setIsHovered] = React.useState<boolean>(defaultIsHovered);
  const ref: React.MutableRefObject<any> = React.useRef(null);

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  React.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);

      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [ref.current]);

  return [isHovered, ref];
}

export default useHover