import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const ProfileMenu = ({ isAuthenticated, isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const iconRef = useRef(null);
  const handleOpen = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <span>
      <IconButton onClick={handleOpen} ref={iconRef}>
        <AccountCircleRoundedIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={iconRef?.current}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: -4,
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            maxHeight: 600,
            width: "20ch",
          },
        }}
      >
        <MenuItem selected={true} onClick={handleClose}>
          {isAdmin ? "Admin" : "Normal"}
        </MenuItem>
      </Menu>
    </span>
  );
};

ProfileMenu.propTypes = {
  isAdmin: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};
export default ProfileMenu;
