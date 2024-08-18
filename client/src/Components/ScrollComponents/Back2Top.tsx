import "./Back2Top.scss";
import Back2TopSVG from "../../assets/Back2Top.svg"

interface Props {
  visible: boolean;
  clicked?: boolean; // Optional prop if not used
}

function Back2Top({ visible }: Props) {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Adding smooth scrolling
  }

  return (
    <button
      className={`to-top ${visible ? "visible" : ""}`}
      onClick={scrollToTop}
      type="button"
      title="Back To Top"
    >
      <img src={Back2TopSVG} alt="" className="arrow-img"/>
    </button>
  );
}

export default Back2Top;
