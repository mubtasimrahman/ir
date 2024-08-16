import "./InfiniteAutoPlay.scss";
import Logos from "./Logos";

function InfiniteAutoPlay() {
  const entries = 30; // Length of the array

  return (
    <div className="slider mt-sm-8 mt-4">
      <div className="slide-track">
      {/*Creates an undefined array of length 30 from arrayLike and populates with images*/}
        {Array.from({ length: entries }, (_, index) => {
          const imageSrc = Logos[index % Logos.length]; // Cycle through the images
          return (
            <div className="slide" key={index}>
              <img
                src={imageSrc}
                height="100"
                width="150"
                alt={`Slide ${index.toString()}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InfiniteAutoPlay;
