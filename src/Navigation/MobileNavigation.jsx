import "./Mobile.css";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import { AiOutlineHome, AiFillCloseCircle } from "react-icons/ai";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  handleClickOpen,
  handleClose,
  handleLogOut,
} from "../Contants/Constant";
import { useAuth } from "../Context/AuthContext";

const MobileNavigation = () => {

  const { logout, isAuthenticated } = useAuth();
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  return (
    <Box className="showMobile">
      <BottomNavigation
        sx={{
          display: "flex",
          justifyContent: "space-around",
          inlineSize: "100%",
          position: "fixed",
          insetBlockEnd: 0,
          overflowX: "hidden",
          blockSize: 60,
          background: "white",
        }}
      >
        <NavLink
          to="/crm/home"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="links">
            <AiOutlineHome style={{ fontSize: 23 }} />
          </div>
        </NavLink>

        {isAuthenticated ? (
          <>
            <div
              className="links"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handleClickOpen(setOpenAlert)}
            >
              <FiLogOut style={{ fontSize: 23 }} />
            </div>
          </>
        ) : (
          <NavLink
            to="/crm/login"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="links"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FiLogIn style={{ fontSize: 23 }} />
            </div>
          </NavLink>
        )}
      </BottomNavigation>
      <Dialog
        open={openAlert}
        keepMounted
        onClose={() => handleClose(setOpenAlert)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent
          sx={{
            inlineSize: { xs: 280, md: 350, xl: 400 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6"> Do You Want To Logout?</Typography>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            variant="contained"
            endIcon={<FiLogOut />}
            color="primary"
            onClick={() =>
              handleLogOut(
                isAuthenticated,
                toast,
                navigate,
                setOpenAlert,
                logout
              )
            }
          >
            Logout
          </Button>
          <Button
            variant="contained"
            color="error"
            endIcon={<AiFillCloseCircle />}
            onClick={() => handleClose(setOpenAlert)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MobileNavigation;
