import "./FeaturedProjects.scss";
import IPDC from "../../assets/featuredProjects/IPDC.png";
import { isTouchScreenAndSmallViewport } from "../Utils/Touch&Viewport";
import LazyMask from "../WrapperComponents/LazyMask";
import { useEffect, useRef } from "react";

const clients = [
  {
    name: "IPDC Finance",
    services: [
      "Graphic Design",
      "Motion Design",
      "Video Editing",
      "AI Image Generation",
      "Artwork and Illustrations",
    ],
    imageUrl: "path_to_image_1",
  },
  {
    name: "Smart Air",
    services: [
      "Graphic Design",
      "Web Design",
      "Motion Design",
      "Video Editing",
      "AI Image Generation",
    ],
    imageUrl: "path_to_image_2",
  },
  {
    name: "Lueur Bakery",
    services: ["Graphic Design", "AI Image Generation"],
    imageUrl: "path_to_image_3",
  },
  {
    name: "Unimart",
    services: ["Video Editing", "Videography", "Motion Design"],
    imageUrl: "path_to_image_4",
  },
];

function FeaturedProjects({ id }: { id: string }) {
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    elementsRef.current.forEach((element) => {
      if (!element || !isTouchScreenAndSmallViewport()) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log("yaa");
              element.classList.add("hover");
            } else {
              console.log("naaa");
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
  return (
    <div id={id} className="featured-projects mt-4">
      <div className="featured-title poppins-bold-heading">
        Featured Clients
      </div>
      <div className="container ">
        <div className="row ">
          {clients.map((client, index) => (
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
                        {client.name}
                      </h5>
                      <div className="col  button-container-fp poppins-regular ">
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
                      </div>
                    </div>
                  </div>
                  <div className="card-services">
                    {client.services.map((service, idx) => (
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
                    src={IPDC}
                    className="card-img-bottom"
                    alt={client.name}
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
