import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './ResizableContainer.css';
import { useEffect, useState } from 'react';

interface ResizableContainerProps {
  direction: 'horizontal' | 'vertical';
  children: React.ReactNode;
}

const ResizableContainer: React.FC<ResizableContainerProps> = ({
  direction,
  children,
}) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(Math.floor(window.innerWidth * 0.75));

  useEffect(() => {
    let timer: any;

    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (width > window.innerWidth * 0.75) {
          setWidth(Math.floor(window.innerWidth * 0.75));
        }
      }, 100);
    };

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  let resizableProps: ResizableBoxProps;

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width: width,
      resizeHandles: ['e'],
      minConstraints: [Math.floor(innerWidth * 0.2), Infinity],
      maxConstraints: [Math.floor(innerWidth * 0.75), Infinity],
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 48],
      maxConstraints: [Infinity, Math.floor(innerHeight * 0.9)],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default ResizableContainer;
