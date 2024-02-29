import { useState,useEffect } from "react";
const useResponsive = () => {
  // screen resolutions
  const [state, setState] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    // update the state on the initial load
    onResizeHandler();

    // assign the event
    setup();

    return () => {
      // remove the event
      cleanupOnUmount();
    };
  }, []);

  // update the state on window resize
  const onResizeHandler = () => {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth <= 990;
    const isDesktop = window.innerWidth > 990;

    setState({ isMobile, isTablet, isDesktop });
  };

  // debounce the resize call

  // add event listener
  const setup = () => {
    window.addEventListener("resize", onResizeHandler, false);
  };

  // remove the listener
  const cleanupOnUmount = () => {
    window.removeEventListener("resize", onResizeHandler, false);
  };

  return state;
};

export default useResponsive;
