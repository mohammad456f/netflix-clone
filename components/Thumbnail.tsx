import Image from "next/image";
import { useState } from "react";
import { Movie } from "../typings";
import { FaImdb } from "react-icons/fa";

interface Props {
  movie: Movie;
}

const Thumbnail = ({ movie }: Props) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className="relative p-2 h-28 min-w-[180px] sm:h-36 sm:min-w-[230px] cursor-pointer transition-custom sm:hover:scale-105"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Image of movie */}
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        fill
        alt="movie"
        className="object-cover rounded -z-20"
        unoptimized
        loading="lazy"
      />

      {/* Gradient over image when hovering */}
      <div
        className={`absolute inset-0 opacity-0 transition-custom ${
          isHover ? "opacity-100" : ""
        } -z-10`}
        style={{
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5) 80%)",
        }}
      ></div>

      {/* Movie detail show during hovering */}
      <div
        className={`absolute left-2 bottom-2 opacity-0 transition-custom ${
          isHover ? "opacity-100" : ""
        } text-xs sm:text-sm font-bold space-y-1`}
      >
        <p>{movie.title || movie.name}</p>
        <p>{movie.release_date?.substring(0, 4)}</p>
        <div className="flex items-center gap-1">
          <FaImdb className="text-xl" />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
