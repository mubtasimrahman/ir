import { useEffect, useState, useRef, useCallback } from "react";
import lottie, { AnimationItem } from "lottie-web";
import "./OurSpecialities.scss";
import AIImage from "../../assets/ourSpecialities/AI Image Generation.json";
import ARTILL from "../../assets/ourSpecialities/Artwork & Illustrations.json";
import GD from "../../assets/ourSpecialities/Graphic Design.json";
import MG from "../../assets/ourSpecialities/Motion Graphics.json";
import VVE from "../../assets/ourSpecialities/Videography & Video Editing.json";
import WD from "../../assets/ourSpecialities/Web Design.json";
import AIImageSVG from "../../assets/ourSpecialities/static/Ai Image Generation.svg";
import ARTILLASVG from "../../assets/ourSpecialities/static/Artwork & Illustrations.svg";
import GDSVG from "../../assets/ourSpecialities/static/Graphic Design.svg";
import MGSVG from "../../assets/ourSpecialities/static/Motion Graphics.svg";
import VVESVG from "../../assets/ourSpecialities/static/Videography & Video Editing.svg";
import WDSVG from "../../assets/ourSpecialities/static/Web Design.svg";

interface Services {
  serviceName: string;
  jsonAnimation: object;
  svgImg: string;
}

function OurSpecialities({ id }: { id: string }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const intersectionMap = useRef<Map<number, boolean>>(new Map());
  const animationMap = useRef<Map<number, AnimationItem>>(new Map());

  // Check for touchscreen and viewport width under 992px
  function isTouchScreenAndSmallViewport() {
    return (
      window.innerWidth < 992 &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    );
  }

  const handleMouseEnter = useCallback(
    (index: number) => {
      if (prefersReducedMotion) return;

      const animation = animationMap.current.get(index);
      if (animation) {
        animation.setDirection(1);
        animation.setSpeed(1);
        animation.goToAndPlay(animation.currentFrame, true);
      }
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(
    (index: number) => {
      if (prefersReducedMotion) return;

      const animation = animationMap.current.get(index);
      if (animation) {
        const isAnimationComplete =
          animation.currentFrame + 1 === animation.totalFrames;
        if (!isAnimationComplete) {
          animation.setDirection(-1);
          animation.setSpeed(1.25);
          animation.goToAndPlay(animation.currentFrame, true);
        } else {
          animation.goToAndStop(0, true);
        }
      }
    },
    [prefersReducedMotion]
  );

  //checks for prefers-reduced motion preference and updates if changed live
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Observe animation elements for intersection
  useEffect(() => {
    elementsRef.current.forEach((element, index) => {
      if (!element || !isTouchScreenAndSmallViewport()) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                handleMouseEnter(index);
                element.classList.add("hover");
                intersectionMap.current.set(index, true);
              }, 300);
            } else if (intersectionMap.current.get(index)) {
              handleMouseLeave(index);
              element.classList.remove("hover");
              intersectionMap.current.set(index, false);
            }
          });
        },
        { threshold: 1, rootMargin: "-20% 0px -15% 0px" }
      );

      observer.observe(element);
      return () => {
        observer.disconnect();
      };
    });
  }, [handleMouseEnter, handleMouseLeave]);

  function initializeLottie(
    container: HTMLDivElement | null,
    animationData: object,
    index: number
  ) {
    if (animationMap.current.has(index)) {
      return;
    }

    if (container && !prefersReducedMotion) {
      const animation = lottie.loadAnimation({
        container: container,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: animationData,
      });
      // add new entry to current map
      animationMap.current.set(index, animation);
    }
  }
  const services: Services[] = [
    { serviceName: "Graphic Design", jsonAnimation: GD, svgImg: GDSVG },
    {
      serviceName: "AI Image Generation",
      jsonAnimation: AIImage,
      svgImg: AIImageSVG,
    },
    {
      serviceName: "Artwork & Illustations",
      jsonAnimation: ARTILL,
      svgImg: ARTILLASVG,
    },
    { serviceName: "Motion Graphics", jsonAnimation: MG, svgImg: MGSVG },
    {
      serviceName: "Videography & Video Editing",
      jsonAnimation: VVE,
      svgImg: VVESVG,
    },
    { serviceName: "Web Design", jsonAnimation: WD, svgImg: WDSVG },
  ];

  return (
    <div id={id} className="mt-lg-2">
      <div className="poppins-bold-heading">Our Specialities</div>
      <div className="container">
        <div className="row gy-3 justify-content-center">
          {services.map((service, index) => (
            <div key={index} className="col-lg-6">
              <div
                data-index={index}
                className="d-flex speciality py-3 px-2"
                onMouseEnter={() => {
                  handleMouseEnter(index);
                }}
                onMouseLeave={() => {
                  handleMouseLeave(index);
                }}
                role="textbox"
                tabIndex={0}
                aria-label={`Speciality: ${service.serviceName}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleMouseEnter(index);
                  }
                }}
              >
                <div
                  role="img"
                  className="image-animation me-1"
                  ref={(element) => {
                    // console.log(element)
                    // initialize current element lottie and add it to elementsRef for intersection tracking
                    elementsRef.current[index] = element;
                    initializeLottie(element, service.jsonAnimation, index);
                  }}
                  aria-label={`Animation for ${service.serviceName}`}
                />
                <div className="d-flex flex-column justify-content-lg-center justify-content-evenly align-items-start speciality-content">
                  <div className="service-name poppins-bold ms-2">
                    {service.serviceName}
                  </div>
                  <button
                    type="button"
                    className="learn-more poppins-extralight ms-2 mt-1"
                  >
                    Learn More &gt;
                  </button>
                </div>
                <img
                  loading="lazy"
                  className="image-svg"
                  src={service.svgImg}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurSpecialities;
