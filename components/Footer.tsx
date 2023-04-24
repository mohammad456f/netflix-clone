import React from "react";

const Footer = () => {
  return (
    <ul className="flex justify-around rounded-lg items-center fixed z-50 bottom-0 w-full h-12 bg-gray-800 text-white text-xs sm:text-sm">
      <li className="p-2 cursor-pointer hover:text-red-600 transition-custom hover:scale-105">
        Ads on Netflix
      </li>
      <li className="p-2 cursor-pointer hover:text-red-600 transition-custom hover:scale-105">
        job openings
      </li>
      <li className="p-2 cursor-pointer hover:text-red-600 transition-custom hover:scale-105">
        Buy subscription
      </li>
    </ul>
  );
};

export default Footer;
