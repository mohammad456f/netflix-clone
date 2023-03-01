import { Movie } from "../typings";
import ImageSlider from "./ImageSlider";

interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  return (
    <div className="w-full h-screen">
      <div className="absolute top-0 left-0 w-full h-screen">
        <ImageSlider slides={netflixOriginals} />
      </div>
    </div>
  );
};

export default Banner;
