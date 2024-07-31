import { useState, useEffect } from "react";
import "./FixedFooter.scss";
import Back2Top from "./Back2Top";

function FixedFooter() {
  const [isFooterVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 800) {
      // Adjust this value to your desired scroll height
      setIsVisible(true);
    } else {
      setIsVisible(false);
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
      <Back2Top visible={isFooterVisible} clicked={isClicked}></Back2Top>
      <div
        className={`d-flex justify-content-center footer-container ${
          isFooterVisible ? "visible" : ""
        }`}
      >
        <div
          className={`button-container-ff poppins-regular ${
            isFooterVisible ? "visible" : ""
          }`}
        >
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
