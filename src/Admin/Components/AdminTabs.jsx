import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import ProductChart from "./ProductChart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router";
import SideMenu from "./SideMenu";
import { getallAdmin } from "../../API/admin/getallAdmin";
import { getallBlogPost } from "../../API/blogPost/getallBlogPost";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ padding: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [Admin, setAdmin] = useState([]);
  const [BlogPosts, setBlogPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  let { tableValue } = location.state || {};
  useEffect(() => {
    if (tableValue) {
      setValue(tableValue);
    }
  }, []);

  const getBlogPosts = async () => {
    try {
      const data = await getallBlogPost();
      setBlogPosts(data?.data?.length);
    } catch (error) {
      console.error("Error fetching Blog Posts data:", error);
    }
  };
  const getAdmins = async () => {
    try {
      const data = await getallAdmin();
      setAdmin(data?.data?.length);
    } catch (error) {
      console.error("Error fetching Admins data:", error);
    }
  };

  useEffect(() => {
    getBlogPosts();
    getAdmins();
  }, []);

  const backHandle = (value) => {
    setValue(value);
    tableValue = 0;
  };
  useEffect(() => {
    if (value === 0) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [value]);



  return (
    <Box sx={{ inlineSize: "100%", insetInlineStart: 0 }}>
      <SideMenu />
      <Button
        onClick={() => backHandle(0)}
        sx={{
          color: "#1976d2",
          position: "sticky",
          insetBlockStart: 100,
          zIndex: 1000,
          insetInlineStart: 5,
          display: value === 0 ? "none" : "flex",
        }}
      >
        <ArrowBackIcon /> back
      </Button>

      <Box
        sx={{ flex: 1, insetInlineStart: 15, transition: "margin-left 0.3s ease" }}
      >
        <TabPanel value={value} index={0}>
          <ProductChart
            Admin={Admin}
            BlogPosts={BlogPosts}
            setValue={setValue}
          />
        </TabPanel>
      </Box>
    </Box >
  );
}
