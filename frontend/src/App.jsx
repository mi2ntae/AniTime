import { ThemeProvider, createTheme } from "@mui/material";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function App() {
  const token = useSelector((state) => state.member.token);
  const pathname = useLocation().pathname;

  const blackList = ["/mypage", "/donation/write", "/profile/write"];

  const theme = createTheme({
    typography: {
      fontFamily: "nanumsquare",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Header />
      {!token && blackList.some((item) => item === pathname) ? (
        <Navigate to="/login" />
      ) : (
        <Outlet />
      )}
      <Footer />
    </ThemeProvider>
  );
}
