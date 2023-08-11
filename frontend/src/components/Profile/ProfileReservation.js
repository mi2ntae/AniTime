import React from "react";
import { MainContainer } from "styled/styled";
import { Outlet } from "react-router";

export default function ProfileReservation() {
  return (
    <MainContainer
      style={{
        maxWidth: "100vw",
        backgroundColor: "#F7F8FA",
      }}
    >
      <Outlet />
    </MainContainer>
  );
}
