import { memo } from "react";
import { IconContext } from "react-icons";
import { FaPause, FaPlay } from "react-icons/fa";

const PlayPauseButton = ({ isPlaying, togglePlay }: { isPlaying: boolean; togglePlay: () => void }) => (
  <IconContext.Provider value={{ color: "#F2F2F2", size: "1.5rem" }}>
    <div
      tabIndex={0}
      role="button"
      aria-label={isPlaying ? "Pause" : "Play"}
      onClick={togglePlay}
      style={{ cursor: "pointer" }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          togglePlay();
        }
      }}
    >
      {isPlaying ? <FaPause /> : <FaPlay />}
    </div>
  </IconContext.Provider>
);

export default memo(PlayPauseButton);
