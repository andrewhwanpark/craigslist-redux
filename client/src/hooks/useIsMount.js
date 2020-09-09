import { useRef, useEffect } from "react";

// Custom hook used to disable firing useEffect hook at initial render
const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

export default useIsMount;
