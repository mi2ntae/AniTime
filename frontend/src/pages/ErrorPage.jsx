import Header from "components/Header/Header";
import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

export default function ErrorPage() {
  return (
    <>
      <Header />
      <Div>
        <img src="icons/img_delete.svg" alt="Error" />
        <Text>페이지를 찾을 수 없습니다.</Text>
        <Link to={"/"}>홈으로</Link>
      </Div>
    </>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Text = styled.p`
  color: #535a61;
`;
