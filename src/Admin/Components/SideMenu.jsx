import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  ListItemButton,
} from "@mui/material";
import { VscGraph } from "react-icons/vsc";
import {
  MdClose,
  MdMenu,
  MdOutlineRoomPreferences,
} from "react-icons/md";
import { TiPinOutline } from "react-icons/ti";
import Divider from "@mui/material/Divider";
import { useLocation, useNavigate } from "react-router";
import { FaBlog } from "react-icons/fa";


const SideMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const value = pathname;

  const toggleSidebarVisibility = () => {
    setOpen(!open);
  };
  const handleChange = (path) => {
    navigate(path);
  };
  const handleDrawerClose = () => {
    toggleSidebarVisibility();
  };

  return (
    <>
      {open === true ? (
        <Drawer
          variant="permanent"
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#fafafa",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              backgroundColor: "#fafafa",
            }}
          >
            <IconButton onClick={handleDrawerClose}>
              <MdClose />
            </IconButton>
          </Box>

          <List
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            style={{ overflowX: "a" }}
          >
            <ListItem>
              <ListItemIcon style={{ color: "blue" }}>
                <TiPinOutline style={{ color: "blue", fontWeight: "bold" }} />{" "}
                MAIN
              </ListItemIcon>
            </ListItem>

            <ListItemButton
              onClick={(event) => handleChange("/crm/home")}
              selected={value === "/crm/home"}
            >
              <ListItemIcon>
                <VscGraph fontSize={20} />
              </ListItemIcon>
              <ListItemText label={"Statistics"} primary={"Statistics"} />
            </ListItemButton>

            <ListItemButton
              onClick={(event) => handleChange("/crm/home/blogpost/table")}
              selected={value === "/crm/home/blogpost/table"}
            >
              <ListItemIcon>
                <FaBlog fontSize={20} />
              </ListItemIcon>
              <ListItemText label={"blogpost"} primary={"Blog Post"} />
            </ListItemButton>

          </List>
          <Divider />
          <List
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            style={{ overflowX: "a" }}
          >
            <ListItem>
              <ListItemIcon style={{ color: "blue" }}>
                <TiPinOutline style={{ color: "blue", fontWeight: "bold" }} />{" "}
                MANAGE
              </ListItemIcon>
            </ListItem>

            <ListItemButton
              onClick={(event) => handleChange("/crm/home/admin/table")}
              selected={value === "/crm/home/admin/table"}
            >
              <ListItemIcon>
                <MdOutlineRoomPreferences fontSize={20} />
              </ListItemIcon>
              <ListItemText label={"admin"} primary={"Admin"} />
            </ListItemButton>

          </List>
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#fafafa",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "0",
              backgroundColor: "#fafafa",
            }}
          >
            <IconButton
              onClick={toggleSidebarVisibility}
              style={{ marginLeft: 10 }}
            >
              <MdMenu style={{ fontSize: 25 }} />
            </IconButton>
          </Box>
          <List value={value} onChange={handleChange}>
            <ListItemButton
              sx={{
                px: 0,
              }}
              onClick={(event) => handleChange("/crm/home")}
              selected={value === "/crm/home"}
            >
              <ListItemIcon
                sx={{
                  justifyContent: "center",
                }}
              >
                <VscGraph fontSize={25} />
              </ListItemIcon>
            </ListItemButton>

            <ListItemButton
              sx={{
                px: 0,
              }}
              onClick={(event) => handleChange("/crm/home/blogpost/table")}
              selected={value === "/crm/home/blogpost/table"}
            >
              <ListItemIcon
                sx={{
                  justifyContent: "center",
                }}
              >
                <FaBlog fontSize={25} />
              </ListItemIcon>
            </ListItemButton>
            <Divider />
            <ListItemButton
              sx={{
                px: 0,
              }}
              onClick={(event) => handleChange("/crm/home/admin/table")}
              selected={value === "/crm/home/admin/table"}
            >
              <ListItemIcon
                sx={{
                  justifyContent: "center",
                }}
              >
                <MdOutlineRoomPreferences fontSize={25} />
              </ListItemIcon>
            </ListItemButton>
          </List>
        </Drawer>
      )}
    </>
  );
};

export default SideMenu;
