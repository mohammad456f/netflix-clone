import React, { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";
import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowModal } from "../features/showModal/showModalSlice";
import { setUserMoviesList } from "../features/userMoviesList/userMoviesListSlice";
import { HiXCircle } from "react-icons/hi";
import { VscCheck, VscMute, VscUnmute } from "react-icons/vsc";
import ReactPlayer from "react-player";
import { BsFillPlayFill, BsPlus, BsPauseFill } from "react-icons/bs";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";

const Modal = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStatus.value.isLoggedIn
  );
  const userId = useSelector(
    (state: RootState) => state.loginStatus.value.userId
  );
  const showModal = useSelector((state: RootState) => state.showModal.value);
  const currentMovie = useSelector(
    (state: RootState) => state.currentMovie.value
  );
  const userMoviesList = useSelector(
    (state: RootState) => state.userMoviesList.value
  );

  const [trailerKey, setTrailerKey] = useState<string>();
  const [movieGenres, setMovieGenres] = useState<string>("");
  const [playing, setPlaying] = useState(false);
  const [addInProgress, setAddInProgress] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [muted, setMuted] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleShowModal());
  };

  const addButtonHandler = async () => {
    if (isLoggedIn) {
      setAddInProgress(true);
      await fetch("/api/insertUserMovie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, movie: currentMovie }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message !== "successful") {
            toast.info("This movie already exists on your list", {
              position: "bottom-left",
            });
          } else {
            if (currentMovie) {
              if (userMoviesList)
                dispatch(setUserMoviesList([...userMoviesList, currentMovie]));
              else dispatch(setUserMoviesList([currentMovie]));
            }
          }
          setShowCheck(true);
          setAddInProgress(false);
        });
    } else {
      toast.info("You're not signed in", { position: "bottom-left" });
    }
  };

  const checkButtonHandler = async () => {
    setAddInProgress(true);
    await fetch("/api/deleteUserMovie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, movieId: currentMovie?.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "successful") {
          setShowCheck(false);
          setAddInProgress(false);
          if (userMoviesList && currentMovie) {
            dispatch(
              setUserMoviesList(
                userMoviesList?.filter(
                  (movie) => !(movie.id === currentMovie.id)
                )
              )
            );
          }
        }
      });
  };

  const muteUnMuteButtonHandler = () => {
    setMuted((prev) => !prev);
  };

  useEffect(() => {
    const fetchTrailer = async () => {
      await fetch(
        `https://api.themoviedb.org/3/movie/${currentMovie?.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          setTrailerKey(
            data.results.find((result: any) => result.type === "Trailer").key
          );
        });

      await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          const genres = data.genres
            .filter((element: { id: number; name: string }) =>
              currentMovie?.genre_ids.includes(element.id)
            )
            .map((element: { id: number; name: string }) => element.name);

          setMovieGenres(
            genres.reduce(
              (element1: string, element2: string) => element1 + ", " + element2
            )
          );
        });
    };

    fetchTrailer();
    if (isLoggedIn && currentMovie) {
      if (userMoviesList?.map((movie) => movie.id).includes(currentMovie.id)) {
        setShowCheck(true);
      }
    }
  }, [currentMovie]);

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="!top-7 max-w-3xl mx-auto overflow-y-scroll hide-scrollbar-custom"
    >
      <>
        {trailerKey && (
          <>
            {/* Video and related buttons that lay out absolutely on top of video */}
            <div className="relative pb-[56.25%]">
              {/* Video Player */}
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailerKey}`}
                width="100%"
                height="100%"
                className="absolute top-0 left-0"
                playing={playing}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                volume={0.6}
                muted={muted}
              />

              {/* Close button */}
              <HiXCircle
                className="h-6 w-6 cursor-pointer absolute right-2 top-2 transition-custom hover:scale-105"
                size={28}
                onClick={() => dispatch(toggleShowModal())}
              />

              {/* Buttons at the bottom of the player */}
              <div className="absolute w-full px-2 sm:px-5 bottom-2 sm:bottom-5 flex items-center justify-between">
                {/* Left side buttons */}
                <div className="flex items-center gap-2">
                  {/* Play|Pause button */}
                  <div
                    className="flex items-center bg-white text-black rounded px-2 py-1 sm:py-0 cursor-pointer"
                    onClick={() => setPlaying((prev) => !prev)}
                  >
                    {playing ? (
                      <BsPauseFill className="text-xl sm:text-4xl" />
                    ) : (
                      <BsFillPlayFill className="text-xl sm:text-4xl" />
                    )}
                    <span className="text-sm sm:text-base">
                      {playing ? "Pause" : "Play"}
                    </span>
                  </div>
                  {/* Plus|Progress|Check button */}
                  <div>
                    {addInProgress && (
                      <CircularProgress
                        className={`absolute !text-red-500 !w-8 !h-8`}
                      />
                    )}

                    {showCheck ? (
                      <Tooltip
                        title="Remove from your list"
                        placement="top"
                        arrow
                      >
                        <div>
                          <VscCheck
                            className="rounded-full w-8 h-8 border-2 border-gray-300/70 p-1 cursor-pointer bg-black/70 hover:bg-black/40 transition-custom"
                            onClick={checkButtonHandler}
                          />
                        </div>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Add to your list" placement="top" arrow>
                        <div>
                          <BsPlus
                            className="rounded-full w-8 h-8 border-2 border-gray-300/70 p-px cursor-pointer bg-black/70 hover:bg-black/40 transition-custom"
                            onClick={addButtonHandler}
                          />
                        </div>
                      </Tooltip>
                    )}
                  </div>
                </div>
                {/* Right side buttons */}
                <div>
                  {/* Mute|Unmute button */}
                  {muted ? (
                    <Tooltip title="Unmute" placement="top" arrow>
                      <div>
                        <VscMute
                          className="rounded-full w-8 h-8 border-2  border-gray-300/70 p-1 cursor-pointer bg-black/70 hover:bg-black/40 transition-custom"
                          onClick={muteUnMuteButtonHandler}
                        />
                      </div>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Mute" placement="top" arrow>
                      <div>
                        <VscUnmute
                          className="rounded-full w-8 h-8 border-2  border-gray-300/70 p-1 cursor-pointer bg-black/70 hover:bg-black/40 transition-custom"
                          onClick={muteUnMuteButtonHandler}
                        />
                      </div>
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>

            {/* Descriptions about video beneath the video */}
            <div className="bg-black/50 px-4 py-6 flex flex-col gap-3 text-xs sm:text-sm">
              <div className="flex justify-start gap-2 items-center text-xs">
                <p className="text-green-500">
                  {currentMovie && Math.floor(currentMovie.vote_average * 10)}%
                  Match
                </p>
                <p>{currentMovie?.release_date}</p>
                <p className="border px-1.5 rounded">HD</p>
              </div>
              <div>{currentMovie?.overview}</div>
              <div>
                <span className="text-gray-400">Genres: </span>
                <span>{movieGenres}</span>
              </div>
              <div>
                <span className="text-gray-400">Original language: </span>
                <span>{currentMovie?.original_language}</span>
              </div>
              <div>
                <span className="text-gray-400">Total votes: </span>
                <span>{currentMovie?.vote_count}</span>
              </div>
            </div>
          </>
        )}
      </>
    </MuiModal>
  );
};

export default Modal;
