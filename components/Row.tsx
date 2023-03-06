import React, { useRef, useState } from "react";
import { Movie } from "../typings";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  movies: Movie[];
}

const Row = ({ title, movies }: Props) => {
  const moviesContainerRef = useRef<HTMLDivElement>(null);
  const [isScroll, setIsScroll] = useState(false);
  const [isEndScroll, setIsEndScroll] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Moves the scrollbar to left/right
  const scrollButtonClickHandler = (direction: string) => {
    const container = moviesContainerRef.current;

    const scrollValue =
      direction === "forward"
        ? container?.clientWidth
          ? container.clientWidth
          : 0
        : container?.clientWidth
        ? -container.clientWidth
        : 0;

    container?.scrollTo({
      left: container?.scrollLeft + scrollValue,
      behavior: "smooth",
    });
  };

  // Set the value of isScroll & isEndScroll states to make buttons hide/show
  const scrollHandler = () => {
    const container = moviesContainerRef.current;
    container?.scrollLeft
      ? setIsScroll(container?.scrollLeft > 1 && true)
      : setIsScroll(false);
    container?.scrollLeft
      ? container.scrollLeft + container.clientWidth >= container.scrollWidth
        ? setIsEndScroll(true)
        : setIsEndScroll(false)
      : null;
  };

  return (
    <div className="mt-8">
      {/* Row Title */}
      <h2 className="font-bold cursor-pointer mb-3">{title}</h2>

      {/* Row Except Title */}
      <div
        className="relative h-28 sm:h-36"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Back and Forward Buttons */}
        <div
          className={`absolute ${
            isScroll ? (isHovering ? "" : "hidden") : "hidden"
          } z-10 top-1/2 transform -translate-y-1/2 left-0 bg-gray-500/60 rounded-full p-1 sm:p-3 text-white text-xl cursor-pointer transition hover:scale-110`}
          onClick={() => scrollButtonClickHandler("backward")}
        >
          <MdOutlineArrowBackIos />
        </div>
        <div
          className={`absolute ${
            isEndScroll ? "hidden" : isHovering ? "" : "hidden"
          } z-10 top-1/2 transform -translate-y-1/2 right-0 bg-gray-500/60 rounded-full p-1 sm:p-3 text-white text-xl cursor-pointer transition hover:scale-110`}
          onClick={() => scrollButtonClickHandler("forward")}
        >
          <MdOutlineArrowForwardIos />
        </div>

        {/* Movies */}
        <div
          className="flex gap-3 overflow-y-hidden hide-scrollbar"
          ref={moviesContainerRef}
          onScroll={scrollHandler}
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Row;
