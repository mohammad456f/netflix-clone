import { useEffect, useState } from "react";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import { baseUrl } from "../constants/movie";
import { Movie } from "../typings";

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
      <div className="relative w-full h-full flex justify-between items-center">
        <div
          className="absolute -z-10 top-0 left-0 w-full h-full rounded-lg bg-center bg-cover transition-all  delay-300 ease-in-out"
          style={{
            backgroundImage: `url(${baseUrl}${slides[currentIndex].backdrop_path})`,
          }}
          id="slider-image"
        ></div>
        <div className="text-4xl bg-gray-400/50 rounded-full p-3 cursor-pointer">
          <MdOutlineArrowBackIos
            onClick={() => currentIndex && setCurrentIndex((prev) => prev - 1)}
          />
        </div>
        <div className="text-4xl bg-gray-400/50 rounded-full p-3 cursor-pointer">
          <MdOutlineArrowForwardIos
            onClick={() =>
              currentIndex < slides.length - 1 &&
              setCurrentIndex((prev) => prev + 1)
            }
          />
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
