import React, { useState, useEffect } from "react";
import MuiModal from "@mui/material/Modal";
import Skeleton from "@mui/material/Skeleton";
import { Movie } from "../../typings";
import { FaSearch } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";
import Thumbnail from "../Thumbnail";
import Filter from "./Filter";

interface Props {
  setShowSearchModal: (showSearchModal: boolean) => void;
  allMovies: Movie[];
}

const SearchModal = ({ setShowSearchModal, allMovies }: Props) => {
  const [searchMovie, setSearchMovie] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [filterYear, setFilterYear] = useState([1957, 2023]);
  const [enterPressed, setEnterPressed] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  const movieFiltering = () => {
    const f = allMovies.filter((movie) => {
      const movieYear = movie?.release_date
        ? parseInt(movie.release_date.substring(0, 4))
        : parseInt(movie.first_air_date.substring(0, 4));
      const withinRange =
        movieYear >= filterYear[0] && movieYear <= filterYear[1];
      const movieTitle = movie.title || movie.name;
      return (
        movieTitle.toLowerCase().includes(searchMovie.toLowerCase()) &&
        withinRange
      );
    });
    const m = f.map((movie) => movie.title);
    const temp: Movie[] = [];
    for (let i = 0; i < f.length; i++) {
      if (m.lastIndexOf(f[i].title) === i) {
        temp.push(f[i]);
      }
    }
    return temp;
  };

  const handleSearch = () => {
    setIsReady(false);
    setEnterPressed(true);
    setFilteredMovies(movieFiltering());
  };

  useEffect(() => {
    if (enterPressed) {
      setTimeout(() => {
        setIsReady(true);
        setEnterPressed(false);
      }, 2000);
    }
  }, [enterPressed]);

  useEffect(() => {
    if (isFilter) handleSearch();
  }, [isFilter]);

  return (
    <>
      <MuiModal
        open={true}
        onClose={() => setShowSearchModal(false)}
        sx={{
          overflowY: "auto",
          "& .MuiModal-backdrop": {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <div className="max-w-4xl mx-auto outline-none">
          {/* Input and close button and filter part */}
          <div className="px-4 sm:px-6">
            {/* Input and close button part */}
            <div className="flex items-center mt-8 mb-3 gap-2">
              {/* Input part */}
              <div className="flex items-center bg-white rounded flex-grow min-w-0">
                <input
                  type="text"
                  value={searchMovie}
                  onChange={(e) => setSearchMovie(e.target.value)}
                  onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : "")}
                  placeholder="Type movie name"
                  className="text-black focus:outline-none flex-grow rounded p-2 px-3  h-10"
                />
                <FaSearch
                  className="cursor-pointer bg-red-600 text-4xl p-2 rounded rounded-tl-none rounded-bl-none h-10"
                  onClick={handleSearch}
                />
              </div>
              {/* Close button part */}
              <div
                className="flex items-center cursor-pointer bg-red-600 px-2 py-1.5 rounded h-10"
                onClick={() => setShowSearchModal(false)}
              >
                <VscClose className="text-white text-2xl" />
                <span className="hidden sm:block font-bold">Close</span>
              </div>
            </div>
            {/* Filter button part */}
            <Filter
              filterYear={filterYear}
              setFilterYear={setFilterYear}
              handleSearch={handleSearch}
              isFilter={isFilter}
              setIsFilter={setIsFilter}
            />
          </div>

          {/* Show searched movies part */}

          <div className="mx-6 my-10 flex flex-wrap gap-5 items-center justify-center">
            {!isReady && enterPressed && (
              <>
                <div className="h-28 w-[180px] sm:h-36 sm:w-[230px]">
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.700" }}
                    className="!h-full !w-full"
                    width="100%"
                    height="100%"
                  />
                </div>
                <div className="h-28 w-[180px] sm:h-36 sm:w-[230px]">
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.700" }}
                    className="!h-full !w-full"
                    width="100%"
                    height="100%"
                  />
                </div>
              </>
            )}

            {isReady && filteredMovies.length >= 1
              ? filteredMovies.map((movie) => (
                  <div className="z-0">
                    <Thumbnail key={movie.id} movie={movie} />
                  </div>
                ))
              : ""}
            {isReady && filteredMovies.length === 0
              ? "Unfortunately movie not found"
              : ""}
          </div>
        </div>
      </MuiModal>
    </>
  );
};

export default SearchModal;
