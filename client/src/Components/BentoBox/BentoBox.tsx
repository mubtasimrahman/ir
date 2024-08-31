import "./BentoBox.scss";
import AdobeExpert from "../../assets/bentoBox/Adobecursor.svg";
import IrrealVisuals from "../../assets/bentoBox/Bento logo.svg";
import FBCursor from "../../assets/socialLogos/Facebookcursor.svg";
import BHCursor from "../../assets/socialLogos/Behancecursor.svg";
import IGCursor from "../../assets/socialLogos/Instagramcursor.svg";
import AAE from "../../assets/bentoBox/Adobe After Effects.svg";
import AA from "../../assets/bentoBox/Adobe Audition.svg";
import AI from "../../assets/bentoBox/Adobe Illustrator.svg";
import AP from "../../assets/bentoBox/Adobe Photoshop.svg";
import APP from "../../assets//bentoBox/Adobe Premiere Pro.svg";
import { useEffect, useRef } from "react";

const Logos = [AI, AA, AP, APP, AAE];

function BentoBox() {
  //add hidden classes directly and not using useeffect to stop FOUC
  const topLeftRef = useRef<HTMLDivElement>(null);
  const middleLeftRef1 = useRef<HTMLDivElement>(null);
  const middleLeftRef2 = useRef<HTMLDivElement>(null);
  const bottomLeftRef1 = useRef<HTMLDivElement>(null);
  const bottomLeftRef2 = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const middleRightRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refs = [
      topLeftRef,
      middleLeftRef1,
      middleLeftRef2,
      bottomLeftRef1,
      bottomLeftRef2,
      topRightRef,
      middleRightRef,
      bottomRightRef,
      middleRef,
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.remove("hidden");
        }
        //makes it so that effect happens every time bento box is visible, not just on load
        else {
          entry.target.classList.add("hidden");
          entry.target.classList.remove("visible");
        }
      });
    });

    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="container px-md-2 px-sm-1 px-4 mt-lg-10 mt-8 mb-lg-4 mb-md-3 mb-sm-4 mb-5 text-center bento-box">
      <div className="row gx-md-6">
        <div className="col-md left-col mb-md-0 mb-3">
          <div className="row gy-2 gx-3">
            <div className="col-12 top-left hidden" ref={topLeftRef}>
              <img
                className="img-ir ir padding-ir"
                src={IrrealVisuals}
                alt=""
              />
            </div>

            <div className="col-6 middle-left-1 hidden" ref={middleLeftRef1}>
              <div className="ir padding-more">
                <div className="poppins-semibold-heading ">15+</div>
                <div className="poppins-regular resize text-wrap">
                  Brands Served
                </div>
              </div>
            </div>
            <div className="col-6 middle-left-2 hidden" ref={middleLeftRef2}>
              <div className="ir padding-more  ">
                <div className="poppins-semibold-heading">300+</div>
                <div className="poppins-regular resize text-wrap">
                  Deliverables Executed
                </div>
              </div>
            </div>

            <div className="col-6 bottom-left-1 hidden" ref={bottomLeftRef1}>
              <div className="ir padding-more ">
                <div className="poppins-semibold-heading">4+</div>
                <div className="poppins-regular resize">
                  Years of Experience
                </div>
              </div>
            </div>
            <div
              className="col-6 poppins-regular resize bottom-left-2 hidden"
              ref={bottomLeftRef2}
            >
              <div className="ir padding-more text-wrap-adobe">
                <img className="adobe-img mt-3" src={AdobeExpert} alt="" />
                <br />
                Adobe Expert
              </div>
            </div>
          </div>
        </div>
        <div className="col right-col">
          {/* gx-5 original */}
          <div className="row gy-2 gx-md-5 gx-0  justify-content-between">
            <div
              className="col-2 d-flex justify-content-around align-items-center transformed ir padding-less min-width-img middle hidden"
              ref={middleRef}
            >
              <img className="media-img" src={FBCursor} alt="" />
              <img className="media-img" src={BHCursor} alt="" />
              <img className="media-img" src={IGCursor} alt="" />
            </div>
            <div className="col-md-10 col-9 d-flex justify-content-center">
              <div className="row gy-2 negative-margin justify-content-end">
                <div
                  className="col-12 d-flex flex-wrap ir poppins-semibold smaller-font padding-less justify-content-around top-right hidden"
                  ref={topRightRef}
                >
                  <div className="rc">RECENT CLIENTS</div>
                  <div className="text-start">
                    <ul className="poppins-regular">
                      <li>IPDC Finance</li>
                      <li>Click Advisory</li>
                    </ul>
                  </div>
                  <div className="text-start">
                    <ul className="poppins-regular">
                      <li>Smart Air</li>
                      <li>Leuer Bakery</li>
                    </ul>
                  </div>
                </div>
                <div
                  className="col-12  ir poppins-regular padding-less smaller-font middle-right hidden"
                  ref={middleRightRef}
                >
                  <div>
                    Our primary experties lies in
                    <div className="poppins-semibold mb-2">
                      AI Image Generation, Graphic Design and Motion Design.
                    </div>
                  </div>

                  <div>
                    We pride ourlseves on early tech & trend adoption to
                    maximize our client's ROI
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-12 justify-content-center ps-0 pe-md-11 bottom-right hidden"
              ref={bottomRightRef}
            >
              <div className="d-flex flex-column justify-content-between ir custom-fb padding-less">
                <div className="poppins-semibold temp"> OUR STACK</div>

                <div className="our-stack-slider">
                  <div className=" our-stack-slide-track">
                    {Array.from({ length: 20 }, (_, index) => {
                      const imageSrc = Logos[index % Logos.length]; // Cycle through the images
                      return (
                        <div className="our-stack-slide" key={index}>
                          <img
                            className="our-stack-logo"
                            src={imageSrc}
                            alt={`Slide ${index.toString()}`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BentoBox;
