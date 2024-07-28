import { useState, useEffect, Dispatch, SetStateAction } from "react";

function useIntersectionObserver(
  options: IntersectionObserverInit | undefined,
  once = true
): [Dispatch<SetStateAction<HTMLDivElement | null>>, boolean] {
  const [isIntersecting, setIntersecting] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        if (once) observer.disconnect();
      }
    }, options);

    observer.observe(ref);

    return () => {
      if (!once) observer.disconnect();
    };
  }, [ref, options, once]);

  return [setRef, isIntersecting];
}

export default useIntersectionObserver;
