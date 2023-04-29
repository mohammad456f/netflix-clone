import { useEffect, useState } from "react";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import { baseUrl } from "../constants/movie";
import { Movie } from "../typings";
import { BsFillPlayFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setModal } from "../features/showModal/showModalSlice";
import { setCurrentMovie } from "../features/currentMovie/currentMovieSlice";
import Image from "next/image";

interface Props {
  slides: Movie[];
}

const ImageSlider = ({ slides }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setModal(true));
    dispatch(setCurrentMovie(slides[currentIndex]));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div className="relative w-full h-screen flex justify-between items-center">
        {/* Title of the movie and play button */}
        <div className="ml-4 z-10">
          <h1 className="font-bold text-base sm:text-lg max-w-[40vw]">
            {slides[currentIndex].title}
          </h1>
          <button
            className="flex items-center mt-4 py-1 px-2 sm:py-1 sm:px-2 rounded text-black bg-white font-bold"
            onClick={handleClick}
          >
            <BsFillPlayFill className="text-xl sm:text-3xl" />
            <span className="text-base sm:text-lg">Play</span>
          </button>
        </div>

        {/* Image of the slider */}
        <Image
          src={`${baseUrl}${slides[currentIndex].backdrop_path}`}
          fill
          alt="movie"
          className="object-cover rounded"
          unoptimized
          loading="lazy"
        />

        {/* A shadow on top of the image(left side) */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background:
              "linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2) 50%)",
          }}
        ></div>

        {/* Back and Forth buttons for the image slider */}
        <div className="flex absolute right-4 sm:right-10 bottom-14 gap-2">
          <div className="text-xl sm:text-4xl bg-gray-500/70 rounded-full p-3 cursor-pointer text-gray-300 hover:text-white hover:scale-105 transition-custom">
            <MdOutlineArrowBackIos
              onClick={() =>
                setCurrentIndex((prev) =>
                  currentIndex ? prev - 1 : slides.length - 1
                )
              }
            />
          </div>
          <div className="text-xl sm:text-4xl bg-gray-500/70 rounded-full p-3 cursor-pointer text-gray-300 hover:text-white hover:scale-105 transition-custom">
            <MdOutlineArrowForwardIos
              onClick={() =>
                setCurrentIndex((prev) =>
                  currentIndex === slides.length - 1 ? 0 : prev + 1
                )
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
