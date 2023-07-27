import React from "react";
import { styled } from "styled-components";
import { MainContainer } from "styled/styled";
import SelectTime from "../SelectTime/SelectTime";
import DesertionGuide from "./DesertionGuide";

export default function DesertionReservation() {
  const agreed = true;
  return (
    <PageContainer>
      {agreed ? <SelectTime /> : <DesertionGuide />}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
