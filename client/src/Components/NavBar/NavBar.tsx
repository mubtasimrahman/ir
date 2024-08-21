import { useEffect, useState } from "react";
import "./NavBar.scss";
import Back2Top from "../ScrollComponents/Back2Top";
import IRLogo from "../../assets/Header.svg";

function NavBar() {
  const [BoxShadow, setBoxShadow] = useState(false);
  const [isBack2TopVisible, setisBack2TopVisible] = useState(false);

  const handleNavbarScroll = () => {
    const navbar = document.getElementById("NavBar");
    const scrollY = window.scrollY;

    if (navbar) {
      setBoxShadow(scrollY > 0);
    }

    setisBack2TopVisible(scrollY > 1200);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleNavbarScroll);

    return () => {
      window.removeEventListener("scroll", handleNavbarScroll);
    };
  }, []);

  return (
    <nav
      id="NavBar"
      className={`navbar navbar-expand-lg poppins-regular fixed-top ${
        BoxShadow ? "scrolled" : ""
      } will-box-shadow  pt-lg-auto pt-3`}
      data-bs-theme="dark"
      aria-label="navbar + scrollspy"
    >
      <Back2Top visible={isBack2TopVisible}></Back2Top>
      <div className="container ps-md-2 pe-sm-0 ps-sm-1 px-4">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand ms-9 ms-sm-0 me-0" href="#bla">
          <img src={IRLogo} alt="IR Logo" className="ir-logo" />
        </a>
        <div
          className="collapse navbar-collapse ms-9 ms-sm-0"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 flex-fill justify-content-evenly">
            <li className="nav-item">
              <a className="nav-link" href="#FeaturedProjects">
                Our Work
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Specialities">
                Specialities
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#ClientExperiences">
                Testimonials
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#AllTrades">
                About
              </a>
            </li>
          </ul>

          <button type="button" className="contact-button mb-lg-0 mb-3">
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
}

//onclick of anchor tags in mobile screens, close navbar by using state to turn on collapsed class in button
export default NavBar;
