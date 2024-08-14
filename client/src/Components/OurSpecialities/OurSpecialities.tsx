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
  const animationMap = new Map<number, AnimationItem>();

  function initializeLottie(
    container: HTMLDivElement | null,
    animationData: object,
    index: number
  ) {
    if (container) {
      const animation = lottie.loadAnimation({
        container: container,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: animationData,
      });
      animationMap.set(index, animation);
    }
  }

  function handleMouseEnter(index: number) {
    const animation = animationMap.get(index);
    if (animation) {
      animation.setDirection(1);
      animation.setSpeed(1);
      animation.goToAndPlay(animation.currentFrame, true);
    }
  }

  function handleMouseLeave(index: number) {
    const animation = animationMap.get(index);
    //checks to see if animation has completed(completes at penultimate frame so + 1 added)
    if (animation) {
      const isAnimationComplete =
        animation.currentFrame + 1 === animation.totalFrames;
      console.log(isAnimationComplete);
      //reverses and speeds up
      if (!isAnimationComplete) {
        animation.setDirection(-1);
        animation.setSpeed(1.25);
        animation.goToAndPlay(animation.currentFrame, true);
      }
      //stops
      else {
        animation.goToAndStop(0, true);
      }
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
    <div className="mt-5 mb-4"id={id}>
      <div className="poppins-bold-heading">Our Specialities</div>
      <div className="container">
        <div className="row gy-3 justify-content-center">
          {services.map((service, index) => (
            <div key={index} className="col-lg-6 col-sm-10 col-9">
              <div
                className="d-flex speciality py-3 px-2"
                onMouseEnter={() => {
                  handleMouseEnter(index);
                }}
                onMouseLeave={() => {
                  handleMouseLeave(index);
                }}
                /*interacive role, allows tabbing and mouse and keyboard events unlike 
                button which needs them*/
                role="textbox"
                tabIndex={0}
                aria-label={`Speciality: ${service.serviceName}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleMouseEnter(index);
                  }
                }}
              >
                <div
                  role="img"
                  className="image-animation me-1"
                  ref={(el) => {
                    initializeLottie(el, service.jsonAnimation, index);
                  }}
                  aria-label={`Animation for ${service.serviceName}`}
                />
                <div className="service-name poppins-semibold ms-2">
                  {service.serviceName}
                </div>
                {/* Add your button here in the future */}
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
