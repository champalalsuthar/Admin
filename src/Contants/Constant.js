import { Slide } from "@mui/material";
import { forwardRef } from "react";

const handleLogOut = (
  isAuthenticated,
  toast,
  navigate,
  setOpenAlert,
  logout
) => {
  if (isAuthenticated) {
    logout();
    toast.success("Logout Successfully", { autoClose: 500, theme: "colored" });
    navigate("/crm");
    setOpenAlert(false);
  } else {
    toast.error("User is already logged of", {
      autoClose: 500,
      theme: "colored",
    });
  }
};

const handleClickOpen = (setOpenAlert) => {
  setOpenAlert(true);
};

const handleClose = (setOpenAlert) => {
  setOpenAlert(false);
};


export { handleClickOpen, handleClose, handleLogOut };
