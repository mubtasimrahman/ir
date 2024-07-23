import "./Back2Top.scss";

interface Props {
  visible: boolean;
  clicked: boolean; // Optional prop if not used
}

function Back2Top({ visible }: Props) {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Adding smooth scrolling
  }

  return (
    <button
      className={`to-top ${visible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      &#8593;
    </button>
  );
}

export default Back2Top;
