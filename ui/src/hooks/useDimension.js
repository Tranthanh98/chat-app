import { useEffect, useState } from "react";

export default function useDimension() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);

  const handleResizeWindow = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);

    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  return { isMobile };
}
