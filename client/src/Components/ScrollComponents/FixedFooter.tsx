import { useState, useEffect } from "react";
import "./FixedFooter.scss";

function FixedFooter() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

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
      .writeText("work@irrealvisuals.com")
      .then(() => {
        console.log("Email copied to clipboard");
      })
      .catch((err: unknown) => {
        console.error("Failed to copy email: ", err);
      });
    setTimeout(() => {
      setIsClicked(false);
    }, 2500); // duration of the animation
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
        className={`d-flex justify-content-center footer-container ${
          isFooterVisible ? "visible" : ""
        }`}
      >
        <div className={`button-container-ff poppins-regular `}>
          <span className="mask-ff">Copied</span>

          <button
            className={`button-ff ${isClicked ? "clicked" : ""}`}
            type="button"
            name="Hover"
            onClick={handleClick}
          >
            work@irrealvisuals.com
          </button>
        </div>
      </div>
    </>
  );
}

export default FixedFooter;
/*Problem is that the footer is fixed right below viewport so either viewport is always intersecting
or never, until the footer rises up */
