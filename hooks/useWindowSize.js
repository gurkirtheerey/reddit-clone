import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [width, setWidth] = useState(0);

  if (typeof window !== "undefined") {
    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      handleResize();
    }, []);
  }
  return width;
};
