import React, { useState } from "react";
import MuiModal from "@mui/material/Modal";
import { Movie } from "../typings";
import { FaSearch } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";
import Thumbnail from "./Thumbnail";

interface Props {
  setShowSearchModal: (showSearchModal: boolean) => void;
  allMovies: Movie[];
}

const SearchModal = ({ setShowSearchModal, allMovies }: Props) => {
  const [searchMovie, setSearchMovie] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [enterPressed, setEnterPressed] = useState(false);

  const handleSearch = () => {
    const f = allMovies.filter(
      (movie) =>
        movie.title &&
        movie.title.toLowerCase().includes(searchMovie.toLowerCase())
    );

    const m = f.map((movie) => movie.title);
    const temp = [];

    for (let i = 0; i < f.length; i++) {
      if (m.lastIndexOf(f[i].title) === i) {
        temp.push(f[i]);
      }
    }

    setFilteredMovies(temp);
    setEnterPressed(true);
    setSearchMovie("");
  };

  const handleKeyDown = () => {
    handleSearch();
    setEnterPressed(true);
  };

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
        <>
          {/* Input and close button part */}
          <div className="flex items-center px-4 sm:px-6 my-8 gap-2 max-w-3xl mx-auto">
            {/* Input part */}
            <div className="flex items-center bg-white rounded flex-grow min-w-0">
              <input
                type="text"
                value={searchMovie}
                onChange={(e) => setSearchMovie(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? handleKeyDown() : "")}
                placeholder="Movie"
                className="text-black focus:outline-none flex-grow h-10 rounded p-2"
              />
              <div>
                <FaSearch
                  className="cursor-pointer bg-red-600 h-10 text-4xl p-2 rounded rounded-tl-none rounded-bl-none"
                  onClick={handleSearch}
                />
              </div>
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
          <div className="mx-6 my-10 flex flex-wrap gap-5 items-center justify-center">
            {filteredMovies.length >= 1
              ? filteredMovies.map((movie) => (
                  <div className="z-0">
                    <Thumbnail key={movie.id} movie={movie} />
                  </div>
                ))
              : enterPressed && "Unfortunately movie not found"}
          </div>
        </>
      </MuiModal>
    </>
  );
};

export default SearchModal;
