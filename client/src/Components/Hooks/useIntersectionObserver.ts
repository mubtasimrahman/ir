import { useState, useEffect, Dispatch, SetStateAction } from "react";

function useIntersectionObserver(
  options: IntersectionObserverInit | undefined
): [Dispatch<SetStateAction<HTMLDivElement | null>>, boolean] {
  const [isIntersecting, setIntersecting] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return [setRef, isIntersecting];
}

export default useIntersectionObserver;
