import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { HiBell } from "react-icons/hi";

const Header = () => {
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
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center gap-x-2 md:gap-x-10">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          width={100}
          height={100}
          className="cursor-pointer"
          alt="netflix-logo"
        />
        <ul className="hidden gap-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>
      <div className="flex items-center gap-4 text-sm font-light">
        <HiSearch className="hidden sm:inline w-6 h-6" />
        <p className="hidden lg:inline">Kids</p>
        <HiBell className="w-6 h-6" />
        <Link href="/account">
          <img
            src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
            alt=""
            className="rounded"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
