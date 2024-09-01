import IR from "../../assets/Footer.svg";
import FB from "../../assets/socialLogos/Facebookcursor.svg";
import BH from "../../assets/socialLogos/Behancecursor.svg";
import IG from "../../assets/socialLogos/Instagramcursor.svg";
import GH from "../../assets/socialLogos/Githubcursor.svg";
import LI from "../../assets/socialLogos/LinkedIncursor.svg";
import "./Footer.scss";

function Footer() {
  return (
    <div className="container pt-8 pb-4">
      <div className="d-flex justify-content-between align-items-end footer-style">
        <div className="d-flex designer">
          <img loading="lazy" src={FB} alt="" />
          <img loading="lazy" src={BH} alt="" />
          <img loading="lazy" src={IG} alt="" />
        </div>
        <div className="row gx-0 developer">
          <div className="col-lg-auto">
            <div className="poppins-light">Developed By</div>
            <div className="poppins-regular"> Mubtasim Rahman</div>
          </div>
          <div className="col-lg">
            <a
              title="Developer Github Profile"
              href="https://github.com/mubtasimrahman"
              target="_blank"
              rel="noreferrer"
            >
              <img loading="lazy" src={GH} alt="" />
            </a>
            <a
              title="Developer LinkedIn Profile"
              href="https://www.linkedin.com/in/mubtasimrahman/"
              target="_blank"
              rel="noreferrer"
            >
              <img loading="lazy" src={LI} alt="" />
            </a>
          </div>
        </div>
      </div>
      <hr className="footer-line" />
      <div className="d-flex justify-content-between align-items-center">
        <img className="ir-image" src={IR} alt="" />
        <span className="poppins-light copy-right">&copy; Irreal Visuals</span>
      </div>
    </div>
  );
}

export default Footer;
