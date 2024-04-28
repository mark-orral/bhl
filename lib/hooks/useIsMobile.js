import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [width, setWidth] = useState();
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    if (window) {
      setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowSizeChange);
    }
    return () => {
      if (window) {
        window.removeEventListener("resize", handleWindowSizeChange);
      }
    };
  }, []);
  return width <= 768;
};
