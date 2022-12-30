import * as React from "../../_snowpack/pkg/react.js";
import useResizeObserver from "../../_snowpack/pkg/@react-hook/resize-observer.js";
export const useSize = (target) => {
  const [size, setSize] = React.useState();
  React.useLayoutEffect(() => {
    if (target.current) {
      setSize(target.current.getBoundingClientRect());
    }
  }, [target]);
  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};
