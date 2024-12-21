import { useRef, useState, useEffect, useCallback } from "react";
import "./ClientExperiences.scss";
import BlockQuote from "../../assets/clientExperiences/quote.svg";
import { useSwipeable } from "react-swipeable";
import CA from "../../assets/clientExperiences/Clink Advisory.svg"
import IPDC from "../../assets/clientExperiences/IPDC Finance.svg"
import MD from "../../assets/clientExperiences/Madmen Digital.svg"
import SA from "../../assets/clientExperiences/Smart Air.svg"

const items = [
  {
    image: SA,
    text: "I’ve been working with Ishraq and Irreal Visuals for nearly three years, and during this time, they’ve consistently delivered exceptional, cutting-edge visuals and creative solutions.",
    author: "Boudewijn Sterk",
    role: "Founder",
    company: "Smart Air Bangladesh",
  },
  {
    image: IPDC,
    text: "My work with Irreal Visuals has been precise and perfect. Their understanding of the requirements is very detailed, which ultimately provides top-level output.",
    author: "Tareq Islam",
    role: "CBO and CMO",
    company: "DX Group",
  },
  {
    image: CA,
    text: "As a business owner, relying on a single provider for a wide range of branding, digital, and print solutions has saved me significant time and effort. ",
    author: "Mominul Islam",
    role: "Founder",
    company: "Clink Advisory",
  },
  {
    image: IPDC,
    text: "What really impressed us with Irreal Visuals, is their ability to quickly understand and meet our expectations, while their expertise in AI-generated statics brings a cutting-edge touch to their work.",
    author: "Tarif Sherhan",
    role:"Sr.Manager",
    company: "IPDC Finance",
  },
  {
    image: MD,
    text: "Irreal Visuals consistently delivered top-notch videography and editing that our clients loved. Their work was always on-trend.",
    author: "Moazzem Mottakin",
    role:"Account Manager",
    company: "Madmen Digital",
  },
  
];

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
      if (index >= totalItems - 2) return -1;
      return index + 1;
    });
  };

  const goToPrev = () => {
    setCurrentGroupIndex((index) => {
      if (index <= -1) return totalItems - 2;
      return index - 1;
    });
  };

  const handlePillClick = (index: number) => {
    setCurrentGroupIndex(index - 1);
  };
  const swipeHandlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrev,
    trackTouch: true,
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  return (
    (<div id={id} className="container-lg mb-5 mt-4 container-no-left-padding">
      <div className="featured-title poppins-bold-heading">
        Client Experiences
      </div>
      <div {...swipeHandlers} className="carousel-container">
        <div className="carousel-entries">
          {items.map((item, index) => (
            <div
              key={item.author}
              className={`carousel-entry poppins-regular justify-content-between`}
              aria-label={`Slide ${(index + 1).toString()}`}
              ref={el => {
                (entryRef.current[index] = el);
              }}
              /* Translate -100% and account for total margin of 1 rem on each card
              while also ensuring change in margin remains at 1 rem throughout using currentGroupIndex*/
              style={{
                translate: `calc(${(
                  -100 * currentGroupIndex
                ).toString()}% - 1rem * ${currentGroupIndex.toString()})`,
              }}
            >
              <img
                loading="lazy"
                src={BlockQuote}
                alt=""
                className="quote-icon"
              />
              <blockquote className="flex-fill">{item.text}</blockquote>
              <div className="author-info ">
                <img loading="lazy" src={item.image} alt={item.company} />
                <div className="author-text ">
                  <p>{item.author}</p>
                  <p className="poppins-extralight">{item.role + ", " + item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-button left"
          onClick={goToPrev}
          type="button"
        >
          &lt;
        </button>
        <button
          className="carousel-button right"
          onClick={goToNext}
          type="button"
        >
          &gt;
        </button>
        <div className="carousel-pills">
          {Array.from({ length: totalItems }).map((_, index) => (
            <div
              key={index}
              className={`pill ${
                currentGroupIndex + 1 === index ? "active" : ""
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
              aria-label={`Go to slide ${(index + 1).toString()}`}
            />
          ))}
        </div>
      </div>
    </div>)
  );
}

export default ClientExperiences;

//absolutley postion left,center,right on top of each, and make left
//go left, center be center and so on
