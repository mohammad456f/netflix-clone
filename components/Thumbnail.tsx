import Image from "next/image";
import { Movie } from "../typings";

interface Props {
  movie: Movie;
}

const Thumbnail = ({ movie }: Props) => {
  return (
    <div className="relative h-28 min-w-[180px] sm:h-36 sm:min-w-[230px] cursor-pointer transition sm:hover:scale-105">
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        fill
        alt="movie"
        className="object-cover rounded"
        unoptimized
      />
    </div>
  );
};

export default Thumbnail;
