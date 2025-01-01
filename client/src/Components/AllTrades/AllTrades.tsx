import { useEffect, useRef } from "react";
import Photo from "../../assets/Mind copy.svg";
import IGCursor from "../../assets/socialLogos/Instagramcursor.svg";
import FBCursor from "../../assets/socialLogos/Facebookcursor.svg";
import TTCursor from "../../assets/socialLogos/Tiktokcursor.svg";
import LazyMask from "../WrapperComponents/LazyMask";
import "./AllTrades.scss";
import allTrades from "../../../../server/content/allTrades.json";

function AllTrades({ id }: { id: string }) {
  const maskRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const maskElement = maskRef.current;
    if (!maskElement) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-mask");
            entry.target.classList.remove("reverse-mask");
          } else {
            entry.target.classList.remove("animate-mask");
            entry.target.classList.add("reverse-mask");
          }
        });
      },
      {
        threshold: 0.3, // Adjust this value as needed
      }
    );

    if (maskRef.current) {
      observer.observe(maskElement);
    }

    return () => {
      observer.unobserve(maskElement);
    };
  }, []);

  return (
    <>
      {/* this div is required as padding to account for navbar blocking viewport, as directly using padding
    on container causes the container to have different padding when mask animation has not occured */}
      <div id={id} className="scrollspy-align-div"></div>
      <div className="container-fluid description-container px-4 pb-4 mb-8 text-lg-start text-center poppins-light">
        <div className="container">
          <div className="row gx-5 justify-content-center align-items-start">
            <div className="col-lg-5  ">
              <img className="photo mt-3" src={Photo} alt="" />
            </div>
            <div className="col-lg-7 pointer-events-enabled">
              <div className="intro poppins-bold mt-3">{allTrades.intro}</div>
              <div className="mb-2">{allTrades.paragraph1}</div>
              <div className="mb-2">{allTrades.paragraph2}</div>
              <div className="mb-3">{allTrades.paragraph3}</div>
              <div>
                <a
                  href="https://www.facebook.com/ishraqur.rahman2"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook Profile"
                >
                  <img
                    loading="lazy"
                    className="social-img"
                    src={FBCursor}
                    alt=""
                  />
                </a>
                <a
                  href="https://www.instagram.com/ishraqur.rahman/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram Profile"
                >
                  <img
                    loading="lazy"
                    className="social-img"
                    src={IGCursor}
                    alt=""
                  />
                </a>
                <a
                  href="https://www.tiktok.com/@ishraqurrahman3"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Tiktok Profile"
                >
                  <img
                    loading="lazy"
                    className="social-img"
                    src={TTCursor}
                    alt=""
                  />
                </a>
              </div>
            </div>
            <LazyMask
              maskImageUrl="https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/nature-sprite.png"
              rootMargin="250%"
              threshold={0.1}
            >
              <div className="mask" ref={maskRef}></div>
            </LazyMask>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllTrades;
