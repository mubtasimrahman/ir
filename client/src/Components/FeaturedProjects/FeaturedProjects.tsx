import "./FeaturedProjects.scss";
import featuredProjects from "../../../../server/content/featuredProjects.json";
// import IPDC from "../../assets/featuredProjects/IPDC.webp";
// import ANN from "../../assets/featuredProjects/ANN.webp";
// import SA from "../../assets/featuredProjects/Smart Air.webp";
// import UNI from "../../assets/featuredProjects/Unimart.webp";
import { isTouchScreenAndSmallViewport } from "../Utils/Touch&Viewport";
// import LazyMask from "../WrapperComponents/LazyMask";
import { useEffect, useRef } from "react";

interface FeaturedProjects {
  name: string;
  services: string[];
  imageUrl: string;
}
// const clients = [
//   {
//     name: "IPDC Finance",
//     services: [
//       "Graphic Design",
//       "Motion Design",
//       "Video Editing",
//       "AI Image Generation",
//       "Artwork and Illustrations",
//     ],
//     imageUrl: IPDC,
//   },
//   {
//     name: "Smart Air",
//     services: [
//       "Graphic Design",
//       "Web Design",
//       "Motion Design",
//       "Video Editing",
//       "AI Image Generation",
//     ],
//     imageUrl: SA,
//   },
//   {
//     name: "ANN",
//     services: ["Video Editing", "Videography"],
//     imageUrl: ANN,
//   },
//   {
//     name: "Unimart",
//     services: ["Video Editing", "Videography", "Motion Design"],
//     imageUrl: UNI,
//   },
// ];

function FeaturedProjects({ id }: { id: string }) {
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    elementsRef.current.forEach((element) => {
      if (!element || !isTouchScreenAndSmallViewport()) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // console.log("yaa");
              element.classList.add("hover");
            } else {
              // console.log("naaa");
              element.classList.remove("hover");
            }
          });
        },
        { threshold: 0.9, rootMargin: "15% 0px -10% 0px" }
      );

      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    });
  });

  /*This allows relative paths from json to be resolved and not just left as strings.
  The dynamic part {filename} works as long as it is deterministic(vite knows all options
  and is not determined during runtime eg, user input and fetch reqs)*/
  function resolveImage(filename: string): string {
    return new URL(`../../assets/featuredProjects/${filename}`, import.meta.url)
      .href;
  }
  return (
    <div id={id} className="featured-projects mt-4 color-burns-fp">
      <div className="featured-title poppins-bold-heading">
        Featured Clients
      </div>
      <div className="container ">
        <div className="row ">
          {featuredProjects.map((featuedProject, index) => (
            <div key={index} className="col-lg-6 mb-4 ">
              <div
                ref={(element) => {
                  elementsRef.current[index] = element;
                }}
                className="card bg-transparent border-light mb-3 rounded-4"
              >
                <div className="card-body">
                  <div className="container">
                    <div className="row justify-content-between align-item-center">
                      <h5 className="col-9 poppins-semibold card-title custom-width-smaller">
                        {featuedProject.name}
                      </h5>
                      {/* For beta version, no learn more */}
                      {/* <div className="col  button-container-fp poppins-regular ">
                        <span className="mask-fp">GO</span>
                        <LazyMask
                          maskImageUrl="https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/urban-sprite.png"
                          rootMargin="75%"
                        >
                          <button
                            className="button-fp"
                            type="button"
                            name="Hover"
                          >
                            Learn More
                          </button>
                        </LazyMask>
                      </div> */}
                    </div>
                  </div>
                  <div className="card-services">
                    {featuedProject.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="service-tag poppins-extralight"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="card-img-container">
                  <img
                    src={resolveImage(featuedProject.imageUrl)}
                    className="card-img-bottom"
                    alt={featuedProject.name}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProjects;
