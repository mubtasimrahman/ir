import { useState, useEffect, useRef, useCallback } from "react";
import IPDC1 from "../../assets/allClients/IPDC 1.webp";
import IPDC2 from "../../assets/allClients/IPDC 2.webp";
import IPDC3 from "../../assets/allClients/IPDC 3.webp";
import IPDC4 from "../../assets/allClients/IPDC 4.webp";
import IPDCP1 from "../../assets/allClients/IPDC Priti 1.webp";
import IPDCP2 from "../../assets/allClients/IPDC Priti 2.webp";
import IPDCP3 from "../../assets/allClients/IPDC Priti 3.webp";
import IRV from "../../assets/allClients/Irreal Visual 1.webp";
import Leur1 from "../../assets/allClients/leur 1.webp";
import Leur2 from "../../assets/allClients/leur 2.webp";
import SA1 from "../../assets/allClients/Smart Air 1.webp";
import SA2 from "../../assets/allClients/Smart Air 2.webp";
import SA3 from "../../assets/allClients/Smart Air 3.webp";
import SA4 from "../../assets/allClients/Smart Air 4.webp";
import SA5 from "../../assets/allClients/Smart Air 5.webp";
import PlayPause from "./PlayPause";
import "./AllClients.scss";
import { useSwipeable } from "react-swipeable";

interface Slide {
  id: number;
  image: string;
  title: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: IPDC1,
    title: "IPDC",
  },
  {
    id: 2,
    image: IPDCP1,
    title: "IPDC Priti",
  },
  {
    id: 3,
    image: IPDC2,
    title: "IPDC",
  },
  {
    id: 4,
    image: SA1,
    title: "Smart Air",
  },
  {
    id: 5,
    image: IPDCP2,
    title: "IPDC Priti",
  },
  {
    id: 6,
    image: IRV,
    title: "Irreal Visuals",
  },
  {
    id: 7,
    image: SA2,
    title: "Smart Air",
  },
  {
    id: 8,
    image: Leur1,
    title: "Leur",
  },
  {
    id: 9,
    image: IPDC3,
    title: "IPDC",
  },
  {
    id: 10,
    image: SA5,
    title: "Smart Air",
  },
  {
    id: 11,
    image: Leur2,
    title: "Leur",
  },
  {
    id: 12,
    image: SA4,
    title: "Smart Air",
  },
  {
    id: 13,
    image: IPDC4,
    title: "IPDC",
  },
  {
    id: 14,
    image: SA3,
    title: "Smart Air",
  },
  {
    id: 15,
    image: IPDCP3,
    title: "IPDC Priti",
  },
];

const slideDuration = 5000; // 5 seconds per slide
const totalDuration = slides.length * slideDuration; // Total duration for all slides

function AllClients() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  // const [slideChanged,setSlideChanged] = useState(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  // const elapsedTimeRef = useRef<HTMLDivElement | null>(null); // Use ref to hold elapsed time

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const timer = window.setInterval(() => {
        setElapsedTime((prevTime) => {
          // Check if we've reached the total duration
          if (prevTime + 1000 >= totalDuration) {
            setCurrentIndex(0); // sync currentIndex and elapsedTime resets
            return 0; // Reset elapsedTime
          }
          return prevTime + 1000;
        });
      }, 1000);

      // console.log("as");
      return () => {
        window.clearInterval(timer);
      };
    } /*currentIndex is also crucial to maintain accuracy when manually changing slides
    It causes a fresh 1000ms timer to start just as handleSlideChange changes the time*/
  }, [isPlaying]);

  useEffect(() => {
    // const currentTime = elapsedTimeRef.current?.textContent;
    // let timeInMilliseconds = 0;
    // if (currentTime) {
    //   // Extract the time before the slash by using [0]
    //   const timeString = currentTime.split("/")[0].trim(); // "0:25" from "0:25 / 1:15"

    //   // Regular expression to extract minutes and seconds as two groups in parenthesis (format mm:ss)
    //   const timeParts = /(\d+):(\d+)/.exec(timeString);
    //   // console.log(timeParts);
    //   if (timeParts) {
    //     const minutes = parseInt(timeParts[1], 10); // Minutes part
    //     const seconds = parseInt(timeParts[2], 10); // Seconds part

    //     // Convert to milliseconds
    //     timeInMilliseconds = (minutes * 60 + seconds) * 1000;

    //     console.log(timeInMilliseconds); // Output in milliseconds
    //   }
    // }
    if (isPlaying) {
      const interval = window.setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        /*Normally, setIndex changes after the alotted slide duration. When visibilitystate is false, and then 
        changes to true, this effect gets re-run and so interval is run again. Have to subtract time
        alreay spent on previous slide from slideduration */
      }, slideDuration - (elapsedTime - currentIndex * slideDuration));
      // console.log(slideDuration - (elapsedTime - currentIndex * slideDuration));
      return () => {
        window.clearInterval(interval);
      };
    }
  }, [isPlaying, currentIndex, elapsedTime]);

  // Effect to draw the image on canvas to get the primary color
  useEffect(() => {
    const canvasElement = canvasRef.current;
    const imageElement: HTMLImageElement | null = document.querySelector(
      `.client-slide[data-index="${currentIndex.toString()}"] img`
    );

    if (imageElement && canvasElement) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { willReadFrequently: true });

      const drawImage = () => {
        if (context) {
          context.drawImage(imageElement, 0, 0, 1, 1);
          const i = context.getImageData(0, 0, 1, 1).data;
          const rgba = `rgba(${[i[0], i[1], i[2], i[3] / 255].join(",")})`;
          canvasElement.style.setProperty("--primary-color", rgba);
        }
      };
      // pass drawImage CB for when image is loaded(Mainly for first image)
      imageElement.onload = drawImage;

      // Force draw if image is already loaded(All Images after first)
      if (imageElement.complete) {
        drawImage();
      }
    }
  }, [currentIndex]);

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
    return `${minutes.toString()}:${seconds.toString().padStart(2, "0")}`;
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      handleSlideChange((currentIndex + 1) % slides.length);
    },
    onSwipedRight: () => {
      handleSlideChange((currentIndex - 1 + slides.length) % slides.length);
    },
    trackTouch: true,
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  /* needs useCallback so that different function(object) is not passed 
  every time component re-renders unless isPlaying changes*/
  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  return (
    <div
      className="container-fluid all-clients-container mb-2 mt-4 py-5"
      ref={canvasRef}
    >
      <div {...swipeHandlers} className="container slides">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            data-index={index}
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
            <img
              className="all-clients-img"
              loading="lazy"
              src={slide.image}
              alt={slide.title}
            />
          </div>
        ))}
      </div>
      <div className="container">
        <div className="player poppins-regular">
          <div className="song-info">
            <div className="d-flex align-items-center">
              <PlayPause
                isPlaying={isPlaying}
                togglePlay={togglePlay}
              ></PlayPause>
              <div className="title">{slides[currentIndex].title}</div>
            </div>
            <div className="sub-line justify-content-end">
              {/* used elapsedTimeRef */}
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
                  width: `${((elapsedTime / totalDuration) * 100).toString()}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllClients;
/*Still problem when clicking the middle slide continuously.It causes the 
slide to change even though time stays the same. This is because the 
setCurrentIndex useEffect does not get re-run as the value of currentIndex 
does not actually change. To fix this, I had to then add a trigger 
button in the onClick event handler which then caused the effect to run again.This along with other
considerations made me choose the path of re-rendering the componenent every second instead*/
