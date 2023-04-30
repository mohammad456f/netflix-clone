import React, { useState, useEffect, useRef } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Slider from "@mui/material/Slider";
import { VscClose } from "react-icons/vsc";

interface Props {
  filterYear: number[];
  setFilterYear: React.Dispatch<React.SetStateAction<number[]>>;
  handleSearch: () => void;
  isFilter: boolean;
  setIsFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filter = ({
  filterYear,
  setFilterYear,
  handleSearch,
  isFilter,
  setIsFilter,
}: Props) => {
  const [showFilter, setShowFilter] = useState(false);
  const [sliderValue, setSliderValue] = useState([0, 100]);
  const isMountOver = useRef(2);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setSliderValue([
        Math.min(newValue[0], sliderValue[1] - 5),
        sliderValue[1],
      ]);
    } else {
      setSliderValue([
        sliderValue[0],
        Math.max(newValue[1], sliderValue[0] + 5),
      ]);
    }
  };

  const handleApplyClick = () => {
    setIsFilter(true);
    setShowFilter(false);
    handleSearch();
  };

  const handleDeleteAppliedFilter = () => {
    setIsFilter(false);
    setSliderValue([0, 100]);
  };

  useEffect(() => {
    if (isMountOver.current >= 1) {
      console.log(isMountOver.current);
      isMountOver.current -= 1;
      return;
    }
    setFilterYear([
      Math.floor(sliderValue[0] * 0.66 + 1957),
      Math.floor(sliderValue[1] * 0.66 + 1957),
    ]);
  }, [sliderValue]);

  useEffect(() => {
    if (isMountOver.current >= 1) {
      console.log(isMountOver.current);
      isMountOver.current -= 1;
      return;
    }

    if (!showFilter) handleSearch();
  }, [filterYear]);

  return (
    <>
      {/* Filter button and applied filter part */}
      <div className="flex gap-2">
        {/* Filter button */}
        <div
          className="inline-flex items-center gap-1 bg-white text-black p-2 rounded cursor-pointer"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          <p>Filter</p>
          {showFilter ? <BsChevronUp /> : <BsChevronDown />}
        </div>
        {/* Applied Filter year  */}
        {isFilter && (
          <div className="flex items-center gap-1 bg-white text-black p-2 rounded">
            <p className="">
              {filterYear[0]}-{filterYear[1]}
            </p>
            <VscClose
              size={26}
              className="cursor-pointer"
              onClick={handleDeleteAppliedFilter}
            />
          </div>
        )}
      </div>

      {/* Filter slider */}
      {showFilter && (
        <div className="bg-black flex flex-col gap-10 p-10 sm:p-20 rounded-lg">
          <p>Please select you preferred year range</p>
          <Slider value={sliderValue} onChange={handleChange} />
          <div className="flex items-center justify-around">
            <p>From {Math.floor(sliderValue[0] * 0.66 + 1957)}</p>
            <p>To {Math.floor(sliderValue[1] * 0.66 + 1957)}</p>
          </div>
          <button
            className="bg-white rounded p-2 text-black"
            onClick={handleApplyClick}
          >
            Apply
          </button>
        </div>
      )}
    </>
  );
};

export default Filter;
