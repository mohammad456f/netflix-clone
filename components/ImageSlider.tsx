import { useEffect, useState } from "react";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import { baseUrl } from "../constants/movie";
import { Movie } from "../typings";
import { BsFillPlayFill } from "react-icons/bs";

interface Props {
  slides: Movie[];
}

const ImageSlider = ({ slides }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, []);
  return (
    <>
      <div className="relative w-full h-screen flex justify-between items-center">
        <div className="ml-4 hidden sm:block">
          <h1 className="font-bold text-2xl">{slides[currentIndex].title}</h1>
          <button className="flex items-center mt-4 py-2 px-4 rounded text-black bg-white font-bold">
            <BsFillPlayFill className="text-3xl" />
            <span>Play</span>
          </button>
        </div>
        <div
          className="absolute -z-20 top-0 left-0 w-full h-full bg-center bg-cover transition-all duration-300 ease-in-out"
          style={{
            backgroundImage: `url(${baseUrl}${slides[currentIndex].backdrop_path})`,
          }}
          id="slider-image"
        ></div>
        <div
          className="hidden sm:block absolute -z-10 top-0 left-0 w-full h-full"
          style={{
            background:
              "linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(255, 255, 255, 0) 35%)",
          }}
        ></div>
        <div className="flex absolute right-4 sm:right-10 bottom-14 gap-2">
          <div className="text-xl sm:text-4xl bg-gray-500/70 rounded-full p-3 cursor-pointer text-gray-300 hover:text-white hover:scale-105 transition">
            <MdOutlineArrowBackIos
              onClick={() =>
                setCurrentIndex((prev) =>
                  currentIndex ? prev - 1 : slides.length - 1
                )
              }
            />
          </div>
          <div className="text-xl sm:text-4xl bg-gray-500/70 rounded-full p-3 cursor-pointer text-gray-300 hover:text-white hover:scale-105 transition">
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
