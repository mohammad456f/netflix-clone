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

const Header = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStatus.value.isLoggedIn
  );
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);

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
          <li className="headerLink-custom">My List</li>
        </ul>
      </div>

      {/* Right side of the header */}
      <div className="flex items-center gap-4 text-sm font-light">
        <HiSearch className="hidden sm:inline w-6 h-6" />
        <p className="hidden lg:inline">Kids</p>
        <HiBell className="w-6 h-6" />
        {isLoggedIn && (
          <>
            <RxAvatar
              size={36}
              className="cursor-pointer"
              onClick={() => setShowMenu((prev) => !prev)}
            />

            {/* Drop down Menu  */}
            <div
              className={`absolute border-2 border-red-500 rounded-lg -bottom-8 p-2 bg-black transition-custom cursor-pointer
              ${showMenu ? "right-4" : "-right-20"}`}
            >
              <ul>
                <li
                  className="font-bold"
                  onClick={() => dispatch(userLogout())}
                >
                  Log out
                </li>
              </ul>
            </div>
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
