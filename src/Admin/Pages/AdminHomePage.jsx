import React, { useState } from "react";
import { Container } from "@mui/material";
import BasicTabs from "../Components/AdminTabs";
const AdminHomePage = () => {
  return (
    <Container maxWidth="100%">
      <BasicTabs />
    </Container>
  );
};

export default AdminHomePage;
