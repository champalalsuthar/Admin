import "./Desktop.css";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router";
import { Button, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { toast } from "react-toastify";
import crm_logo from "../Assets/Images/crm_logo.png";
import { useAuth } from "../Context/AuthContext";
import { handleLogOut } from "../Contants/Constant";

const DesktopNavigation = () => {
  const { logout, isAuthenticated } = useAuth();
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleLogOut(isAuthenticated, toast, navigate, setOpenAlert, logout);
  };

  return (
    <nav className="nav">
      <div className="logo">
        <span>
          <img src={crm_logo} width="80px" alt="main logo" />
        </span>
      </div>

      <div className="nav-items">
        <ul className="nav-items">
          {isAuthenticated && (
            <li>
              <Tooltip title="Profile">
                <span className="nav-icon-span" onClick={handleClickProfile}>
                  <CgProfile
                    style={{ fontSize: 29, insetBlockStart: 9, insetInlineEnd: 25 }}
                  />
                </span>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseProfile}
                onClick={handleCloseProfile}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleLogout}>
                  <FiLogOut
                    style={{ fontSize: 25, insetBlockStart: 9, insetInlineEnd: 10 }}
                  />
                  Logout
                </MenuItem>
              </Menu>
            </li>
          )}


          {!isAuthenticated && (
            <li className="nav-links">
              <NavLink to="/crm/login">
                <Button
                  variant="contained"
                  className="nav-icon-span"
                  sx={{ insetBlockEnd: 1 }}
                >
                  <Typography variant="button">Login</Typography>
                </Button>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default DesktopNavigation;
