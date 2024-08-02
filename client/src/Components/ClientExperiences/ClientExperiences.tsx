import { useState } from "react";
import "./ClientExperiences.scss";
import BlockQuote from "../../assets/quote.svg";

const items = [
  {
    image: "https://via.placeholder.com/50",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    author: "John Doe Akbar",
    company: "Company XYZ",
  },
  {
    image: "https://via.placeholder.com/50",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a viverra justo. Nam convallis eros eu sem semper dapibus. Nam tempor ante sit amet quam.",
    author: "John Doe Islam",
    company: "Company XYZ",
  },
  {
    image: "https://via.placeholder.com/50",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ligula massa, eleifend vel scelerisque eget.",
    author: "John Doe Muzamil",
    company: "Company XYZ",
  },
  {
    image: "https://via.placeholder.com/50",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean eleifend libero.",
    author: "John Doe Khan",
    company: "Company XYZ",
  },
  {
    image: "https://via.placeholder.com/50",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    author: "John Doe Ali",
    company: "Company XYZ",
  },
];

const getVisibleItems = (index: number, totalItems: number) => {
  if (totalItems < 3) return items;

  const prevIndex = (index - 1 + totalItems) % totalItems;
  const nextIndex = (index + 1) % totalItems;

  return [items[prevIndex], items[index], items[nextIndex]];
};

function ClientExperiences() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = items.length;

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % totalItems);
  };

  const goToPrev = () => {
    setCurrentIndex((currentIndex - 1 + totalItems) % totalItems);
  };

  const visibleItems = getVisibleItems(currentIndex, totalItems);

  return (
    <div className="carousel-container">
      <button className="carousel-button left" onClick={goToPrev}>
        &lt;
      </button>
      <div className="carousel-wrapper">
        <div className="carousel-entries">
          {visibleItems.map((item, index) => (
            <div
              key={index}
              className={`carousel-entry ${index === 1 ? "highlight" : ""}`}
            >
              <img src={BlockQuote} alt="" className="quote-icon" />
              <blockquote>{item.text}</blockquote>
              <div className="author-info">
                <img src={item.image} alt={item.author} />
                <div>
                  <p>{item.author}</p>
                  <p>{item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-button right" onClick={goToNext}>
        &gt;
      </button>
      <div className="carousel-pills">
        {items.map((_, index) => (
          <div
            key={index}
            className={`pill ${currentIndex === index ? "active" : ""}`}
            onClick={() => {
              setCurrentIndex(index);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                setCurrentIndex(index);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Go to slide ${index.toString() + "1"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ClientExperiences;
