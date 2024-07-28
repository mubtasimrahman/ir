import { ReactNode } from "react";
import useIntersectionObserver from "../Hooks/useIntersectionObserver";

interface LazyLoadWrapperProps {
  id:string
  children: ReactNode;
  initialHeight: string;
  options?: IntersectionObserverInit;
}

function LazyLoadWrapper({
  children,
  initialHeight,
  options = { threshold: 0.1 },
  id,
}: LazyLoadWrapperProps) {
  const [setRef, isIntersecting] = useIntersectionObserver(options);

  return (
    <div id = {id} ref={setRef} style={{ minHeight: initialHeight }}>
      {isIntersecting ? children : <div>Loading...</div>}
    </div>
  );
}

export default LazyLoadWrapper;
