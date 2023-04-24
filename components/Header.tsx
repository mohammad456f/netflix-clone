import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { RxAvatar } from "react-icons/rx";
import { userLogout } from "../features/loginStatus/loginStatusSlice";
import MuiModal from "@mui/material/Modal";
import HeaderMenu from "./HeaderMenu";
import { FaSearch } from "react-icons/fa";

interface Props {
  setShowSearchModal: (showSearchModal: boolean) => void;
}

const Header = ({ setShowSearchModal }: Props) => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStatus.value.isLoggedIn
  );
  const userMoviesList = useSelector(
    (state: RootState) => state.userMoviesList.value
  );

  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();

  const scrollTo = (section: string) => {
    const myListElement = document.getElementById(section);

    const myListOffset = myListElement?.offsetTop
      ? myListElement?.offsetTop - 60
      : 0;
    window.scrollTo({ top: myListOffset, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${isScrolled && "bg-black bg-none"}`}>
      {/* Left side of header */}
      <div className="flex items-center gap-x-4">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          width={80}
          height={27}
          alt="netflix-logo"
        />

        <HeaderMenu scrollTo={scrollTo} />

        <ul className="hidden gap-x-4 md:flex">
          <li className="headerLink-custom">
            <span onClick={() => scrollTo("trending-movies")}>Trending</span>
          </li>
          <li className="headerLink-custom">
            <span onClick={() => scrollTo("top-rated-movies")}>Top Rated</span>
          </li>
          <li className="headerLink-custom">
            <span onClick={() => scrollTo("action-movies")}>Action</span>
          </li>
          <li className="headerLink-custom">
            <span onClick={() => scrollTo("comedies-movies")}>Comedies</span>
          </li>
          <li className="headerLink-custom">
            <span onClick={() => scrollTo("scary-movies")}>Scary</span>
          </li>
          <li className="headerLink-custom">
            <span onClick={() => scrollTo("romance-movies")}>Romance</span>
          </li>
          <li className="headerLink-custom">
            <span onClick={() => scrollTo("documentary-movies")}>
              Documentary
            </span>
          </li>
          {userMoviesList && isLoggedIn && userMoviesList.length > 0 && (
            <li className="headerLink-custom">
              <span onClick={() => scrollTo("my-list-movies")}>My List</span>
            </li>
          )}
        </ul>
      </div>

      {/* Right side of the header */}
      <div className="flex items-center gap-4 text-sm font-light">
        <FaSearch
          size={22}
          className="cursor-pointer"
          onClick={() => setShowSearchModal(true)}
        />
        {isLoggedIn && (
          <>
            {/* Avatar indicator for user sign in */}
            <RxAvatar
              size={32}
              className="cursor-pointer"
              onClick={() => setShowMenu((prev) => !prev)}
            />

            {/* Drop down Menu when user press avatar */}
            <MuiModal open={showMenu} onClose={() => setShowMenu(false)}>
              <ul className="absolute right-4 top-14 bg-red-500 p-2 rounded">
                <li
                  className="font-semibold cursor-pointer"
                  onClick={() => dispatch(userLogout())}
                >
                  Log out
                </li>
              </ul>
            </MuiModal>
          </>
        )}
        {isLoggedIn || (
          <Link
            href="/login"
            className="border-2 border-red-600 bg-red-600 p-2 rounded font-semibold hover:scale-105 transition-custom"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
