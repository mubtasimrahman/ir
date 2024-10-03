import { useState, useEffect, useRef } from "react";
import "./FixedFooter.scss";

function FixedFooter() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isPermanentFooterVisible, setIsPermanentFooterVisible] =
    useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const fixedFooterRef = useRef<HTMLDivElement | null>(null);
  const permanentFooterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const permanentFooter = permanentFooterRef.current;

    // Intersection Observer to detect when the fixed footer and child footer intersect
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPermanentFooterVisible(true);
        } else {
          setIsPermanentFooterVisible(false);
        }
      },
      { rootMargin:"5%" } 
    );
    if (permanentFooter) {
      observer.observe(permanentFooter);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 600) {
      setIsFooterVisible(true);
    } else {
      setIsFooterVisible(false);
    }
  };

  const handleClick = () => {
    setIsClicked(true);
    navigator.clipboard
      .writeText("design@irrealvisuals.com")
      .then(() => {
        console.log("Email copied to clipboard");
      })
      .catch((err: unknown) => {
        console.error("Failed to copy email: ", err);
      });
    setTimeout(() => {
      setIsClicked(false);
    }, 2500); // Duration of the animation
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={fixedFooterRef}
        className={`d-flex justify-content-center footer-container ${
          isFooterVisible &&!isPermanentFooterVisible ? "visible-first" : ""
        } ${isPermanentFooterVisible ? "invisible-second" : ""}`}
      >
        <div className={`button-container-ff poppins-regular`}>
          <span className="mask-ff">Copied</span>
          <button
            className={`button-ff ${isClicked ? "clicked" : ""}`}
            type="button"
            name="Hover"
            onClick={handleClick}
          >
            design@irrealvisuals.com
          </button>
        </div>
      </div>
      <div className="container-fluid mb-lg-4 mb-2">
        <div className="row permanent-footer-container align-items-center">
          <div className="col-lg footer-text poppins-regular text-lg-end text-center">For Any & All Queries Message Us At</div>
          <div
            ref={permanentFooterRef}
            className={`d-flex col-lg mt-lg-0 mt-1 footer-container footer-container-extra justify-content-lg-start justify-content-center`}
          >
            <div className={`button-container-ff poppins-regular`}>
              <span className="mask-ff">Copied</span>
              <button
                className={`button-ff ${isClicked ? "clicked" : ""}`}
                type="button"
                name="Hover"
                onClick={handleClick}
              >
                design@irrealvisuals.com
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FixedFooter;

/*Problem is that the footer is fixed right below viewport so either viewport is always intersecting
or never, until the footer rises up */
