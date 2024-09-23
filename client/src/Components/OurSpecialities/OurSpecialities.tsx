import { useEffect, useState, useRef, useCallback } from "react";
import lottie, { AnimationItem } from "lottie-web";
import "./OurSpecialities.scss";
import {
  isTouchScreenAndSmallViewport,
  getOperatingSystem,
} from "../Utils/Touch&Viewport";
import AIImage from "../../assets/ourSpecialities/AI Image Generation.json";
import ARTILL from "../../assets/ourSpecialities/Artwork & Illustrations.json";
import GD from "../../assets/ourSpecialities/Graphic Design.json";
import MG from "../../assets/ourSpecialities/Motion Graphics.json";
import VVE from "../../assets/ourSpecialities/Videography & Video Editing.json";
import WD from "../../assets/ourSpecialities/Web Design.json";
import AIImageBG from "../../assets/ourSpecialities/static/Ai Image Generation.svg";
import ARTILLABG from "../../assets/ourSpecialities/static/Artwork & Illustrations.svg";
import GDBG from "../../assets/ourSpecialities/static/Graphic Design.svg";
import MGBG from "../../assets/ourSpecialities/static/Motion Graphics.svg";
import VVEBG from "../../assets/ourSpecialities/static/Videography & Video Editing.svg";
import WDBG from "../../assets/ourSpecialities/static/Web Design.svg";
import AIImageSVG from "../../assets/ourSpecialities/static/AI Image Gen-01.svg";
import ARTILLASVG from "../../assets/ourSpecialities/static/Artwork-01.svg";
import GDSVG from "../../assets/ourSpecialities/static/Graphic Design-01.svg";
import MGSVG from "../../assets/ourSpecialities/static/Motion Design-01.svg";
import VVESVG from "../../assets/ourSpecialities/static/Videography-01.svg";
import WDSVG from "../../assets/ourSpecialities/static/Web Design-01.svg";


interface Services {
  serviceName: string;
  jsonAnimation: object;
  svgImg: string;
  bgIMG: string
}

function OurSpecialities({ id }: { id: string }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [oS, setOS] = useState("");
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  // const intersectionMap = useRef<Map<number, boolean>>(new Map());
  const animationMap = useRef<Map<number, AnimationItem>>(new Map());

  function getElementsArray() {
    if (elementsRef.current.length === 0) {
      /* Check if elementsRef.current is empty by checking 
      its length and initialzing on first use*/
      elementsRef.current = new Array<HTMLDivElement>();
    }

    return elementsRef.current; // Return the map
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

  // could possibly use useLayoutEffect to avoid FOUC
  useEffect(() => {
    setOS(getOperatingSystem());
  }, []);

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
    // console.log(oS)
    if (oS != "") {
      elementsRef.current.forEach((element, index) => {
        if (!element || !isTouchScreenAndSmallViewport()) {
          return;
        }

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  handleMouseEnter(index);
                  // console.log("intersect");
                  element.classList.add("hover");
                  // intersectionMap.current.set(index, true);
                }, 300);
              } else {
                // else if (intersectionMap.current.get(index))
                handleMouseLeave(index);
                element.classList.remove("hover");
                // intersectionMap.current.set(index, false);
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
    }
  }, [handleMouseEnter, handleMouseLeave, oS]);

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
      // console.log("added");
      animationMap.current.set(index, animation);
    }
  }
  const services: Services[] = [
    {
      serviceName: "Graphic Design", jsonAnimation: GD, svgImg: GDSVG,
      bgIMG: GDBG
    },
    {
      serviceName: "AI Image Generation",
      jsonAnimation: AIImage,
      svgImg: AIImageSVG,
      bgIMG: AIImageBG
    },
    {
      serviceName: "Artwork & Illustations",
      jsonAnimation: ARTILL,
      svgImg: ARTILLASVG,
      bgIMG: ARTILLABG
    },
    {
      serviceName: "Motion Graphics", jsonAnimation: MG, svgImg: MGSVG,
      bgIMG: MGBG
    },
    {
      serviceName: "Videography & Video Editing",
      jsonAnimation: VVE,
      svgImg: VVESVG,
      bgIMG: VVEBG
    },
    {
      serviceName: "Web Design", jsonAnimation: WD, svgImg: WDSVG,
      bgIMG: WDBG
    },
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
                {["Windows", "Android", "Linux"].includes(oS) ? (
                  <div
                    role="img"
                    className="image-animation me-1"
                    ref={(element) => {
                      // Initialize current element lottie and add it to elementsRef for intersection tracking
                      // Do not directly write ref.current during render
                      const array = getElementsArray();
                      if (element) {
                        array[index] = element;
                      }
                      // elementsRef.current[index] = element;
                      initializeLottie(element, service.jsonAnimation, index);
                    }}
                    aria-label={`Animation for ${service.serviceName}`}
                  ></div>
                ) : (
                  <img
                    loading="lazy"
                    className="image-svg-static"
                    src={service.svgImg}
                    alt=""
                  />
                )}
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
                  src={service.bgIMG}
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
