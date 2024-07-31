import { useEffect, useRef } from "react";
import "./LazyMask.scss"

interface LazyMaskProps {
  maskImageUrl: string;
  children: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
}

function LazyMask({
  maskImageUrl,
  children,
  rootMargin = "0px",
  threshold = 0.1,
}: LazyMaskProps) {
  const maskRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const maskElement = maskRef.current?.firstElementChild as HTMLElement;

    const loadMaskImage = () => {
        maskElement.style.setProperty('--mask-image-url', `url(${maskImageUrl})`);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMaskImage();
            observer.disconnect();
          }
        });
      },
      { rootMargin, threshold }
    );

    if (maskRef.current) {
      observer.observe(maskRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [maskImageUrl, rootMargin, threshold]);

  return <div className="positioning" ref={maskRef} >{children}</div>;
}

export default LazyMask;
