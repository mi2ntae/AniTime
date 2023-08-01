import React from "react";
import { styled } from "styled-components";
import { MainContainer } from "styled/styled";
import DesertionGuide from "./DesertionGuide";
import ReservationForm from "components/SelectTime/ReservationForm";
import SelectTime from "../SelectTime/SelectTime";
import { Outlet } from "react-router";

export default function DesertionReservation() {
  var agreed = true;
  // 배경색 넣기
  return (
    <MainContainer
      style={{
        width: "100vw",
        backgroundColor: "#F7F8FA !important",
      }}
    >
      <Outlet />
    </MainContainer>
  );
}

const PageContainer = styled.div`
  border: 2px solid blue;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
