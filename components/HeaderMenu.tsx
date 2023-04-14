import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MenuItem, Divider } from "@mui/material";
import Menu, { MenuProps } from "@mui/material/Menu";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

interface Props {
  scrollTo: (section: string) => void;
}

const HeaderMenu = ({ scrollTo }: Props) => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStatus.value.isLoggedIn
  );
  const [anchorEl, setAnchorEl] = useState<null | SVGElement>(null);
  const [anchorPosition, setAnchorPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const handleClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
    setAnchorPosition({ top: event.clientY + 10, left: event.clientX - 40 });
  };

  const handleClose = (section: string) => {
    setAnchorEl(null);
    scrollTo(section);
  };

  const StyledMenu = styled(Menu)<MenuProps>(({ theme }) => ({
    "& .MuiPaper-root": {
      backgroundColor: "#686f7a",
      color: "#fff",
      "& .MuiMenu-list": {
        padding: "0",
      },
      "& .MuiMenuItem-root": {
        fontSize: 14,
      },
    },
  }));

  return (
    <div>
      <GiHamburgerMenu
        size={26}
        className="md:hidden cursor-pointer"
        onClick={handleClick}
      />
      <StyledMenu
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        className="mt-4"
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleClose("trending-movies")}>
          Trending Now
        </MenuItem>
        <Divider className="bg-red-500 h-1 !m-0" />
        <MenuItem onClick={() => handleClose("top-rated-movies")}>
          Top Rated
        </MenuItem>
        <Divider className="bg-red-500 h-1 !m-0" />
        <MenuItem onClick={() => handleClose("action-movies")}>
          Action Thrillers
        </MenuItem>
        <Divider className="bg-red-500 h-1 !m-0" />
        <MenuItem onClick={() => handleClose("comedies-movies")}>
          Comedies
        </MenuItem>
        <Divider className="bg-red-500 h-1 !m-0" />
        {isLoggedIn && (
          <div>
            <MenuItem onClick={() => handleClose("my-list-movies")}>
              My List
            </MenuItem>
            <Divider className="bg-red-500 h-1 !m-0" />
          </div>
        )}

        <MenuItem onClick={() => handleClose("romance-movies")}>
          Romance Movies
        </MenuItem>
        <Divider className="bg-red-500 h-1 !m-0" />
        <MenuItem onClick={() => handleClose("documentary-movies")}>
          Documentaries
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default HeaderMenu;
