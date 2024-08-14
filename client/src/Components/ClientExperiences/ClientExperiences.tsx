import { useRef, useState, useEffect, useCallback } from "react";
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

const visibleItems = 3;

function ClientExperiences({ id }: { id: string }) {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const totalItems = items.length;
  const entryRef = useRef<(HTMLDivElement | null)[]>([]);

  const hintBrowser = useCallback((event: MouseEvent) => {
    const target = event.currentTarget as HTMLElement;
    target.style.willChange = "scale";
  }, []);

  const removeHint = useCallback((event: AnimationEvent) => {
    const target = event.currentTarget as HTMLElement;
    target.style.willChange = "auto";
  }, []);

  useEffect(() => {
    const entries = entryRef.current;
    entries.forEach((entry) => {
      if (entry) {
        entry.addEventListener("mouseenter", hintBrowser);
        entry.addEventListener("animationend", removeHint);
      }
    });

    return () => {
      entries.forEach((entry) => {
        if (entry) {
          entry.removeEventListener("mouseenter", hintBrowser);
          entry.removeEventListener("animationend", removeHint);
        }
      });
    };
  }, [hintBrowser, removeHint]);

  const goToNext = () => {
    setCurrentGroupIndex((index) => {
      if (index >= totalItems - 3) return 0;
      return index + 1;
    });
  };

  const goToPrev = () => {
    setCurrentGroupIndex((index) => {
      if (index === 0) return totalItems - 3;
      return index - 1;
    });
  };

  const handlePillClick = (index: number) => {
    setCurrentGroupIndex(index);
  };

  return (
    <div id={id} className="container my-5">
      <div className="featured-title poppins-bold-heading">
        Client Experiences
      </div>
      <div className="carousel-container">
        <button
          className="carousel-button left"
          onClick={goToPrev}
          type="button"
        >
          &lt;
        </button>
        {items.map((item, index) => (
          <div
            ref={(el) => (entryRef.current[index] = el)}
            style={{ translate: `${(-100 * currentGroupIndex).toString()}%` }}
            key={item.author}
            className={`carousel-entry poppins-regular justify-content-between`}
          >
            <img
              loading="lazy"
              src={BlockQuote}
              alt=""
              className="quote-icon"
            />
            <blockquote>{item.text}</blockquote>
            <div className="author-info ">
              <img loading="lazy" src={item.image} alt={item.author} />
              <div className="author-text ">
                <p>{item.author}</p>
                <p className="poppins-extralight">{item.company}</p>
              </div>
            </div>
          </div>
        ))}
        <button
          className="carousel-button right"
          onClick={goToNext}
          type="button"
        >
          &gt;
        </button>
        <div className="carousel-pills">
          {Array.from({ length: totalItems - visibleItems + 1 }).map(
            (_, index) => (
              <div
                key={index}
                className={`pill ${
                  currentGroupIndex === index ? "active" : ""
                }`}
                onClick={() => {
                  handlePillClick(index);
                }}
                tabIndex={0}
                role="button"
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    handlePillClick(index);
                  }
                }}
                aria-label={`Go to slide ${index.toString() + "1"}`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientExperiences;

//absolutley postion left,center,right on top of each, and make left
//go left, center be center and so on
