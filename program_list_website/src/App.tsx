import React from "react";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Programs from "./pages/Programs/Programs";
import AppHeader from "./components/AppHeader/AppHeader";

const App = () => {
  return (
    <>
      <AppHeader />
      <Container component="main" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Routes>
          <Route path="/" element={<Programs />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
