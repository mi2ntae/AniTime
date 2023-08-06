import Header from "components/Header/Header";
import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

export default function DonationFailPage() {
  return (
    <>
      <Header />
      <Div>
        <img src="icons/img_delete.svg" alt="Error" />
        <Text>결제에 실패하였습니다.</Text>
        <Link to={"/donation"}>공고 목록 돌아가기</Link>
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
