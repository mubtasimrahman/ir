import "./BentoBox.scss";
import AdobeExpert from "../../assets/bentoBox/Adobecursor.svg";
import IrrealVisuals from "../../assets/bentoBox/Bento logo.svg";
import FBCursor from "../../assets/Facebookcursor.svg";
import BHCursor from "../../assets/bentoBox/Behancecursor.svg";
import IGCursor from "../../assets/Instagramcursor.svg";
import AAE from "../../assets/bentoBox/Adobe After Effects.svg";
import AA from "../../assets/bentoBox/Adobe Audition.svg";
import AI from "../../assets/bentoBox/Adobe Illustrator.svg";
import AP from "../../assets/bentoBox/Adobe Photoshop.svg";
import APP from "../../assets//bentoBox/Adobe Premiere Pro.svg";

const Logos = [AI, AA, AP, APP, AAE];

function BentoBox({ id }: { id: string }) {
  return (
    <div
      id={id}
      className="container px-md-2 px-sm-1 px-5 mt-lg-10 mt-8 mb-sm-8 mb-4 text-center bento-box"
    >
      <div className="row gx-md-6">
        <div className="col-md left-col mb-md-0 mb-3">
          <div className="row g-2">
            <div className="col-12 ir padding-ir">
              <img className="img-ir" src={IrrealVisuals} alt="" />
            </div>

            <div className="col-6">
              <div className="ir padding-more">
                <div className="poppins-semibold-heading ">15+</div>
                <div className="poppins-regular resize text-wrap">
                  Brands Served
                </div>
              </div>
            </div>
            <div className="col-6 ">
              <div className="ir padding-more  ">
                <div className="poppins-semibold-heading">300+</div>
                <div className="poppins-regular resize text-wrap">
                  Deliverables Executed
                </div>
              </div>
            </div>

            <div className="col-6 ">
              <div className="ir padding-more ">
                <div className="poppins-semibold-heading">4+</div>
                <div className="poppins-regular resize">
                  Years of Experience
                </div>
              </div>
            </div>
            <div className="col-6 poppins-regular resize">
              <div className="ir padding-more text-wrap-adobe">
                <img className="adobe-img mt-3" src={AdobeExpert} alt="" />
                <br />
                Adobe Expert
              </div>
            </div>
          </div>
        </div>
        <div className="col right-col">
          <div className="row gy-2 gx-5">
            <div className="col-2 d-flex justify-content-around align-items-center transformed ir padding-less">
              <img className="media-img" src={FBCursor} alt="" />
              <img className="media-img" src={BHCursor} alt="" />
              <img className="media-img" src={IGCursor} alt="" />
            </div>
            <div className="col-10 d-flex justify-content-center">
              <div className="row gy-2">
                <div className=" col-12 d-flex flex-wrap ir poppins-semibold smaller-font padding-less justify-content-around ">
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
                <div className=" col-12 ir poppins-regular padding-less smaller-font">
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

            <div className="col-12  justify-content-center">
              <div className="ir custom-fb padding-less">
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
