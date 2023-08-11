import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function App() {
  const token = useSelector((state) => state.member.token);
  const pathname = useLocation().pathname;

  const whiteList = [
    /^\/$/,
    /^\/donation(\/\d+)?$/,
    /^\/desertion$/,
    /^\/faq$/,
    /^\/missing$/,
  ];

  return (
    <>
      <Header />
      {token || whiteList.some((item) => item.test(pathname)) ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
      <Footer />
    </>
  );
}
