import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { HiBell } from "react-icons/hi";
import React from "react";
import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { RxAvatar } from "react-icons/rx";
import { userLogout } from "../features/loginStatus/loginStatusSlice";
import MuiModal from "@mui/material/Modal";

const Header = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStatus.value.isLoggedIn
  );

  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();

  const scrollToMyList = () => {
    const myListElement = document.getElementById("my-list");
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
      <div className="flex items-center gap-x-2 md:gap-x-10">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          width={100}
          height={27}
          className="cursor-pointer"
          alt="netflix-logo"
        />
        <ul className="hidden gap-x-4 md:flex">
          <li className="headerLink-custom">Home</li>
          <li className="headerLink-custom">TV Shows</li>
          <li className="headerLink-custom">Movies</li>
          <li className="headerLink-custom">New & Popular</li>
          <li className="headerLink-custom">
            <span onClick={scrollToMyList}>My List</span>
          </li>
        </ul>
      </div>

      {/* Right side of the header */}
      <div className="flex items-center gap-4 text-sm font-light">
        <HiSearch className="hidden sm:inline w-6 h-6" />
        <p className="hidden lg:inline">Kids</p>
        <HiBell className="w-6 h-6" />
        {isLoggedIn && (
          <>
            {/* Avatar indicator for user sign in */}
            <RxAvatar
              size={36}
              className="cursor-pointer"
              onClick={() => setShowMenu((prev) => !prev)}
            />

            {/* Drop down Menu  */}
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
