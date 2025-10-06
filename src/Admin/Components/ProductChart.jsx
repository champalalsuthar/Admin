import React from "react";
import { Box, Stack, useMediaQuery } from "@mui/material";
import Widget from "./Widget";
import { MdOutlineRoomPreferences } from "react-icons/md";
import { FaBlog } from "react-icons/fa";

const ProductChart = ({ Admin, BlogPosts }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "20px 0", color: "#1976d2" }}>
        DASHBOARD
      </h1>

      <Box
        sx={{ inlineSize: "100%", display: "flex", justifyContent: "center" }}
      >
        <Stack
          direction={isSmallScreen ? "column" : "row"}
          spacing={isSmallScreen ? 1 : 5}
        >
          <Box sx={{ inlineSize: "250px" }}>
            <Widget
              numbers={BlogPosts || 0}
              heading="Blog Posts"
              color="#9932CC"
              url="/crm/home/blogpost/table"
              icon={<FaBlog />}
            />
          </Box>
          <Box sx={{ inlineSize: "250px" }}>
            <Widget
              numbers={Admin || 0}
              heading="Admin"
              color="#FFC300"
              url="/crm/home/admin/table"
              icon={<MdOutlineRoomPreferences />}
            />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default ProductChart;
