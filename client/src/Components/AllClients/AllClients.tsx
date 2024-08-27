import { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { FaPause, FaPlay } from "react-icons/fa";
import Logos from "../InfiniteAutoPlay/Logos";
import "./AllClients.scss";

interface Slide {
  id: number;
  image: string;
  title: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: Logos[0],
    title: "Bunker",
  },
  {
    id: 2,
    image: Logos[1],
    title: "Words Remain",
  },
  {
    id: 3,
    image: Logos[2],
    title: "Falling Out",
  },
  {
    id: 4,
    image: Logos[3],
    title: "In the Middle",
  },
  {
    id: 5,
    image: Logos[4],
    title: "Bunker",
  },
  {
    id: 6,
    image: Logos[5],
    title: "Words Remain",
  },
  {
    id: 7,
    image: Logos[6],
    title: "Falling Out",
  },
  {
    id: 8,
    image: Logos[7],
    title: "In the Middle",
  },
];

const slideDuration = 5000; // 5 seconds per slide
const totalDuration = slides.length * slideDuration; // Total duration for all slides

function AllClients() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: number;

    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, slideDuration);
    }

    return () => { window.clearInterval(interval); }; // Clear interval when unmounting or when `isPlaying` changes
  }, [isPlaying]);

  useEffect(() => {
    let timer: number;

    if (isPlaying) {
      timer = window.setInterval(() => {
        setElapsedTime((prevTime) => (prevTime + 1000) % totalDuration);
      }, 1000);
    }

    return () => { window.clearInterval(timer); }; // Clear timer when unmounting or when `isPlaying` changes
  }, [isPlaying]);

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
    setElapsedTime(index * slideDuration); // Update elapsed time based on the selected slide
  };

  const getSlideClass = (index: number) => {
    if (index === currentIndex) return "center-slide";
    if (index === (currentIndex + 1) % slides.length) return "right-slide";
    if (index === (currentIndex - 1 + slides.length) % slides.length)
      return "left-slide";
    return "hidden-slide";
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container all-clients-container mb-5 mt-4">
      <div className="slides">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`client-slide ${getSlideClass(index)}`}
            role="button"
            tabIndex={0}
            onClick={() => {
              handleSlideChange(index);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSlideChange(index);
              }
            }}
            aria-label={`Slide ${(index + 1).toString()}: ${slide.title}`}
          >
            <img loading="lazy" src={slide.image} alt={slide.title} />
          </div>
        ))}
      </div>
      <div className="player poppins-regular">
        <div className="song-info">
          <div className="d-flex align-items-center">
            <IconContext.Provider value={{ color: "#F2F2F2" }}>
              <div
                tabIndex={0}
                role="button"
                onClick={() => {
                  setIsPlaying(!isPlaying);
                }}
                style={{ cursor: "pointer" }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setIsPlaying(!isPlaying);
                  }
                }}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </div>
            </IconContext.Provider>
            <div className="title">{slides[currentIndex].title}</div>
          </div>
          <div className="sub-line justify-content-end">
            <div className="time">
              {formatTime(elapsedTime)} / {formatTime(totalDuration)}
            </div>
          </div>
          <div
            className="progress"
            role="progressbar"
            aria-label="All Clients Progress Bar"
            aria-valuenow={(elapsedTime / totalDuration) * 100}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-bar bg-light"
              style={{
                width: `${(elapsedTime / totalDuration) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllClients;
