import ModalTestButton from "components/Modal/ModalTestButton";
import React from "react";
import { styled } from "styled-components";
import { MainContainer } from "styled/styled";

export default function Main() {
  return (
    <MainContainer>
      <MainTest>
        <p>main</p>
        <ModalTestButton />
      </MainTest>
    </MainContainer>
  );
}

const MainTest = styled.div`
  background-color: grey;
  width: 100%;
  height: 320px;
`;
