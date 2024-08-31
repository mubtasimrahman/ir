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
      <div className="d-flex justify-content-between footer-style">
        <div className="designer">
          <img loading="lazy" src={FB} alt="" />
          <img loading="lazy" src={BH} alt="" />
          <img loading="lazy" src={IG} alt="" />
        </div>
        <div className="row gx-2 developer poppins-regular">
          <div className="col">
            <div>Developed By</div>
            <div> Mubtasim Rahman</div>
          </div>
          <div className="col">
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
        <span className="poppins-light copy-right">Irreal Visuals</span>
      </div>
    </div>
  );
}

export default Footer;
